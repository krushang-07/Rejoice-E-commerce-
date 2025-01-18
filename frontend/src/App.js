import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.js";
import { ToastContainer } from "react-toastify";
import Loader from "./utils/Loader.js";
import Offer from "./components/Offer.js";

import AdminNavbar from "./components/AdminNavBar.js";
import Protected from "./utils/Protected";
import ProtectedAdmin from "./utils/AdminProtected.js";

const AdminProduct = lazy(() => import("./pages/AdminProducts.js"));
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
const Cancel = lazy(() => import("./components/Cancel"));
const Orders = lazy(() => import("./components/Orders"));
const Success = lazy(() => import("./components/Success.js"));

function App() {
  const role = localStorage.getItem("role");
  return (
    <Router>
      <Offer />
      {role === "admin" ? <AdminNavbar /> : <Navbar />}
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedAdmin>
                <AdminProduct />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/products"
            element={
              <Protected>
                <ProductPage />
              </Protected>
            }
          />
          <Route
            path="/about"
            element={
              <Protected>
                <AboutPage />
              </Protected>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Protected>
                <ProductItemPage />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <CheckOutPage />
              </Protected>
            }
          />
          <Route
            path="/chat-bot"
            element={
              <Protected>
                <Chatbot />
              </Protected>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Protected>
                <ContactUsPage />
              </Protected>
            }
          />
          <Route
            path="/success"
            element={
              <Protected>
                <Success />
              </Protected>
            }
          />
          <Route
            path="/cancel"
            element={
              <Protected>
                <Cancel />
              </Protected>
            }
          />
          <Route
            path="/orders"
            element={
              <Protected>
                <Orders />
              </Protected>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
