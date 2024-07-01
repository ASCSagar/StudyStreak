import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";
import Table from "../../../../UI/Table";

const Material = ({ courseId }) => {
  const [courseMaterial, setCourseMaterial] = useState([]);

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
          `/course-materials/${courseId}/`,
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
          const materialWithNumbers = response?.data?.data?.map(
            (item, index) => ({
              ...item,
              no: index + 1,
            })
          );
          setCourseMaterial(materialWithNumbers);
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
    { headerName: "Name", field: "material_name", filter: true },
    {
      headerName: "Download",
      field: "course_material",
      cellRenderer: doDownload,
    },
  ];

  return (
    <div className="col-xl-12 col-lg-9 col-md-12">
      <div className="dashboard__content__wraper common-background-color-across-app">
        <div className="dashboard__section__title">
          <h4>Course Material</h4>
        </div>
        <div className="row">
          <Table rowData={courseMaterial} columnDefs={columns} />
        </div>
      </div>
    </div>
  );
};

export default Material;
