
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/uiComponents/Navbar";
import SignUpScreen from './pages/User/SignUpFlow/SignUpScreen';
import LoginScreen from './pages/User/LoginScreen/LoginScreen';
import OtpScreen from './pages/User/SignUpFlow/OtpScreen';
import HomePage from './pages/User/HomeScreen/HomePage';
import CreateCourseStep1 from './pages/User/ProtectedPages/Recruiter/CourseCreation/CreateCourseStep1';
import CreateCourse from './pages/User/ProtectedPages/Recruiter/CourseCreation/CreateCourse';
import LogoutPage from './components/uiComponents/LogoutPage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/otp" element={<OtpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/create-course-step1" element={<CreateCourseStep1/>} />
          <Route path="/create-course" element={<CreateCourse/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
