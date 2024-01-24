import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

import {
  addProduct,
  fetchProducts,
  editProduct,
  deleteProduct,
} from "../../redux/actions/productActions";
import "./styles.css";
import Modal from "react-modal";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";

Modal.setAppElement("#root");

const Products = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);

  const [sortBy, setSortBy] = useState("title");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setSelectedProductForEdit(product);
    setIsEditFormOpen(true);
    setIsModalOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    dispatch(editProduct(selectedProductForEdit.id, updatedProduct));

    setIsEditFormOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    closeModal();
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSort = (property) => {
    setSortBy(property);
  };

  const handleFilter = (category) => {
    setFilterByCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    dispatch(addProduct(newProduct));

    setIsFormOpen(false);
  };

  const filteredProducts = products
    .filter((product) =>
      filterByCategory ? product.category === filterByCategory : true
    )
    .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

  return (
    <div>
      {/* <h2>Products</h2> */}
      <Navbar />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="sort">
        <label className="label">Sort By:</label>
        <select className="select" onChange={(e) => handleSort(e.target.value)}>
          <option value="">All</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>

        <label className="label2">Filter By Category:</label>
        <select
          className="select"
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">All</option>

          {Array.from(new Set(products.map((product) => product.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
        <button className="button-3" role="button" onClick={handleOpenForm}>
          Add Product
        </button>
      </div>

      <ul className="product-grid">
        {filteredProducts.map((product) => (
          <li
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product)}
          >
            <div className="row">
              <div className="column">
                <div className="product-content">
                  <span className="bg animated fadeInDown">
                    {product.category}
                  </span>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <div className="button">
                    <a href="#">${product.price}</a>
                    <a className="cart-btn" href="#">
                      <i className="cart-icon ion-bag"></i>ADD TO CART
                    </a>
                  </div>
                </div>
              </div>
              <div className="column2">
                <img src={product.image} alt="Product" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
      >
        {selectedProduct && (
          <div>
            {/* <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p> */}
            <div className="row">
              <div className="modal-column">
                <div className="modal-product-content">
                  <span className="bg animated fadeInDown">
                    {selectedProduct.category}
                  </span>
                  <h2>{selectedProduct.title}</h2>
                  <p className="modal-description">
                    {selectedProduct.description}
                  </p>
                  <div className="button">
                    <a href="#">${selectedProduct.price}</a>
                    <a className="cart-btn" href="#">
                      <i className="cart-icon ion-bag"></i>ADD TO CART
                    </a>
                  </div>

                  <div className="button">
                    <button
                      className="button-4"
                      role="button"
                      onClick={openEditForm.bind(null, selectedProduct)}
                    >
                      Edit Product
                    </button>

                    <button
                      className="button-5"
                      role="button"
                      onClick={handleDeleteProduct.bind(
                        null,
                        selectedProduct.id
                      )}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="column2">
                <img
                  className="modal-img"
                  src={selectedProduct.image}
                  alt="Product"
                />
              </div>
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
      <Modal
        className="addProdModal"
        isOpen={isFormOpen}
        onRequestClose={() => setIsFormOpen(false)}
        contentLabel="Add Product"
      >
        <AddProductForm
          onAddProduct={handleAddProduct}
          onClose={() => setIsFormOpen(false)}
        />
      </Modal>

      {isEditFormOpen && selectedProductForEdit && (
        <Modal
          className="addProdModal"
          isOpen={isEditFormOpen}
          onRequestClose={() => setIsEditFormOpen(false)}
          contentLabel="Edit Product"
        >
          <EditProductForm
            product={selectedProductForEdit}
            onEditProduct={handleEditProduct}
            onClose={() => setIsEditFormOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Products;
