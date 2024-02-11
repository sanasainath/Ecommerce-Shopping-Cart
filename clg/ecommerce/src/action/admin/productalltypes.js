import { productConstants } from "../constants";
import axiosInstance from "../../helper/axios";
export const getAllProducts = () => async (dispatch) => {

    try {
      dispatch({ type:productConstants.GET_ALL_PRODUCTS_REQUEST });
  
      const res = await axiosInstance.get('/products');
  console.log("this is all products",res);
      if (res.status === 200) {
     
       
          dispatch({
            type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
            payload: res.data,
          });
       
        
      } else {
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_FAILURE,
          payload: res.error || 'Something went wrong',
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE,
        payload: 'Internal server error',
      });
    }
  };
  export const deleteProduct = (productId) => async (dispatch) => {
    try {
      dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });
  
      const res = await axiosInstance.delete(`/product/delete/${productId}`);
  
      if (res.status === 200) {
        dispatch({
          type: productConstants.DELETE_PRODUCT_SUCCESS,
          payload: { deletedProductId: productId },
        });
      } else {
        dispatch({
          type: productConstants.DELETE_PRODUCT_FAILURE,
          payload: res.error || 'Something went wrong',
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: 'Internal server error',
      });
    }
  };
  export const updateProduct = (form,productId) => async (dispatch) => {
    try {
      dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });
      const res = await axiosInstance.put(`/products/${productId}`, form);
  
      if (res.status === 200) {
        dispatch({
          type: productConstants.UPDATE_PRODUCT_REQUEST,
          payload: { deletedProductId: productId },
        });
      } else {
        dispatch({
          type: productConstants.UPDATE_PRODUCT_SUCCESS,
          payload: res.error || 'Something went wrong',
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: 'Internal server error',
      });
    }
  };