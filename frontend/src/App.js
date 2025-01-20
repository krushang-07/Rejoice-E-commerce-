import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, useRoutes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.js";
import { ToastContainer } from "react-toastify";
import Loader from "./utils/Loader.js";
import Offer from "./components/Offer.js";

import AdminNavbar from "./components/AdminNavBar.js";
import Protected from "./utils/Protected";
import ProtectedAdmin from "./utils/AdminProtected.js";
import AdminOrders from "./components/AdminOrders.js";
import RevenueChartPage from "./pages/RevenueChartPage.js";

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

const AppRoutes = ({ role }) => {
  const routes = [
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },

    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/products", element: <ProductPage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/product/:id", element: <ProductItemPage /> },
        { path: "/checkout", element: <CheckOutPage /> },
        { path: "/chat-bot", element: <Chatbot /> },
        { path: "/contact-us", element: <ContactUsPage /> },
        { path: "/success", element: <Success /> },
        { path: "/cancel", element: <Cancel /> },
        { path: "/orders", element: <Orders /> },
      ],
    },

    ...(role === "admin"
      ? [
          {
            path: "/admin",
            element: <ProtectedAdminLayout />,
            children: [
              { path: "/", element: <AdminPage /> },
              { path: "/products", element: <AdminProduct /> },
              { path: "/revenue-chart", element: <RevenueChartPage /> },
              { path: "/orders", element: <AdminOrders /> },
            ],
          },
        ]
      : []),
  ];

  return useRoutes(routes);
};

const ProtectedLayout = () => (
  <Protected>
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  </Protected>
);

const ProtectedAdminLayout = () => (
  <ProtectedAdmin>
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  </ProtectedAdmin>
);

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <Router>
      <Offer />
      {role === "admin" ? <AdminNavbar /> : <Navbar />}
      <ToastContainer />
      <AppRoutes role={role} />
      <Footer />
    </Router>
  );
}

export default App;
