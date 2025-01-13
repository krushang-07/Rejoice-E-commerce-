import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  removeFromCartAction,
  updateCartAction,
  resetCartState,
} from "../redux/Slices/cartSlice";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  console.log(cartItems);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchCart({ userId }));
    } else {
      alert("You need to log in first!");
    }

    return () => {
      dispatch(resetCartState());
    };
  }, [dispatch]);

  // Update total cart quantity in localStorage
  useEffect(() => {
    // Check if cartItems has valid data
    if (cartItems && cartItems.length > 0) {
      const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("totalCartQuantity", totalQuantity);
    }
    // Do not overwrite if cartItems is undefined or empty
  }, [cartItems]);

  const handleRemoveFromCart = (productId) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(removeFromCartAction({ userId, productId }))
        .unwrap()
        .then(() => {
          dispatch(fetchCart({ userId }));
        })
        .catch((error) => {
          console.error("Error removing product from cart:", error);
        });
    }
  };

  const handleUpdateCart = (productId, quantity) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      if (quantity > 0) {
        dispatch(updateCartAction({ userId, productId, quantity }));
      } else {
        handleRemoveFromCart(productId); // Remove item if quantity is 0
      }
    }
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    try {
      // Call backend to create Stripe PaymentIntent
      const response = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          userId,
          cartItems,
          totalPrice,
        }
      );

      const { clientSecret } = response.data;

      // Navigate to payment page with clientSecret
      navigate("/checkout", { state: { clientSecret, cartItems, totalPrice } });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (error) return <div>Error: {error}</div>;

  const items = cartItems || [];
  const totalPrice = items
    .reduce((total, item) => total + item.productId.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Your Cart</h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="border-t-4 border-black border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Cart Items */}
          <div className="space-y-6 w-full">
            {items.length === 0 ? (
              <div className="text-center text-lg text-gray-500">
                Your cart is empty!
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 w-full"
                >
                  <div className="flex items-center space-x-6 w-full">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-40 h-40 object-cover rounded-md shadow-lg"
                    />
                    <div className="w-full">
                      <p className="text-xl font-semibold text-gray-800">
                        {item.productId.title}
                      </p>
                      <p className="text-lg text-gray-600">
                        Price: ${item.productId.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                      <select
                        onChange={(e) =>
                          handleUpdateCart(
                            item.productId._id,
                            parseInt(e.target.value)
                          )
                        }
                        value={item.quantity}
                        className="w-24 p-3 border border-gray-300 rounded-lg text-lg"
                      >
                        {[...Array(10).keys()].map((i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(item.productId._id)}
                      className="text-red-500 hover:text-red-700 font-semibold text-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side: Cart Summary and Checkout */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-700">
              Cart Summary
            </h3>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-xl text-gray-800">Total Items:</span>
              <span className="text-xl font-semibold text-gray-700">
                {items.length}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl text-gray-800">Total Price:</span>
              <span className="text-xl font-semibold text-gray-700">
                ${totalPrice}
              </span>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="px-10 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-600 transition-all text-xl"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
