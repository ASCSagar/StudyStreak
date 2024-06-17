import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const specificColumns = {
  "Flash Card": [
    { headerName: "No.", field: "no", resizable: false, width: 110 },
    { headerName: "Name", field: "title", filter: true },
    { headerName: "Description", field: "description", filter: true },
    { headerName: "Points", field: "points", filter: true },
  ],
  Lesson: [
    { headerName: "Lesson Title", field: "name", filter: true },
    {
      headerName: "Description",
      field: "Lesson_Description",
      filter: true,
    },
    { headerName: "Points", field: "points", filter: true },
  ],
  Course: [
    { headerName: "No.", field: "no", resizable: false, width: 60 },
    { headerName: "Course Title", field: "Course_Title", filter: true },
    { headerName: "Points", field: "points", filter: true },
  ],
  "Exam Block": [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "exam_name", filter: true },
    { headerName: "Exam Type", field: "exam_type", filter: true },
    { headerName: "Block Type", field: "block_type", filter: true },
    { headerName: "Points", field: "points", filter: true },
  ],
  "Full Length Test": [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "name", filter: true },
    {
      headerName: "Reading Set",
      field: "reading_set.Reading.length",
      filter: true,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
      filter: true,
    },
    { headerName: "Points", field: "points", filter: true },
  ],
  "Practice Test": [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "Name", filter: true },
    { headerName: "Reading Set", field: "reading_count", filter: true },
    { headerName: "Writing Set", field: "writing_count", filter: true },
    { headerName: "Listening Set", field: "listening_count", filter: true },
    { headerName: "Speaking Set", field: "speaking_count", filter: true },
    { headerName: "Points", field: "points", filter: true },
  ],
  "Live Class": [
    { headerName: "Meeting Title", field: "meeting_title" },
    {
      headerName: "Start Date",
      field: "start_date",
      valueGetter: (params) => {
        return moment(params.data.start_time).format("DD MMM, YYYY");
      },
    },
    {
      headerName: "Start Time",
      field: "start_time",
      valueGetter: (params) => {
        return moment(params.data.start_time).format("hh:mm A");
      },
    },
    {
      headerName: "End Date",
      field: "end_date",
      valueGetter: (params) => {
        return moment(params.data.end_time).format("DD MMM, YYYY");
      },
    },
    {
      headerName: "End Time",
      field: "end_time",
      valueGetter: (params) => {
        return moment(params.data.end_time).format("hh:mm A");
      },
    },
    { headerName: "Description", field: "meeting_description" },
    { headerName: "Points", field: "points", filter: true },
  ],
};

const ViewGamification = ({ content, activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [gamificationList, setGamificationList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const fetchData = async (url, setter) => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setter(response?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "View Gamification") {
      fetchData(`/gamification/`, setGamificationList);
    }
  }, [activeTab, authData.accessToken]);

  useEffect(() => {
    const endpoints = {
      "Flash Card": `/gamification/flashcard/`,
      Lesson: `/lessonview/`,
      Course: `/courselistview/`,
      "Exam Block": `/exam-blocks/?fields=id,exam_name,exam_type,block_type`,
      "Full Length Test": `/get/flt/`,
      "Practice Test": `/moduleListView/`,
      "Live Class": `/liveclass_list_view/`,
    };

    if (content && endpoints[content] && activeTab === "View Gamification") {
      fetchData(endpoints[content], setDataList);
    }
  }, [activeTab, authData.accessToken, content]);

  const filteredDataList = () => {
    switch (content) {
      case "Flash Card":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.title && i.model === content
            )
          )
          .map((item, index) => ({
            ...item,
            no: index + 1,
            points:
              gamificationList.find(
                (i) => i.name === item.title && i.model === content
              )?.points || 0,
          }));
      case "Lesson":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.Lesson_Title && i.model === content
            )
          )
          .map((item, index) => ({
            ...item,
            no: index + 1,
            points:
              gamificationList.find(
                (i) => i.name === item.Lesson_Title && i.model === content
              )?.points || 0,
          }));
      case "Course":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.Course_Title && i.model === content
            )
          )
          .map((item, index) => ({
            ...item,
            no: index + 1,
            points:
              gamificationList.find(
                (i) => i.name === item.Course_Title && i.model === content
              )?.points || 0,
          }));
      case "Exam Block":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) =>
                i.name === `${item.exam_name}-${item.exam_type}` &&
                i.model === content
            )
          )
          .map((item, index) => ({
            ...item,
            no: index + 1,
            points:
              gamificationList.find(
                (i) =>
                  i.name === `${item.exam_name}-${item.exam_type}` &&
                  i.model === content
              )?.points || 0,
          }));
      case "Full Length Test":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.name && i.model === content
            )
          )
          .map((item, index) => ({
            ...item,
            no: index + 1,
            points:
              gamificationList.find(
                (i) => i.name === item.name && i.model === content
              )?.points || 0,
          }));
      case "Practice Test":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.Name && i.model === content
            )
          )
          .map((item, index) => ({
            ...item,
            no: index + 1,
            points:
              gamificationList.find(
                (i) => i.name === item.Name && i.model === content
              )?.points || 0,
          }));
      case "Live Class":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.meeting_title && i.model === content
            )
          )
          .map((item, index) => ({
            ...item,
            no: index + 1,
            points:
              gamificationList.find(
                (i) => i.name === item.meeting_title && i.model === content
              )?.points || 0,
          }));
      default:
        return [];
    }
  };

  const columns = [...(specificColumns[content] || [])];

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : filteredDataList().length > 0 ? (
    <Table rowData={filteredDataList()} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Gamification Available !!</h5>
  );
};

export default ViewGamification;
