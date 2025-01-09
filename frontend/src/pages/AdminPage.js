import React from "react";
import AdminDashboard from "../components/AdminDashBoard";

const AdminPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
