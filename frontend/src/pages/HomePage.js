import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/productSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShippingFast, FaShoppingCart, FaHeadset } from "react-icons/fa";
import Faq from "../components/Faq";
import Loader from "../utils/Loader";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products: fetchedProducts,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 4 }))
      .unwrap()
      .then((response) => {
        console.log("Fetched products:", response.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.div
        style={{
          backgroundImage: "url('benner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        className="relative flex items-center justify-center text-white text-center z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
            className="bg-white hover:bg-black hover:text-white text-black py-3 px-8 rounded-full text-lg transition transform hover:scale-105 duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>

      {/* Top-Selling Brands Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Top-Selling Brands
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
            {[
              { name: "Apple", src: "/apple.png" },
              { name: "Samsung", src: "/samsung.png" },
              { name: "Sony", src: "/sony.png" },
              { name: "Mi", src: "/mi.png" },
              { name: "LogiTech", src: "/logitech.png" },
            ].map((brand, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="w-full h-20 object-contain mx-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us Section */}
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
                Enjoy free shipping on all orders over $100.
              </p>
            </motion.div>
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

      <div className="mt-16">
        <Faq />
      </div>
      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Our Products
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading && <Loader />}
            {error && <p className="text-red-500">{error}</p>}
            {fetchedProducts?.products?.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white shadow-xl rounded-lg overflow-hidden transition transform hover:scale-105 duration-300"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-2 text-lg font-bold">${product.price}</p>
                  <Link
                    to={`/product/${product._id}`}
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

      {/* FAQ Section */}
    </div>
  );
};

export default HomePage;
