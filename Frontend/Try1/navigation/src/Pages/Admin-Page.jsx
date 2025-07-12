// AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin-Page.css';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div>
      <h2 className="Logo-name">Shri Syam Enterprises</h2>
      <div className="container">
        <div>
          <h2 className="admin-title">Admin Login</h2>
          <input
            className="Admin-email"
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="admin-password"
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button"onClick={handleLogin}>Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
