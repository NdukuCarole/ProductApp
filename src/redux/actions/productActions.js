import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    dispatch({
      type: "FETCH_PRODUCTS_SUCCESS",
      payload: { products },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_PRODUCTS_FAILURE",
      payload: { error: error.message },
    });
  }
};

export const addProduct = (newProduct) => async (dispatch) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const addedProduct = await response.json();

    dispatch({
      type: "ADD_PRODUCT",
      payload: { product: addedProduct },
      message: "success adding product",
    });
    toast.success("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const editProduct = (productId, updatedProduct) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to edit product");
    }

    const editedProduct = await response.json();

    dispatch({
      type: "EDIT_PRODUCT",
      payload: { product: editedProduct },
    });

    // Show a success toast
    toast.success("Product edited successfully");
  } catch (error) {
    console.error("Error editing product:", error);

    // Show an error toast
    toast.error("Failed to edit product");
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    dispatch({
      type: "DELETE_PRODUCT",
      payload: { productId },
    });
    toast.success("Product Deleted successfully")
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
