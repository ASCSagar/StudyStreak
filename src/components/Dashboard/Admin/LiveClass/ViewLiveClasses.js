import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 86 },
  {
    headerName: "Batch",
    field: "select_batch.batch_name",
    filter: true,
  },
  { headerName: "Live Class Type", field: "liveclasstype.name", filter: true },
  {
    headerName: "Meeting Name",
    field: "meeting_title",
    filter: true,
  },
  {
    headerName: "Start Date",
    field: "start_time",
    filter: true,
    valueFormatter: ({ value }) => moment(value).format("YYYY-MM-DD"),
  },
  {
    headerName: "Start Time",
    field: "start_time",
    filter: true,
    valueFormatter: ({ value }) => moment(value).format("HH:mm:ss"),
  },
  {
    headerName: "End Date",
    field: "end_time",
    filter: true,
    valueFormatter: ({ value }) => moment(value).format("YYYY-MM-DD"),
  },
  {
    headerName: "End Time",
    field: "end_time",
    filter: true,
    valueFormatter: ({ value }) => moment(value).format("HH:mm:ss"),
  },
];

const ViewLiveClasses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [liveClassList, setLiveClassList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/liveclass_list_view/`,
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
          const liveClassWithNumbers = response?.data?.map(
            (liveClass, index) => ({
              ...liveClass,
              no: index + 1,
            })
          );
          setIsLoading(false);
          setLiveClassList(liveClassWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : liveClassList.length > 0 ? (
    <Table columnDefs={columns} rowData={liveClassList} />
  ) : (
    <h5 className="text-center text-danger">No Live Classes Available !!</h5>
  );
};
export default ViewLiveClasses;
