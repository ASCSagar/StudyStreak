import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Reading from "./Reading";
import Listening from "./Listening";
import Writing from "./Writing";
import Speaking from "./Speaking";
import BuyCourse from "../BuyCourse/BuyCourse";

const PracticeTest = () => {
  const { state: { count } = {} } = useLocation();
  const [readingData, setReadingData] = useState([]);
  const [listeningData, setListeningData] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);
  const [writingData, setWritingData] = useState([]);
  const { practice_test_count } = count;

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/createexamview/`,
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
          setReadingData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Reading"
            )
          );
          setSpeakingData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Speaking"
            )
          );
          setWritingData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Writing"
            )
          );
          setListeningData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Listening"
            )
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Practice Test</h4>
                    </div>
                    {practice_test_count === "" ? (
                      <BuyCourse message="No Practice Test Available , Please Buy a Course !!" />
                    ) : (
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
                                className="single__tab__link active common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                                aria-selected="true"
                                role="tab"
                              >
                                Reading
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__two"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabIndex="-1"
                              >
                                Writing
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__three"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabIndex="-1"
                              >
                                Listening
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__four"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabIndex="-1"
                              >
                                Speaking
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
                            <Reading readingData={readingData} />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__two"
                            role="tabpanel"
                            aria-labelledby="projects__two"
                          >
                            <Writing writingData={writingData} />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__three"
                            role="tabpanel"
                            aria-labelledby="projects__three"
                          >
                            <Listening listeningData={listeningData} />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__four"
                            role="tabpanel"
                            aria-labelledby="projects__four"
                          >
                            <Speaking speakingData={speakingData} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
