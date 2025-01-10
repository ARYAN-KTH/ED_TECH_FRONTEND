
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/uiComponents/Navbar";
import SignUpScreen from './pages/User/SignUpScree/SignUpScreen';
import LoginScreen from './pages/User/LoginScreen/LoginScreen';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
