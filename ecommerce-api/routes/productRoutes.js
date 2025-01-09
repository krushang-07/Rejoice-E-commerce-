const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", adminAuthMiddleware, createProduct);
router.patch("/:id", adminAuthMiddleware, updateProduct);
router.delete("/:id", adminAuthMiddleware, deleteProduct);

module.exports = router;
