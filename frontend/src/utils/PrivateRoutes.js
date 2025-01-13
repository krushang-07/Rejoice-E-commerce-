import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  // Get the user data from localStorage
  const role = localStorage.getItem("role");
  console.log(role);

  // If no user or no role in localStorage, redirect to login
  if (!role) {
    return <Navigate to="/login" />;
  }

  // If the user doesn't have an allowed role, redirect accordingly
  if (!allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default PrivateRoute;
