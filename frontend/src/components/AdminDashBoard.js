import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/Slices/productSlice"; // Assuming createProduct is the Redux action
import axios from "axios";
import { motion } from "framer-motion"; // Import motion for animations
import { toast } from "react-toastify"; // Import toast for notifications
import { useDropzone } from "react-dropzone"; // Import useDropzone for drag-and-drop

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

    try {
      dispatch(createProduct(productDataWithImage));
      setProductData({
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
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error("Error creating product. Please try again.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImageFile(acceptedFiles[0]);
    },
  });
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <motion.h1
        className="text-3xl font-extrabold flex justify-center mb-6 text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Admin Dashboard
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Product Title */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Product Title"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={productData.title}
            onChange={(e) =>
              setProductData({ ...productData, title: e.target.value })
            }
          />
        </motion.div>

        {/* Product Description */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Description"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
        </motion.div>

        {/* Product Price */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">Price</label>
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
        </motion.div>

        {/* Product Category */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">Category</label>
          <input
            type="text"
            placeholder="Category"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
          />
        </motion.div>

        {/* Product Brand */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">Brand</label>
          <input
            type="text"
            placeholder="Brand"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={productData.brand}
            onChange={(e) =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />
        </motion.div>

        {/* Product Model */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">Model</label>
          <input
            type="text"
            placeholder="Model"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={productData.model}
            onChange={(e) =>
              setProductData({ ...productData, model: e.target.value })
            }
          />
        </motion.div>

        {/* Product Color */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">Color</label>
          <input
            type="text"
            placeholder="Color"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={productData.color}
            onChange={(e) =>
              setProductData({ ...productData, color: e.target.value })
            }
          />
        </motion.div>

        {/* Product Discount */}
        <motion.div whileHover={{ scale: 1.05 }} className="input-field">
          <label className="text-lg font-medium text-gray-700">
            Discount (%)
          </label>
          <input
            type="number"
            placeholder="Discount"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={productData.discount}
            onChange={(e) =>
              setProductData({ ...productData, discount: e.target.value })
            }
          />
        </motion.div>

        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.05 }}
          className="border-dashed border-2 border-gray-400 p-6 text-center rounded-lg cursor-pointer"
        >
          {" "}
          <label className="text-lg font-medium text-gray-700">
            Product Image
          </label>
          <input {...getInputProps()} />
          <p className="text-lg font-medium text-gray-600">
            Drag & Drop Images or Click to Select
          </p>
        </motion.div>

        {imageFile && (
          <div className="mt-4 w-48 relative">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="absolute top-2 right-2 bg-white bg-transparent text-black hover:bg-white text-sm px-2 py-1 rounded-lg"
            >
              X
            </button>
          </div>
        )}

        <motion.button
          type="submit"
          className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Create Product
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AdminDashboard;
