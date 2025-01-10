
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/uiComponents/Navbar";
import SignUpScreen from './pages/User/SignUpFlow/SignUpScreen';
import LoginScreen from './pages/User/LoginScreen/LoginScreen';
import OtpScreen from './pages/User/SignUpFlow/OtpScreen';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/otp" element={<OtpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
