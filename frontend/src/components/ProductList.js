// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/Slices/productSlice";
// import { addToCartAction } from "../redux/Slices/cartSlice";

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products); // Fetch products from Redux store
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(10);
//   const [columns, setColumns] = useState(3); // Default to 3 columns

//   useEffect(() => {
//     dispatch(fetchProducts()); // Dispatch the fetchProducts action
//   }, [dispatch]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleAddToCart = (productId) => {
//     const userId = localStorage.getItem("userId");
//     const quantity = 1; // Default quantity

//     if (!userId) {
//       alert("You need to log in first!");
//       return;
//     }

//     dispatch(addToCartAction({ userId, productId, quantity }))
//       .unwrap()
//       .then(() => {
//         alert("Product added to cart!");
//       })
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//         alert(error || "Failed to add product to cart. Please try again.");
//       });
//   };

//   // Generate page numbers for pagination
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="container mx-auto p-6">
//       {/* Grid Layout Controls */}
//       <div className="mb-6 flex justify-end space-x-4">
//         <button
//           onClick={() => setColumns(2)}
//           className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
//             columns === 2
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-800 hover:bg-blue-100"
//           }`}
//         >
//           <span>2 Columns</span>
//         </button>
//         <button
//           onClick={() => setColumns(3)}
//           className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
//             columns === 3
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-800 hover:bg-blue-100"
//           }`}
//         >
//           <span>3 Columns</span>
//         </button>
//         <button
//           onClick={() => setColumns(4)}
//           className={`px-6 py-2 flex items-center space-x-2 rounded-md text-sm font-medium transition-all duration-200 ${
//             columns === 4
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-800 hover:bg-blue-100"
//           }`}
//         >
//           <span>4 Columns</span>
//         </button>
//       </div>

//       {/* Product Grid */}
//       <div
//         style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
//         className="grid gap-6"
//       >
//         {loading && <p>Loading products...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {currentProducts.map((product) => (
//           <div
//             key={product._id}
//             className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//           >
//             <div className="relative">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-64 object-cover"
//               />
//               <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
//             </div>
//             <div className="p-5">
//               <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-800">
//                 {product.title}
//               </h5>
//               <p className="mb-3 text-sm text-gray-600 line-clamp-2">
//                 {product.description}
//               </p>
//               <p className="text-lg font-bold text-green-600 mb-4">
//                 ${product.price}
//               </p>
//               <button
//                 onClick={() => handleAddToCart(product._id)}
//                 className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-end mt-8">
//         <nav>
//           <ul className="flex space-x-4">
//             {pageNumbers.map((number) => (
//               <li key={number}>
//                 <button
//                   onClick={() => paginate(number)}
//                   className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium transition-all duration-200 ${
//                     currentPage === number
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-700 hover:bg-blue-100"
//                   }`}
//                 >
//                   {number}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/productSlice";
import { addToCartAction } from "../redux/Slices/cartSlice";
import { Link } from "react-router-dom"; // Import Link component for routing

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products); // Fetch products from Redux store
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [columns, setColumns] = useState(3); // Default to 3 columns

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch the fetchProducts action
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (productId) => {
    const userId = localStorage.getItem("userId");
    const quantity = 1; // Default quantity

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
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-6">
      {/* Grid Layout Controls */}
      <div className="mb-6 flex justify-end space-x-4">
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

      {/* Product Grid */}
      <div
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        className="grid gap-6"
      >
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-800">
                {product.title}
              </h5>
              <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-green-600 mb-4">
                ${product.price}
              </p>
              <Link
                to={`/product/${product._id}`}
                className="block mb-2 text-blue-600 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
