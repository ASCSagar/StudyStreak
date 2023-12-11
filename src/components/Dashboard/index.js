import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <li>
        <Link className="headerarea__has__dropdown">
          Dashboard
          <i className="icofont-rounded-down"></i>
        </Link>
        <ul className="headerarea__submenu headerarea__submenu--third--wrap">
          <li>
            <Link>
              Student <i className="icofont-rounded-right"></i>
            </Link>
            <ul className="headerarea__submenu--third">
              <li>
                <Link to="/dashboard/student-my-courses">My Courses</Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  );
};

export default Dashboard;
