import { productConstants } from "../action/constants";

const initialState = {
   AllProducts: [],
    loading: false,
    error: '',
  };
  
  const getAllproducts = (state = initialState, action) => {
    switch (action.type) {
      case productConstants.GET_ALL_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case productConstants.GET_ALL_PRODUCTS_SUCCESS:
        return {
          ...state,
          AllProducts: action.payload,
          loading: false,
          error: '',
        };
      case productConstants.GET_ALL_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case productConstants.DELETE_PRODUCT_REQUEST:
          return {
            ...state,
            loading: true,
          };
          case productConstants.DELETE_PRODUCT_SUCCESS:
            const updatedProducts = state.AllProducts.filter(product => product._id !== action.payload.deletedProductId);
          
            return {
              ...state,
              AllProducts: updatedProducts,
              loading: false,
              error: '',
            };
          
          
        case productConstants.DELETE_PRODUCT_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default getAllproducts;
  