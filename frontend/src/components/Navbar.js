import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Get cart items from localStorage and update the badge count
    const cartItems = localStorage.getItem("cart");
    setCartItemCount(cartItems); // Assuming cart is stored as an array
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Home Link */}
          <div className="text-3xl font-extrabold text-white flex">
            <Link to="/">
              <img
                src="/ecommerce.png"
                alt="logo"
                style={{ width: 50, height: 50, margin: 10, marginLeft: 30 }}
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-lg hover:text-yellow-400 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-lg hover:text-yellow-400 transition duration-300"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-lg hover:text-yellow-400 transition duration-300"
            >
              About
            </Link>

            {/* Auth Links (Login, Signup, Logout) */}
            {!localStorage.getItem("role") ? (
              <>
                <Link
                  to="/login"
                  className="text-lg hover:text-yellow-400 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg hover:text-yellow-400 transition duration-300"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-lg hover:text-yellow-400 transition duration-300"
              >
                Logout
              </button>
            )}

            {/* Cart Icon with Badge */}
            <div className="relative">
              <Link
                to="/cart"
                className="text-lg hover:text-yellow-400 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h18M3 3l3 18h12l3-18H3z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 block w-5 h-5 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">
                    {cartItemCount}
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
