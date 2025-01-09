import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
});

// Async actions using createAsyncThunk
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await API.post("/cart", { userId }); // Correct endpoint for fetching cart
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addToCartAction = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await API.post("/cart/add", {
        userId,
        productId,
        quantity,
      }); // Correct endpoint for adding to cart
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromCartAction = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      await API.delete("/cart/remove", {
        data: { productId },
      }); // Correct endpoint for removing from cart
      return productId; // Return the product ID for removal
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCartAction = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await API.patch("/cart/update", { productId, quantity }); // Correct endpoint for updating cart
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCartState: (state) => {
      state.loading = false;
      state.error = null;
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCartAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
      })
      .addCase(addToCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCartAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeFromCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartAction.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItemIndex = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (updatedItemIndex !== -1) {
          state.cartItems[updatedItemIndex] = action.payload;
        }
      })
      .addCase(updateCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
