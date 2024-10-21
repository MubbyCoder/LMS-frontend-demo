/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  //   States
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  console.log("Token in auth", token);
  const signup = async (data) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/auth/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.data.token);
        setUser(res.data.data.user);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("Signup Successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        err?.response
          ? toast.error(err.response.data.message)
          : toast.error("An Error occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = async (data) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.data.token);
        setUser(res.data.data.user);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        err?.response
          ? toast.error(err.response.data.message)
          : toast.error("An Error occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/login");
  };

  const values = {
    loading,
    token,
    user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
