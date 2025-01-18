import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../redux/Slices/orderSlice"; // Assuming this fetches all orders
import { motion } from "framer-motion"; // Import motion for animations
import { toast } from "react-toastify"; // Import Toastify

import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Loader from "../utils/Loader";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching orders: " + error);
    } else if (orders.length > 0) {
      //   toast.success("Orders loaded successfully!");
    }
  }, [error, orders]);

  if (loading) return <Loader />;

  const totalOrderCount = orders.length;

  return (
    <div className="admin-orders-container max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex justify-center">
        All Orders
      </h1>

      {/* Total Order Count */}
      <p className="text-xl text-gray-600 mb-4">
        Total Orders:{" "}
        <span className="font-medium text-indigo-600">{totalOrderCount}</span>
      </p>

      {orders.length === 0 ? (
        <div className="text-xl text-red-600">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.orderId}
              className="order-card border p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order ID: {order.orderId}
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                Total Amount:{" "}
                <span className="font-semibold text-green-600">
                  ₹{order.totalAmount.toFixed(2)}
                </span>
              </p>
              <p className="text-lg text-gray-700 mb-2">
                Payment Method:{" "}
                <span className="font-medium text-indigo-600">
                  {order.paymentMethod}
                </span>
              </p>

              {/* Products List */}
              <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">
                Products:
              </h3>
              <ul className="space-y-3">
                {order.products.map((product) => (
                  <li key={product.productId} className="text-gray-700">
                    <p className="text-lg">Product ID: {product.productId}</p>
                    <p className="text-lg">Qty: {product.quantity}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
