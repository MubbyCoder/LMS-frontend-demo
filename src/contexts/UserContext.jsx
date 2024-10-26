/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../config/axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import handleError from "../utils/error";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user/profile`, {
        withCredentials: true,
      });
      const user = response.data.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/user/profile`, updatedData, {
        withCredentials: true,
      });
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({ title: "Profile updated", status: "success" });
      navigate("/profile");
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = async (file) => {
    setLoading(true);
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axiosInstance.patch(
        `/user/profile-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({ title: "Profile picture updated", status: "success" });
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  const values = {
    user,
    getUserDetails,
    updateUser,
    updateProfilePicture,
    loading,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;