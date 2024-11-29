import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import "../index.css";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import UseShowPassword from "../hooks/useShowPassword";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const { signup } = useAuth();
  const { showPassword, handleShowPassword } = UseShowPassword();
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      firstname: Yup.string().required("Firstname is required"),
      lastname: Yup.string().required("Lastname is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Minimum of 6 characters"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true); // Disable button
      try {
        await signup(values);
        toast.success("Signup successful!");
      } catch (error) {
        toast.error("Signup failed. Please try again.");
      } finally {
        setIsSubmitting(false); // Re-enable button
      }
    },
  });

  return (
    <div className="backG-image bg-center bg-no-repeat h-screen w-full flex items-center justify-center">
      <div className="w-[90%] max-w-[500px] mx-[auto] mt-[5%] shadow-1xl p-3 border-2 rounded-lg shadow-lg bg-blue-50">
        <div className="px-5 border-dotted border-b-2 pb-3 border-blue-900">
          <p className="text-100 text-sm text-center font-semibold">
            Please sign up to get started
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            <label htmlFor="email" className="block text-sm font-bold">
              Email address:
            </label>
            <input
              className="appearance-none border border-gray-600 rounded w-full py-3 px-4 mt-2 leading-tight hover:outline-none hover:border-blue-800"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 font-medium font-sans">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="p-5">
            <label htmlFor="firstname" className="block text-x text-sm font-semibold">
              Firstname:
            </label>
            <input
              className="appearance-none border border-gray-600 rounded w-full py-3 px-4 mt-2 leading-tight hover:outline-none hover:border-blue-800"
              type="text"
              placeholder="Enter your firstname"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <p className="text-red-800 text-sm font-sm font-sans">
                {formik.errors.firstname}
              </p>
            )}
          </div>

          <div className="p-5">
            <label htmlFor="lastname" className="block text-sm font-semibold">
              Lastname:
            </label>
            <input
              className="appearance-none border border-gray-600 rounded w-full py-3 px-4 mt-2 leading-tight hover:outline-none hover:border-blue-800"
              type="text"
              placeholder="Enter your lastname"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className="text-red-800 text-sm font-medium font-sans">
                {formik.errors.lastname}
              </p>
            )}
          </div>

          <div className="p-5 relative">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password:
            </label>
            <input
              className="appearance-none border border-gray-600 rounded w-full py-3 px-4 mt-2 leading-tight hover:outline-none hover:border-blue-800"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="absolute top-[65px] right-[30px] cursor-pointer">
              {showPassword ? (
                <FaEyeSlash color="black" size={20} onClick={handleShowPassword} />
              ) : (
                <FaEye color="black" size={20} onClick={handleShowPassword} />
              )}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <div className="p-5 justify-center items-center rounded-2xl">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Signup"} 
            </button>
          </div>
        </form>

        <div className="flex flex-col justify-center items-center text-center">
          <p className="font-sm text-pretty">
            Already have an account? <br />
            <Link className="text-blue-500 hover:text-blue-700 hover:underline" to="/Login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
