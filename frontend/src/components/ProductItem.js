import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/Slices/productSlice";
import { addToCartAction } from "../redux/Slices/cartSlice";
import { useParams } from "react-router-dom";

const ProductItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You need to log in first!");
      return;
    }

    if (!product) return;

    dispatch(addToCartAction({ userId, productId: id, quantity }))
      .unwrap()
      .then(() => {
        alert("Product added to cart!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart. Please try again.");
      });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  if (product === null) {
    return null;
  }

  // Dummy Review Data
  const dummyReviews = [
    { username: "John Doe", rating: 4, comment: "Great product!" },
    { username: "Jane Smith", rating: 5, comment: "Absolutely love it!" },
    {
      username: "Michael Lee",
      rating: 3,
      comment: "It's decent, but could be better.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-[500px] h-[500px] bg-gray-100 overflow-hidden rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {product.title}
          </h1>
          <p className="text-xl font-semibold text-green-600">
            ${product.price}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-600">({product.ratings} ratings)</span>
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded-md text-xl hover:bg-gray-400 transition duration-200"
            >
              -
            </button>
            <span className="text-2xl font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 bg-gray-300 rounded-md text-xl hover:bg-gray-400 transition duration-200"
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-6 border-b-2 pb-4">
            <button
              className={`text-lg font-semibold ${
                activeTab === "description"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`text-lg font-semibold ${
                activeTab === "reviews"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div>
              <p className="text-lg text-gray-700">{product.description}</p>
              <div className="space-y-4 mt-6">
                <p>
                  <strong className="font-semibold text-gray-800">
                    Brand:
                  </strong>{" "}
                  {product.brand}
                </p>
                <p>
                  <strong className="font-semibold text-gray-800">
                    Model:
                  </strong>{" "}
                  {product.model}
                </p>
                <p>
                  <strong className="font-semibold text-gray-800">
                    Category:
                  </strong>{" "}
                  {product.category}
                </p>
                <p>
                  <strong className="font-semibold text-gray-800">
                    Discount:
                  </strong>{" "}
                  {product.discount}% off
                </p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Customer Reviews
              </h3>
              <div className="space-y-4 mt-4">
                {dummyReviews.map((review, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <p>
                      <strong className="font-semibold">
                        {review.username}
                      </strong>
                    </p>
                    <p className="text-yellow-500">
                      Rating: {review.rating} stars
                    </p>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
