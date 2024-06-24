import React from "react";
import Table from "../../../UI/Table";
import { useNavigate } from "react-router-dom";
import Loading from "../../../UI/Loading";

const TestTable = ({
  testData,
  givenTest,
  givenSpeakingTest,
  testType,
  isLoading,
}) => {
  const navigate = useNavigate();
  const takeTest = (params) => {
    const examId = params.data.id;
    const isGiven = givenTest?.find((test) => test === examId);
    if (isGiven) {
      return (
        <button
          className="take-test"
          onClick={() => navigate(`/exam-answer/${examId}`)}
          style={{ backgroundColor: "green", border: "1px solid green" }}
        >
          Review Test
        </button>
      );
    } else {
      return (
        <button
          className="take-test"
          onClick={() =>
            window.open(
              `/${
                testType !== "Speaking" ? "live-exam" : "live-speaking-exam"
              }/${testType}/${params.data.id}`,
              "_blank"
            )
          }
        >
          Take Test
        </button>
      );
    }
  };

  const testStatus = (params) => {
    const examId = params.data.id;
    const isGiven =
      testType === "Speaking"
        ? givenSpeakingTest?.find((test) => test === examId)
        : givenTest?.find((test) => test === examId);
    if (isGiven) {
      return (
        <button className="given-tag" style={{ backgroundColor: "green" }}>
          Given
        </button>
      );
    } else {
      return (
        <button className="given-tag" style={{ backgroundColor: "red" }}>
          Not Given
        </button>
      );
    }
  };

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: takeTest,
      filter: true,
    },
    { headerName: "Name", field: "exam_name", filter: true },
    {
      headerName: "No. Of Questions",
      field: "no_of_questions",
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      filter: true,
      cellRenderer: testStatus,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading text="Loading..." color="primary" />
      ) : testData.length > 0 ? (
        <Table rowData={testData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">{`No ${testType} Tests Available !!`}</h5>
      )}
    </>
  );
};

export default TestTable;
