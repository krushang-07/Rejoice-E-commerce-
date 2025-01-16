import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.js";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./utils/PrivateRoutes.js";
import axios from "axios";
import Loader from "./utils/Loader.js";
import Offer from "./components/Offer.js";
import Success from "./components/Success.js";
import Cancel from "./components/Cancel.js";
import Orders from "./components/Orders.js";

axios.defaults.baseURL = "http://localhost:5000/";

const HomePage = lazy(() => import("./pages/HomePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LoginPage = lazy(() => import("./pages/LoginPage.js"));
const SignupPage = lazy(() => import("./pages/SignupPage.js"));
const CartPage = lazy(() => import("./pages/CartPage.js"));
const ProductPage = lazy(() => import("./pages/ProductPage.js"));
const AboutPage = lazy(() => import("./pages/AboutPage.js"));
const ProductItemPage = lazy(() => import("./pages/ProductItemPage.js"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage.js"));
const Chatbot = lazy(() => import("./components/Chatbot.js"));
const ContactUsPage = lazy(() => import("./components/ContactUs.js"));

function App() {
  return (
    <Router>
      <Offer />
      <Navbar />
      <ToastContainer />
      <Suspense fallback={<Loader />}>
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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductItemPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/chat-bot" element={<Chatbot />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
