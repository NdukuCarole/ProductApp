import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";

const EditProductForm = ({ product, onEditProduct, onClose }) => {
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProduct(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="inputForm">
      <h2> Edit Product</h2>
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
        onChange={handleChange}
        className="select2"
        name="category"
      >
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      <button type="submit">Edit Product</button>
    </form>
  );
};

export default EditProductForm;
