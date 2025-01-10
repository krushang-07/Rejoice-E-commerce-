import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/productSlice";
import { addToCartAction } from "../redux/Slices/cartSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const [columns, setColumns] = useState(3); // Default to 3 columns
  const [currentPageProducts, setCurrentPageProducts] = useState([]); // State for current page products
  const [totalPages, setTotalPages] = useState(0); // Total pages for pagination
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1; // Default to 1 if no page is specified
  const limit = parseInt(queryParams.get("limit")) || 10; // Default to 5 products per page if not specified

  // Fetch products with pagination
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit }))
      .unwrap()
      .then((data) => {
        setCurrentPageProducts(data.products);
        setTotalPages(Math.ceil(data.totalProducts / limit)); // Calculate total pages based on the limit and total products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch, currentPage, limit]);

  // Dispatch the add to cart action
  const handleAddToCart = (productId) => {
    const userId = localStorage.getItem("userId");
    const quantity = 1;

    if (!userId) {
      alert("You need to log in first!");
      return;
    }

    dispatch(addToCartAction({ userId, productId, quantity }))
      .unwrap()
      .then(() => {
        alert("Product added to cart!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert(error || "Failed to add product to cart. Please try again.");
      });
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page click for pagination
  const paginate = (pageNumber) => {
    queryParams.set("page", pageNumber);
    queryParams.set("limit", limit); // Ensure the limit stays the same
    navigate({ search: queryParams.toString() });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-end space-x-4">
        {/* Columns selection buttons */}
        <button
          onClick={() => setColumns(2)}
          className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
            columns === 2
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
          }`}
        >
          <span>2 Columns</span>
        </button>
        <button
          onClick={() => setColumns(3)}
          className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
            columns === 3
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
          }`}
        >
          <span>3 Columns</span>
        </button>
        <button
          onClick={() => setColumns(4)}
          className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
            columns === 4
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
          }`}
        >
          <span>4 Columns</span>
        </button>
      </div>

      <div
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {currentPageProducts.length > 0 &&
          currentPageProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h5 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {product.title}
                </h5>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-green-600">
                    ${product.price}
                  </p>
                  {product.discount > 0 && (
                    <p className="text-sm text-red-600 font-semibold">
                      {product.discount}% Off
                    </p>
                  )}
                </div>
                <Link
                  to={`/product/${product._id}`}
                  className="block text-blue-600 hover:underline mb-4"
                >
                  View Details
                </Link>
              </div>
              <div className="p-4 flex-shrink-0">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-8">
        <nav>
          <ul className="flex space-x-4">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium transition-all duration-200 ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
