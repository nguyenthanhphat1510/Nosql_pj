import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { selectTotalCartAmount, selectCartItems, removeFromCart } from "../../store/cartSlice";
import { selectLogin } from "../../store/loginSlice";

const PlaceOrder = () => {
  const dispatch = useDispatch(); // Khởi tạo hook useDispatch
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const [deliveryInfo, setDeliveryInfo] = useState({
    recipientName: "",
    phoneNumber: "",
    shippingAddress: "",
  });

  const getTotalCartAmount = useSelector(selectTotalCartAmount);
  const cartItems = useSelector(selectCartItems);
  const loginState = useSelector(selectLogin);
  const userId = loginState.data?.user?._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường thông tin giao hàng đã được điền
    const isValid = Object.values(deliveryInfo).every((field) => field.trim() !== "");
    if (!isValid) {
      toast.error("Please fill in all delivery information.");
      return;
    }

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    // Tạo đối tượng orderData theo cấu trúc mà backend yêu cầu
    const orderData = {
      userId,
      items: cartItems,
      status: "pending", // trạng thái mặc định
      address: deliveryInfo,
      payment: "cod", // giả sử thanh toán bằng tiền mặt (cash on delivery)
      amount: (getTotalCartAmount + 30000).toString(), // chuyển tổng tiền thành chuỗi
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/order/create",
        orderData
      );

      // Xóa từng sản phẩm khỏi giỏ hàng
      cartItems.forEach((item) => {
        dispatch(removeFromCart(item._id));
      });

      toast.success("Order placed successfully!");
      navigate("/myOrders"); // Điều hướng đến trang "Đơn hàng của tôi"
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed. Please try again.");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Delivery Information */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="recipientName"
                placeholder="Your name to order"
                className="p-3 border rounded-md"
                value={deliveryInfo.recipientName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Your phone number"
                className="p-3 border rounded-md"
                value={deliveryInfo.phoneNumber}
                onChange={handleChange}
              />
              <textarea
                name="shippingAddress"
                placeholder="Your order address"
                className="col-span-2 p-3 border rounded-md"
                value={deliveryInfo.shippingAddress}
                onChange={handleChange}
                rows="4"
                cols="50"
              />
            </div>
          </div>

          {/* Cart Totals */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Cart Totals</h2>
            <div className="p-6 border rounded-md bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {getTotalCartAmount !== undefined
                      ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(getTotalCartAmount)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {30000
                      ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(30000)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {getTotalCartAmount !== undefined
                      ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(getTotalCartAmount + 30000)
                      : "N/A"}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition bg-orange-500 rounded-md hover:bg-orange-600"
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
