import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice.js";
import { removeFromCart } from "../../store/cartSlice.js";
import { selectCartItems } from "../../store/cartSlice";

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    console.log('cartItems',cartItems);
    
    const handleProductClick = () => {
        navigate(`/product/`);
    };
      // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    // const value = "add";
    // const array = [ "update", "delete","view"];
    // const isAuthent = array.includes(value);
    // console.log(isAuthent);
    dispatch(addToCart(product));
  };
    // Hàm xử lý giảm số lượng sản phẩm trong giỏ hàng
    const handleRemoveFromCart = (e) => {
      e.stopPropagation();
      // dispatch(removeFromCart(product)); // Sai: truyền cả object
      dispatch(removeFromCart(product._id)); // Đúng: chỉ truyền _id
    };
  
  return (
    <div
      className="p-4 border rounded-lg shadow-md bg-white group cursor-pointer flex flex-col justify-between"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img
          src={ 
            product.image != null
              ? `http://localhost:3000/images/${product.image}`
              : "http://localhost:3000/images/default_product.jpg"
          }
          alt={product.name}
          className="h-50 w-full object-cover rounded-lg transition-transform duration-300 group-hover:-translate-y-2"
        />
      </div>
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
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
                className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
              >
                -
              </button>
              <span className="text-center text-black font-medium">
                {cartItems.find((item) => item._id === product._id)?.quantity }
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
              > 
                +
              </button> 
            </>
          ) : (
            <button
                 onClick={handleAddToCart}
              className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
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
