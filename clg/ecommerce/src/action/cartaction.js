import axiosInstance from "../helper/axios";
import { cartConstants } from "./constants";
import store from '../store';

export const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axiosInstance.get('/user/getCartItems');
      
      if (res.status === 200 || res.status === 201) {
        const { cartItems } = res.data;
        
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      dispatch({ type: cartConstants.ADD_TO_CART_FAILURE, payload: { error } });
    }
  };
};


export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;



    if (auth.authenticate) {
      localStorage.removeItem("cart");
      // dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};


export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
      
    cartItems[product._id] = {
      ...product,
      qty,
    };

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };

      const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
  
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

  

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};




export const removeFromCart = (payload) => {

  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_FROM_CART_REQUEST });
      const res = await axiosInstance.post('/user/cart/removeItem', { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_FROM_CART_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_FROM_CART_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
