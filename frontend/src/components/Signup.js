import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // Import Framer Motion

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        await dispatch(registerUser(values));
        toast.success("Customer registered successfully!");
        navigate("/login");
      } catch (err) {
        toast.error("Error registering user. Please try again.");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <img
            src="/ecommerce.png"
            alt="PicknShop Logo"
            className="w-10 h-10"
          />
        </motion.div>

        <h1 className="text-3xl font-semibold text-center text-black mb-6">
          Register
        </h1>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <motion.input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          <motion.input
            type="text"
            name="address"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mb-4">
              Registration successful!
            </p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full p-3 text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <motion.p
          className="text-center mt-4 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline">
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, googleLogin } from "../redux/Slices/userSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import { GoogleLogin } from "@react-oauth/google";

// const Signup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading } = useSelector((state) => state.user);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       address: "",
//       role: "customer", // Default to 'customer'
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Full name is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       password: Yup.string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
//       address: Yup.string().required("Address is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         await dispatch(registerUser(values));
//         toast.success("Customer registered successfully!");
//         navigate("/login");
//       } catch (err) {
//         toast.error("Error registering user. Please try again.");
//       }
//     },
//   });

//   // Google Login success callback
//   const handleGoogleLoginSuccess = (response) => {
//     const { tokenId } = response;
//     dispatch(googleLogin(tokenId))
//       .then(() => {
//         toast.success("Google login successful!");
//         navigate("/");
//       })
//       .catch((err) => {
//         toast.error("Error logging in with Google. Please try again.");
//       });
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-white">
//       <motion.div
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//       >
//         {/* Logo */}
//         <motion.div
//           className="mb-6 flex justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           <img
//             src="/ecommerce.png"
//             alt="PicknShop Logo"
//             className="w-10 h-10"
//           />
//         </motion.div>

//         <h1 className="text-3xl font-semibold text-center text-black mb-6">
//           Register
//         </h1>

//         {/* Form */}
//         <form onSubmit={formik.handleSubmit}>
//           <motion.input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//           />
//           {formik.touched.name && formik.errors.name && (
//             <p className="text-red-500 text-sm">{formik.errors.name}</p>
//           )}

//           <motion.input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <p className="text-red-500 text-sm">{formik.errors.email}</p>
//           )}

//           <motion.input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.5 }}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className="text-red-500 text-sm">{formik.errors.password}</p>
//           )}

//           <motion.input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formik.values.address}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.5 }}
//           />
//           {formik.touched.address && formik.errors.address && (
//             <p className="text-red-500 text-sm">{formik.errors.address}</p>
//           )}

//           <motion.button
//             type="submit"
//             disabled={loading}
//             className="w-full p-3 text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out"
//             whileHover={{ scale: 1.05 }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.9, duration: 0.5 }}
//           >
//             {loading ? "Registering..." : "Register"}
//           </motion.button>
//         </form>

//         <motion.p
//           className="text-center mt-4 text-black"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 0.5 }}
//         >
//           Already have an account?{" "}
//           <Link to="/login" className="text-black hover:underline">
//             Login
//           </Link>
//         </motion.p>

//         {/* Google Login Button */}
//         <div className="mt-6 flex justify-center">
//           <GoogleLogin
//             onSuccess={handleGoogleLoginSuccess}
//             onError={(error) => console.error("Google Login Error:", error)}
//           />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;
