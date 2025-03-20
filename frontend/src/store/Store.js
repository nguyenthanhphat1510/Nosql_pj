import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    // Gắn slice login vào store
    auth: loginReducer,
    cart: cartReducer,
  },
});

export default store;
