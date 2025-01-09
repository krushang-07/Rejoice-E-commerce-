import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import userReducer from "./Slices/userSlice";
import productsReducer from "./Slices/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
  },
});

export default store;
