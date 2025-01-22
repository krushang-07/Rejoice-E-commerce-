const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController.js");

// Define the route for retrieving user orders
router.get("/:userId", getUserOrders);
router.get("/", getAllOrders);
router.put("/:orderId", updateOrderStatus);

module.exports = router;
