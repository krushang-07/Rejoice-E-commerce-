const express = require("express");
const multer = require("multer");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProductsInfinite,
} = require("../controllers/productController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/products", getAllProductsInfinite);
router.post("/", upload.single("image"), createProduct);
router.patch("/:id", adminAuthMiddleware, updateProduct);
router.delete("/:id", adminAuthMiddleware, deleteProduct);

module.exports = router;
