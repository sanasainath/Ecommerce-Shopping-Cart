

import axiosInstance from "../helper/axios";
import store from "../store";
import { productConstants, searchConstants } from "./constants";

// ... (existing code)

export const addProduct = (formData) => {
  console.log("while adding the prodct checkingggggg",...formData);
    return async (dispatch) => {
      try {
        const token = store.getState().auth;; // Replace with your actual token
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        };
        console.log(...formData);
        const res = await axiosInstance.post('/product/create', formData,config);
        console.log('Checking response:', res.data);
        // Dispatch any necessary actions based on the response
      } catch (error) {
        console.error('Error adding product:', error);
        // Handle error or dispatch an error action
      }
    };
  };

  
  // ... (existing code)
  export const getProductByCat = (payload) => {
  
    return async (dispatch) => {
      const { cid, minPrice, maxPrice } = payload;
  
      try {
        dispatch({
          type: productConstants.GET_PRODUCT_BY_CAT_REQUEST,
        });
  
        // const res = await axiosInstance.get(`/product/get/${cid}/`);
        const res = await axiosInstance.get(`/product/get/${cid}/`, {
          params: { minPrice, maxPrice },
        });
        console.log("yesaaya aya yaaa yaa yes",res);
  
        if (res.status === 200) {
          dispatch({
            type: productConstants.GET_PRODUCT_BY_CAT_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: productConstants.GET_PRODUCT_BY_CAT_FAILURE,
            payload: 'Error fetching product page data',
          });
        }
      } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching product page data:', error);
  
        dispatch({
          type: productConstants.GET_PRODUCT_BY_CAT_FAILURE,
          payload: 'Error fetching product page data',
        });
      }
    };
  };
  

export const getRelatedProducts = (productId) => {
  console.log("related id npoonoo",productId);
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_RELATED_PRODUCTS_REQUEST,
      });

      const res = await axiosInstance.get(`/related/product/${productId}/`);
console.log("ohoh shitn shit shit hsit ",res);
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_RELATED_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: productConstants.GET_RELATED_PRODUCTS_FAILURE,
          payload: 'Error fetching related products',
        });
      }
    } catch (error) {
      console.error('Error fetching related products:', error);

      dispatch({
        type: productConstants.GET_RELATED_PRODUCTS_FAILURE,
        payload: 'Error fetching related products',
      });
    }
  };
};


export const getFeaturedProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_FEATURED_PRODUCTS_REQUEST,
      });

      const res = await axiosInstance.get('/product/featured');

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_FEATURED_PRODUCTS_SUCCESS,
          payload: res.data.featuredProducts,
        });
      } else {
        dispatch({
          type: productConstants.GET_FEATURED_PRODUCTS_FAILURE,
          payload: 'Error fetching featured products',
        });
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);

      dispatch({
        type: productConstants.GET_FEATURED_PRODUCTS_FAILURE,
        payload: 'Error fetching featured products',
      });
    }
  };
};


// Assuming you have a file with action constants
export const searchProducts = (searchTerm) => async (dispatch,getState) => {
  console.log("Search item0",searchTerm);
  try {
    dispatch({ type: searchConstants.SEARCH_PRODUCT_REQUEST });

    const res = await axiosInstance.get(`/api/products/search?searchTerm=${searchTerm}`);
console.log("this is search res man okay ah",res);
    if (res.status === 200) {
      if (res.data.length > 0) {
     
        dispatch({
          type: searchConstants.SEARCH_PRODUCT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: searchConstants.SEARCH_PRODUCT_FAILURE,
          payload: 'No matching products found for the search term: ' + searchTerm,
        });
      }
    } else {
      dispatch({
        type: searchConstants.SEARCH_PRODUCT_FAILURE,
        payload: res.error || 'Something went wrong',
      });
    }
  } catch (error) {
    dispatch({
      type: searchConstants.SEARCH_PRODUCT_FAILURE,
      payload: 'Internal server error',
    });
  }
};
