import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
});

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (
    { search, page, limit, type, sort, maxPrice, minPrice, brand },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.get("/products", {
        params: {
          page,
          limit,
          type,
          search,
          sort,
          minPrice,
          maxPrice,
          brand,
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

// Async thunk to fetch all products without any query parameters (for home page)
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllWithoutParams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/products"); // No query params
      return response.data; // Return the products data from the response
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Update product by ID
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/products/${id}`, productData);
      return response.data; // Return updated product
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// Delete product by ID
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${id}`);
      return id; // Return the deleted product ID
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product"
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
  hasMore: true,
  updateStatus: null,
  deleteStatus: null,
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
      state.hasMore = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set error message for fetching products
      state.hasMore = false;
    });

    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload; // Set all products to state
      state.hasMore = action.payload.products.length > 0;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set error message
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
    // Update product
    builder.addCase(updateProduct.pending, (state) => {
      state.updateStatus = "pending";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.updateStatus = "success";
      const updatedProduct = action.payload;
      const index = state.products.products.findIndex(
        (p) => p._id === updatedProduct._id
      );
      if (index !== -1) {
        state.products.products[index] = updatedProduct;
      }
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.updateStatus = "failed";
      state.error = action.payload;
    });

    // Delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.deleteStatus = "pending";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteStatus = "success";
      state.products.products = state.products.products.filter(
        (p) => p._id !== action.payload
      );
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.deleteStatus = "failed";
      state.error = action.payload;
    });
  },
});

// Export the reducer to configure the store
export default productSlice.reducer;
