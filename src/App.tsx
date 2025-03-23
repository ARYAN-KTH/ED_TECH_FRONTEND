import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import SignUpScreen from "./pages/User/SignUpFlow/SignUpScreen";
import LoginScreen from "./pages/User/LoginScreen/LoginScreen";
import OtpScreen from "./pages/User/SignUpFlow/OtpScreen";
import HomePage from "./pages/User/HomeScreen/HomePage";
import CreateCourseStep1 from "./pages/User/ProtectedPages/Recruiter/CourseCreation/CreateCourseStep1";
import CreateCourse from "./pages/User/ProtectedPages/Recruiter/CourseCreation/CreateCourse";
import LogoutPage from "./components/uiComponents/LogoutPage";
import IndividualCourse from "./pages/User/ProtectedPages/Recruiter/CourseCreation/IndividualCourse";
import CoursePage from "./pages/User/CourseScreen/CourseScreen";
import AboutUsPage from "./pages/User/AboutUsScreen/AboutUsScreen";
import CreateCourseStep2 from "./pages/User/ProtectedPages/Recruiter/CourseCreation/CreateCourseStep2";
import NotFound from "./pages/NotFound";
import Courses from "./pages/User/ProtectedPages/Student/Course";
import CourseDetails from "./pages/User/ProtectedPages/Student/CourseDetails";
import Layout from "./components/layouts/layout";
import Dashboard from "./pages/User/ProtectedPages/Recruiter/Dashboard/Dashboard";
import EnrolledCourse from "./pages/User/ProtectedPages/Student/Enrolled-Course";
import PurchaseHistory from "./pages/User/ProtectedPages/Student/Purchase-History";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/otp" element={<OtpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/course" element={<CoursePage />} />

          {/* protected routes with Layout as parent */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route
                path="/create-course-step1"
                element={<CreateCourseStep1 />}
              />
              <Route
                path="/create-course-step2"
                element={<CreateCourseStep2 />}
              />
              <Route path="/create-course" element={<CreateCourse />} />
              <Route path="/individual-course" element={<IndividualCourse />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* protected student routes */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/course-details" element={<CourseDetails />} />
              <Route path="/enrolled-course" element={<EnrolledCourse />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
            </Route>
          </Route>

          {/* 404 Not Found Route (Always keep it at the end) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
