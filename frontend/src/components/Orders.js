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
        .catch(() => {
          toast.error("Failed to fetch orders.");
        });
    }
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
    });

    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
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
      <header className="flex items-center justify-center bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-700">Your Orders</h1>
      </header>

      <div className="container mx-auto py-8 px-4">
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const randomStatus = getRandomStatus(); // Generate random status for each order

              return (
                <motion.div
                  key={order._id}
                  className="bg-white shadow rounded-lg p-6 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
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
                        className={`h-3 w-3 rounded-full ${
                          randomStatus === "Pending"
                            ? "bg-yellow-500"
                            : randomStatus === "Dispatched"
                            ? "bg-blue-500"
                            : randomStatus === "Delivered"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <p className="ml-2 text-gray-700">{randomStatus}</p>
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
        ) : (
          <p className="text-center text-gray-600">
            You have no orders at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
