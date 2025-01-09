const express = require("express");
const router = express.Router();
const {
  addToCart,
  updateCart,
  removeItemFromCart,
  getCart,
} = require("../controllers/cartController");

router.post("/add", addToCart); // Add item to cart
router.patch("/update", updateCart); // Update item quantity
router.delete("/remove", removeItemFromCart); // Remove item from cart
router.post("/", getCart); // Get cart items

module.exports = router;
