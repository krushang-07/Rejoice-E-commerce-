// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     role: "customer", // Default to 'customer'
//   });

//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess(false);

//     try {
//       await axios.post("/api/users/register", formData); // Assuming `/api/users/register` is the endpoint
//       setSuccess(true);
//       alert("User registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Error registering user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full p-2 mb-4 border rounded-lg"
//           >
//             <option value="customer">Customer</option>
//             <option value="admin">Admin</option>
//           </select>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           {success && (
//             <p className="text-green-500 text-sm mb-4">
//               Registration successful!
//             </p>
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//         <p className="text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/Slices/userSlice"; // Adjust the path based on your file structure
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access loading and error states from Redux
  const { loading, error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "customer", // Default to 'customer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the registerUser action
      await dispatch(registerUser(formData));
      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
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
