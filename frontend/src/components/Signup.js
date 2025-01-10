import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/Slices/userSlice"; // Adjust the path based on your file structure
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access loading and error states from Redux
  const { loading, error, success } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      role: "customer", // Default to 'customer'
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Dispatch the registerUser action
        await dispatch(registerUser(values));
        alert("User registered successfully!");
        navigate("/login");
      } catch (err) {
        console.error("Error registering user:", err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 mb-4 border rounded-lg"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 mb-4 border rounded-lg"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 mb-4 border rounded-lg"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 mb-4 border rounded-lg"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}

          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            className="w-full p-2 mb-4 border rounded-lg"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mb-4">
              Registration successful!
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
