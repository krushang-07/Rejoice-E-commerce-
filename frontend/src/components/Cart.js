import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchCart,
  removeFromCartAction,
  updateCartAction,
  resetCartState,
} from "../redux/Slices/cartSlice";
import axios from "axios";
import Loader from "../utils/Loader";
import EmptyCart from "../utils/EmptyCast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.cart);
  console.log(cartItems);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchCart({ userId }));
    } else {
      toast.error("You need to log in first!");
    }

    return () => {
      dispatch(resetCartState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("totalCartQuantity", totalQuantity);
    }
  }, [cartItems]);

  const handleRemoveFromCart = (productId) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(removeFromCartAction({ userId, productId }))
        .unwrap()
        .then(() => {
          dispatch(fetchCart({ userId }));
          toast.success("Item removed from cart successfully!");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdateCart = (productId, quantity) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      if (quantity > 0) {
        dispatch(updateCartAction({ userId, productId, quantity }))
          .unwrap()
          .then(() => toast.success("Cart updated successfully!"))
          .catch(() => toast.error("Failed to update the cart."));
      } else {
        handleRemoveFromCart(productId);
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
      const response = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          userId,
          cartItems,
          totalPrice,
        }
      );
      const { clientSecret } = response.data;
      navigate("/checkout", { state: { clientSecret, cartItems, totalPrice } });
      toast.success("Redirecting to checkout...");
    } catch (error) {
      toast.error("Error during checkout. Please try again.");
    }
  };

  const items = cartItems || [];
  if (items.length === 0) {
    return <EmptyCart />; // Show an empty cart message
  }
  const totalPrice =
    items.length > 0
      ? items
          .reduce(
            (total, item) =>
              total + (item?.productId?.price || 0) * (item?.quantity || 0),
            0
          )
          .toFixed(2)
      : "0.00";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-center mb-8">Your Cart</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 w-full">
              {items.length === 0 ? (
                <EmptyCart />
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
    </div>
  );
};

export default Cart;
