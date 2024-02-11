// featuredProductsReducer.js
import { productConstants } from "../action/constants";

const initialState = {
  loading: false,
  featuredProducts: [],
  error: null,
};

const featuredProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_FEATURED_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        featuredProducts: [],
        error: null,
      };

    case productConstants.GET_FEATURED_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        featuredProducts: action.payload,
        error: null,
      };

    case productConstants.GET_FEATURED_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        featuredProducts: [],
        error: action.payload,
      };

    // Add more cases as needed for other actions

    default:
      return state;
  }
};

export default featuredProductsReducer;
