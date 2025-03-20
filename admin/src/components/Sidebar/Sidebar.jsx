import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // State to toggle sidebar color between dark and light mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleSidebarColor = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-100" : "bg-white"}`}>
      {/* Sidebar */}
      <div
        className={`flex flex-col w-64 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } p-4`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-12">
          <span className="text-xl font-semibold">Logo</span>
        </div>

        {/* Sidebar Color Toggle Button */}
        <div className="flex justify-center mt-4">
          <FontAwesomeIcon
            icon={faPalette}
            onClick={toggleSidebarColor}
            className="cursor-pointer"
          />
        </div>

        {/* Menu Items */}
        <nav className="mt-10">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5 ${
                isActive
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-black hover:bg-gray-300"
              }`
            }
          >
            <span className="mx-4">Add Product</span>
          </NavLink>

          <NavLink
            to="/addcate"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5 ${
                isActive
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-black hover:bg-gray-300"
              }`
            }
          >
            <span className="mx-4">Add Category</span>
          </NavLink>

          <NavLink
            to="/addsubcate"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5 ${
                isActive
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-black hover:bg-gray-300"
              }`
            }
          >
            <span className="mx-4">Add SubCategory</span>
          </NavLink>

          <NavLink
            to="/list"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5 ${
                isActive
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-black hover:bg-gray-300"
              }`
            }
          >
            <span className="mx-4">List Product</span>
          </NavLink>

          <NavLink
            to="/order"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5 ${
                isActive
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-black hover:bg-gray-300"
              }`
            }
          >
            <span className="mx-4">All Orders</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5 ${
                isActive
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-black hover:bg-gray-300"
              }`
            }
          >
            <span className="mx-4">All Users</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
