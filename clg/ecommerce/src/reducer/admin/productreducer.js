import { InitialProductData } from "../../action/constants";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case InitialProductData.FETCH_INITIAL_PRODUCT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case InitialProductData.FETCH_INITIAL_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products, // Assuming payload contains the fetched data
      };

    case InitialProductData.FETCH_INITIAL_PRODUCT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Assuming payload contains the error message
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload], // Assuming payload contains the new product
      };

    default:
      return state;
  }
};

export default productReducer;
