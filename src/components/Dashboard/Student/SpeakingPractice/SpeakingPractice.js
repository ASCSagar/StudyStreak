import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";
import DateRange from "../../../UI/DateRangePicker";
import BuyCourse from "../BuyCourse/BuyCourse";
import UpcomingClass from "../Classes/UpcomingClass";
import ClassList from "../Classes/ClassList";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "Upcoming" }, { name: "Available Slot" }];

const SpeakingPractice = ({ sepakingCount = "" }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const { studentId, solvingClassBook, count } = useLocation()?.state || {};
  const [speakingSolvingClass, setSpeakingSolvingClass] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { speaking_practice_count } = count || sepakingCount;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEnrollNow = async (Id) => {
    const data = JSON.stringify({
      live_class_id: Id,
      student_id: studentId,
    });
    try {
      const response = await ajaxCall(
        `/enroll-students-in-live-class/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Slot Booked Successfully");
        navigate("/studentLiveClasses");
      } else if (response.status === 400) {
        toast.error(response?.data?.Message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const bookCount = async (Id) => {
    try {
      const response = await ajaxCall(
        `/add-bookslot/${Id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
        },
        8000
      );
      if (response.status === 200) {
        handleEnrollNow(Id);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const speakingClass = [];
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
            const speakingData = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "Speaking-Practice"
            );
            speakingClass.push(...speakingData);
          } else {
            console.log("error");
          }
        }
        setSpeakingSolvingClass(speakingClass);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange([ranges.selection]);
  };

  const joinNow = (zoom_meeting) => {
    window.open(zoom_meeting, "__blank");
  };

  const isWithin5Minutes = (startTime) => {
    const currentTime = moment();
    const classStartTime = moment(startTime);
    const difference = classStartTime.diff(currentTime, "milliseconds");
    return difference >= 0 && difference <= 5 * 60 * 1000;
  };

  const speakingClasses = () => {
    return speakingSolvingClass?.filter(({ start_time }) => {
      const classDate = moment(start_time).format("YYYY-MM-DD");
      const { startDate, endDate } = selectedDateRange[0];
      return (
        (!startDate || classDate >= moment(startDate).format("YYYY-MM-DD")) &&
        (!endDate || classDate <= moment(endDate).format("YYYY-MM-DD"))
      );
    });
  };

  const speackingClasses = speakingClasses()?.filter((item) =>
    solvingClassBook?.some((index) => index.id === item.id)
  );

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const speakingPracticeClasses = speakingClasses()?.filter(
    (item) => !bookClass?.includes(item?.id)
  );

  return (
    <>
      {pathname === "/speakingSolving" ? (
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
                          <h4>Speaking Practice</h4>
                          <h6>
                            Your Speaking Practice Class Schedule{" "}
                            <i
                              className="icofont-calendar one_to_one_icon"
                              onClick={() => setIsModalOpen(true)}
                            ></i>
                          </h6>
                        </div>
                        {speaking_practice_count === "" ? (
                          <BuyCourse message="No Speaking Practice Class Available, Please Buy a Course !!" />
                        ) : (
                          <div className="row">
                            <Tab
                              tabs={tabs}
                              activeTab={activeTab}
                              handleTabChange={handleTabChange}
                            />
                            <div className="tab-content tab__content__wrapper aos-init aos-animate">
                              <div
                                className={`tab-pane fade ${
                                  activeTab === "Upcoming" ? "show active" : ""
                                }`}
                              >
                                <div className="row">
                                  <UpcomingClass
                                    joinNow={joinNow}
                                    isWithin5Minutes={isWithin5Minutes}
                                    classes={speackingClasses}
                                    message="No Upcomming Speaking Practice Classes Available Today !! , Please Schedule Your Classes."
                                  />
                                </div>
                              </div>
                              <div
                                className={`tab-pane fade ${
                                  activeTab === "Available Slot"
                                    ? "show active"
                                    : ""
                                }`}
                              >
                                <div className="row">
                                  <ClassList
                                    classes={speakingPracticeClasses}
                                    bookCount={bookCount}
                                    message="No Speaking Practice Classes Available Today !! , Please Schedule Your Classes."
                                  />
                                </div>
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
      ) : (
        <div>
          <div className="live__class__schedule_header">
            <h6>
              Your Speaking Practice Class Schedule{" "}
              <i
                className="icofont-calendar one_to_one_icon"
                onClick={() => setIsModalOpen(true)}
              ></i>
            </h6>
          </div>
          <div>
            {speaking_practice_count === "" ? (
              <BuyCourse message="No Speaking Practice Class Available, Please Buy a Course !!" />
            ) : (
              <div className="row">
                <Tab
                  tabs={tabs}
                  activeTab={activeTab}
                  handleTabChange={handleTabChange}
                />
                <div className="tab-content tab__content__wrapper aos-init aos-animate">
                  <div
                    className={`tab-pane fade ${
                      activeTab === "Upcoming" ? "show active" : ""
                    }`}
                  >
                    <div className="row">
                      <UpcomingClass
                        joinNow={joinNow}
                        isWithin5Minutes={isWithin5Minutes}
                        classes={speackingClasses}
                        message="No Upcomming Speaking Practice Classes Available Today !! , Please Schedule Your Classes."
                      />
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeTab === "Available Slot" ? "show active" : ""
                    }`}
                  >
                    <div className="row">
                      <ClassList
                        classes={speakingPracticeClasses}
                        bookCount={bookCount}
                        message="No Speaking Practice Classes Available Today !! , Please Schedule Your Classes."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <SmallModal
        size="lg"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Speaking Practice class schedule"
        footer={
          <button
            className="default__button"
            onClick={() => setIsModalOpen(false)}
          >
            Apply
          </button>
        }
      >
        <DateRange
          selectedRange={selectedDateRange}
          onChange={handleDateRangeChange}
        />
      </SmallModal>
    </>
  );
};

export default SpeakingPractice;
