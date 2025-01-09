import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// // Example endpoints
// export const login = (formData) => API.post("/users/login", formData);
// export const signup = (formData) => API.post("/users/register", formData);

// Product APIs
// export const getAllProducts = () => API.get("/products");
export const createProduct = (productData) =>
  API.post("/products", productData);

// // Cart APIs
// export const getCart = ({ userId }) => API.post("/cart", { userId });
// export const addToCart = ({ userId, productId, quantity }) =>
//   API.post("/cart/add", { userId, productId, quantity });
// export const removeFromCart = (productId) =>
//   API.delete(`/cart/remove`, { data: { productId } });
// export const updateCart = (productId, quantity) =>
//   API.patch("/cart/update", { productId, quantity });
