import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/Verifycode'; 
import ResetPassword from './pages/ResetPassword'; 
import AuthProvider from './contexts/AuthContext';
import LandingPage from "./pages/LandingPage";
// import { ToastContainer } from "react-toastify";

function App() {
  document.title = "Library Management System";

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} /> 
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path="/dashboard" element={<LandingPage />} />
        </Routes>
        {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
