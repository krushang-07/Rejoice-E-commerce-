import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/Slices/productSlice"; // Assuming createProduct is the Redux action
import axios from "axios";

const AdminDashboard = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    model: "",
    color: "",
    discount: 0,
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();

  // Function to handle image upload to Cloudinary
  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "pick_n_shop");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkdsmjzui/image/upload",
        formData
      );
      console.log(response.data);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.category
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Handle image upload first
    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) return; // If image upload fails, stop form submission

    // Merge image URL with other product data
    const productDataWithImage = { ...productData, image: uploadedImageUrl };
    console.log(productDataWithImage);

    // Dispatch the createProduct action to Redux
    dispatch(createProduct(productDataWithImage));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productData.title}
            onChange={(e) =>
              setProductData({ ...productData, title: e.target.value })
            }
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            placeholder="Price"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="Category"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
          />
        </div>

        {/* Product Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            placeholder="Brand"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productData.brand}
            onChange={(e) =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />
        </div>

        {/* Product Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <input
            type="text"
            placeholder="Model"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productData.model}
            onChange={(e) =>
              setProductData({ ...productData, model: e.target.value })
            }
          />
        </div>

        {/* Product Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="text"
            placeholder="Color"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productData.color}
            onChange={(e) =>
              setProductData({ ...productData, color: e.target.value })
            }
          />
        </div>

        {/* Product Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount (%)
          </label>
          <input
            type="number"
            placeholder="Discount"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productData.discount}
            onChange={(e) =>
              setProductData({ ...productData, discount: e.target.value })
            }
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
