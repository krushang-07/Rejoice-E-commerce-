const Product = require("../models/productSchema");

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().lean();
//     console.log(products);
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; // Extract page and limit from query params

    // Convert to numbers (optional: you can add validation here)
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    // Find the products with pagination
    const products = await Product.find()
      .skip((pageNumber - 1) * pageLimit) // Skip previous pages
      .limit(pageLimit); // Limit results per page

    // Get the total count of products for pagination calculation
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      products,
      totalProducts,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / pageLimit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    const newProduct = new Product({ name, price, description, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.send(404).json({ message: "Product not Found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
