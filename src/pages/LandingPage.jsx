import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaUsers, FaWarehouse, FaSignOutAlt, FaBars } from "react-icons/fa";
import logo from "../assets/images/mainlogo.png";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle state

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`flex flex-col h-screen bg-black text-white ${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 fixed`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center py-6">
          <img
            src={logo}
            alt="BookWorm Logo"
            className={`w-12 h-12 ${isOpen ? "mb-2" : ""}`}
          />
          <h1
            className={`text-lg font-bold ${
              isOpen ? "mt-2" : "hidden"
            } lg:block`}
          >
            BookWorm <span className="text-gray-400 text-sm">Library</span>
          </h1>
        </div>

        {/* Navigation Menu */}
        <div className="flex-grow">
          <ul className="flex flex-col space-y-1 mt-6">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center space-x-4 px-4 py-3 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              >
                <FaTachometerAlt className="text-lg" />
                {isOpen && <span className="text-sm">Dashboard</span>}
              </NavLink>
            </li>
            {/* Catalog */}
            <li>
              <NavLink
                to="/catalog"
                className="flex items-center space-x-4 px-4 py-3 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              >
                <FaBook className="text-lg" />
                {isOpen && <span className="text-sm">Catalog</span>}
              </NavLink>
            </li>
            {/* Books */}
            <li>
              <NavLink
                to="/books"
                className="flex items-center space-x-4 px-4 py-3 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              >
                <FaBook className="text-lg" />
                {isOpen && <span className="text-sm">Books</span>}
              </NavLink>
            </li>
            {/* Users */}
            <li>
              <NavLink
                to="/users"
                className="flex items-center space-x-4 px-4 py-3 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              >
                <FaUsers className="text-lg" />
                {isOpen && <span className="text-sm">Users</span>}
              </NavLink>
            </li>
            {/* Branches */}
            <li>
              <NavLink
                to="/branches"
                className="flex items-center space-x-4 px-4 py-3 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              >
                <FaWarehouse className="text-lg" />
                {isOpen && <span className="text-sm">Branches</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logout Section */}
        <div className="mt-auto mb-6">
          <NavLink
            to="/logout"
            className="flex items-center space-x-4 px-4 py-3 text-gray-400 transition-all duration-200 hover:bg-red-600 hover:text-white"
          >
            <FaSignOutAlt className="text-lg" />
            {isOpen && <span className="text-sm">Log Out</span>}
          </NavLink>
        </div>
      </div>

      {/* Responsive Toggle Button */}
      <div
        className="absolute top-5 left-5 text-white bg-black p-2 rounded-md cursor-pointer md:hidden lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </div>

      {/* Main Content Placeholder */}
      <div
        className={`ml-${isOpen ? "64" : "20"} transition-all duration-300 flex-grow bg-gray-100 p-4`}
      >
        <h1 className="text-gray-800 text-2xl">Welcome to BookWorm Library</h1>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default LandingPage;
