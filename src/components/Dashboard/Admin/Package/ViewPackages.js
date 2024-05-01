import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import CheckIcon from "../../../UI/CheckIcon";
import CancelIcon from "../../../UI/CancelIcon";
import Table from "../../../UI/Table";

const ViewPackages = () => {
  const [packageList, setPackageList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/packagelistview/`,
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
          const packageWithNumbers = response?.data?.map(
            (packageItem, index) => ({
              ...packageItem,
              no: index + 1,
            })
          );
          setPackageList(packageWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 80,
    },
    { headerName: "Name", field: "package_name", filter: true },
    { headerName: "Price", field: "package_price", filter: true },
    {
      headerName: "Type",
      field: "PackageType.name",
      filter: true,
    },
    {
      headerName: "Course",
      field: "select_course.Course_Title",
      filter: true,
    },
    { headerName: "Duration", field: "duration" },
    {
      headerName: "Coupon Code",
      field: "coupon_code.cupon_code",
    },
    {
      headerName: "Soft Copy",
      field: "soft_copy",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Hard Copy",
      field: "hard_copy",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Full Length Test",
      field: "full_length_test",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Practice Test",
      field: "practice_test",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Speaking Test",
      field: "speaking_test",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Writing Evaluation",
      field: "writing_evaluation",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Live Classes Membership",
      field: "live_classes_membership",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Online Membership",
      field: "online_membership",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Offline Membership",
      field: "offline_membership",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "Group Doubt Solving",
      field: "group_doubt_solving",
      cellRenderer: renderItemAvailable,
    },
    {
      headerName: "One To One Doubt Solving",
      field: "one_to_one_doubt_solving",
      cellRenderer: renderItemAvailable,
    },
  ];

  return <Table rowData={packageList} columnDefs={columns} />;
};
export default ViewPackages;
