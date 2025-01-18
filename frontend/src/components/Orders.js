import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/Slices/orderSlice";
import { motion } from "framer-motion";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
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
          // Log error for debugging, but do not throw it
          console.error("Error fetching orders: ", err);
          toast.error("Something went wrong. Please try again later.");
        });
    }
  }, [dispatch]);

  // If data is still loading, show loader
  if (loading) {
    return <Loader />;
  }

  // If there's an error, show a friendly message in UI
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>There was an issue fetching your orders. Please try again later.</p>
      </div>
    );
  }

  // Handle empty orders case
  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-lg p-8 mx-auto w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No Orders Found
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          You haven't placed any orders yet. Start exploring and make your first
          purchase!
        </p>
        <button
          onClick={() => (window.location.href = "/shop")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const getRandomStatus = () => {
    const statuses = ["Pending", "Delivered", "Dispatched"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
        <h1 className="text-3xl font-semibold text-gray-800">Your Orders</h1>
      </header>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {orders.map((order) => {
            const randomStatus = getRandomStatus(); // Generate random status for each order

            return (
              <motion.div
                key={order._id}
                className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Order Details */}
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
                        randomStatus === "Pending"
                          ? "bg-yellow-500"
                          : randomStatus === "Dispatched"
                          ? "bg-blue-500"
                          : randomStatus === "Delivered"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <p className="text-gray-700">{randomStatus}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Products:
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {order.products.map((product, index) => (
                      <li key={index} className="flex justify-between">
                        <span>Product ID: {product.productId}</span>
                        <span>Qty: {product.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
