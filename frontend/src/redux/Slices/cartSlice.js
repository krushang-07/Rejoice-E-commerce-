import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Async actions for cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await API.post("/cart", { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching cart"
      );
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
      });
      console.log(response.data.quantity);
      console.log(response.data.items);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding to cart"
      );
    }
  }
);

export const removeFromCartAction = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await API.delete("/cart/remove", { data: { userId, productId } });
      return productId; // Return product ID to remove it from cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error removing item"
      );
    }
  }
);

export const updateCartAction = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await API.patch("/cart/update", { productId, quantity });
      return response.data; // Return updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating cart"
      );
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
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items; // Handle correct structure
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
        state.cartItems = action.payload.items;
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
        state.cartItems = action.payload.items; // Update items
      })
      .addCase(updateCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
