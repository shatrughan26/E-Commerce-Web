import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Myaddress = () => {
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedCompany, setUpdatedCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Load current user data
  useEffect(() => {
    axios
      .get("http://localhost:5500/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAddress(res.data.address || "");
        setCompany(res.data.company || "");
        setUpdatedAddress(res.data.address || "");
        setUpdatedCompany(res.data.company || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading address:", err);
        setMessage("❌ Failed to fetch profile data");
        setLoading(false);
      });
  }, []);

  // ✅ Update API call
  const handleUpdate = () => {
    axios
      .put(
        "http://localhost:5500/api/user/update-address-company",
        {
          address: updatedAddress,
          company: updatedCompany,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAddress(updatedAddress);
        setCompany(updatedCompany);
        setMessage("✅ Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Update error:", err);
        setMessage("❌ Failed to update profile");
      });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow p-4">
        <h3>Address & Company Info</h3>

        <Form className="mt-4">
          <Form.Group controlId="companyName" className="mb-3">
            <Form.Label>
              <strong>Company Name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={updatedCompany}
              onChange={(e) => setUpdatedCompany(e.target.value)}
              placeholder="Enter your company name"
            />
          </Form.Group>

          <Form.Group controlId="address" className="mb-3">
            <Form.Label>
              <strong>Address</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={updatedAddress}
              onChange={(e) => setUpdatedAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </Form.Group>

          <Button onClick={handleUpdate} className="mt-2">
            Save Changes
          </Button>
        </Form>

        {message && <Alert className="mt-3">{message}</Alert>}
      </Card>
    </Container>
  );
};

export default Myaddress;
