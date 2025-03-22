import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { selectTotalCartAmount } from '../../../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectLogin, logout } from "../../../store/loginSlice";
import LoginPopup from "../../LoginPopup/LoginPopup"; // Import LoginPopup

const Header = () => {
  const getTotalCartAmount = useSelector(selectTotalCartAmount);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to control LoginPopup visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin); // Get auth state
  const isAuthenticated = !!loginState.data; // Check if logged in
  const user = loginState.data?.user; // Get user info from state

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

  const handleOrdersClick = () => {
    navigate("/myOrders", { state: { userId: user?.id } });
    setShowDropdown(false);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold text-red-600">
          Iphone
        </a>
      </div>
      {/* Navigation */}
      <nav className="hidden space-x-8 md:flex">
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
        <button className="relative text-gray-700 hover:text-red-600">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <i className="fas fa-shopping-cart">
            {getTotalCartAmount === 0 ? "" : <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full"></span>}
          </i>
        </button>

        <div className="relative">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
              >
                <img
                  src={user?.avatar || "https://i.pravatar.cc/150?img=3"}
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li
                      className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={handleOrdersClick}
                    >
                      Orders
                    </li>
                    <li className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                      Settings
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => {
                console.log("Login button clicked");
                setShowLoginPopup(true); // Show LoginPopup
              }}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Render LoginPopup */}
      {showLoginPopup && (
        <>
          {console.log("Rendering LoginPopup")}
          <LoginPopup onClose={() => setShowLoginPopup(false)} />
        </>
      )}
    </header>
  );
};

export default Header;
