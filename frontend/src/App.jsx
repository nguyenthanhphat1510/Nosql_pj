import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu.jsx";
import LoginPopups from "./components/LoginPopup/LoginPopup.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import OrderDetail from "./pages/OrderDetail/OrderDetail.jsx";
import Dtdd from "./pages/Dtdd/Dtdd.jsx";
import Laptop from "./pages/Laptop/Laptop.jsx";
import MyOrders from "./pages/MyOrder/MyOrder.jsx";

const App = () => {
  // State để kiểm soát hiển thị LoginPopups
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Hàm để đóng LoginPopups
  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orderDetail" element={<OrderDetail />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/dtdd" element={<Dtdd />} />
          <Route path="/laptop" element={<Laptop />} />
        </Routes>
        {/* Hiển thị LoginPopups dựa trên state */}
        {showLoginPopup && <LoginPopups onClose={closeLoginPopup} />}
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
