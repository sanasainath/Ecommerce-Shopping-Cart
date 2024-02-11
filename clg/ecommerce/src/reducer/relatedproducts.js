import { productConstants } from "../action/constants";

const initialState = {
    relatedProducts: [],
    loading: false,
    error: '',
  };
  
  const relatedProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case productConstants.GET_RELATED_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case productConstants.GET_RELATED_PRODUCTS_SUCCESS:
        return {
          ...state,
          relatedProducts: action.payload.products,
          loading: false,
          error: '',
        };
      case productConstants.GET_RELATED_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default relatedProductsReducer;
  