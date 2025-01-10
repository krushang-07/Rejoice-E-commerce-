const mongoose = require("mongoose");
const Product = require("../models/productSchema");
const axios = require("axios");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Fetch products from external API
    const response = await axios.get("https://fakestoreapi.in/api/products");
    const externalProducts = response.data.products;

    // Map external data to match your schema
    const products = externalProducts.map((product) => ({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      brand: product.brand || "Unknown Brand", // Default value if not provided
      model: product.model || "Unknown Model", // Default value if not provided
      color: product.color || "N/A", // Default value if not provided
      discount: product.discount || 0, // Default value if not provided
    }));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
