
import { cartConstants } from "../action/constants";
const initialState = {
  // ... other slices of state

    cartItems: {},
    updatingCart: false,
    error: null,

};

const cartreducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      return {
        ...state,
        updatingCart: true,
        error: null,
      };

    case cartConstants.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
        error: null,
      };

    case cartConstants.ADD_TO_CART_FAILURE:
      return {
        ...state,
        updatingCart: false,
        error: "Failed to add item to cart",
      };
   
      case cartConstants.REMOVE_CART:
        const { [action.payload.productId]: removedItem, ...remainingItems } = state.cartItems;
        return { ...state, cartItems: remainingItems };
    
   case cartConstants.RESET_CART:
    return{
      state:{...initialState}

    }
    default:
      return state;
  }
};

export default cartreducer;
