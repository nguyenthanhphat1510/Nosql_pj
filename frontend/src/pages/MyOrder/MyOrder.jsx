import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectLogin } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // State to store user's orders
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate();
  const loginState = useSelector(selectLogin);
  const token = loginState.data?.token; // Get token from Redux state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order/myOrders", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });

        if (response.data.success) {
          setOrders(response.data.data); // Set the orders in state
        } else {
          toast.error("Không tìm thấy đơn hàng nào.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Lỗi khi lấy danh sách đơn hàng.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    if (token) {
      fetchOrders();
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [token, navigate]);

  if (loading) {
    return <div className="container p-4 mx-auto">Đang tải...</div>;
  }

  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Danh sách đơn hàng</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id} // Unique key for each order
              className="p-4 bg-white border rounded-md shadow-md cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/orderDetail`, { state: { orderId: order._id } })} // Navigate to order detail page
            >
              <p><strong>Mã đơn hàng:</strong> {order._id}</p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(parseFloat(order.amount))}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className="text-orange-600">{order.status}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có đơn hàng nào.</p>
      )}
    </div>
  );
};

export default MyOrders;