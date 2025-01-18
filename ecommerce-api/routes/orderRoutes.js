const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  getAllOrders,
} = require("../controllers/orderController.js");

// Define the route for retrieving user orders
router.get("/:userId", getUserOrders);
router.get("/", getAllOrders);

module.exports = router;
