import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const OrderDetail = () => {
  const [order, setOrder] = useState(null); 
  const [loading, setLoading] = useState(true); 
  
  const navigate = useNavigate();
  const location = useLocation(); 
  const { orderId } = location.state || {}; 

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        if (!orderId) {
          toast.error("Không tìm thấy ID đơn hàng.");
          navigate("/myorders");
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/order/${orderId}`);
        if (response.data.success) {
          setOrder(response.data.data); // Lưu thông tin đơn hàng vào state
        } else {
          toast.error("Không tìm thấy đơn hàng.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Lỗi khi lấy dữ liệu đơn hàng.");
      } finally {
        setLoading(false); // Dừng trạng thái loading
      }
    };

    fetchOrderDetail();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="container p-4 mx-auto">
        <p>Đang tải dữ liệu đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container p-4 mx-auto">
        <p>Không có dữ liệu đơn hàng.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mt-4 text-white bg-orange-500 rounded"
        >
          Quay lại
        </button>
      </div>
    );
  }

  // Destructure các trường dữ liệu từ order
  const { _id, address, orderDetails, amount, status, payment, date } = order;
  const formattedDate = new Date(date).toLocaleString("vi-VN");
  const numericAmount = parseFloat(amount);

  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
        {/* Thông tin chung của đơn hàng */}
        <h1 className="mb-4 text-3xl font-bold">Chi tiết đơn hàng</h1>
        <div className="mb-6">
          <p><strong>Mã đơn hàng:</strong> {_id}</p>
          <p><strong>Ngày đặt:</strong> {formattedDate}</p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span className="text-orange-600 capitalize">{status}</span>
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong>{" "}
            {payment.toUpperCase()}
          </p>
        </div>

        {/* Thông tin giao hàng */}
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold">Thông tin giao hàng</h2>
          {address ? (
            <div>
              <p><strong>Người nhận:</strong> {address.recipientName || "Chưa cập nhật"}</p>
              <p><strong>Số điện thoại:</strong> {address.phoneNumber || "Chưa cập nhật"}</p>
              <p><strong>Địa chỉ:</strong> {address.shippingAddress || "Chưa cập nhật"}</p>
            </div>
          ) : (
            <p>Không có thông tin giao hàng.</p>
          )}
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="mb-6">
          {/* <h2 className="mb-2 text-2xl font-semibold">Tóm tắt đơn hàng</h2> */}
          <p className="text-2xl text-red-700">
            <strong>Tổng tiền:</strong>{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(numericAmount)}
          </p>
        </div>

        {/* Danh sách sản phẩm */}
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Sản phẩm đã đặt</h2>
          {orderDetails && orderDetails.length > 0 ? (
            <div className="space-y-4">
              {orderDetails.map((detail) => (
                <div
                  key={detail._id}
                  className="flex items-center p-4 border rounded-md"
                >
                  <img
                    src={
                      detail.productId.image
                        ? `http://localhost:3000/images/${detail.productId.image}`
                        : "http://localhost:3000/images/default_product.jpg"
                    }
                    className="object-cover w-24 h-24 mr-4 rounded"
                    alt={detail.productId.name}
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{detail.productId.name}</h3>
                    <p className="text-gray-600">
                      Giá:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(detail.productId.price)}
                    </p>
                    <p className="text-gray-600">Số lượng: {detail.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có sản phẩm nào trong đơn hàng.</p>
          )}
        </div>

        <button
          onClick={() => navigate("/myorders")}
          className="px-6 py-3 mt-8 text-white transition bg-orange-500 rounded hover:bg-orange-600"
        >
          Quay lại danh sách đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
