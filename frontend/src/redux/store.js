import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import userReducer from "./Slices/userSlice";
import productsReducer from "./Slices/productSlice";
import orderReducer from "./Slices/orderSlice";
import revenueReducer from "./Slices/revenueSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
    orders: orderReducer,
    revenue: revenueReducer,
  },
});

export default store;
