const Product = require("../models/productSchema");

// exports.getAllProducts = async (req, res) => {
//   try {
//     // Destructure and provide default values if not present
//     const { page = 1, limit = 5, type } = req.query;

//     // Convert to numbers
//     const pageNumber = parseInt(page, 10);
//     const pageLimit = parseInt(limit, 10);

//     // Build the query based on the type (category)
//     const query = type ? { category: type } : {}; // Filter by category if 'type' exists

//     // Fetch products with pagination and category filter
//     const products = await Product.find(query)
//       .skip((pageNumber - 1) * pageLimit) // Skip products for previous pages
//       .limit(pageLimit); // Limit products per page

//     // Get total count of products for pagination
//     const totalProducts = await Product.countDocuments(query);

//     // Send the response with paginated data
//     res.status(200).json({
//       products,
//       totalProducts,
//       currentPage: pageNumber,
//       totalPages: Math.ceil(totalProducts / pageLimit),
//       message: type
//         ? `Products fetched for category: ${type}`
//         : "All products fetched.",
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 5, type = "", search = "" } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    let query = {};

    if (type) {
      query.category = type; // Filter by category if 'type' exists
    }

    // If 'search' exists, search across title, description, or category
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
      ];
    }

    const products = await Product.find(query)
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
        : "All products fetched.",
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
