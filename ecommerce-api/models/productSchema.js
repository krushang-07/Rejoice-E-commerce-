const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Matches the "title" field in the API
  description: { type: String, required: true }, // Matches the "description" field
  price: { type: Number, required: true }, // Matches the "price" field
  category: { type: String, required: true }, // Matches the "category" field
  image: { type: String, required: true }, // Matches the "image" field for main image
});

module.exports = mongoose.model("Product", productSchema);
