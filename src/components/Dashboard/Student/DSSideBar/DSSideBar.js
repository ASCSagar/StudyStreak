import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";

const DSSidebar = () => {
  const authData = useSelector((state) => state.authStore);
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [count, setCount] = useState([]);
  
  const location = useLocation().pathname;
  const { logoutUser } = useCheckAuth();

  const getEnrolledCourses = async () => {
    try {
      const response = await ajaxCall(
        "/userwisepackagewithcourseid/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setCount(response?.data?.student_packages?.[0]?.package);
        setEnrolledCourse(response?.data?.student_packages?.[0]?.course);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-12">
        <div className="dashboard__inner sticky-top">
          <div className="dashboard__nav__title">
            <h6>Welcome, Micle Obema</h6>
          </div>
          <div className="dashboard__nav">
            <ul>
              <li>
                <Link
                  className={location === "/studentDashboard/" ? "active" : ""}
                  to="/studentDashboard/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-home"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className={location === "/studentProfile" ? "active" : ""}
                  to="/studentProfile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  className={location === "/studentMyCourse" ? "active" : ""}
                  to="/studentMyCourse"
                  state={{ enrolledCourse }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-courses"
                  >
                    <rect x="2" y="10" width="6" height="8"></rect>
                    <rect x="16" y="10" width="6" height="8"></rect>

                    <circle cx="6" cy="5" r="2"></circle>
                    <circle cx="12" cy="5" r="2"></circle>
                    <circle cx="18" cy="5" r="2"></circle>
                  </svg>
                  My Course
                </Link>
              </li>

              <li>
                <Link to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Practice Test</span>
                  <div>(Coming Soon)</div>
                  <span className="dashboard__label">
                    {count?.practice_test_count}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Full Length Test </span>
                  <div>(Coming Soon)</div>
                  <span className="dashboard__label">
                    {count?.full_length_test_count}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Speaking Test </span>
                  <div>(Coming Soon)</div>
                  <span className="dashboard__label">
                    {count?.speaking_test_count}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className={location === "/studentLiveClasses" ? "active" : ""}
                  to="/studentLiveClasses"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-bookmark"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Live Classes
                </Link>
              </li>
              <li>
                <Link to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shopping-bag"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Group Doubt Solving </span>
                  <div>(Coming Soon)</div>
                  <span className="dashboard__label">
                    {count?.group_doubt_solving_count}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-bookmark"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>One To One Doubt Solving</span>
                  <div>(Coming Soon)</div>
                  <span className="dashboard__label">
                    {count?.one_to_one_doubt_solving_count}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className={location === "/studentSettings" ? "active" : ""}
                  to="/studentSettings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-bookmark"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={logout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-volume-1"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard__inner sticky-top mt-4">
          <div className="dashboard__nav__title">
            <h6 className="mb-2">Upcoming Live Class</h6>
          </div>
          <hr />
          <div className="dashboard__nav">
            <div>Writing Task 1 - Letter Writing</div>
            <div className="d-flex justify-content-between">
              <div>Tommorrow, 06:00 PM</div>
              <div>Add Reminder</div>
            </div>
          </div>
        </div>
        <div className="dashboard__inner sticky-top mt-4">
          <div className="dashboard__nav__title">
            <h6 className="mb-2">Next Lesson Due</h6>
          </div>
          <hr />
          <div className="dashboard__nav">
            <div>Writing Task 2 - Eassay Writing</div>
            <div className="d-flex justify-content-between">
              <div>Lesson No. 7</div>
              <div>Take me to the lesson</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DSSidebar;
