import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCartAction,
  updateCartAction,
  resetCartState,
} from "../redux/Slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  const items = cartItems.items || [];

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
  const handleRemoveFromCart = (productId) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(removeFromCartAction(productId));
    }
  };

  const handleUpdateCart = (productId, quantity) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(updateCartAction({ productId, quantity }));
    }
  };

  // console.log("cartItems:", items); // Debug log for cartItems

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure cartItems has data before rendering the summary
  const totalPrice = items
    .reduce(
      (total, item) => (total + item.productId ? item.productId.price : 0),
      0
    )
    .toFixed(2);

  console.log(items);
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-lg">
      <h2 className="text-3xl font-semibold text-center mb-8">Your Cart</h2>

      {items.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          Your cart is empty!
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.productId.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${item.productId.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateCart(item.productId, item.quantity - 1)
                    }
                    className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateCart(item.productId, item.quantity + 1)
                    }
                    className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">Cart Summary</h3>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg text-gray-800">Total Items:</span>
            <span className="text-lg font-semibold text-gray-700">
              {items.length}
            </span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg text-gray-800">Total Price:</span>
            <span className="text-lg font-semibold text-gray-700">
              ${totalPrice}
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
