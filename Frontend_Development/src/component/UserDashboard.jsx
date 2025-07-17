import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserSidebar from "./UserProfileDashboard/Usersidebar";
import MyProfile from "./UserProfileDashboard/MyProfile";
import Myaddress from "./UserProfileDashboard/Myaddress";
import MyOrders from "./UserProfileDashboard/Myorders";
import Wishlist from "./UserProfileDashboard/Wishlist";
import Myoffers from "./UserProfileDashboard/Myoffers";

// Import your components

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("Profile");

  // Dynamically load components based on sidebar selection
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <MyProfile />;
      case "Address":
        return <Myaddress />;
      case "Order":
        return <MyOrders />;
      case "Offers":
        return <Myoffers />;
      case "Wishlist":
        return <Wishlist />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px" }} className="bg-light border-end">
        <UserSidebar setActiveSection={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default UserDashboard;
