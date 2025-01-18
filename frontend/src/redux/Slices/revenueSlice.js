import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchLifetimeRevenue = createAsyncThunk(
  "revenue/fetchLifetimeRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/revenue/lifetime-revenue");
      return response.data.data.lifetimeRevenue;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch lifetime revenue"
      );
    }
  }
);

export const fetchRevenueByPeriod = createAsyncThunk(
  "revenue/fetchRevenueByPeriod",
  async (period, { rejectWithValue }) => {
    try {
      const response = await API.get(`/revenue/total-revenue?period=${period}`);
      const transformedData = response.data.map((item) => ({
        date: item._id,
        revenue: item.totalRevenue,
      }));

      return transformedData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch revenue by period"
      );
    }
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    lifetimeRevenue: 0,
    revenueByPeriod: [],
    status: {
      lifetime: "idle",
      periods: "idle",
    },
    error: {
      lifetime: null,
      periods: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLifetimeRevenue.pending, (state) => {
        state.status.lifetime = "loading";
      })
      .addCase(fetchLifetimeRevenue.fulfilled, (state, action) => {
        state.status.lifetime = "succeeded";
        state.lifetimeRevenue = action.payload;
      })
      .addCase(fetchLifetimeRevenue.rejected, (state, action) => {
        state.status.lifetime = "failed";
        state.error.lifetime = action.payload;
      });

    builder
      .addCase(fetchRevenueByPeriod.pending, (state) => {
        state.status.periods = "loading";
      })
      .addCase(fetchRevenueByPeriod.fulfilled, (state, action) => {
        state.status.periods = "succeeded";
        state.revenueByPeriod = action.payload;
      })
      .addCase(fetchRevenueByPeriod.rejected, (state, action) => {
        state.status.periods = "failed";
        state.error.periods = action.payload;
      });
  },
});

export default revenueSlice.reducer;
