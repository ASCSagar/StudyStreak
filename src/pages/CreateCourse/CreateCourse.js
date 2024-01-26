import React, { useReducer, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import SingleSelection from "../../components/UI/SingleSelect";
import SelectionBox from "../../components/UI/SelectionBox";
import { toast } from "react-toastify";

const initialCourseData = {
  Course_Title: "",
  course_identifier: "",
  Short_Description: "",
  Description: "",
  Category: "",
  Level: "",
  Language: "",
  tutor: [],
  tutorId: [],
  EnrollmentStartDate: "",
  EnrollmentEndDate: "",
  max_enrollments: "",
  faqs: "",
  course_type: "PRIVATE",
  course_delivery: "SELF-STUDY",
  primary_instructor: "1",
  Featured: false,
  Support_Available: false,
  is_active: false,
  Requirements: [],
  requirementId: [],
  Outcome: [],
  outcomeId: [],
  Course_Overview_Provider: "",
  Course_Overview_URL: "",
  Course_Thumbnail: "",
  SEO_Meta_Keywords: "",
  Meta_Description: "",
  lessons: [],
  lessonsId: [],
};

const reducerCreateCourse = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialCourseData;
  }
  if (
    action.type === "SEO_Meta_Keywords" ||
    action.type === "Meta_Description"
  ) {
    return {
      ...state,
      [action.type]: [action.value],
    };
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CreateCourse = () => {
  const [createCourseData, dispatchCreateCourse] = useReducer(
    reducerCreateCourse,
    initialCourseData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const resetReducerForm = () => {
    dispatchCreateCourse({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const validateForm = () => {
    if (!createCourseData.Course_Title) {
      setFormError("Course Title is Required");
      return false;
    }
    if (!createCourseData.Short_Description) {
      setFormError("Short Description is Required");
      return false;
    }
    if (!createCourseData.Description) {
      setFormError("Description is Required");
      return false;
    }
    if (!createCourseData.Category) {
      setFormError("Category is Required");
      return false;
    }
    if (!createCourseData.Level) {
      setFormError("Level is Required");
      return false;
    }
    if (!createCourseData.Language) {
      setFormError("Language is Required");
      return false;
    }
    if (!createCourseData.EnrollmentStartDate) {
      setFormError("Enrollment Start Date is Required");
      return false;
    }
    if (!createCourseData.EnrollmentEndDate) {
      setFormError("Enrollment End Date is Required");
      return false;
    }
    if (!createCourseData.primary_instructor) {
      setFormError("Primary Instructor is Required");
      return false;
    }
    if (!createCourseData.tutor) {
      setFormError("Tutor is Required");
      return false;
    }
    if (!createCourseData.max_enrollments) {
      setFormError("Max Enrollments is Required");
      return false;
    }
    if (!createCourseData.Course_Overview_Provider) {
      setFormError("Course Overview Provider is Required");
      return false;
    }
    if (!createCourseData.Course_Overview_URL) {
      setFormError("Course Overview URL is Required");
      return false;
    }
    if (!createCourseData.Course_Thumbnail) {
      setFormError("Course Thumbnail is Required");
      return false;
    }
    if (!createCourseData.SEO_Meta_Keywords) {
      setFormError("SEO Meta Keywords URL is Required");
      return false;
    }
    if (!createCourseData.Meta_Description) {
      setFormError("Meta Description is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const createCourse = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const formData = new FormData();

      formData.append("Course_Title", createCourseData.Course_Title);
      formData.append("course_identifier", createCourseData.course_identifier);
      formData.append("Short_Description", createCourseData.Short_Description);
      formData.append("Description", createCourseData.Description);
      formData.append("Category", createCourseData.Category);
      formData.append("Level", createCourseData.Level);
      formData.append("Language", createCourseData.Language);
      createCourseData.tutorId.forEach((id) => {
        formData.append(`tutor`, id);
      });
      formData.append(
        "EnrollmentStartDate",
        createCourseData.EnrollmentStartDate
      );
      formData.append("EnrollmentEndDate", createCourseData.EnrollmentEndDate);
      formData.append("max_enrollments", createCourseData.max_enrollments);
      formData.append("faqs", createCourseData.faqs);
      formData.append("course_type", createCourseData.course_type);
      formData.append("course_delivery", createCourseData.course_delivery);
      formData.append(
        "primary_instructor",
        createCourseData.primary_instructor
      );
      formData.append("Featured", createCourseData.Featured);
      formData.append("Support_Available", createCourseData.Support_Available);
      formData.append("is_active", createCourseData.is_active);
      createCourseData.requirementId.forEach((id) => {
        formData.append(`Requirements`, id);
      });
      createCourseData.outcomeId.forEach((id) => {
        formData.append(`Outcome`, id);
      });
      formData.append(
        "Course_Overview_Provider",
        createCourseData.Course_Overview_Provider
      );
      formData.append(
        "Course_Overview_URL",
        createCourseData.Course_Overview_URL
      );
      formData.append("Course_Thumbnail", createCourseData.Course_Thumbnail);
      formData.append("SEO_Meta_Keywords", createCourseData.SEO_Meta_Keywords);
      formData.append("Meta_Description", createCourseData.Meta_Description);
      createCourseData.lessonsId.forEach((id) => {
        formData.append(`lessons`, id);
      });

      const response = await ajaxCall(
        "/courselistview/",
        {
          method: "POST",
          body: formData,
          withCredentials: true,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        toast.success("Course Created Successfully");
      } else if (response.status === 400 || response.status === 404) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreateCourse({
        type: fieldName,
        value: val,
      });
      dispatchCreateCourse({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreateCourse({
      type: fieldName,
      value: val,
    });
    dispatchCreateCourse({
      type: proFieldName,
      value: newValIds,
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-xl-8 col-lg-8 col-md-12 col-12"
            style={{ width: "-webkit-fill-available" }}
          >
            <div className="create__course__accordion__wraper">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item w-auto">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Course Details
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Course Title</label>
                                <input
                                  type="text"
                                  placeholder="Course Title"
                                  value={createCourseData.Course_Title}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "Course_Title",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Course Identifire</label>
                                <input
                                  type="text"
                                  placeholder="Course Identifire"
                                  value={createCourseData.course_identifier}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "course_identifier",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Short Description</label>
                                <textarea
                                  type="text"
                                  placeholder="Short Description"
                                  value={createCourseData.Short_Description}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "Short_Description",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Description</label>
                                <textarea
                                  type="text"
                                  placeholder="Description"
                                  value={createCourseData.Description}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "Description",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                            <div className="dashboard__select__heading">
                              <span>Category</span>
                            </div>
                            <div className="dashboard__selector">
                              <SingleSelection
                                value={createCourseData.Category}
                                onChange={(val) => {
                                  dispatchCreateCourse({
                                    type: "Category",
                                    value: val,
                                  });
                                }}
                                url="/categoryview/"
                                objKey={["name"]}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                            <div className="dashboard__select__heading">
                              <span>Level</span>
                            </div>
                            <div className="dashboard__selector">
                              <SingleSelection
                                value={createCourseData.Level}
                                onChange={(val) => {
                                  dispatchCreateCourse({
                                    type: "Level",
                                    value: val,
                                  });
                                }}
                                url="/levelView/"
                                objKey={["name"]}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                            <div className="dashboard__select__heading">
                              <span>Language</span>
                            </div>
                            <div className="dashboard__selector">
                              <SingleSelection
                                value={createCourseData.Language}
                                onChange={(val) => {
                                  dispatchCreateCourse({
                                    type: "Language",
                                    value: val,
                                  });
                                }}
                                url="/languageview/"
                                objKey={["name"]}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                            <div className="dashboard__select__heading">
                              <span>Tutor</span>
                            </div>
                            <div className="dashboard__selector">
                              <SelectionBox
                                value={createCourseData.tutor}
                                onSelect={addedSelectVal.bind(
                                  null,
                                  "tutor",
                                  "tutorId",
                                  false
                                )}
                                url="/getusers/"
                                name="username"
                                objKey={["username"]}
                                multiple={true}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Enrollment StartDate</label>
                                <input
                                  type="date"
                                  value={createCourseData.EnrollmentStartDate}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "EnrollmentStartDate",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Enrollment EndDate</label>
                                <input
                                  type="date"
                                  value={createCourseData.EnrollmentEndDate}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "EnrollmentEndDate",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Max Enrollments</label>
                                <input
                                  type="number"
                                  value={createCourseData.max_enrollments}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "max_enrollments",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>FAQS</label>
                                <textarea
                                  type="text"
                                  value={createCourseData.faqs}
                                  onChange={(e) =>
                                    dispatchCreateCourse({
                                      type: "faqs",
                                      value: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__select__heading">
                              <span>Course Type</span>
                            </div>
                            <div className="dashboard__selector">
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={createCourseData.course_type}
                                onChange={(e) =>
                                  dispatchCreateCourse({
                                    type: "course_type",
                                    value: e.target.value,
                                  })
                                }
                              >
                                <option value="PRIVATE">Private</option>
                                <option value="PUBLIC">Public</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__select__heading">
                              <span>Course Delivery</span>
                            </div>
                            <div className="dashboard__selector">
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={createCourseData.course_delivery}
                                onChange={(e) => {
                                  dispatchCreateCourse({
                                    type: "course_delivery",
                                    value: e.target.value,
                                  });
                                }}
                              >
                                <option value="SELF-STUDY">
                                  Self-Study Course
                                </option>
                                <option value="TAUGHT">Taught Course</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__select__heading">
                              <span>Primary Instructor</span>
                            </div>
                            <div className="dashboard__selector">
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={createCourseData.primary_instructor}
                                onChange={(e) => {
                                  dispatchCreateCourse({
                                    type: "primary_instructor",
                                    value: e.target.value,
                                  });
                                }}
                              >
                                <option value="1">Student</option>
                                <option value="2">Admin</option>
                              </select>
                            </div>
                          </div>
                          <div className="d-flex flex-wrap gap-4 mt-4">
                            <div className="form__check">
                              <label>Featured</label>{" "}
                              <input
                                type="checkbox"
                                value={createCourseData.Featured}
                                onChange={(e) => {
                                  dispatchCreateCourse({
                                    type: "Featured",
                                    value: e.target.checked,
                                  });
                                }}
                              />
                            </div>
                            <div className="form__check">
                              <label>Support Available</label>{" "}
                              <input
                                type="checkbox"
                                value={createCourseData.Support_Available}
                                onChange={(e) => {
                                  dispatchCreateCourse({
                                    type: "Support_Available",
                                    value: e.target.checked,
                                  });
                                }}
                              />
                            </div>
                            <div className="form__check">
                              <label>Is Active</label>{" "}
                              <input
                                type="checkbox"
                                value={createCourseData.is_active}
                                onChange={(e) => {
                                  dispatchCreateCourse({
                                    type: "is_active",
                                    value: e.target.checked,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Requirements & Outcome
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__select__heading">
                              <span>Requirements</span>
                            </div>
                            <div className="dashboard__selector">
                              <SelectionBox
                                value={createCourseData.Requirements}
                                onSelect={addedSelectVal.bind(
                                  null,
                                  "Requirements",
                                  "requirementId",
                                  false
                                )}
                                url="/requirementsview/"
                                name="description"
                                objKey={["description"]}
                                multiple={true}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__select__heading">
                              <span>Outcome</span>
                            </div>
                            <div className="dashboard__selector">
                              <SelectionBox
                                value={createCourseData.Outcome}
                                onSelect={addedSelectVal.bind(
                                  null,
                                  "Outcome",
                                  "outcomeId",
                                  false
                                )}
                                url="/outcomesview/"
                                name="description"
                                objKey={["description"]}
                                multiple={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Course Media
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Course Overview Provider</label>
                                <input
                                  type="text"
                                  placeholder="Course Overview Provider"
                                  value={
                                    createCourseData.Course_Overview_Provider
                                  }
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "Course_Overview_Provider",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Course Overview URL</label>
                                <input
                                  type="text"
                                  placeholder="Course Overview URL"
                                  value={createCourseData.Course_Overview_URL}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "Course_Overview_URL",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Course Thumbnail</label>
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "Course_Thumbnail",
                                      value: e.target.files[0],
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Course SEO
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>SEO Meta Keywords</label>
                                <input
                                  type="text"
                                  placeholder="SEO Meta Keywords"
                                  value={createCourseData.SEO_Meta_Keywords[0]}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "SEO_Meta_Keywords",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Meta Description</label>
                                <input
                                  type="text"
                                  placeholder="Meta Description"
                                  value={createCourseData.Meta_Description[0]}
                                  onChange={(e) => {
                                    dispatchCreateCourse({
                                      type: "Meta_Description",
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Lessons
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                          <div className="dashboard__select__heading">
                            <span>Lessons</span>
                          </div>
                          <div className="dashboard__selector">
                            <SelectionBox
                              value={createCourseData.lessons}
                              onSelect={addedSelectVal.bind(
                                null,
                                "lessons",
                                "lessonsId",
                                false
                              )}
                              url="/lssonview/"
                              name="Lesson_Title"
                              objKey={["Lesson_Title"]}
                              multiple={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-6 col-12">
                <div className="create__course__bottom__button">
                  {formStatus.isError ? (
                    <div className="text-danger mb-2">{formStatus.errMsg}</div>
                  ) : (
                    <div className="text-success mb-2">{formStatus.errMsg}</div>
                  )}
                  <button className="default__button" onClick={createCourse}>
                    Create Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
