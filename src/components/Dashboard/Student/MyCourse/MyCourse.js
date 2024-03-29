import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";

const MyCourse = () => {
  const { state: { enrolledCourse } = {} } = useLocation();
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`, { state: { enrolledCourse } });
  };

  const handleStartCourseClicked = (courseId) => {
    navigate(`/courseLessons/${courseId}`);
  };

  const getDuration = (lessons) => {
    return lessons?.reduce(
      (totalDuration, lesson) =>
        totalDuration + parseInt(lesson?.Lesson_Duration),
      0
    );
  };

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
                      <h4>Courses</h4>
                    </div>
                    <div className="row">
                      {enrolledCourse?.length > 0 ? (
                        enrolledCourse?.map((course) => (
                          <div
                            key={course?.id}
                            className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                            data-aos="fade-up"
                          >
                            <div className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling">
                              <div className="gridarea__img mt-2">
                                <img
                                  src={course?.Course_Thumbnail}
                                  alt={course?.Course_Title}
                                  className="course__image"
                                />
                              </div>
                              <div className="gridarea__content d-flex flex-column justify-content-between">
                                <div
                                  className="course__pointer"
                                  onClick={() => handleCourseClick(course?.id)}
                                >
                                  <div className="gridarea__heading">
                                    <h3>{course?.Course_Title}</h3>
                                  </div>
                                  <div className="gridarea__list">
                                    <ul className="ps-0">
                                      <li>
                                        <i className="icofont-book-alt"></i>{" "}
                                        {course?.lessons?.length} Lessons
                                      </li>
                                      <li>
                                        <i className="icofont-clock-time"></i>{" "}
                                        {getDuration(course?.lessons)} Minutes
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                  <button
                                    onClick={() =>
                                      handleStartCourseClicked(course?.id)
                                    }
                                    className="default__button mb-2"
                                  >
                                    Start Lessons
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <BuyCourse message="No Courses Available , Please Buy a Course !!" />
                      )}
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

export default MyCourse;
