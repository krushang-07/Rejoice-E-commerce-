import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/Slices/orderSlice";
import { motion } from "framer-motion";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const OrderCard = ({ order }) => {
  const statusColors = {
    Pending: "bg-yellow-500",
    Dispatched: "bg-blue-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  const getProductTitle = (product) =>
    product.productId?.title || "Product Title Unavailable";
  const getProductPrice = (product) => product.productId?.price || "N/A";
  const getProductImage = (product) =>
    product.productId?.image || "/default-image.jpg";

  return (
    <motion.div
      key={order._id}
      className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h2 className="text-lg font-semibold text-gray-800">
        Order ID: {order.orderId}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Placed on: {new Date(order.createdAt).toLocaleDateString()}
      </p>
      <div className="mb-4">
        <p className="text-gray-700">
          <strong>Total Amount:</strong> ₹{order.totalAmount}
        </p>
        <p className="text-gray-700">
          <strong>Payment Method:</strong> {order.paymentMethod}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Order Status:
        </h3>
        <div className="flex items-center">
          <div
            className={`h-3 w-3 rounded-full mr-2 ${
              statusColors[order.orderStatus] || "bg-gray-500"
            }`}
          ></div>
          <p className="text-gray-700">{order.orderStatus}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Products:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {order.products.map((product, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Display Product Image */}
                <img
                  src={getProductImage(product)} // Safe image fallback
                  alt={getProductTitle(product)}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <p className="line-clamp-1">{getProductTitle(product)}</p>
                  <p className="text-xs text-gray-500">
                    Price: ₹{getProductPrice(product)}
                  </p>
                </div>
              </div>
              <span>Qty: {product.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Orders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchUserOrders(userId))
        .then(() => {
          toast.success("Orders fetched successfully!");
        })
        .catch((err) => {
          console.error("Error fetching orders: ", err);
          toast.error("Something went wrong. Please try again later.");
        });
    }
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>
          {t(
            "There was an issue fetching your orders. Please try again later."
          )}
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-lg p-8 mx-auto w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("No Orders Found")}
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          {t(
            "You haven't placed any orders yet. Start exploring and make your first purchase!"
          )}
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          {t("Browse Products")}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          {t("Your Orders")}
        </h1>
      </header>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
