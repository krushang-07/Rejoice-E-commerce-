import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../redux/Slices/orderSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Loader from "../utils/Loader";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching orders: " + error);
    }
  }, [error]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: newStatus }))
      .unwrap()
      .then(() => {
        toast.success("Order status updated successfully!");
      })
      .catch((error) => {
        toast.error("Error updating status: " + error.message);
      });
  };

  if (loading) return <Loader />;

  const totalOrderCount = orders.length;
  const statusColors = {
    Pending: "bg-yellow-500",
    Dispatched: "bg-blue-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  return (
    <div className="admin-orders-container max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        All Orders
      </h1>

      <p className="text-xl text-gray-600 mb-4">
        Total Orders:{" "}
        <span className="font-medium text-indigo-600">{totalOrderCount}</span>
      </p>

      {orders.length === 0 ? (
        <div className="text-xl text-red-600 text-center">No orders found.</div>
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
              <p className="text-lg text-gray-700 flex items-center mb-4">
                Current Status:{" "}
                <span
                  className={`ml-2 h-3 w-3 rounded-full ${
                    statusColors[order.orderStatus] || "bg-gray-500"
                  }`}
                ></span>
                <span className="ml-2 font-bold">{order.orderStatus}</span>
              </p>
              <div className="flex items-center justify-end mb-4">
                <label
                  htmlFor={`status-${order.orderId}`}
                  className="mr-4 font-bold"
                >
                  Update Status:
                </label>
                <select
                  id={`status-${order.orderId}`}
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order.orderId, e.target.value)
                  }
                  className="border rounded-md px-4 py-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">
                Products:
              </h3>
              <ul className="space-y-3">
                {order.products.map((product, index) => {
                  const { _id, title, price, image } = product.productId || {};

                  return (
                    <li
                      key={_id || index}
                      className="p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center">
                        <img
                          src={image || "/placeholder-image.png"}
                          alt={title || "Product Image"}
                          className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div>
                          <p className="text-lg font-medium">
                            {title || "N/A"}
                          </p>
                          <p className="text-lg">
                            Price: ₹{price?.toFixed(2) || "N/A"}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
