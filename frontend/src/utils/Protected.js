import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role !== "customer") {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
