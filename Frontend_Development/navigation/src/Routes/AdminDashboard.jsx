import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your components
import AdminSidebar from "../component/AdminSidebar";
import UserList from "../component/UserList";
import CreateUser from "../component/CreateUser";
import DeleteUser from "../component/DeleteUser";
import ProductList from "../component/ProductList";
import ForgotResetAdminPass from "../component/ForgotResetAdminPass"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("userlist");

  // Dynamically load components based on sidebar selection
  const renderContent = () => {
    switch (activeSection) {
      case "userlist":
        return <UserList />;
      case "createuser":
        return <CreateUser />;
      case "deleteuser":
        return <DeleteUser />;
      case "productlist":
        return <ProductList />;
      case "forgotreset":
        return <ForgotResetAdminPass />;
      default:
        return <UserList />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px" }} className="bg-light border-end">
        <AdminSidebar setActiveSection={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
