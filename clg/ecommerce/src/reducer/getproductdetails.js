// Assuming you have a productFetchId.js file that defines your action types
import { productFetchId } from "../action/constants";
const initialState = {
  loading: false,
  product: null,
  error: null,
  averageRating:0,
};

const productByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case productFetchId.GET_PRODUCT_ID_REQUEST:
      return {
        ...state,
        loading: true,
        product: null,
        error: null,
      };

    case productFetchId.GET_PRODUCT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };

    case productFetchId.GET_PRODUCT_ID_FAILURE:
      return {
        ...state,
        loading: false,
        product: null,
        error: action.payload,
      };
      case productFetchId.GET_RATING:
        return {
          ...state,
          loadingL:false,
          averageRating:action.payload,
        }

    default:
      return state;
  }
};

export default productByIdReducer;
