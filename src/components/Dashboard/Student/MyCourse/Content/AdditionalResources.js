import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";
import Table from "../../../../UI/Table";

const AdditionalResources = ({ courseId }) => {
  const [additionalResource, setAdditionalResource] = useState([]);

  const doDownload = (params) => {
    return (
      <button className="take-test" onClick={() => window.open(params.value)}>
        <i className="icofont-download" /> Download
      </button>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/additional-resources/${courseId}/`,
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
          const aRWithNumbers = response?.data?.data?.map((item, index) => ({
            ...item,
            no: index + 1,
          }));
          setAdditionalResource(aRWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [courseId]);

  const columns = [
    { headerName: "No.", field: "no" },
    { headerName: "Name", field: "info", filter: true },
    {
      headerName: "Download",
      field: "course_files",
      cellRenderer: doDownload,
    },
  ];

  return (
    <div className="col-xl-12 col-lg-9 col-md-12">
      <div className="dashboard__content__wraper common-background-color-across-app">
        <div className="dashboard__section__title ">
          <h4>Additional Resources</h4>
        </div>
        <div className="row">
          <Table rowData={additionalResource} columnDefs={columns} />
        </div>
      </div>
    </div>
  );
};

export default AdditionalResources;
