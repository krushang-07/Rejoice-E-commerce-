import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin"
  );

  const handleLogin = () => {
    localStorage.setItem("role", "admin");
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAdmin(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-white text-black p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-extrabold text-white flex items-center">
            <Link to="/admin">
              <img src="/ecommerce.png" alt="logo" className="w-12 h-12 mx-4" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-lg hover:text-gray-200 transition duration-300"
            >
              Add Items
            </Link>
            <Link
              to="/admin/products"
              className="text-lg hover:text-gray-200 transition duration-300"
            >
              List Items
            </Link>
            <Link
              to="/admin/orders"
              className="text-lg hover:text-gray-200 transition duration-300"
            >
              Orders
            </Link>
            <Link
              to="/admin/revenue-chart"
              className="text-lg hover:text-gray-200 transition duration-300"
            >
              Revenue
            </Link>

            {!isAdmin ? (
              <>
                <Link
                  to="/login"
                  className="text-lg hover:text-gray-200 transition duration-300"
                  onClick={handleLogin} // Simulate login
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg hover:text-gray-200 transition duration-300"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-lg hover:text-gray-200 transition duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
