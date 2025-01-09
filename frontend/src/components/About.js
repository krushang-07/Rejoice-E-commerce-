import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  // Fade-in and scaling effect using Framer Motion
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const scaleIn = {
    hidden: { scale: 0.95 },
    visible: { scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* About Section */}
      <section className="about-intro py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-4xl font-extrabold text-gray-800 mb-6 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            About Us
          </motion.h1>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 mb-4 transition duration-500 ease-in-out"
          >
            Welcome to PickNShop, your one-stop destination for all things
            fashion! Our journey started in 2025, and since then, we've been
            committed to offering top-quality products with exceptional customer
            service.
          </motion.p>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 mb-4 transition duration-500 ease-in-out"
          >
            At PickNShop, we believe in providing a seamless shopping experience
            that combines convenience, quality, and the latest trends. From
            clothing to accessories, we’ve got everything to keep you looking
            your best.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-3xl font-semibold text-gray-800 mb-6 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            Our Mission
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 mb-4 transition duration-500 ease-in-out"
          >
            Our mission is simple: to provide the latest styles at unbeatable
            prices, with fast and reliable service. We strive to make every
            shopping experience enjoyable, and every product delivered with the
            utmost care.
          </motion.p>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 mb-4 transition duration-500 ease-in-out"
          >
            We are passionate about ensuring our customers receive not only
            stylish items but also exceptional value. Your satisfaction is our
            number one priority, and we go the extra mile to make sure you’re
            happy with every purchase.
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-3xl font-semibold text-gray-800 mb-6 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            What Sets Us Apart
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="value-item hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quality Products
              </h3>
              <p className="text-lg text-gray-600">
                We ensure that each product we offer is crafted with the finest
                materials, providing you with long-lasting quality and comfort.
              </p>
            </motion.div>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="value-item hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Affordable Pricing
              </h3>
              <p className="text-lg text-gray-600">
                We believe that great style shouldn't come with a hefty price
                tag. That's why we offer competitive pricing across all our
                products.
              </p>
            </motion.div>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="value-item hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Customer Satisfaction
              </h3>
              <p className="text-lg text-gray-600">
                Our customers are at the heart of everything we do. We pride
                ourselves on our stellar customer support and commitment to
                making your experience seamless.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-3xl font-semibold text-gray-800 mb-6 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            Our Story
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 mb-4 transition duration-500 ease-in-out"
          >
            PickNShop was founded in 2025 by a group of passionate entrepreneurs
            who wanted to revolutionize the fashion industry by offering great
            products at affordable prices. What started as a small online
            boutique has now grown into a global fashion destination, serving
            customers worldwide.
          </motion.p>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 mb-4 transition duration-500 ease-in-out"
          >
            Over the years, we’ve expanded our range to include accessories,
            shoes, and home décor, becoming a trusted name in the online
            shopping space. Our story is one of growth, innovation, and a
            commitment to serving our customers better each day.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-3xl font-semibold text-gray-800 mb-6 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            What Our Customers Say
          </motion.h2>
          <div className="flex space-x-12 justify-center">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="testimonial-item hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <p className="text-lg text-gray-600 mb-4">
                "I love shopping here! The quality is amazing, and the prices
                are unbeatable. I always find what I need, and shipping is super
                fast."
              </p>
              <p className="font-semibold text-gray-800">- Jane Doe</p>
            </motion.div>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="testimonial-item hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <p className="text-lg text-gray-600 mb-4">
                "The customer service is fantastic! I had an issue with my
                order, and they resolved it quickly and professionally."
              </p>
              <p className="font-semibold text-gray-800">- John Smith</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta py-20 bg-blue-600 text-white text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-3xl font-semibold mb-6 transform hover:scale-105 transition duration-500 ease-in-out"
        >
          Join the PickNShop Family
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-lg mb-4 transition duration-500 ease-in-out"
        >
          Don’t miss out on our latest products, exclusive offers, and more!
          Subscribe to our newsletter and be part of the PickNShop experience.
        </motion.p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition duration-500 ease-in-out">
          Subscribe Now
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
