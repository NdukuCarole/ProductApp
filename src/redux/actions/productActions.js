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
    });
  } catch (error) {
    console.error("Error adding product:", error);
    // You can dispatch an error action if needed
  }
};
