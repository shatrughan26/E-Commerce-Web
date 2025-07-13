import React from "react";

const AdminSidebar = ({ setActiveComponent }) => {
  return (
    <div className="bg-light border-end h-100 p-3">
      <h5 className="mb-4">Admin Panel</h5>
      <button className="btn btn-link d-block text-start" onClick={() => setActiveComponent("users")}>User List</button>
      <button className="btn btn-link d-block text-start" onClick={() => setActiveComponent("create")}>Create User</button>
      <button className="btn btn-link d-block text-start" onClick={() => setActiveComponent("delete")}>Delete User</button>
      <button className="btn btn-link d-block text-start" onClick={() => setActiveComponent("products")}>Product List</button>
      <button className="btn btn-link d-block text-start" onClick={() => setActiveComponent("forgot")}>Forgot Password</button>
      <button className="btn btn-link d-block text-start" onClick={() => setActiveComponent("reset")}>Reset Password</button>
      <button className="btn btn-link d-block text-start text-danger" onClick={() => setActiveComponent("logout")}>Logout</button>
    </div>
  );
};

export default AdminSidebar;
