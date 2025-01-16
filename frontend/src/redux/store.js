import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import userReducer from "./Slices/userSlice";
import productsReducer from "./Slices/productSlice";
import orderReducer from "./Slices/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
    orders: orderReducer,
  },
});

export default store;
