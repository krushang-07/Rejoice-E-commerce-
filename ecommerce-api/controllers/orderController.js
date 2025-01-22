const Order = require("../models/orderSchema.js"); // Import your Order schema

// Retrieve orders for a specific user
const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate("products.productId");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Server error while fetching orders." });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found in the system." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error while fetching orders." });
  }
};
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { orderStatus },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      message: "Order status updated successfully.",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ error: "Server error while updating order status." });
  }
};

module.exports = {
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
