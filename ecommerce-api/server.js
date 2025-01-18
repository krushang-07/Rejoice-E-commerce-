require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const Cart = require("./models/cartSchema.js");
const Product = require("./models/productSchema.js");
// const { OpenAI } = require("openai");
// const ChatHistory = require("./models/chatHistorySchema.js"); // Define a model for chat history
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

// Routes
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const revenueRoutes = require("./routes/revenueRoutes.js");
const Order = require("./models/orderSchema.js");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Initialize Stripe with secret key
const stripe = Stripe(process.env.STRIPE_KEY);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, Payment Service!");
});

// Route handlers
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/revenue", revenueRoutes);

// Route to handle success and store order data
app.post("/store-order", async (req, res) => {
  const { sessionId, userId } = req.body;

  if (!sessionId || !userId) {
    return res
      .status(400)
      .json({ error: "Session ID and User ID are required" });
  }

  try {
    // Retrieve Stripe session details
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Retrieve cart details for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found for the user" });
    }

    const products = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    // Create and save the order in your database
    const order = new Order({
      orderId: session.metadata.orderId,
      userId,
      products,
      totalAmount: session.amount_total / 100, // Convert cents to dollars
      paymentMethod: session.payment_method_types[0],
      status: "Paid",
    });

    await order.save();

    // Clear the user's cart after successful order
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Order saved successfully", order });
  } catch (error) {
    console.error("Error storing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create payment intent route
app.post("/create-payment-intent", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    const cartItems = cart.items;
    const orderId = `order_${Date.now()}`; // Generate a unique order ID

    let products = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        const price = await stripe.prices.create({
          unit_amount: product.price * 100,
          currency: "usd",
          product_data: {
            name: product.title,
          },
        });
        return {
          price: price.id,
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products,
      discounts: [
        {
          coupon: process.env.COUPON_KEY,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US", "IN"],
      },
      billing_address_collection: "required", // Require billing address
      mode: "payment",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
      metadata: {
        orderId,
        userId,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Server Setup
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
