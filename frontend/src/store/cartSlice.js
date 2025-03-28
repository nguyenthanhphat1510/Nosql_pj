import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "reselect";

// Khởi tạo state từ localStorage nếu có, nếu không thì mảng rỗng
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};
console.log("Initial cartItems:", JSON.parse(localStorage.getItem('cartItems')) || []);
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartItems.find(item => item._id === product._id);

      if (existingProduct) {
        // Cộng thêm số lượng từ action.payload.quantity
        existingProduct.quantity += product.quantity || 1;
      } else {
        // Thêm sản phẩm mới với số lượng từ action.payload.quantity
        state.cartItems.push({ ...product, quantity: product.quantity || 1 });
      }

      // Lưu lại dữ liệu vào localStorage sau mỗi lần cập nhật
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const productIndex = state.cartItems.findIndex(item => item._id === productId);

      if (productIndex !== -1) {
        // Nếu số lượng > 1 thì chỉ giảm đi 1, nếu = 1 thì xoá sản phẩm khỏi giỏ hàng
        if (state.cartItems[productIndex].quantity > 1) {
          state.cartItems[productIndex].quantity -= 1;
        } else {
          state.cartItems.splice(productIndex, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },


  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.cartItems;
// Trong cartSlice.js
export const selectTotalCartAmount = createSelector(
  selectCartItems,
  (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);

