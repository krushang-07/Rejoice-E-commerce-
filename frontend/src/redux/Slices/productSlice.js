import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
});

// Async thunk to fetch all products for normal all product fetch
// export const fetchProducts = createAsyncThunk(
//   "products/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get("/products"); // Endpoint to fetch products
//       return response.data; // Return the products data from the response
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch products"
//       );
//     }
//   }
// );

// Async thunk for fetching products based on query
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ search, page, limit, type, sort }, { rejectWithValue }) => {
    try {
      // Construct the query parameters dynamically
      const response = await API.get("/products", {
        params: {
          page, // Page number (e.g., 1)
          limit, // Items per page (e.g., 10)
          type,
          search,
          sort, // Sorting parameter (e.g., "asc" or "desc")
        },
      });
      return response.data; // Return the products data from the response
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/${productId}`);
      console.log("API Response:", response.data); // Debugging line
      return response.data; // The product data
    } catch (error) {
      console.error(error); // More detailed error handling
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);

// Initial state
const initialState = {
  products: [],
  product: null, // To store single product details
  loading: false,
  error: null,
};

// Create a slice for products
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload; // Set fetched products to state
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set error message for fetching products
    });

    // Handle fetching a single product by ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload; // Set the fetched product details to state
      // console.log(state.product);
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set error message for fetching product details
    });
  },
});

export default productSlice.reducer;
