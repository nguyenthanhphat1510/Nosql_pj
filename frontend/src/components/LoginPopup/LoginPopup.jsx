import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/loginSlice.js";


const LoginPopup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPopup, setShowPopup] = useState(true);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.auth);
  console.log('data', data);


  // Toggle between Login and Sign Up mode
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");

  const onChangeUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((preUser) => ({ ...preUser, [name]: value }));
  };

  const onAuth = async (e) => {
    e.preventDefault();

    dispatch(login(user));
    let url = "http://localhost:3000/";
    if (isLogin) {
      url += 'api/user/login';
    } else {
      url += 'api/user/register';
    }
    const response = await axios.post(url, user)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setShowPopup(false)
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(response.data);
  };
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-8 bg-white rounded-lg shadow-lg w-96">
            <button
              className="absolute text-gray-600 top-4 right-4 hover:text-gray-900"
              onClick={onClose} // Gọi hàm onClose khi đóng popup
            >
              x
            </button>
            <h2 className="mb-6 text-2xl font-semibold text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={onAuth}>
              {!isLogin && (
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => onChangeUser(e)}
                    placeholder="Your name"
                    className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              )}
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => onChangeUser(e)}
                  placeholder="email@gmail.com"
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => onChangeUser(e)}
                  placeholder="Password"
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              {/* <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">
              By continuing, I agree to the terms of use & privacy policy.
            </span>
          </div> */}
              <button
                type="submit"
                className="w-full py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                {isLogin ? "Login" : "Create account"}
              </button>

              <div className="mt-4 text-sm text-center text-gray-600">
                {isLogin ? (
                  <>
                    Create a new account?{" "}
                    <span
                      className="text-red-500 cursor-pointer hover:underline"
                      onClick={toggleMode}
                    >
                      Click here
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-red-500 cursor-pointer hover:underline"
                      onClick={toggleMode}
                    >
                      Login here
                    </span>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
