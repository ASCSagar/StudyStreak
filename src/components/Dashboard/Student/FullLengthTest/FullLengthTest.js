import React, { useEffect, useState } from "react";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import DSNavBar from "../DSNavBar/DSNavBar";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Footer from "../../../Footer/Footer";
import { Link } from "react-router-dom";

const difficultLevelTabs = ["Easy", "Medium", "Hard"];

const FullLengthTest = () => {
  const [fullLengthTestData, setFullLengthTestData] = useState([]);
  const [difficulty_level, setDifficultyLevel] = useState("Easy");

  const handleDifficultyLevel = (e) => {
    setDifficultyLevel(e.target.innerHTML);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/get/flt/?difficulty_level=${difficulty_level}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setFullLengthTestData([...response.data]);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [difficulty_level]);

  const handleFullLengthTest = (id) => {
    window.open(`/fulllength-live-exam/${id}`, "_blank");
  };

  const renderTestCards = (
    <div className="row">
      {fullLengthTestData?.map(
        ({ id, exam_name, no_of_questions, exam_type }, index) => (
          <div
            className="col-lg-4 col-md-6 col-12"
            data-aos="fade-up"
            key={index}
          >
            <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid ">
              <div className="gridarea__content ">
                <div className="gridarea__heading">
                  <h3 className="text-center">IELTS</h3>
                </div>
                <div className="gridarea__heading">
                  <h3 className="text-center">Full Length Test </h3>
                </div>
                <div className="zoom__meeting__id">
                  <p>Reading, Writing, Listening, Speaking</p>
                </div>
                <div className="zoom__meeting__id">
                  <p>2.5 Hours</p>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="default__button"
                    onClick={() => handleFullLengthTest(id)}
                  >
                    Take Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Full Length Test</h4>
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
                            {difficultLevelTabs.map((tab, index) => (
                              <li
                                className="nav-item"
                                role="presentation"
                                key={index}
                              >
                                <button
                                  className={`single__tab__link ${
                                    tab === difficulty_level ? "active" : ""
                                  }`}
                                  data-bs-toggle="tab"
                                  data-bs-target={`#projects__${tab}`}
                                  type="button"
                                  aria-selected="true"
                                  role="tab"
                                  onClick={handleDifficultyLevel}
                                >
                                  {tab}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div
                          className="tab-content tab__content__wrapper aos-init aos-animate"
                          id="myTabContent"
                          data-aos="fade-up"
                        >
                          {difficultLevelTabs.map((test, index) => (
                            <div
                              className={`tab-pane fade ${
                                test === difficulty_level ? "show active" : ""
                              }`}
                              id={`projects__${test}`}
                              role="tabpanel"
                              key={index}
                            >
                              <div className="row">{renderTestCards}</div>
                            </div>
                          ))}
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

export default FullLengthTest;
