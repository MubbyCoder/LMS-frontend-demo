/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

// Custom Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null); // Store email for password recovery
  const [loading, setLoading] = useState(false); // Manage loading state
  const [token, setToken] = useState(null); // Authentication token
  const [user, setUser] = useState(null); // User details

  const apiUrl = import.meta.env.VITE_API_URL;

  // Initialize state from localStorage when the app loads
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedEmail = localStorage.getItem("email");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Save token and user to state and localStorage
  const saveAuthData = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Handle API errors consistently
  const handleApiError = (error, defaultMessage) => {
    console.error(error);
    toast.error(error?.response?.data?.message || defaultMessage);
  };

  // Signup function
  const signup = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, data, {
        headers: { "Content-Type": "application/json" },
      });
      const { token, user } = response.data.data;
      saveAuthData(token, user);
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      handleApiError(error, "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      const { token, user } = response.data.data;
      saveAuthData(token, user);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      handleApiError(error, "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password function
  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/auth/forgot-password`, { email });
      setEmail(email); // Store email in state
      localStorage.setItem("email", email); // Save email to localStorage
      toast.success("Verification code sent to your email.");
      navigate("/verify-code");
    } catch (error) {
      handleApiError(error, "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  // Verify Code function
  const verifyCode = async (email, verificationCode) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/auth/verifyCode`, { email, verificationCode });
      toast.success("Verification successful. You can now reset your password.");
      navigate("/reset-password");
    } catch (error) {
      handleApiError(error, "Verification failed. Please check the code.");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password function
  const resetPassword = async (email, verificationCode, password) => {
    setLoading(true);
    try {
      await axios.patch(`${apiUrl}/auth/resetPassword`, {
        email,
        verificationCode,
        password,
      });
      toast.success("Password reset successful! Please log in.");
      navigate("/login");
    } catch (error) {
      handleApiError(error, "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  // Context values
  const values = {
    loading,
    token,
    user,
    email,
    signup,
    login,
    forgotPassword,
    verifyCode,
    resetPassword,
    logout,
    setEmail,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
