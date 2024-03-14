import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ajaxCall from "../../helpers/ajaxCall";
import { authAction } from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { setToLocalStorage } from "../../helpers/helperFunction";
import Register from "./Register";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const intialLoginData = {
  username: "",
  password: "",
};

const reducerLogin = (state, action) => {
  if (action.type === "reset") {
    return {
      ...state,
    };
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const Login = () => {
  const [loginData, dispatchLogin] = useReducer(reducerLogin, intialLoginData);
  const controller = useRef(null);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authData = useSelector((state) => state.authStore);

  const { checkAuth } = useCheckAuth();

  const resetReducerForm = () => {
    dispatchLogin({
      type: "reset",
    });
  };

  useEffect(() => {
    return () => {
      if (controller.current) {
        controller.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    checkAuth();
  }, [authData, checkAuth]);

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const validateForm = () => {
    if (!loginData.username) {
      setFormError("User Name is Required");
      return false;
    }
    if (!loginData.password) {
      setFormError("Password is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const doLogin = async (e) => {
    resetReducerForm();
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus({
      ...formStatus,
      isSubmitting: true,
    });

    const data = JSON.stringify(loginData);

    controller.current = new AbortController();

    const signal = controller.current.signal;

    const gotLate = setTimeout(() => {
      console.log("------->");
    }, 4000);

    const timeOutFunction = () => {
      controller.current.abort();
    };

    try {
      const response = await ajaxCall(
        "/login/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data,
          withCredentials: true,
          signal,
        },
        8000,
        timeOutFunction
      );
      clearTimeout(gotLate);
      if (response.status === 200) {
        toast.success(response.data?.msg);
        handleLoginSuccess(response);
        response.data.user_role === "admin"
          ? navigate("/admin-dashboard")
          : navigate("/studentDashboard");
      } else if (response.status === 400 || response.status === 404) {
        setFormStatus({
          isError: true,
          errMsg: response.data?.errors,
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  const handleLoginSuccess = (response) => {
    const localObj = {
      accessToken: response.data?.token?.access,
      refreshToken: response.data?.token?.refresh,
      user_type: response.data?.user_status,
      userId: response.data?.userid,
      timeOfLogin: Date.now(),
      user_role: response.data?.user_role,
      username: loginData.username,
    };
    setToLocalStorage("loginInfo", localObj, true);
    dispatch(
      authAction.setAuthStatus({
        username: loginData.username,
        loggedIn: true,
        accessToken: response.data?.token?.access,
        refreshToken: response.data?.token?.refresh,
        user_type: response.data?.user_status,
        user_role: response.data?.user_role,
        userId: response.data?.userid,
        timeOfLogin: Date.now(),
        logInOperation: 1,
      })
    );
    setTimeout(
      () =>
        dispatch(
          authAction.setAuthStatus({
            userName: "",
            loggedIn: false,
            accessToken: null,
            refreshToken: null,
            userId: null,
            user_type: null,
            timeOfLogin: null,
            logInOperation: -1,
          })
        ),
      1000 * 60 * 30
    );
    navigate("/");
  };

  const toggleForm = () => {
    setActiveTab((prevTab) => (prevTab === "login" ? "signup" : "login"));
  };

  if (authData.authLoading) {
    return <></>;
  }

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="loginarea sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-md-8 offset-md-2">
                  <ul className="nav tab__button__wrap text-center">
                    <li className="nav-item">
                      <button
                        className={`single__tab__link ${
                          activeTab === "login"
                            ? "active common-background-color-across-app"
                            : ""
                        }`}
                        onClick={() => setActiveTab("login")}
                        type="button"
                      >
                        Login
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`single__tab__link ${
                          activeTab === "signup"
                            ? "active common-background-color-across-app"
                            : ""
                        }`}
                        onClick={() => setActiveTab("signup")}
                        type="button"
                      >
                        Sign up
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content tab__content__wrapper">
                  <div
                    className={`tab-pane fade ${
                      activeTab === "login" ? "active show" : ""
                    }`}
                  >
                    <div className="col-xl-8 col-md-8 offset-md-2">
                      <div className="loginarea__wraper">
                        <div className="login__heading">
                          <h5 className="login__title">Login</h5>
                          <p className="login__description">
                            Don't have an account yet?{" "}
                            <Link to="/login" onClick={toggleForm}>
                              Sign up for free
                            </Link>
                          </p>
                        </div>
                        <form method="POST" onSubmit={doLogin}>
                          <div className="login__form">
                            <label className="form__label">Username</label>
                            <input
                              className="common__login__input"
                              type="text"
                              placeholder="Username or Email"
                              value={loginData.username}
                              onChange={(e) =>
                                dispatchLogin({
                                  type: "username",
                                  value: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="login__form">
                            <label className="form__label">Password</label>
                            <div className="password-input-container">
                              <input
                                className="common__login__input"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={(e) =>
                                  dispatchLogin({
                                    type: "password",
                                    value: e.target.value,
                                  })
                                }
                              />
                              <i
                                className={`eye-icon icofont-eye-open ${
                                  showPassword ? "visible" : "hidden"
                                }`}
                                onClick={() => setShowPassword(!showPassword)}
                              ></i>
                            </div>
                          </div>
                          <div className="login__form d-flex justify-content-between flex-wrap gap-2">
                            <div className="form__check">
                              <input type="checkbox" />
                              <label>Remember me</label>
                            </div>
                            <div className="text-end login__form__link">
                              <Link to="/forgot-password">
                                Forgot your password?
                              </Link>
                            </div>
                          </div>
                          <div className="login__button">
                            {formStatus.isError && (
                              <div className="text-danger d-flex justify-content-center mb-2">
                                {formStatus.errMsg}
                              </div>
                            )}
                            <div className="d-flex justify-content-center">
                              <button
                                className="default__button"
                                disabled={formStatus?.isSubmitting}
                              >
                                {formStatus.isSubmitting && (
                                  <Spinner
                                    animation="border"
                                    role="status"
                                    size="sm"
                                    className="me-2"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </Spinner>
                                )}
                                Log In
                              </button>
                            </div>
                          </div>
                        </form>
                        <div className="login__social__option">
                          <div
                            style={{
                              marginTop: "20px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <GoogleLogin
                              onSuccess={(credentialResponse) => {
                                const decodedData = jwtDecode(
                                  credentialResponse.credential
                                );
                                console.log(decodedData);
                              }}
                              onError={() => {
                                console.log("Login Failed");
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeTab === "signup" ? "active show" : ""
                    }`}
                  >
                    <div className="col-xl-8 offset-md-2">
                      <div className="loginarea__wraper">
                        <div className="login__heading">
                          <h5 className="login__title">Sing Up</h5>
                          <p className="login__description">
                            Already have an account?{" "}
                            <Link to="/login" onClick={toggleForm}>
                              Login
                            </Link>
                          </p>
                        </div>
                        <Register />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
