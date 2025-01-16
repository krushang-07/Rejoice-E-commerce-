// src/pages/success.js
import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // For success icon

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
        <FaCheckCircle size={80} color="green" className="mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
