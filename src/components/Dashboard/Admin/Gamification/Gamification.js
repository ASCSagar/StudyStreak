import React, { useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import CreateGamification from "./CreateGamification";
import ViewGamification from "./ViewGamification";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "View Gamification" }, { name: "Create Gamification" }];

const Gamification = () => {
  const [activeTab, setActiveTab] = useState("View Gamification");

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
                      <h4>Gamification</h4>
                    </div>
                    <div className="row">
                      <Tab
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                      />
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create Gamification"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <CreateGamification />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "View Gamification"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <ViewGamification key={activeTab} />
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

export default Gamification;