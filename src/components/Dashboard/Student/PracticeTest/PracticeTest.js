import React, { useEffect, useState } from "react";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import DSNavBar from "../DSNavBar/DSNavBar";
import DSSidebar from "../DSSideBar/DSSideBar";
import Footer from "../../../Footer/Footer";
import ajaxCall from "../../../../helpers/ajaxCall";
import ReadingTest from "./ReadingTest";
import ListeningTest from "./ListeningTest";
import WritingTest from "./WritingTest";
import SpeakingTest from "./SpeakingTest";

const PracticeTest = () => {
  const [readingData, setReadingData] = useState([]);
  const [readingName, setReadingName] = useState("");
  const [listeningData, setListeningData] = useState([]);
  const [listeningName, setListeningName] = useState("");
  const [speakingData, setSpeakingData] = useState([]);
  const [speakingName, setSpeakingName] = useState("");
  const [writingData, setWritingData] = useState([]);
  const [writingName, setWritingName] = useState("");

  const getPracticeTestData = async () => {
    try {
      const response = await ajaxCall(
        `/createexamview/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        console.log("--------->", response?.data);
        setReadingData(response?.data?.[0]?.IELTS?.Reading);
        setReadingName(response?.data?.[0]?.IELTS?.Name);
        setSpeakingData(response?.data?.[1]?.IELTS?.Speaking);
        setSpeakingName(response?.data?.[1]?.IELTS?.Name);
        setWritingData(response?.data?.[2]?.IELTS?.Writing);
        setWritingName(response?.data?.[2]?.IELTS?.Name);
        setListeningData(response?.data?.[3]?.IELTS?.Listening);
        setListeningName(response?.data?.[3]?.IELTS?.Name);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPracticeTestData();
  }, []);

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
                        <h4>Practice Tests</h4>
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
                                Reading
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
                                Writing
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__three"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabindex="-1"
                              >
                                Listening
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__four"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabindex="-1"
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
                            <ReadingTest
                              readingName={readingName}
                              readingData={readingData}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__two"
                            role="tabpanel"
                            aria-labelledby="projects__two"
                          >
                            <WritingTest
                              writingName={writingName}
                              writingData={writingData}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__three"
                            role="tabpanel"
                            aria-labelledby="projects__three"
                          >
                            <ListeningTest
                              listeningName={listeningName}
                              listeningData={listeningData}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__four"
                            role="tabpanel"
                            aria-labelledby="projects__four"
                          >
                            <SpeakingTest
                              speakingName={speakingName}
                              speakingData={speakingData}
                            />
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

export default PracticeTest;
