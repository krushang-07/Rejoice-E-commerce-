import React from "react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img
        src="/shopping.png"
        alt="Empty Cart"
        className="w-1/3 max-w-md mb-8"
      />
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Your Cart is Empty!
      </h2>
      <p className="text-lg text-gray-500 mb-6 text-center">
        It looks like you haven’t added anything to your cart yet. Browse our
        categories and find something you like!
      </p>
      <button
        className="px-6 py-3 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all"
        onClick={() => (window.location.href = "/products")} // Adjust to your shop page route
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
