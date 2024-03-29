import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Courses from "./pages/Courses/Courses";
import Lesson from "./components/Dashboard/Student/Lesson/Lesson";
import AdminLesson from "./components/Dashboard/Admin/Lesson/Lesson";
import StudentDashboard from "./components/Dashboard/Student/Dashboard/Dashboard";
import AdminDashboard from "./components/Dashboard/Admin/Dashboard";
import ContactUs from "./pages/ContactUs/ContactUs";
import DragDrop from "./components/Exam-Create/DragDrop";
import ProtectedRoute from "./components/ProtectedRoute";
import ExamReading from "./components/Exam-Create/ExamReading";
import ExamListening from "./components/Exam-Create/ExamListening";
import ExamWriting from "./components/Exam-Create/ExamWriting";
import ExamSpeaking from "./components/Exam-Create/ExamSpeaking";
import LiveExam from "./components/LiveExam/LiveExam";
import PracticeLiveExam from "./components/LiveExam/PracticeLiveTest";
import PracticeWritingExam from "./components/LiveExam/PracticeWritingExam";
import Course from "./components/Dashboard/Admin/Course/Course";
import Exam from "./components/Dashboard/Admin/Exam/Exam";
import LiveClass from "./components/Dashboard/Admin/LiveClass/LiveClass";
import Package from "./components/Dashboard/Admin/Package/Package";
import Batch from "./components/Dashboard/Admin/Batch/Batch";
import AdminProfile from "./components/Dashboard/Admin/Profile";
import StudentProfile from "./components/Dashboard/Student/Profile";
import StudentSettings from "./components/Dashboard/Student/Setting/Settings";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MyCourse from "./components/Dashboard/Student/MyCourse/MyCourse";
import StudentLiveClass from "./components/Dashboard/Student/LiveClass/LiveClass";
import Checkout from "./components/Checkout/Checkout";
import CourseContent from "./components/Dashboard/Student/MyCourse/Content/CourseContent";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import MockTest from "./components/Dashboard/Student/MockTest/MockTest";
import FullLengthTest from "./components/Dashboard/Student/FullLengthTest/FullLengthTest";
import Student from "./components/Dashboard/Admin/Student/Student";
import Answer from "./components/Dashboard/ExamAnswer/Answer";
import SpeakingPractice from "./components/Dashboard/Student/SpeakingPractice/SpeakingPractice";
import DoubtSolving from "./components/Dashboard/Student/1To1DoubtSolving/DoubtSolving";
import GroupDoubtSolving from "./components/Dashboard/Student/GroupDoubtSolving/GroupDoubtSolving";
import TermsAndService from "./pages/TermsAndService/TermsAndService";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import PracticeTest from "./components/Dashboard/Student/PracticeTest/PracticeTest";
import PracticeTestAnswer from "./components/Dashboard/ExamAnswer/PracticeTestAnswer";
import FullLengthLiveExam from "./components/LiveExam/FullLengthLiveTest";
import FlashCard from "./components/Dashboard/Admin/FlashCard/FlashCard";
import TopBar from "./components/TopBar/TopBar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import RegularClass from "./components/Dashboard/Student/RegularClass/RegularClass";
import GmatLiveMockTest from "./components/LiveExam/GmatLiveMockTest";
import Badge from "./components/Dashboard/Admin/Badge/Badge";
import Gamification from "./components/Dashboard/Admin/Gamification/Gamification";

const App = () => {
  return (
    <div>
      <div className="fixing-navbar-at-top-side">
        <TopBar />
        <NavBar />
      </div>
      <ToastContainer
        limit={1}
        theme="colored"
        position="top-center"
        autoClose={3000}
        className="toast-container"
      />
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
          path="/admin-dashboard"
          element={<ProtectedRoute element={AdminDashboard} />}
        />
        <Route
          path="/admin-student"
          element={<ProtectedRoute element={Student} />}
        />
        <Route
          path="/admin-course"
          element={<ProtectedRoute element={Course} />}
        />
        <Route path="/admin-exam" element={<ProtectedRoute element={Exam} />} />
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
          path="/admin-batch"
          element={<ProtectedRoute element={Batch} />}
        />
         <Route
          path="/admin-badges"
          element={<ProtectedRoute element={Badge} />}
        />
        <Route
          path="/admin-flashCard"
          element={<ProtectedRoute element={FlashCard} />}
        />
        <Route
          path="/admin-gamification"
          element={<ProtectedRoute element={Gamification} />}
        />
        <Route
          path="/admin-lesson"
          element={<ProtectedRoute element={AdminLesson} />}
        />
        <Route
          path="/admin-profile"
          element={<ProtectedRoute element={AdminProfile} />}
        />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route
          path="/exam-create"
          element={<ProtectedRoute element={DragDrop} />}
        />
        <Route
          path="/Reading"
          element={<ProtectedRoute element={ExamReading} />}
        />
        <Route
          path="/Listening"
          element={<ProtectedRoute element={ExamListening} />}
        />
        <Route
          path="/Writing"
          element={<ProtectedRoute element={ExamWriting} />}
        />
        <Route
          path="/Speaking"
          element={<ProtectedRoute element={ExamSpeaking} />}
        />
        <Route
          path="/live-exam/:examId"
          element={<ProtectedRoute element={LiveExam} />}
        />
        <Route
          path="/practice-live-exam/:examType/:examForm/:examId"
          element={<ProtectedRoute element={PracticeLiveExam} />}
        />
        <Route
          path="/practice-live-writing-exam/:examType/:examForm/:examId"
          element={<ProtectedRoute element={PracticeWritingExam} />}
        />
        <Route
          path="/fulllength-live-exam/:examId"
          element={<ProtectedRoute element={FullLengthLiveExam} />}
        />
        <Route
          path="/gmat-live-mock-test/:examId"
          element={<GmatLiveMockTest />}
        />
        <Route
          path="/eaxm-answere/:examId"
          element={<ProtectedRoute element={Answer} />}
        />
        <Route
          path="/eaxm-practice-test-answere/:examId"
          element={<ProtectedRoute element={PracticeTestAnswer} />}
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
        <Route
          path="/regularClasses"
          element={<ProtectedRoute element={RegularClass} />}
        />
        <Route path="/studentProfile" element={<StudentProfile />} />
        <Route path="/studentSettings" element={<StudentSettings />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mockTest" element={<MockTest />} />
        <Route path="/practiceTest" element={<PracticeTest />} />
        <Route path="/fullLengthTest" element={<FullLengthTest />} />
        <Route path="/speakingSolving" element={<SpeakingPractice />} />
        <Route path="/doubtSolving" element={<DoubtSolving />} />
        <Route path="/groupDoubtSolving" element={<GroupDoubtSolving />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsAndService />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
