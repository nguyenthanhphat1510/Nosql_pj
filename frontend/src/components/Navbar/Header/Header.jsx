import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { selectTotalCartAmount } from '../../../store/cartSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header = () => {
  const getTotalCartAmount = useSelector(selectTotalCartAmount);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold text-red-600">
          Iphone
        </a>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-8">
        <a href="#home" className="text-gray-700 hover:text-red-600">
          Home
        </a>
        <a href="#menu" className="text-gray-700 hover:text-red-600">
          Menu
        </a>
        <a href="#contact" className="text-gray-700 hover:text-red-600">
          Contact Us
        </a>
      </nav>

      {/* Icons (Search, Cart, Sign In) */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-700 hover:text-red-600 relative">
           <Link to="/cart"> 
          <FontAwesomeIcon icon={faCartShopping} />
           </Link> 
          <i className="fas fa-shopping-cart">
          { getTotalCartAmount === 0 ? "" : <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>}
          </i>
        </button>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            {/* Avatar or Initials */}
            <img
              src="https://i.pravatar.cc/150?img=3" // Replace with dynamic user avatar URL
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <ul className="py-1">
                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Orders
                </li>
                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
