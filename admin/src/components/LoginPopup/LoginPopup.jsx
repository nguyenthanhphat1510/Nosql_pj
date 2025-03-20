import React from 'react'
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";  
import { useNavigate } from "react-router-dom";
const LoginPopup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPopup, setShowPopup] = useState(true);
    const navigate = useNavigate();

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
        // dispatch(login(user));
        let url = "http://localhost:3000/";
        if (isLogin) {
          url += 'api/admin/login';
        } else {
          url += 'api/user/register';
        }
        const response = await axios.post(url, user)  
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          setShowPopup(false)
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
        console.log(response.data);
      };
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            onClick={() => setShowPopup(false)}
          >
            x
          </button>
          <h2 className="text-2xl font-semibold mb-6 text-center">
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
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            )}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                onChange={(e) => onChangeUser(e)}
                placeholder="email@gmail.com"
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                onChange={(e) => onChangeUser(e)}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">
              By continuing, I agree to the terms of use & privacy policy.
            </span>
          </div> */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              {isLogin ? "Login" : "Create account"}
            </button>

            {/* <div className="mt-4 text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  Create a new account?{" "}
                  <span
                    className="text-red-500 cursor-pointer hover:underline"
                    // onClick={toggleMode}
                  >
                    Click here
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-red-500 cursor-pointer hover:underline"
                    // onClick={toggleMode}
                  >
                    Login here
                  </span>
                </>
              )}
            </div> */}
          </form>
        </div>
    </div>
     )}
    </>
  )
}

export default LoginPopup