// reducers/relatedProductsReducer.js

import { clearRelatedProducts } from '../action/constants';


const initialState = {
  loading: false,
  error: null,
  relatedProducts: [],
};

const relatedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_RELATED_PRODUCTS_SUCCESS:

    case clearRelatedProducts.CLEAR_RELATED_PRODUCTS:
      console.log('Clearing related products in reducer...');
      return {
        ...state,
        relatedProducts: [],
      };

    // ... other cases

    default:
      return state;
  }
};

export default relatedProductsReducer;
