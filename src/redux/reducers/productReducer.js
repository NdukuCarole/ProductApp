const initialState = {
  products: [],
  error: null,
  successMessage: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        error: null,
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        products: [],
        error: action.payload.error,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload.product],
        error: null,
        successMessage: action.payload.message,
      };

    case "EDIT_PRODUCT":
      const editedProduct = action.payload.product;

      return {
        ...state,
        products: state.products.map((product) =>
          product.id === editedProduct.id ? editedProduct : product
        ),
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default productReducer;
