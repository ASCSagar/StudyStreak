import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Courses from "./pages/Courses/Courses";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import Tests from "./pages/Tests/Tests";
import MyCourses from "./components/Dashboard/Student/MyCourses";
import Dashboard from "./components/Dashboard/Student/Dashboard";
import ContactUs from "./pages/ContactUs/ContactUs";
import DragDrop from "./components/Exam-Create/DragDrop";
import ProtectedRoute from "./components/ProtectedRoute";
import ExamCreator from "./pages/Exam-Creator/ExamCreator";
import ExamReading from "./components/Exam-Create/ExamReading";
import ExamListening from "./components/Exam-Create/ExamListening";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Main} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<ProtectedRoute element={Courses} />} />
        <Route
          path="/course-detail"
          element={<ProtectedRoute element={CourseDetail} />}
        />
        <Route
          path="/create-course"
          element={<ProtectedRoute element={CreateCourse} />}
        />
        <Route path="/tests" element={<ProtectedRoute element={Tests} />} />
        <Route path="/blogs" element={<ProtectedRoute element={Blogs} />} />
        <Route
          path="/blog-detail"
          element={<ProtectedRoute element={BlogDetail} />}
        />
        <Route
          path="/dashboard/student-dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route
          path="/dashboard/student-my-courses"
          element={<ProtectedRoute element={MyCourses} />}
        />
        <Route
          path="/contactUs"
          element={<ProtectedRoute element={ContactUs} />}
        />
        <Route
          path="/exam-create"
          element={<ProtectedRoute element={DragDrop} />}
        />
        <Route
          path="/exam-creator"
          element={<ProtectedRoute element={ExamCreator} />}
        />
        <Route
          path="/exam-reading"
          element={<ProtectedRoute element={ExamReading} />}
        />
        <Route
          path="/exam-listening"
          element={<ProtectedRoute element={ExamListening} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
