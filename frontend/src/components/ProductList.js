import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/productSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaThLarge, FaTh, FaThList } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonCard from "../utils/SkeletonCard";
import useDebounce from "../Hooks/useDebounce";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const [columns, setColumns] = useState(4);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    new URLSearchParams(location.search).get("type") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    new URLSearchParams(location.search).get("brand") || ""
  );
  const [sortOrder, setSortOrder] = useState(
    new URLSearchParams(location.search).get("sort") || ""
  );

  const categories = [
    "mobile",
    "tv",
    "audio",
    "gaming",
    "laptop",
    "appliances",
  ];

  const brands = [
    "apple",
    "samsung",
    "sony",
    "LG",
    "xiaomi",
    "logitech G",
    "microsoft",
    "Havells",
    "boat",
    "JBL",
  ];

  const sortOptions = [
    { value: "", label: "Price" },
    { value: "asc", label: "Low to High" },
    { value: "desc", label: "High to Low" },
  ];

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const limit = parseInt(queryParams.get("limit")) || 30;

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit,
        type: selectedCategory || "",
        brand: selectedBrand || "",
        search: debouncedSearchQuery,
        sort: sortOrder,
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
      })
    )
      .unwrap()
      .then((data) => {
        setCurrentPageProducts(data.products);
        setTotalPages(Math.ceil(data.totalProducts / limit));
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [
    dispatch,
    currentPage,
    limit,
    selectedCategory,
    selectedBrand,
    debouncedSearchQuery,
    sortOrder,
    debouncedPriceRange,
  ]);

  const handleCategorySelect = (category) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("type", category);
    queryParams.set("page", 1);
    const encodedUrl = queryParams.toString();
    setSelectedCategory(category);
    navigate({ search: encodedUrl });
  };

  const handleBrandSelect = (brand) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("brand", brand);
    queryParams.set("page", 1);
    const encodedUrl = queryParams.toString();
    setSelectedBrand(brand);
    navigate({ search: encodedUrl });
  };

  const handleSortSelect = (sort) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", sort);
    queryParams.set("page", 1);
    const encodedUrl = queryParams.toString();
    setSortOrder(sort);
    navigate({ search: encodedUrl });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleColumnChange = (value) => {
    setColumns(value);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", pageNumber);
    navigate({ search: queryParams.toString() });
  };

  return (
    <div className="p-16 m-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center space-x-4">
          <select
            onChange={(e) => handleCategorySelect(e.target.value)}
            value={selectedCategory}
            className="px-4 py-2 border rounded-md w-48"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => handleBrandSelect(e.target.value)}
            value={selectedBrand}
            className="px-4 py-2 border rounded-md w-48"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-md w-1/3"
            placeholder="Search products..."
          />

          <select
            onChange={(e) => handleSortSelect(e.target.value)}
            value={sortOrder}
            className="px-4 py-2 border rounded-md w-48"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex flex-col space-y-2 w-48">
            <label className="text-lg">Price Range</label>
            <input
              type="range"
              name="0"
              min={0}
              max={2000}
              value={priceRange[0]}
              onChange={handlePriceChange}
              className="w-full"
            />
            <input
              type="range"
              name="1"
              min={0}
              max={2000}
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-lg">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Column Control */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleColumnChange(2)}
              className={`px-4 py-2 border rounded-md ${
                columns === 2 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => handleColumnChange(3)}
              className={`px-4 py-2 border rounded-md ${
                columns === 3 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <FaThList />
            </button>
            <button
              onClick={() => handleColumnChange(4)}
              className={`px-4 py-2 border rounded-md ${
                columns === 4 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <FaThLarge />
            </button>
          </div>
        </div>

        <div
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {loading &&
            Array.from({ length: 15 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border text-sm font-medium bg-white text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 ${
                  currentPage === number
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border text-sm font-medium bg-white text-gray-700 hover:bg-gray-50"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-gray-700">
            Showing {currentPage} of {totalPages} pages
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
