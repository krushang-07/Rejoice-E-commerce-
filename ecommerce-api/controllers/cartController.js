const Cart = require("../models/cartSchema");
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    console.log("Received Data:", req.body); // Log incoming data for debugging

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Create ObjectId with 'new' keyword
    const objectIdNew = new mongoose.Types.ObjectId(userId);

    // Check if the productId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId format" });
    }

    // Add item to the cart
    const cart = await Cart.findOneAndUpdate(
      { userId: objectIdNew },
      {
        $push: {
          items: {
            productId: new mongoose.Types.ObjectId(productId),
            quantity,
          },
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from the request body
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId"); // Populate the productId field
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart); // Return the populated cart
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
