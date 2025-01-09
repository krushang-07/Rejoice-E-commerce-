import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/productSlice";
import { addToCartAction } from "../redux/Slices/cartSlice";

const UserPage = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products); // Access products state
  const { loading: cartLoading, error: cartError } = useSelector(
    (state) => state.cart
  ); // Access cart state

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when component mounts
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    const userId = localStorage.getItem("userId");
    dispatch(addToCartAction({ productId, quantity: 1, userId }));
  };

  if (productsLoading) return <div>Loading products...</div>;
  if (productsError) return <div>Error: {productsError}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product List</h1>
      {cartLoading && <p>Adding product to cart...</p>}
      {cartError && <p className="text-red-500">Error: {cartError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
