// eslint-disable-next-line no-unused-vars
import React from "react";
import "../index.css";
import UseShowPassword from "../hooks/useShowPassword";
// import AppButton from '../components/AppButton'
import { useAuth } from "../contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  // const navigate = useNavigate();
  const { signup } = useAuth();
  const { showPassword, handleShowPassword } = UseShowPassword();

  const formik = useFormik({
    // Initial values
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    // form Validations
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
      console.log(values);
      await signup(values);
    },
  });

  return (
    // <div>Signup</div>
    <div className="w-[70%] max-w-[500px] mx-[auto] mt-[5%] shadow-1xl p-3 border-2 rounded-lg shadow-lg shadow-sky-100">
      <div className="px-5 border-b-2 pb-3 border-grey-900">
        {/* <h2 className="text-black text-xl font-bold text-center">Welcome to LMS</h2> */}
        <p className="text-200 text-lg text-center font-black">
          Please sign up to get started
        </p>
      </div>
      <div className="p-5">
        <label
          htmlFor="email"
          className="block text-x text-black font-semibold font-sans"
        >
          Email address:
        </label>
        <input
          className="border-2 hover:border-stone-700 rounded-lg focus:outline-none w-[100%] p-2 mt-2 "
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
        <label
          htmlFor="firstname"
          className="block text-x text-black font-semibold font-sans"
        >
          Firstname:
        </label>
        <input
          className=" hover:border-stone-700 border-2 border-white-900 rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type="text"
          placeholder="Enter your firstname"
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <p className="text-red-800 text-sm font-medium font-sans">
            {formik.errors.firstname}
          </p>
        )}
      </div>
      <div className="p-5">
        <label
          htmlFor="lastname"
          className="block text-x text-black font-semibold"
        >
          Lastname:
        </label>
        <input
          className=" hover:border-zinc-500 border-2 border-white-900 rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type="text"
          placeholder="Enter your lastname"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
        />
        {formik.touched.lastname && formik.errors.lastname && (
          <p className="text-red-800 text-sm font-medium font-sans">
            {formik.errors.lastname}
          </p>
        )}
      </div>
      <div className="p-5 relative">
        <label
          htmlFor="password"
          className="block text-x text-black font-semibold"
        >
          Password:
        </label>
        <input
          className="hover:border-zinc-500 border-2 bhjv rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type={`${showPassword ? "text" : "password"}`}
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="absolute top-[70px] right-[30px] cursor-pointer">
          {showPassword ? (
            <FaEyeSlash color="grey" size={20} onClick={handleShowPassword} />
          ) : (
            <FaEye color="grey" size={20} onClick={handleShowPassword} />
          )}
        </span>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500">{formik.errors.password}</p>
        )}
      </div>
      <div className="p-5  justify-center items-center  rounded-2xl ">
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded w-[100%]"
          type="submit"
        >
          Signup
        </button>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <p className="font-semibold text-pretty">
          Already have an account? <br />
          <Link className="text-sky-500 hover:text-sky-600" to="/Login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
