import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";

const intialSpeakingField = {
  no_of_questions: "",
  difficulty_level: "Easy",
  exam_name: "",
  block_type: "Mock Test",
  block_threshold: "",
  passage: "",
  exam_type: "Speaking",
  answers: [],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerSpeaking = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const ExamSpeaking = ({ category }) => {
  const [SpeakingData, dispatchSpeakingData] = useReducer(
    reducerSpeaking,
    intialSpeakingField
  );

  const [formStatus, setFormStatus] = useState(initialSubmit);

  const navigate = useNavigate();

  const handlePassageChange = (event, editor) => {
    const data = editor.getData();
    dispatchSpeakingData({
      type: "passage",
      value: data,
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
    if (!SpeakingData.no_of_questions) {
      setFormError("No of Question is Required");
      return false;
    }
    if (!SpeakingData.difficulty_level) {
      setFormError("Difficulty Level is Required");
      return false;
    }
    if (!SpeakingData.exam_name) {
      setFormError("Block Name is Required");
      return false;
    }
    if (!SpeakingData.block_type) {
      setFormError("Block Type is Required");
      return false;
    }
    if (!SpeakingData.block_threshold) {
      setFormError("Block Threshold is Required");
      return false;
    }
    if (!SpeakingData.passage) {
      setFormError("Passage is Required");
      return false;
    }

    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const submitSpeakingExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      block_threshold: SpeakingData.block_threshold,
      block_type: SpeakingData.block_type,
      difficulty_level: SpeakingData.difficulty_level,
      exam_name: SpeakingData.exam_name,
      exam_type: SpeakingData.exam_type,
      no_of_questions: SpeakingData.no_of_questions,
      passage: SpeakingData.passage,
      answers: SpeakingData.answers,
      exam_category: category,
    };

    try {
      const response = await ajaxCall("/exam-blocks/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        toast.success("Speaking Exam Create SuccessFully");
        navigate("/admin-exam");
      } else if (response.status === 400) {
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

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="theme__shadow__circle"></div>
        <div className="theme__shadow__circle shadow__right"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-12 create__course__acc">
              <div className="create__course__accordion__wraper">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Question Details
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
                                  <label>Number of Question</label>
                                  <input
                                    type="number"
                                    placeholder="Number of Question"
                                    value={SpeakingData.no_of_questions}
                                    onChange={(e) =>
                                      dispatchSpeakingData({
                                        type: "no_of_questions",
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 ">
                              <div className="dashboard__select__heading">
                                <span>Difficulty Level</span>
                              </div>
                              <div className="dashboard__selector">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={SpeakingData.difficulty_level}
                                  onChange={(e) =>
                                    dispatchSpeakingData({
                                      type: "difficulty_level",
                                      value: e.target.value,
                                    })
                                  }
                                >
                                  <option value="Easy">Easy</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Hard">Hard</option>
                                </select>
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
                        Block Details
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
                              <div className="dashboard__form__wraper">
                                <div className="dashboard__form__input">
                                  <label>Block Name</label>
                                  <input
                                    type="text"
                                    placeholder="Block Name"
                                    value={SpeakingData.exam_name}
                                    onChange={(e) =>
                                      dispatchSpeakingData({
                                        type: "exam_name",
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                              <div className="dashboard__select__heading">
                                <span>Block Type</span>
                              </div>
                              <div className="dashboard__selector">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={SpeakingData.block_type}
                                  onChange={(e) =>
                                    dispatchSpeakingData({
                                      type: "block_type",
                                      value: e.target.value,
                                    })
                                  }
                                >
                                  <option value="Mock Test">Mock Test</option>
                                  <option value="Assignments">
                                    Assignment
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>Block Threshold</label>
                                    <input
                                      type="number"
                                      placeholder="Block Threshold"
                                      value={SpeakingData.block_threshold}
                                      onChange={(e) =>
                                        dispatchSpeakingData({
                                          type: "block_threshold",
                                          value: e.target.value,
                                        })
                                      }
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
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Passage
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="col-xl-12 col-lg-6 col-md-6 col-12 mb-4">
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Passage</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={SpeakingData.passage}
                                onChange={handlePassageChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create__course__bottom__button">
                {formStatus.isError && (
                  <div className="text-danger mb-2">{formStatus.errMsg}</div>
                )}
                <button
                  className="default__button"
                  onClick={submitSpeakingExam}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSpeaking;
