import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [role, setRole] = useState(localStorage.getItem("role")); // Initialize with the role from localStorage
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the mobile menu

  // Calculate total cart quantity
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogin = (userRole) => {
    localStorage.setItem("role", userRole);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setRole(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-gradient-to-r from-white to-gray-200 text-black p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Home Link */}
          <div className="text-3xl font-extrabold text-black flex items-center">
            <Link to="/">
              <img src="/ecommerce.png" alt="logo" className="w-12 h-12 mx-4" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-lg hover:text-gray-400 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-lg hover:text-gray-400 transition duration-300"
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-lg hover:text-gray-400 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact-us"
              className="text-lg hover:text-gray-400 transition duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl text-black focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`} />
            </button>
          </div>

          {/* User and Cart Options */}
          <div className="flex items-center space-x-4">
            {/* Login/Signup or Logout */}
            {!role ? (
              <>
                <Link
                  to="/login"
                  className="text-lg hover:text-gray-400 transition duration-300"
                  onClick={() => handleLogin("customer")} // Simulate login
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg hover:text-gray-400 transition duration-300"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-lg hover:text-gray-400 transition duration-300"
              >
                Logout
              </button>
            )}
            <Link
              to="/orders"
              className="text-lg hover:text-gray-400 transition duration-300"
            >
              Orders
            </Link>
            {/* Cart Icon */}
            <div className="relative">
              <Link
                to="/cart"
                className="text-lg hover:text-gray-400 transition duration-300"
              >
                <FaShoppingCart className="w-8 h-8 text-black mx-auto" />
                {cartQuantity > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-2 -translate-y-2">
                    {cartQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden flex flex-col space-y-4 py-4 text-center`}
        >
          <Link
            to="/"
            className="text-lg hover:text-gray-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)} // Close menu after click
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-lg hover:text-gray-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)} // Close menu after click
          >
            Collections
          </Link>
          <Link
            to="/about"
            className="text-lg hover:text-gray-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)} // Close menu after click
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="text-lg hover:text-gray-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)} // Close menu after click
          >
            Contact Us
          </Link>
          {/* Re-add login/signup/logout links */}
          {!role ? (
            <>
              <Link
                to="/login"
                className="text-lg hover:text-gray-400 transition duration-300"
                onClick={() => handleLogin("customer")} // Simulate login
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg hover:text-gray-400 transition duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-lg hover:text-gray-400 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
