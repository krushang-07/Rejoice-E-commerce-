const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserById,
  getAllUsers,
  // Added Google Login controller
} = require("../controllers/userController");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

// Register route for regular signup
router.post("/register", createUser);

// Login route for regular login
router.post("/login", loginUser);

// // Google Signup route
// router.post("/google-signup", googleSignup); // Added Google Signup route

// // Google Login route
// router.post("/google-login", googleLogin); // Added Google Login route

// Admin Middleware: Only accessible by admin users
router.get("/", adminMiddleware, getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

module.exports = router;
