import React, { useState } from "react";
import {  useSelector } from "react-redux";


const AddProductForm = ({ onAddProduct, onClose }) => {
  const { successMessage } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddProduct(formData);

    setFormData({
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    });

    // onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="inputForm">
      <h2>Add Product</h2>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        className="textarea"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
      />

      <label>Category</label>

      <select
        value={formData.category}
        onChange={handleCategoryChange}
        className="select2"
      >
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
