import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPopups from "./components/LoginPopup/LoginPopup.jsx";
import Add from "./pages/Add/Add.jsx";
import AddCate from "./pages/Add/AddCate.jsx";
import AddSubCategory from "./pages/Add/AddSubCategory.jsx";
import ListProduct from "./pages/Add/ListProduct.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="flex-grow p-6">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<LoginPopups />} />
            <Route path="/add" element={<Add />} />
            <Route path="/addcate" element={<AddCate />} />
            <Route path="/addsubcate" element={<AddSubCategory />} />
            <Route path="/list" element={<ListProduct />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
