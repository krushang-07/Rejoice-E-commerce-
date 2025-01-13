import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const CheckoutPage = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentLink = async () => {
      const userID = localStorage.getItem("userId");
      console.log("User ID:", userID);
      if (!userID) {
        console.error("User ID is not available in localStorage.");
        setError("User ID is required.");
        return; // Prevent the request from being sent
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/create-payment-intent",
          { userId: userID }, // Send userId to backend
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response Data:", response.data);

        if (response.data.url) {
          // Redirect directly to the payment link
          window.location.href = response.data.url;
        } else {
          throw new Error("Failed to fetch payment link");
        }
      } catch (error) {
        console.error("Error fetching payment link:", error);
        setError(error.message);
      }
    };

    fetchPaymentLink();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && (
        <div className="flex justify-center items-center">
          <div
            className="border-t-4 border-blue-600 w-16 h-16 rounded-full animate-spin"
            style={{ borderTopColor: "transparent" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
