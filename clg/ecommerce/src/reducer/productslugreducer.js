import { productConstantData } from "../action/constants";

const initialState = {
  productslug: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
  },
 
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstantData.GET_PRODUCTS_BY_SLUG:
      return {
        ...state,
        productslug: action.payload.productslug,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
     
          
    // Handle other cases if needed
    default:
      return state;
  }
};

export default productReducer;
