import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Tab from "../UI/Tab";

const intialReadingField = {
  no_of_questions: "10",
  difficulty_level: "Easy",
  exam_name: "",
  block_type: "Mock Test",
  block_threshold: "",
  passage: "",
  passage_image: "",
  question: "",
  exam_type: "",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerReading = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const tabs = [
  { name: "Questions Details" },
  { name: "Block Details" },
  { name: "Passage" },
];

const ExamReading = ({ category, examType }) => {
  const [readingData, dispatchReadingData] = useReducer(
    reducerReading,
    intialReadingField
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Questions Details");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  const handlePassageChange = (event, editor) => {
    const data = editor.getData();
    dispatchReadingData({
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
    if (!readingData.no_of_questions) {
      setFormError("No of Question is Required");
      return false;
    }
    if (!readingData.difficulty_level) {
      setFormError("Difficulty Level is Required");
      return false;
    }
    if (!readingData.exam_name) {
      setFormError("Block Name is Required");
      return false;
    }
    if (!readingData.block_type) {
      setFormError("Block Type is Required");
      return false;
    }
    if (!readingData.block_threshold) {
      setFormError("Block Threshold is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const handleOnNext = () => {
    if (!validateForm()) return;
    navigate("/exam-create", { state: { readingData, category, examType } });
  };

  return (
    <>
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className="tab-content tab__content__wrapper aos-init aos-animate">
        <div
          className={`tab-pane fade ${
            activeTab === "Questions Details" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Number of Question</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={readingData.no_of_questions}
                    onChange={(e) =>
                      dispatchReadingData({
                        type: "no_of_questions",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="10">10</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                  </select>
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
                  value={readingData.difficulty_level}
                  onChange={(e) =>
                    dispatchReadingData({
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
        <div
          className={`tab-pane fade ${
            activeTab === "Block Details" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Block Name</label>
                  <input
                    type="text"
                    placeholder="Block Name"
                    value={readingData.exam_name}
                    onChange={(e) =>
                      dispatchReadingData({
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
                  value={readingData.block_type}
                  onChange={(e) =>
                    dispatchReadingData({
                      type: "block_type",
                      value: e.target.value,
                    })
                  }
                >
                  <option value="Mock Test">Mock Test</option>
                  <option value="Assignments">Assignment</option>
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
                      value={readingData.block_threshold}
                      onChange={(e) =>
                        dispatchReadingData({
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
        <div
          className={`tab-pane fade ${
            activeTab === "Passage" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Passage Image</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      dispatchReadingData({
                        type: "passage_image",
                        value: e.target.files[0],
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Passage</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={readingData.passage}
                    onChange={handlePassageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create__course__bottom__button text-center">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
            <button className="default__button" onClick={handleOnNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamReading;
