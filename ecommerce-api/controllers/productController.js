const Product = require("../models/productSchema");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      type = "",
      search = "",
      sort = "asc",
      minPrice = 0,
      maxPrice = 10000, // Set a default max price
      brand = "", // Brand filter added
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    let query = {};

    // Filter by category if 'type' exists
    if (type) {
      query.category = type;
    }

    // Search by title if 'search' exists
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
      ];
    }

    // Apply price range filter
    query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };

    // Filter by brand if 'brand' exists
    if (brand) {
      query.brand = brand; // Apply brand filter
    }

    const sortOrder = sort === "desc" ? -1 : 1;

    const products = await Product.find(query)
      .sort({ price: sortOrder })
      .skip((pageNumber - 1) * pageLimit)
      .limit(pageLimit);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalProducts,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / pageLimit),
      message: type
        ? `Products fetched for category: ${type}`
        : search
        ? `Products fetched with search term: ${search}`
        : brand
        ? `Products fetched for brand: ${brand}`
        : "All products fetched.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products: " + err.message });
  }
};

// Get all products without any query parameters
exports.getAllProductsInfinite = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({
      products,
      message: "All products fetched successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products: " + err.message });
  }
};

// Cloudinary image upload function for base64 string
const uploadToCloudinary = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "pick_n_shop",
      resource_type: "image",
    });
    console.log(result);
    return result.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

// In your createProduct API route
exports.createProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    brand,
    model,
    color,
    discount,
    image,
  } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !category ||
    !brand ||
    !model ||
    !color
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create and save the product
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      brand,
      model,
      color,
      discount,
      image, // Save Cloudinary image URL
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not Found" });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product: " + error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product: " + err.message });
  }
};
