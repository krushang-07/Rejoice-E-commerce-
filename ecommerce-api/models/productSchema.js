const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Product title
    description: { type: String, required: true }, // Product description
    price: { type: Number, required: true }, // Product price
    category: { type: String, required: true }, // Product category
    image: { type: String, required: true }, // Main image URL
    brand: { type: String, default: "Unknown Brand" }, // Product brand, default if not provided
    model: { type: String, default: "Unknown Model" }, // Product model, default if not provided
    color: { type: String, default: "N/A" }, // Product color, default if not provided
    discount: { type: Number, default: 0 }, // Discount percentage, default to 0 if not provided
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
