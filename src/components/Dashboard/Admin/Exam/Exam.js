import React, { useEffect, useState } from "react";
import Footer from "../../../Footer/Footer";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import DANavBar from "../DANavBar/DANavBar";
import DASideBar from "../DASideBar/DASideBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExamWriting from "../../../Exam-Create/ExamWriting";
import ExamReading from "../../../Exam-Create/ExamReading";
import ExamListening from "../../../Exam-Create/ExamListening";
import ExamSpeaking from "../../../Exam-Create/ExamSpeaking";
import ViewExam from "./ViewExam";

const exams = [
  {
    name: "IELTS",
    link: "/admin-exam/ielts",
    isDisabled: false,
  },
  {
    name: "TOEFL",
    subMenu: [],
    link: "/admin-exam/toefl",
    isDisabled: true,
  },
  {
    name: "PTE",
    subMenu: [],
    link: "/admin-exam/pte",
    isDisabled: true,
  },
  {
    name: "DUOLINGO",
    subMenu: [],
    link: "/admin-exam/duolingo",
    isDisabled: true,
  },
  {
    name: "GRE",
    subMenu: [],
    link: "/admin-exam/gre",
    isDisabled: true,
  },
  {
    name: "GMAT",
    subMenu: [],
    link: "/admin-exam/gmat",
    isDisabled: true,
  },
];

const examTypes = [
  {
    name: "Reading",
    link: "/admin-exam/ielts/exam-reading",
  },
  {
    name: "Listening",
    link: "/admin-exam/ielts/exam-listening",
  },
  {
    name: "Writing",
    link: "/admin-exam/ielts/exam-writing",
  },
  {
    name: "Speaking",
    link: "/admin-exam/ielts/exam-speaking",
  },
];

const Exam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [screenContent, setScreenContent] = useState({
    exam: "",
    examType: "",
    examForm: "",
  });

  useEffect(() => {
    const examType = location.pathname.split("/")[2];
    const examForm = location.pathname.split("/")[3];
    if (!examType && !examForm) {
      setScreenContent({
        exam: "Exam",
        examType: "",
        examForm: "",
      });
    } else if (examType && !examForm) {
      setScreenContent({
        exam: "Exam",
        examType: examType,
        examForm: "",
      });
    } else if (examType && examForm) {
      setScreenContent({
        exam: "Exam",
        examType: examType,
        examForm: examForm,
      });
    }
  }, [location]);

  const handleNavigate = (link) => {
    if (link !== "") navigate(link);
  };

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <DANavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DASideBar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Exam</h4>
                        <nav aria-label="breadcrumb">
                          <ol class="breadcrumb">
                            {screenContent.exam && (
                              <li className="breadcrumb-item">
                                <Link to="/admin-exam">
                                  {screenContent.exam}
                                </Link>
                              </li>
                            )}
                            {screenContent.examType && (
                              <li className="breadcrumb-item">
                                <Link
                                  to={`/admin-exam/${screenContent.examType}`}
                                >
                                  {screenContent.examType}
                                </Link>
                              </li>
                            )}
                            {screenContent.examForm && (
                              <li className="breadcrumb-item">
                                {screenContent.examForm}
                              </li>
                            )}
                          </ol>
                        </nav>
                      </div>
                      <div className="row">
                        <div
                          className="col-xl-12 aos-init aos-animate"
                          data-aos="fade-up"
                        >
                          <ul
                            className="nav  about__button__wrap dashboard__button__wrap"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link active"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                                aria-selected="true"
                                role="tab"
                              >
                                Create Exam
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__two"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabindex="-1"
                              >
                                View Exam
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className="tab-content tab__content__wrapper aos-init aos-animate"
                          id="myTabContent"
                          data-aos="fade-up"
                        >
                          <div
                            className="tab-pane fade active show"
                            id="projects__one"
                            role="tabpanel"
                            aria-labelledby="projects__one"
                          >
                            <div className="row">
                              {!screenContent.examType &&
                                !screenContent.examForm &&
                                exams.map((exam, index) => (
                                  <div
                                    style={{
                                      cursor: "pointer",
                                      pointerEvents: exam.isDisabled
                                        ? "none"
                                        : "",
                                    }}
                                    className="col-xl-3 col-lg-6 col-md-12 col-12"
                                    onClick={() => handleNavigate(exam.link)}
                                  >
                                    <div className="dashboard__single__counter">
                                      <div className="counterarea__text__wraper justify-content-center">
                                        <div className="counter__content__wraper">
                                          <p>{exam.name}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              {screenContent.examType &&
                                !screenContent.examForm &&
                                examTypes.map((exam) => (
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="col-xl-3 col-lg-6 col-md-12 col-12"
                                    onClick={() => handleNavigate(exam.link)}
                                  >
                                    <div className="dashboard__single__counter">
                                      <div className="counterarea__text__wraper justify-content-center">
                                        <div className="counter__content__wraper">
                                          <p>{exam.name}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              {(screenContent.examType &&
                                screenContent.examForm === "exam-reading" && (
                                  <ExamReading />
                                )) ||
                                (screenContent.examForm ===
                                  "exam-listening" && <ExamListening />) ||
                                (screenContent.examForm === "exam-writing" && (
                                  <ExamWriting />
                                )) ||
                                (screenContent.examForm === "exam-speaking" && (
                                  <ExamSpeaking />
                                ))}
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__two"
                            role="tabpanel"
                            aria-labelledby="projects__two"
                          >
                            <ViewExam />
                          </div>
                        </div>
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

export default Exam;