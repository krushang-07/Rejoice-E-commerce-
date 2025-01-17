// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     address: { type: String, required: true },
//     role: { type: String, default: "customer" }, // 'user' or 'admin'
//     isActive: { type: Boolean, default: true }, // To enable/disable user account
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google login
    address: { type: String, required: true },
    role: { type: String, default: "customer" }, // 'user' or 'admin'
    isActive: { type: Boolean, default: true }, // To enable/disable user account
    // googleId: { type: String }, // Google ID for users who sign up via Google
    isGoogleAuth: { type: Boolean, default: false }, // Flag to check if user signed up via Google
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
