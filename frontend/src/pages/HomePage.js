import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { FaShippingFast, FaShoppingCart, FaHeadset } from "react-icons/fa"; // Icons from React Icons

const HomePage = () => {
  // Scroll Animation on page load
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Framer Motion for smooth fade-in */}
      <motion.div
        style={{
          backgroundImage: "url('benner.jpg')", // Dummy image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        className="relative flex items-center justify-center text-white text-center z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* <div className="absolute inset-0 bg-black opacity-50 z-0"></div> */}
        <motion.div
          className="z-10 p-8"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold mb-4">Welcome to PickNShop</h1>
          <p className="text-xl mb-6">
            Your one-stop shop for all things trendy!
          </p>
          <Link
            to="/products"
            className="bg-white hover:bg-black hover:text-white text-black  py-3 px-8 rounded-full text-lg transition transform hover:scale-105 duration-300"
          >
            Shop Now
          </Link>
          <Link
            to="/chat-bot"
            className="bg-white hover:bg-black hover:text-white text-black  py-3 px-8 rounded-full text-lg transition transform hover:scale-105 duration-300"
          >
            Chat bot
          </Link>
        </motion.div>
      </motion.div>

      {/* News Shutter Section */}
      <motion.div
        className="bg-gray-200 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <marquee className="text-xl text-red-600 font-semibold">
            Breaking News: Big Sale Coming Soon! Stay Tuned!
          </marquee>
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8 text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Why Shop With Us?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <FaShippingFast className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Free Shipping</h3>
              <p className="mt-2 text-gray-600">
                Enjoy free shipping on all orders over $50.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <FaShoppingCart className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Easy Shopping</h3>
              <p className="mt-2 text-gray-600">
                Browse products and complete your purchase in minutes.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <FaHeadset className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-xl font-semibold">24/7 Customer Support</h3>
              <p className="mt-2 text-gray-600">
                We're here to assist you anytime, day or night.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            New Arrivals
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Product Card */}
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-xl rounded-lg overflow-hidden transition transform hover:scale-105 duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src={`https://via.placeholder.com/300x300?text=Product+${
                    index + 1
                  }`}
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    Product Title {index + 1}
                  </h3>
                  <p className="mt-2 text-lg">$99.99</p>
                  <Link
                    to="/product-detail"
                    className="mt-4 inline-block bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
