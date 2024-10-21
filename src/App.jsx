import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css';
import Signup from './pages/Signup';
import AuthProvider from './contexts/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
     <Router>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<Signup />} />
            </Routes>
            <ToastContainer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App
