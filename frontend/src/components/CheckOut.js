import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentLink = async () => {
      const userID = localStorage.getItem("userId");
      if (!userID) {
        toast.error("User ID is required to proceed!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/create-payment-intent",
          { userId: userID },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.url) {
          toast.success("Redirecting to payment...");
          setTimeout(() => {
            window.location.href = response.data.url;
          }, 1500);
        } else {
          toast.error("Failed to fetch payment link.");
          setLoading(false);
        }
      } catch {
        toast.error("An error occurred while processing your request.");
        setLoading(false);
      }
    };

    fetchPaymentLink();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <div
            className="border-t-4 border-blue-600 w-16 h-16 rounded-full animate-spin mb-4"
            style={{ borderTopColor: "transparent" }}
          ></div>
          <p className="text-lg font-medium text-gray-600">
            Please wait while we redirect you to the payment gateway...
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-700">
            Thank you for proceeding to checkout. We are processing your payment
            link.
          </p>
          <p className="mt-4 text-gray-500">
            If you are not redirected, please try again later.
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
