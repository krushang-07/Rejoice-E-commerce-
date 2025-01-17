const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");

const ADMIN_CREDENTIALS = {
  email: "admin@example.com", // Demo admin email
  password: "securepassword123", // Demo admin password
};

//register
exports.createUser = async (req, res) => {
  const { name, email, password, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    // role: role || "customer",
    address,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if it's an admin login
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "Admin login successful",
      token,
      role: "admin",
    });
  }

  // Customer login
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const User = require("../models/userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library"); // Add Google Auth Client
// require("dotenv").config();

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Use your Google OAuth2 client ID

// // Register user
// exports.createUser = async (req, res) => {
//   const { name, email, password, address } = req.body;

//   // Check if email already exists
//   const userExists = await User.findOne({ email });
//   if (userExists)
//     return res.status(400).json({ message: "Email already in use" });

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     name,
//     email,
//     password: hashedPassword,
//     address,
//   });

//   try {
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login user
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   // Check if it's an admin login
//   if (
//     email === ADMIN_CREDENTIALS.email &&
//     password === ADMIN_CREDENTIALS.password
//   ) {
//     const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     return res.status(200).json({
//       message: "Admin login successful",
//       token,
//       role: "admin",
//     });
//   }

//   // Customer login
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       role: user.role,
//       userId: user._id,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Google Signup Route
// exports.googleSignup = async (req, res) => {
//   const { token } = req.body;

//   try {
//     // Verify the token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID, // Use your Google Client ID
//     });

//     const { name, email } = ticket.getPayload();

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create new user if not exists
//     user = new User({
//       name,
//       email,
//       googleId: ticket.getUserId(), // Store Google ID for future reference
//       role: "customer", // Set a default role, you can change based on your needs
//     });

//     // Save user to DB
//     await user.save();

//     // Generate a JWT token
//     const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d", // Token expiry time
//     });

//     // Send response with token and user data
//     res.status(200).json({
//       token: jwtToken,
//       userId: user._id,
//       role: user.role, // Return the role
//     });
//   } catch (error) {
//     console.error("Google Signup Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// // Google Login
// exports.googleLogin = async (req, res) => {
//   const { token } = req.body;

//   try {
//     // Verify the token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID, // Use your Google Client ID
//     });

//     const { email } = ticket.getPayload();

//     // Check if the user exists
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Generate a JWT token for the existing user
//     const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Send response with token and user data
//     res.status(200).json({
//       token: jwtToken,
//       userId: user._id,
//       role: user.role, // Return the role
//     });
//   } catch (error) {
//     console.error("Google Login Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// // Get all users (admin only)
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update user information
// exports.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedUser)
//       return res.status(404).json({ message: "User not found" });
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser)
//       return res.status(404).json({ message: "User not found" });
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
