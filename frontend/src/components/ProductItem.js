// components/ProductItem.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/Slices/productSlice"; // Ensure this is correct
import { addToCartAction } from "../redux/Slices/cartSlice";
import { useParams } from "react-router-dom";

const ProductItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  console.log(product);
  const [quantity, setQuantity] = useState(1);

  console.log("Dispatching fetchProductById with id:", id);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (product === null) {
    return null;
  }
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="w-full h-[400px] lg:h-[600px] bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl font-semibold text-green-600">
            ${product.price}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            <span className="ml-2 text-gray-600">
              ({product.ratings} ratings)
            </span>
          </div>
          <p className="text-gray-700">{product.description}</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              -
            </button>
            <span className="mx-4 text-xl">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-blue-600 text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Specifications</h3>
            <ul className="list-disc pl-5">
              {product.specifications?.map((spec, index) => (
                <li key={index} className="text-gray-600">
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
