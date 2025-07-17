// AdminProductForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AdminProductUpload = ({ isUpdate = false, existingData = {} }) => {

  const [title, setTitle] = useState(existingData.title || "");
  const [description, setDescription] = useState(
    existingData.description || ""
  );
  const [category, setCategory] = useState(existingData.category || "");
  const [price, setPrice] = useState(existingData.price || "");
  const [stock, setStock] = useState(existingData.stock || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);

    if (image) {
      formData.append("imageUrl", image);  // Backend expects imageUrl field
    }

    try {
    await axios.post("http://localhost:5000/api/products/add-product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Product added successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to add product");
  }

  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="p-4 shadow rounded container d-flex flex-column align-items-left justify-content-center m-md-4 "
    ><h1 className="mb-3">
      Add Products
    </h1>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {preview && (
        <img src={preview} alt="Preview" width="150" className="mt-2" />
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="d-flex mt-4 border border-black"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="mt-4 border border-black"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="mt-4 border border-black"
      >
        <option value="">Select Category</option>
        <option value="stationary">Stationary</option>
        <option value="cleaning">Cleaning</option>
        {/* Add more */}
      </select>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        type="number"
        required
        className="mt-4 border border-black"
      />
      <input
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock"
        type="number"
        required
        className="mt-4 border border-black"
      />

      <button type="submit" className="btn btn-primary mt-3">
        {isUpdate ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};


export default AdminProductUpload;

