// src/pages/cancel.js
import React from "react";
import { FaTimesCircle } from "react-icons/fa"; // For cancel icon

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
        <FaTimesCircle size={80} color="red" className="mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Payment Canceled
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Unfortunately, your payment was not completed. Please try again or
          contact support.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default Cancel;
