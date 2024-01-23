const initialState = {
  products: [],
  error: null,
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
      };
    default:
      return state;
  }
};

export default productReducer;
