const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: "customer" }, // 'user' or 'admin'
    isActive: { type: Boolean, default: true }, // To enable/disable user account
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
