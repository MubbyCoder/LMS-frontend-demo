// import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import "../index.css";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import UseShowPassword from "../hooks/useShowPassword";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Login = () => {
  const { login, loading } = useAuth();
  const { showPassword, handleShowPassword } = UseShowPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
        toast.success("Login Successful");
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-md mx-auto py-8 px-5 bg-blue-900 rounded-lg shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-bold">Welcome back</h2>
          <p className="text-blue-200 text-sm font-medium">
            Please sign in to continue into your account
          </p>
          <div className="border-b border-blue-300 my-4"></div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="relative">
            <input
              className="border border-blue-700 hover:border-blue-900 rounded focus:outline-none w-full px-4 py-2 bg-white text-blue-900"
              type="email"
              placeholder="Email address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password input with eye icon */}
          <div className="relative">
            <input
              className="appearance-none border border-blue-700 hover:border-blue-900 rounded focus:outline-none w-full px-4 py-2 bg-white text-blue-900"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="absolute top-3 right-3 cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <FaEyeSlash color="black" size={20} />
              ) : (
                <FaEye color="black" size={20} />
              )}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-300 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login button */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="flex justify-center text-center mt-4">
          <p className="text-sm text-white">
            Don’t have an account?{' '}
            <Link to="/" className="text-blue-300 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
