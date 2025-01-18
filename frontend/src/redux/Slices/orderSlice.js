import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Async thunk to fetch user orders based on userId
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/orders/${userId}`);
      return response.data; // Return orders data for the specific user
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching orders");
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching all orders"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
