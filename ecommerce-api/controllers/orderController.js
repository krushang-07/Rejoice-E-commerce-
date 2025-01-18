const Order = require("../models/orderSchema.js"); // Import your Order schema

// Retrieve orders for a specific user
const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });

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
    const orders = await Order.find();

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

module.exports = {
  getUserOrders,
  getAllOrders,
};
