import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // Import Framer Motion

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const formData = { ...values };
      try {
        const response = await dispatch(loginUser(formData)).unwrap();
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        localStorage.setItem("userId", response.userId);

        if (response.role === "admin") {
          toast.success("Admin login successful", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.success("Customer login successful", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        navigate("/");
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <motion.form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <img src="ecommerce.png" alt="PicknShop Logo" className="w-10 h-10" />
        </motion.div>

        <h2 className="text-3xl font-semibold text-center text-black mb-6">
          Login
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-6">
          <label className="block mb-2 text-black" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-black" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full p-3 text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <motion.p
          className="text-center mt-4 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-black hover:underline">
            Signup
          </Link>
        </motion.p>
      </motion.form>
    </div>
  );
};

export default Login;
