import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "../../../../helpers/ajaxCall";
import RegularClassList from "./RegularClassList";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "Regular" }, { name: "Recoded Class" }];

const RegularClass = ({ selectedDateRange }) => {
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [regularClass, setRegularClass] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Regular");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const regularClassData = [];
        for (let i = 0; i < batchIds.length; i++) {
          const batchId = batchIds[i];
          const response = await ajaxCall(
            `/liveclass_listwithid_view/${batchId}/`,
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
          if (response?.status === 200) {
            setIsLoading(false);
            const data = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "Regular Class"
            );
            regularClassData.push(...data);
          } else {
            console.log("error");
          }
        }
        setRegularClass(regularClassData);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const regularClasses = () => {
    return regularClass.filter(({ start_time }) => {
      const classDate = moment(start_time).format("YYYY-MM-DD");
      const { startDate, endDate } = selectedDateRange?.[0];
      return (
        (!startDate || classDate >= moment(startDate).format("YYYY-MM-DD")) &&
        (!endDate || classDate <= moment(endDate).format("YYYY-MM-DD"))
      );
    });
  };

  return (
    <>
      <div>
        <div className="row">
          <Tab
            tabs={tabs}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
          <div className="tab-content tab__content__wrapper aos-init aos-animate">
            <div
              className={`tab-pane fade ${
                activeTab === "Regular" ? "show active" : ""
              }`}
            >
              <div className="row">
                <RegularClassList
                  isLoading={isLoading}
                  regularClass={regularClasses()}
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "Recoded Class" ? "show active" : ""
              }`}
            >
              <div className="row">
                <h5 className="text-center text-danger">Coming Soon....</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegularClass;
