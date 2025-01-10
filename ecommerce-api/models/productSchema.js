// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // Matches the "title" field in the API
//   description: { type: String, required: true }, // Matches the "description" field
//   price: { type: Number, required: true }, // Matches the "price" field
//   category: { type: String, required: true }, // Matches the "category" field
//   image: { type: String, required: true }, // Matches the "image" field for main image
// });

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Product title
  description: { type: String, required: true }, // Product description
  price: { type: Number, required: true }, // Product price
  category: { type: String, required: true }, // Product category
  image: { type: String, required: true }, // Main image URL
  brand: { type: String, required: true }, // Product brand
  model: { type: String, required: true }, // Product model
  color: { type: String, required: true }, // Product color
  discount: { type: Number, required: true }, // Discount percentage
});

module.exports = mongoose.model("Product", productSchema);
