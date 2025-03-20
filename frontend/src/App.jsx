import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu.jsx";
import LoginPopups from "./components/LoginPopup/LoginPopup.jsx";
import ProductDetaiil from "./pages/ProductDetail/ProductDetaiil.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import OrderDetail from "./pages/OrderDetail/OrderDetail.jsx";
import Dtdd from "./pages/Dtdd/Dtdd.jsx";
import Laptop from "./pages/Laptop/Laptop.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetaiil />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orderdetail" element={<OrderDetail />} />
          <Route path="/dtdd" element={<Dtdd />} />
          <Route path="/laptop" element={<Laptop />} />
        </Routes>
        <LoginPopups />
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
