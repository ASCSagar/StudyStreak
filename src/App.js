import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Courses from "./pages/Courses/Courses";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import Tests from "./pages/Tests/Tests";
import Lesson from "./components/Dashboard/Student/Lesson/Lesson";
import AdminLesson from "./components/Dashboard/Admin/Lesson/Lesson";
import StudentDashboard from "./components/Dashboard/Student/Dashboard";
import AdminDashboard from "./components/Dashboard/Admin/Dashboard";
import ContactUs from "./pages/ContactUs/ContactUs";
import DragDrop from "./components/Exam-Create/DragDrop";
import ProtectedRoute from "./components/ProtectedRoute";
import ExamCreator from "./pages/Exam-Creator/ExamCreator";
import ExamReading from "./components/Exam-Create/ExamReading";
import ExamListening from "./components/Exam-Create/ExamListening";
import ExamWriting from "./components/Exam-Create/ExamWriting";
import ExamSpeaking from "./components/Exam-Create/ExamSpeaking";
import LiveExam from "./components/LiveExam/LiveExam";
import Course from "./components/Dashboard/Admin/Course/Course";
import Exam from "./components/Dashboard/Admin/Exam/Exam";
import LiveClass from "./components/Dashboard/Admin/LiveClass/LiveClass";
import Package from "./components/Dashboard/Admin/Package/Package";
import User from "./components/Dashboard/Admin/User";
import Batch from "./components/Dashboard/Admin/Batch/Batch";
import AdminProfile from "./components/Dashboard/Admin/Profile";
import StudentProfile from "./components/Dashboard/Student/Profile";
import StudentSettings from "./components/Dashboard/Student/Setting/Settings";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MyCourse from "./components/Dashboard/Student/MyCourse";
import StudentLiveClass from "./components/Dashboard/Student/LiveClass";
import Checkout from "./components/Checkout/Checkout";
import CourseContent from "./components/Dashboard/Student/Course/CourseContent";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const App = () => {
  return (
    <>
      <ToastContainer
        limit={1}
        theme="colored"
        position="top-center"
        autoClose={3000}
        style={{
          fontSize: "14px",
          width: "auto",
          fontWeight: "600",
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courseDetail/:courseId" element={<CourseDetail />} />
          <Route
            path="/courseLessons/:courseId"
            element={<ProtectedRoute element={Lesson} />}
          />
          <Route
            path="/course/:courseId"
            element={<ProtectedRoute element={CourseContent} />}
          />
          <Route
            path="/createCourse"
            element={<ProtectedRoute element={CreateCourse} />}
          />
          <Route path="/tests" element={<ProtectedRoute element={Tests} />} />
          <Route path="/blogs" element={<ProtectedRoute element={Blogs} />} />
          <Route
            path="/blog-detail"
            element={<ProtectedRoute element={BlogDetail} />}
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={AdminDashboard} />}
          />
          <Route
            path="/admin-course"
            element={<ProtectedRoute element={Course} />}
          />
          <Route
            path="/admin-exam"
            element={<ProtectedRoute element={Exam} />}
          />
          <Route
            path="/admin-exam/:examType"
            element={<ProtectedRoute element={Exam} />}
          />
          <Route
            path="/admin-exam/:examType/:examForm"
            element={<ProtectedRoute element={Exam} />}
          />
          <Route
            path="/admin-liveClass"
            element={<ProtectedRoute element={LiveClass} />}
          />
          <Route
            path="/admin-package"
            element={<ProtectedRoute element={Package} />}
          />
          <Route
            path="/admin-user"
            element={<ProtectedRoute element={User} />}
          />
          <Route
            path="/admin-batch"
            element={<ProtectedRoute element={Batch} />}
          />
          <Route
            path="/admin-lesson"
            element={<ProtectedRoute element={AdminLesson} />}
          />
          <Route
            path="/admin-profile"
            element={<ProtectedRoute element={AdminProfile} />}
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
          <Route
            path="/exam-writing"
            element={<ProtectedRoute element={ExamWriting} />}
          />
          <Route
            path="/exam-speaking"
            element={<ProtectedRoute element={ExamSpeaking} />}
          />

          <Route
            path="/live-writing-exam"
            element={<ProtectedRoute element={LiveExam} />}
          />

          <Route
            path="/studentDashboard"
            element={<ProtectedRoute element={StudentDashboard} />}
          />
          <Route
            path="/studentMyCourse"
            element={<ProtectedRoute element={MyCourse} />}
          />
          <Route
            path="/studentLiveClasses"
            element={<ProtectedRoute element={StudentLiveClass} />}
          />
          <Route path="/studentProfile" element={<StudentProfile />} />
          <Route path="/studentSettings" element={<StudentSettings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
