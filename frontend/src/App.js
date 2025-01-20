import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.js";
import { ToastContainer } from "react-toastify";
import Loader from "./utils/Loader.js";
import Offer from "./components/Offer.js";
import AdminNavbar from "./components/AdminNavBar.js";

const HomePage = lazy(() => import("./pages/HomePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AboutPage = lazy(() => import("./pages/AboutPage.js"));
const LoginPage = lazy(() => import("./pages/LoginPage.js"));
const SignupPage = lazy(() => import("./pages/SignupPage.js"));
const CartPage = lazy(() => import("./pages/CartPage.js"));
const ProductPage = lazy(() => import("./pages/ProductPage.js"));
const ProductItemPage = lazy(() => import("./pages/ProductItemPage.js"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage.js"));
const AdminProduct = lazy(() => import("./pages/AdminProducts.js"));
const RevenueChartPage = lazy(() => import("./pages/RevenueChartPage.js"));
const AdminOrders = lazy(() => import("./components/AdminOrders.js"));
const Chatbot = lazy(() => import("./components/Chatbot.js"));
const ContactUsPage = lazy(() => import("./components/ContactUs.js"));
const Cancel = lazy(() => import("./components/Cancel"));
const Orders = lazy(() => import("./components/Orders"));
const Success = lazy(() => import("./components/Success.js"));

const roleBasedRoutes = {
  customer: [
    { path: "/", element: <HomePage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/products", element: <ProductPage /> },
    { path: "/product/:id", element: <ProductItemPage /> },
    { path: "/checkout", element: <CheckOutPage /> },
    { path: "/chat-bot", element: <Chatbot /> },
    { path: "/contact-us", element: <ContactUsPage /> },
    { path: "/success", element: <Success /> },
    { path: "/cancel", element: <Cancel /> },
    { path: "/orders", element: <Orders /> },
    { path: "/about", element: <AboutPage /> },
  ],
  admin: [
    { path: "/", element: <AdminPage /> },
    { path: "/admin/products", element: <AdminProduct /> },
    { path: "/admin/revenue-chart", element: <RevenueChartPage /> },
    { path: "/admin/orders", element: <AdminOrders /> },
  ],
};

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "customer");

  useEffect(() => {
    const handleStorageChange = () => {
      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  console.log(role);

  const generateRoutes = (role) => {
    const commonRoutes = [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ];

    const roleRoutes = roleBasedRoutes[role] || [];

    return [...commonRoutes, ...roleRoutes];
  };
  // console.log(generateRoutes("customer"));
  // console.log(generateRoutes("admin"));

  return (
    <Router>
      <Offer />
      {role === "admin" ? <AdminNavbar /> : <Navbar />}
      <ToastContainer />
      <Routes>
        {generateRoutes(role).map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={<Suspense fallback={<Loader />}>{element}</Suspense>}
          />
        ))}
        <Route
          path="*"
          element={<Navigate to={role === "admin" ? "/" : "/"} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
