import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order/list");
        // Kiểm tra theo cấu trúc { success: true, data: orders }
        if (
          response.data.success   
        ) {
          setOrder(response.data.data[1]); // Lấy đơn hàng đầu tiên trong mảng
        } else {
          toast.error("Không tìm thấy đơn hàng nào.");
        }
        console.log('data',response.data.data[1]);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Lỗi khi lấy dữ liệu đơn hàng."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p>Đang tải dữ liệu đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-4">
        <p>Không có dữ liệu đơn hàng.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
        >
          Quay lại
        </button>
      </div>
    );
  }

  // Destructure các trường dữ liệu từ order
  const { _id, address, items, amount, status, payment, date } = order;
  console.log('items',items)
  const formattedDate = new Date(date).toLocaleString("vi-VN");
  const numericAmount = parseFloat(amount);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Thông tin chung của đơn hàng */}
        <h1 className="text-3xl font-bold mb-4">Chi tiết đơn hàng</h1>
        <div className="mb-6">
          <p><strong>Mã đơn hàng:</strong> {_id}</p>
          <p><strong>Ngày đặt:</strong> {formattedDate}</p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span className="capitalize text-orange-600">{status}</span>
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong>{" "}
            {payment.toUpperCase()}
          </p>
        </div>

        {/* Thông tin giao hàng */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Thông tin giao hàng</h2>
          {address ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Họ và tên:</strong>{" "}
                  {address.firstName} {address.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {address.email}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {address.phone}
                </p>
              </div>
              <div>
                <p>
                  <strong>Địa chỉ:</strong> {address.street}
                </p>
                <p>
                  <strong>Thành phố:</strong> {address.city}
                </p>
                <p>
                  <strong>Tiểu bang:</strong> {address.state}
                </p>
                <p>
                  <strong>Mã bưu điện:</strong> {address.zip}
                </p>
                <p>
                  <strong>Quốc gia:</strong> {address.country}
                </p>
              </div>
            </div>
          ) : (
            <p>Không có thông tin giao hàng.</p>
          )}
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Tóm tắt đơn hàng</h2>
          <p>
            <strong>Tổng tiền:</strong>{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(numericAmount)}
          </p>
        </div>

        {/* Danh sách sản phẩm */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Sản phẩm đã đặt</h2>
          {items && items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => {
                // Nếu có trường image, giả sử ảnh nằm trong thư mục uploads
                return (
                  <div
                    key={item._id}
                    className="flex items-center p-4 border rounded-md"
                  >
                    <img
                      src={
                        item.image
                          ? `http://localhost:3000/images/${item.image}`
                          : "http://localhost:3000/images/default_product.jpg"
                      }
                      className="w-24 h-24 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gray-600">
                        Giá:{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(parseFloat(item.price))}
                      </p>
                      <p className="text-gray-600">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Không có sản phẩm nào trong đơn hàng.</p>
          )}
        </div>

        <button
          onClick={() => navigate("/myorders")}
          className="mt-8 px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Quay lại danh sách đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
