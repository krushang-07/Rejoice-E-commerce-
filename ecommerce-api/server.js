require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const Cart = require("./models/cartSchema.js");
const Product = require("./models/productSchema.js");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

// Routes
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

app.use(express.urlencoded({ extended: true })); // For parsing URL encoded query params
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable CORS

// Initialize Stripe with secret key
const stripe = Stripe(
  "sk_test_51Qc4gmPUsWYOZnHCaz4VC7JGjTvMm1BaCPDRJ7iYyNd2ETtQlVZXVmlV2zork0Vl1QWFl32OWw6d0aeMNi69DFmI00tIpZQuAX"
);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, Payment Service!");
});

// Route handlers
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

// Payment Intent Route
app.post("/create-payment-intent", async (req, res) => {
  const { userId } = req.body;
  console.log("User ID:", userId);

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    //Retrieve the cart for the given user
    const cart = await Cart.findOne({ userId });
    // Return the payment link URL to the client
    const cartItems = cart.items;

    let products = await Promise.all(
      cartItems.map(async (item) => {
        console.log(item.productId);
        const product = await Product.findById(item.productId);
        console.log(product);
        const price = await stripe.prices.create({
          unit_amount: product.price * 100,
          currency: "usd",
          product_data: {
            name: product.title,
            // images: [product.image], // Add image URL from product
          },
        });
        return {
          price: price.id,
          quantity: item.quantity,
        };
      })
    );

    const paymentLink = await stripe.paymentLinks.create({
      line_items: products,
    });

    res.status(200).json({ url: paymentLink.url });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// // Server Setup
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
