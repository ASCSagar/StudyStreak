import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../../helpers/ajaxCall";
import Tab from "../../UI/Tab";

const intialPT = {
  Name: "",
  difficulty_level: "Easy",
  exam_test: "Practice",
  Reading: [],
  Writing: [],
  Listening: [],
  Speaking: [],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerPT = (state, action) => {
  if (action.type === "reset") {
    return action.payload || intialPT;
  }
  return { ...state, [action.type]: action.value };
};

const tabs = [{ name: "PT Details" }, { name: "PT Content" }];

const PT = ({ type }) => {
  const [exams, setExams] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [createPT, dispatchPT] = useReducer(reducerPT, intialPT);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [activeTab, setActiveTab] = useState("PT Details");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const resetReducerForm = () => {
    dispatchPT({
      type: "reset",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/exam-blocks/",
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
          const { data } = response;
          const updatedExams = {
            Reading: data.filter(
              ({ exam_type, block_type }) =>
                exam_type === type && block_type === "Mock Test"
            ),
            Writing: data.filter(
              ({ exam_type, block_type }) =>
                exam_type === type && block_type === "Mock Test"
            ),
            Listening: data.filter(
              ({ exam_type, block_type }) =>
                exam_type === type && block_type === "Mock Test"
            ),
          };
          setExams(updatedExams);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [type]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/speaking-block/",
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
          const { data } = response;
          setExams((prev) => ({
            ...prev,
            Speaking: data,
          }));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [type]);

  const validateForm = () => {
    if (!createPT.Name) {
      setFormError("Name is Required");
      return false;
    }
    if (type === "Reading" && !createPT.Reading.length > 0) {
      setFormError("Please Choose at least one Reading Exam");
      return false;
    }
    if (type === "Writing" && !createPT.Writing.length > 0) {
      setFormError("Please Choose at least one Writing Exam");
      return false;
    }
    if (type === "Listening" && !createPT.Listening.length > 0) {
      setFormError("Please Choose at least one Listening Exam");
      return false;
    }
    if (type === "Speaking" && !createPT.Speaking.length > 0) {
      setFormError("Please Choose at least one Speaking Exam");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const createPTest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = {
        Name: createPT.Name,
        exam_test: createPT.exam_test,
        Reading: createPT.Reading,
        Writing: createPT.Writing,
        Listening: createPT.Listening,
        Speaking: createPT.Speaking,
        difficulty_level: createPT.difficulty_level,
      };
      const response = await ajaxCall(
        "/moduleListView/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(data),
          withCredentials: true,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        toast.success("Practice Exam Create Successfully");
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

  const rowSelection = "multiple";

  const handleRowSelection = (type) => (event) => {
    const selectedNodes = event.api?.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node?.data?.id);

    const total = selectedNodes.reduce((total, node) => {
      return total + (node.data.no_of_questions || node.data.questions.length || 0);
    }, 0);

    setTotalQuestions(total);

    dispatchPT({
      type,
      value: selectedIds,
    });
  };

  const gridOptions = (rowData, handleRowSelection) => {
    let columnDefs = [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        resizable: false,
        width: 110,
      },
      {
        headerName: "Exam Name",
        field: "exam_name" || "name",
        filter: true,
        valueGetter: (params) => {
          return params.data?.exam_name || params.data?.name;
        },
      },
      {
        headerName: "Exam Type",
        field: "exam_type" || "Speaking",
        filter: true,
        valueGetter: (params) => {
          return params.data?.exam_type || "Speaking";
        },
      },
      {
        headerName: "No. Of Questions",
        field: "no_of_questions" || "questions.length",
        filter: true,
        valueGetter: (params) => {
          return params.data?.no_of_questions || params.data?.questions.length;
        },
      },
      {
        headerName: "Block Type",
        field: "block_type" || "Mock Test",
        filter: true,
        valueGetter: (params) => {
          return params.data?.block_type || "Mock Test";
        },
      },
      {
        headerName: "Difficulty Level",
        field: "difficulty_level",
        filter: true,
      },
    ];

    return {
      rowData,
      onSelectionChanged: handleRowSelection,
      columnDefs,
      pagination: true,
      paginationPageSize: 10,
      domLayout: "autoHeight",
      defaultColDef: {
        sortable: true,
        resizable: true,
      },
    };
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
            activeTab === "PT Details" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Practice Test Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={createPT.Name}
                    onChange={(e) =>
                      dispatchPT({
                        type: "Name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Difficulty Level</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={createPT.difficulty_level}
                    onChange={(e) =>
                      dispatchPT({
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
        <div
          className={`tab-pane fade ${
            activeTab === "PT Content" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Total No. of Questions : {totalQuestions}</label>
              </div>
            </div>
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <div className="ag-theme-quartz">
                  <AgGridReact
                    {...gridOptions(exams[type], handleRowSelection(type))}
                    rowSelection={rowSelection}
                  />
                </div>
              </div>
            </div>
            <div className="create__course__bottom__button text-center mt-2">
              {formStatus.isError ? (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              ) : (
                <div className="text-success mb-2">{formStatus.errMsg}</div>
              )}
              <button className="default__button" onClick={createPTest}>
                Create PT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PT;
