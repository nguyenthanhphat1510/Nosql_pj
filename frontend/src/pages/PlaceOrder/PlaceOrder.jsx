import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { selectTotalCartAmount, selectCartItems } from "../../store/cartSlice";
import { selectLogin } from "../../store/loginSlice";

const PlaceOrder = () => {
  // const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
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
      address: deliveryInfo,
      items: cartItems,
      amount: (getTotalCartAmount + 30000).toString(), // chuyển tổng tiền thành chuỗi
      status: "pending", // trạng thái mặc định
      payment: "cod",  // giả sử thanh toán bằng tiền mặt (cash on delivery)
    };

    try {
      // Nếu cần token để xác thực, có thể lấy từ loginState (thí dụ: loginState.data.token)
      // const token = loginState.data?.token || loginState.token;
      const response = await axios.post(
        "http://localhost:3000/api/order/create",
        orderData,
      );
      localStorage.removeItem('cartItems');
      toast.success("Order placed successfully!");

      // navigate("/myorders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed. Please try again.");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Delivery Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="border rounded-md p-3"
                value={deliveryInfo.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="border rounded-md p-3"
                value={deliveryInfo.lastName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="col-span-2 border rounded-md p-3"
                value={deliveryInfo.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                className="col-span-2 border rounded-md p-3"
                value={deliveryInfo.street}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="border rounded-md p-3"
                value={deliveryInfo.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="border rounded-md p-3"
                value={deliveryInfo.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip code"
                className="border rounded-md p-3"
                value={deliveryInfo.zip}
                onChange={handleChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="border rounded-md p-3"
                value={deliveryInfo.country}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="col-span-2 border rounded-md p-3"
                value={deliveryInfo.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Cart Totals */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
            <div className="border rounded-md p-6 bg-gray-50">
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
                <div className="flex justify-between font-bold text-lg">
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
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
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
