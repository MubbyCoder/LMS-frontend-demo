import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// import theme from "./config/chakra"
import './index.css';
// import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthProvider from './contexts/AuthContext';
import { ToastContainer } from "react-toastify";

function App() {
  document.title = "Library Management System";
  return (
    <AuthProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/" element={<Login />} /> */}
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App
