import React from "react";

const AdminSidebar = ({ setActiveSection }) => {
  return (
    <div className="bg-light border-end h-100 p-3">
      <h5 className="mb-4 text-uppercase">Admin Panel</h5>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("userlist")}
      >
        User List
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("createuser")}
      >
        Create User
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("deleteuser")}
      >
        Delete User
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("productlist")}
      >
        Product List
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("forgotreset")}
      >
        Forgot Password
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("resetpassword")}
      >
        Reset Password
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("productupload")}
      >
        Upload Products
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("bannerupload")}
      >
        Upload Banner
      </button>
      <button
        className="btn btn-link d-block text-start text-decoration-none text-uppercase"
        onClick={() => setActiveSection("orderstatus")}
      >
        Order Status
      </button>
      <button
        className="btn btn-link d-block text-start text-danger text-decoration-none text-uppercase"
        onClick={() => setActiveSection("logout")}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
