import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
});

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ search, page, limit, type, sort }, { rejectWithValue }) => {
    try {
      const response = await API.get("/products", {
        params: {
          page,
          limit,
          type,
          search,
          sort,
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

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/${productId}`);
      return response.data; // The product data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      // Prepare FormData to handle file uploads
      const formData = new FormData();

      // Append product details to FormData
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("brand", productData.brand);
      formData.append("model", productData.model);
      formData.append("color", productData.color);
      formData.append("discount", productData.discount);

      // Append image file to FormData if it exists
      if (productData.image) {
        formData.append("image", productData.image); // productData.image should be a File object
      }

      // Make the API call to create the product
      const response = await API.post("/products", formData);

      return response.data; // Return the newly created product data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// Initial state
const initialState = {
  products: [], // List of all products
  product: null, // Details of a single product
  loading: false, // Loading state
  error: null, // Error messages
  createStatus: null,
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
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set error message for fetching product details
    });

    // Handle creating a product
    builder.addCase(createProduct.pending, (state) => {
      state.createStatus = "pending";
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.createStatus = "success";
      if (Array.isArray(state.products)) {
        state.products.push(action.payload); // Add the new product to the list
      } else {
        state.products = [action.payload]; // Reinitialize if it's not an array
      }
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.createStatus = "failed";
      state.error = action.payload;
    });
  },
});

// Export the reducer to configure the store
export default productSlice.reducer;
