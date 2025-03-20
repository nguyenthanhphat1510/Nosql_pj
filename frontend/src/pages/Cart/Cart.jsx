import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../../store/cartSlice';
import { selectLogin } from '../../store/loginSlice';
import { selectTotalCartAmount } from '../../store/cartSlice';
// import { selectUserId } from '../../store/loginSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems); 
  // Hàm tính tổng tiền giỏ hàng
  const getTotalCartAmount = useSelector(selectTotalCartAmount);
  // const { data, loading, error } = useSelector((state) => state.login);
  // console.log(data);
    // Lấy dữ liệu người dùng từ Redux store (ví dụ slice login)
    const loginState = useSelector(selectLogin);
    const userId = loginState.data?.user?._id;
    console.log(userId);
    const array = ["add", "update", "delete","view"];
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Cart</h2>

      {/* Bảng hiển thị các sản phẩm trong giỏ hàng */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-4">
                    <img
                      src={
                        item.image
                          ? `http://localhost:3000/images/${item.image}`
                          : "http://localhost:3000/images/default_product.jpg"
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-4">{item.name}</td>
                  <td className="px-4 py-4">
                    {item.price
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4">{item.quantity}</td>
                  <td className="px-4 py-4">
                    {item.price && item.quantity
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.quantity)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phần hiển thị tổng tiền và nút chuyển đến trang đặt hàng */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-4">Cart Totals</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(getTotalCartAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(30000)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(getTotalCartAmount + 30000)}
              </span>
            </div>
          </div>
          <Link to="/order">
            <button className="mt-4 px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>

        {/* Phần nhập mã giảm giá */}
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-bold mb-4">
            If you have a promo code, enter it here
          </h3>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Promo code"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button className="px-6 py-2 text-white bg-black rounded hover:bg-gray-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
