import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
});

// Async thunks for user actions

// Login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/users/login", formData);
      return response.data; // Contains token, role, and userId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/users/register", formData);
      return response.data; // Contains the created user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Initial state
const initialState = {
  user: null, // Logged-in user's data
  token: null, // JWT token
  role: null, // User's role (customer/admin)
  loading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.userId;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions and reducer
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Base API configuration
// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // Replace with your backend base URL
// });

// // Async thunks for user actions

// // Login user
// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await API.post("/users/login", formData);
//       return response.data; // Contains token, role, and userId
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// // Register user
// export const registerUser = createAsyncThunk(
//   "user/register",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await API.post("/users/register", formData);
//       return response.data; // Contains the created user data
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// // Google Login
// export const googleLogin = createAsyncThunk(
//   "user/googleLogin",
//   async (googleData, { rejectWithValue }) => {
//     try {
//       const response = await API.post("/users/googleLogin", {
//         token: googleData.tokenId, // Send Google token to backend
//       });

//       const { token, userId, role } = response.data;
//       if (!token || !userId || !role) {
//         return rejectWithValue("Missing data from server");
//       }

//       // Store token in localStorage for persistence
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(userId));
//       localStorage.setItem("role", role);

//       return { token, userId, role }; // Return necessary data to Redux
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Google Login failed"
//       );
//     }
//   }
// );

// // Google Signup
// export const googleSignup = createAsyncThunk(
//   "user/googleSignup",
//   async (googleData, { rejectWithValue }) => {
//     try {
//       const response = await API.post("/users/googleSignup", {
//         token: googleData.tokenId, // Send Google token to backend
//       });

//       const { token, userId, role } = response.data;
//       if (!token || !userId || !role) {
//         return rejectWithValue("Missing data from server");
//       }

//       return { token, userId, role }; // Return necessary data to Redux
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Google Signup failed"
//       );
//     }
//   }
// );

// // Initial state
// const initialState = {
//   user: localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null,
//   token: localStorage.getItem("token") || null,
//   role: localStorage.getItem("role") || null,
//   loading: false,
//   error: null,
// };

// // User slice
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     logoutUser(state) {
//       state.user = null;
//       state.token = null;
//       state.role = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("role");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login user
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.role = action.payload.role;
//         state.user = action.payload.userId;
//         // Store the data in localStorage
//         localStorage.setItem("token", action.payload.token);
//         localStorage.setItem("user", JSON.stringify(action.payload.userId));
//         localStorage.setItem("role", action.payload.role);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Register user
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Google login
//       .addCase(googleLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.role = action.payload.role;
//         state.user = action.payload.userId;
//         // Store the data in localStorage
//         localStorage.setItem("token", action.payload.token);
//         localStorage.setItem("user", JSON.stringify(action.payload.userId));
//         localStorage.setItem("role", action.payload.role);
//       })
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export actions and reducer
// export const { logoutUser } = userSlice.actions;
// export default userSlice.reducer;
