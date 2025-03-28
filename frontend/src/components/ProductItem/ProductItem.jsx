import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice.js";
import { removeFromCart } from "../../store/cartSlice.js";
import { selectCartItems } from "../../store/cartSlice";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`); // Truyền ID của sản phẩm vào URL
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click vào sản phẩm
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click vào sản phẩm
    dispatch(removeFromCart(product._id)); // Chỉ truyền ID sản phẩm
  };

  return (
    <div
      className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-md cursor-pointer group"
      onClick={handleProductClick} // Điều hướng khi click vào sản phẩm
    >
      <div className="relative">
        <img
          src={
            product.image
              ? `http://localhost:3000/images/${product.image}`
              : "http://localhost:3000/images/default_product.jpg"
          }
          alt={product.name}
          className="object-cover w-full transition-transform duration-300 rounded-lg h-50 group-hover:-translate-y-2"
        />
      </div>
      <div className="flex-grow mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-bold text-red-500">
          {product.price
            ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)
            : "N/A"}
        </p>
        <div className="flex items-center space-x-2">
          {true ? (
            <>
              <button
                onClick={handleRemoveFromCart}
                className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full hover:bg-green-600"
              >
                -
              </button>
              <span className="font-medium text-center text-black">
                {cartItems.find((item) => item._id === product._id)?.quantity || 0}
              </span>
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full hover:bg-green-600"
              >
                +
              </button>
            </>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full hover:bg-green-600"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
