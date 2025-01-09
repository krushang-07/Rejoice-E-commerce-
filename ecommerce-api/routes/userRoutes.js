const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", adminMiddleware, getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
