import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-gradient-to-r bg-white text-black p-4 shadow-lg">
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

          <div className="flex items-center space-x-8">
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
            {!localStorage.getItem("role") ? (
              <>
                <Link
                  to="/login"
                  className="text-lg hover:text-gray-400 transition duration-300"
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

            <div className="relative">
              <Link
                to="/cart"
                className="text-lg hover:text-gray-400 transition duration-300"
              >
                <FaShoppingCart className="w-8 h-8 text-black mx-auto " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
