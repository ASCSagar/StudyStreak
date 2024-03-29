import React, { useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import CreateBatch from "./CreateBatch";
import ViewBatches from "./ViewBatches";

const Batch = () => {
  const [activeTab, setActiveTab] = useState("viewBatch");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DASideBar />
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Batch</h4>
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
                              className={`single__tab__link common-background-color-across-app ${
                                activeTab === "viewBatch" ? "active" : ""
                              }`}
                              onClick={() => handleTabChange("viewBatch")}
                            >
                              View Batch
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`single__tab__link common-background-color-across-app ${
                                activeTab === "createBatch" ? "active" : ""
                              }`}
                              onClick={() => handleTabChange("createBatch")}
                            >
                              Create Batch
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
                          className={`tab-pane fade ${
                            activeTab === "createBatch" ? "show active" : ""
                          }`}
                          id="projects__one"
                        >
                          <div className="row">
                            <CreateBatch />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "viewBatch" ? "show active" : ""
                          }`}
                          id="projects__one"
                        >
                          <div className="row">
                            <ViewBatches key={activeTab} />
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
    </div>
  );
};

export default Batch;
