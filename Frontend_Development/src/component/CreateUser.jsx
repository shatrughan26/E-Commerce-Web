import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const CreateUser = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    try {

      const token = localStorage.getItem("adminToken");

      const res = await axios.post("http://localhost:5000/api/admin/create-user", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: "success", text: res.data.message || "User created successfully!" });
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.error || "Failed to create user" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Create User</h3>

      {message.text && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password (sent via mail)</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} required onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Create User"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
//delete by id
//create user + send mail