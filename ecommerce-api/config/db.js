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
    // console.log(response.data);
    const externalProducts = response.data.products;
    // console.log(externalProducts);

    // Map external data to match your schema
    const products = externalProducts.map((product) => ({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    }));

    // Clear existing products
    await Product.deleteMany();

    // Save mapped products to the database
    await Product.insertMany(products);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
