import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [role, setRole] = useState(localStorage.getItem("role")); // Initialize with the role from localStorage

  useEffect(() => {
    const cartItems =
      JSON.parse(localStorage.getItem("totalCartQuantity")) || 0;
    setCartQuantity(cartItems);
  }, []);

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
          <div className="text-3xl font-extrabold text-black flex">
            <Link to="/">
              <img src="/ecommerce.png" alt="logo" className="w-12 h-12 mx-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8 items-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
