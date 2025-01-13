import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.js";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import CartPage from "./pages/CartPage.js";
import ProductPage from "./pages/ProductPage.js";
import AboutPage from "./pages/AboutPage.js";
import ProductItemPage from "./pages/ProductItemPage.js";
import CheckOutPage from "./pages/CheckOutPage.js";
import Chatbot from "./components/Chatbot.js";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./utils/PrivateRoutes.js"; // Import PrivateRoute
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <HomePage />
            </PrivateRoute>
          }
        />
        {/* Other routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductItemPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/chat-bot" element={<Chatbot />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
