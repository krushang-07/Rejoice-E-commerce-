import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [role, setRole] = useState(localStorage.getItem("role"));

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-gradient-to-r from-white to-gray-200 text-black p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-extrabold text-black flex items-center">
            <Link to="/">
              <img src="/ecommerce.png" alt="logo" className="w-12 h-12 mx-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-lg hover:text-gray-400">
              {t("home")}
            </Link>
            <Link to="/products" className="text-lg hover:text-gray-400">
              {t("collections")}
            </Link>
            <Link to="/about" className="text-lg hover:text-gray-400">
              {t("about")}
            </Link>
            <Link to="/contact-us" className="text-lg hover:text-gray-400">
              {t("contact_us")}
            </Link>
          </div>

          {/* Language Switcher - Dropdown */}
          <div className="flex items-center space-x-4">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-lg border border-gray-300 rounded-lg px-3 py-2"
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="gu">ગુજરાતી</option>
            </select>
          </div>

          {/* User and Cart */}
          <div className="flex items-center space-x-4">
            {!role ? (
              <>
                <Link
                  to="/login"
                  className="text-lg"
                  onClick={() => handleLogin("customer")}
                >
                  {t("login")}
                </Link>
                <Link to="/signup" className="text-lg">
                  {t("signup")}
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-lg">
                {t("logout")}
              </button>
            )}
            <Link to="/orders" className="text-lg">
              {t("orders")}
            </Link>
            <div className="relative">
              <Link to="/cart" className="text-lg">
                <FaShoppingCart className="w-8 h-8 text-black mx-auto" />
                {cartQuantity > 0 && (
                  <span className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-2 -translate-y-2">
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
