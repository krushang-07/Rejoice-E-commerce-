import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  updateProduct,
  deleteProduct,
} from "../redux/Slices/productSlice";
import Loader from "../utils/Loader";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const {
    products: productData,
    loading,
    error,
    updateStatus,
    deleteStatus,
  } = useSelector((state) => state.products);
  const productList = productData?.products || [];

  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      image: null,
    });
  };

  const handleUpdate = () => {
    if (editProduct) {
      const updatedData = new FormData();
      updatedData.append("title", formData.title);
      updatedData.append("description", formData.description);
      updatedData.append("price", formData.price);
      updatedData.append("brand", formData.brand);
      if (formData.image) {
        updatedData.append("image", formData.image);
      }

      dispatch(
        updateProduct({
          id: editProduct._id,
          productData: updatedData,
        })
      );
      setEditProduct(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      brand: "",
      image: null,
    });
    setEditProduct(null);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Product Management</h1>
      {updateStatus === "success" && (
        <p className="text-green-600 mb-4">Product updated successfully!</p>
      )}
      {updateStatus === "failed" && (
        <p className="text-red-600 mb-4">Error updating product.</p>
      )}
      {deleteStatus === "success" && (
        <p className="text-green-600 mb-4">Product deleted successfully!</p>
      )}
      {deleteStatus === "failed" && (
        <p className="text-red-600 mb-4">Error deleting product.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {productList.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <p className="text-sm mt-2">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-sm">
                <strong>Brand:</strong> {product.brand}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editProduct && (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description:
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price:</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Brand:</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
