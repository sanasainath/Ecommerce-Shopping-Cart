import { searchConstants } from "../action/constants";

const initialState = {
    searchResults: [],
    loading: false,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case searchConstants.SEARCH_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case searchConstants.SEARCH_PRODUCT_SUCCESS:
        return {
          ...state,
          searchResults: action.payload,
          loading: false,
          error: null,
        };
      case searchConstants.SEARCH_PRODUCT_FAILURE:
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