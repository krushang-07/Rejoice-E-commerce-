const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");

// exports.addToCart = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     console.log("Received Data:", req.body); // Log incoming data for debugging

//     if (!userId || !productId || !quantity) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid userId format" });
//     }
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({ message: "Invalid productId format" });
//     }

//     // Add item to the cart
//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       {
//         $push: {
//           items: {
//             productId,
//             quantity,
//           },
//         },
//       },
//       { new: true, upsert: true }
//     ).populate("items.productId");
//     // console.log(items.productId);

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Backend: Example of adding a product to the cart and returning the updated cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate the data
    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ message: "userId, productId, and quantity are required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      // Check if the product already exists in the cart
      const productIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex !== -1) {
        // If product exists, update quantity
        cart.items[productIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add it to the cart
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save(); // Save the updated cart

    // Return the updated cart with populated product details
    const populatedCart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );
    res.status(200).json(populatedCart); // Return populated cart
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid userId or productId format" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    ).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid userId or productId format" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    ).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: err.message });
  }
};
