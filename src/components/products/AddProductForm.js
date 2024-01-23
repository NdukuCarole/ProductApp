import React, { useState } from "react";

const AddProductForm = ({ onAddProduct, onClose }) => {
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
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
