// productReducer.js
import { productConstants } from "../action/constants";

const initialState = {
  productsbycat: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_CAT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productConstants.GET_PRODUCT_BY_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
        productsbycat: action.payload.products, // Update based on your actual response structure
        error: null,
      };
    case productConstants.GET_PRODUCT_BY_CAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
