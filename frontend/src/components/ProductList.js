import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/productSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const [columns, setColumns] = useState(4); // Default to 3 columns
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Track the state of the category list visibility
  const [selectedCategory, setSelectedCategory] = useState(
    new URLSearchParams(location.search).get("type") || ""
  );

  const categories = ["mobile", "tv", "audio", "gaming"];

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const limit = parseInt(queryParams.get("limit")) || 10;

  // Fetch products with pagination and category filter
  useEffect(() => {
    dispatch(
      fetchProducts({ page: currentPage, limit, type: selectedCategory })
    )
      .unwrap()
      .then((data) => {
        setCurrentPageProducts(data.products);
        setTotalPages(Math.ceil(data.totalProducts / limit));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch, currentPage, limit, selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("type", category);
    queryParams.set("page", 1);
    const encodedUrl = queryParams.toString();
    setSelectedCategory(category);
    navigate({ search: encodedUrl });
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page click for pagination
  const paginate = (pageNumber) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", pageNumber);
    navigate({ search: queryParams.toString() });
  };

  return (
    <div className="container mx-auto p-6 flex">
      <aside className="w-1/4 pr-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="px-4 py-2 text-sm font-medium bg-gray-200 rounded-md w-full mb-4"
        >
          {isCategoryOpen ? "Hide Categories" : "Show All Categories"}
        </button>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isCategoryOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-grow">
        <div className="mb-6 flex justify-end space-x-4">
          <button
            onClick={() => setColumns(2)}
            className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
              columns === 2
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
          >
            <span>2 Columns</span>
          </button>
          <button
            onClick={() => setColumns(3)}
            className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
              columns === 3
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
          >
            <span>3 Columns</span>
          </button>
          <button
            onClick={() => setColumns(4)}
            className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
              columns === 4
                ? "bg-black text-white"
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
              <Link
                to={`/product/${product._id}`}
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
                </div>
              </Link>
            ))}
        </div>

        <div className="flex justify-end mt-8">
          <nav>
            <ul className="flex space-x-4">
              {pageNumbers.map((number) => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium transition-all duration-200 ${
                      currentPage === number
                        ? "bg-black text-white"
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
    </div>
  );
};

export default ProductList;
