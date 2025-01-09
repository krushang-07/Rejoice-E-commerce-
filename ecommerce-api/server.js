require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

app.use(bodyParser.json());
// Enable CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
