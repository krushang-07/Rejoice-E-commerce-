require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const Cart = require("./models/cartSchema.js");
const Product = require("./models/productSchema.js");
const { OpenAI } = require("openai");
const ChatHistory = require("./models/chatHistorySchema.js"); // Define a model for chat history

// const Order = require("./models/cartSchema.js");
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

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const cartItems = cart.items;
    let totalAmount = 0;
    const products = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found for ID: ${item.productId}`);
        }

        const productPrice = product.price || 0;
        const quantity = item.quantity || 0;

        totalAmount += productPrice * quantity * 100; // Convert to cents

        const stripeProduct = await stripe.products.create({
          name: product.title,
          images: [product.image],
        });

        const price = await stripe.prices.create({
          unit_amount: productPrice * 100, // Convert to cents
          currency: "usd",
          product: stripeProduct.id,
        });

        return {
          price: price.id,
          quantity: quantity,
        };
      })
    );

    // // Generate unique Order ID
    // const orderId = `ORD-${Date.now()}`;

    // // Save the order in the database with status 'pending'
    // const order = new Order({
    //   orderId,
    //   userId,
    //   items: cartItems,
    //   totalAmount,
    //   paymentMethod: "card", // Update as per your choice (Card/UPI)
    //   status: "pending",
    // });
    // await order.save();

    // Create a payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: products,
      // metadata: { orderId }, // Include orderId in metadata
      shipping_address_collection: { allowed_countries: ["US", "IN"] },
      billing_address_collection: "required",
    });

    res.status(200).json({ url: paymentLink.url }); // Return payment link and orderId
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

//CHat bot
// Endpoint to send message to Dialogflow and get response
// app.post("/api/chatbot", async (req, res) => {
//   const userMessage = req.body.message;

//   if (!userMessage) {
//     return res.status(400).json({ error: "Message is required" });
//   }

//   try {
//     // Send message to Dialogflow API
//     const response = await axios.post(
//       "https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/YOUR_SESSION_ID:detectIntent",
//       {
//         queryInput: {
//           text: {
//             text: userMessage,
//             languageCode: "en",
//           },
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add your Dialogflow API access token here
//         },
//       }
//     );

//     const chatbotResponse = response.data.queryResult.fulfillmentText;
//     res.json({ response: chatbotResponse });
//   } catch (error) {
//     console.error("Error with chatbot API:", error);
//     res.status(500).json({ error: "Error communicating with the AI model" });
//   }
// });

// // Server Setup
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
