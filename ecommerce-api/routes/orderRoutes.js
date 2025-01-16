const express = require("express");
const router = express.Router();
const { getUserOrders } = require("../controllers/orderController.js");

// Define the route for retrieving user orders
router.get("/:userId", getUserOrders);

module.exports = router;
