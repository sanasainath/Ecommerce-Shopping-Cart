// categoryActions.js
import store from '../store'
import axiosInstance from "../helper/axios";
import { categoryConstant } from "./constants";
import { useDispatch } from 'react-redux';
export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: categoryConstant.GET_ALL_CATEGORIES_REQUEST });
            console.log('Fetching categories:', 'category');
            const res = await axiosInstance.get('categories');
            console.log('checking with cycling',res);
            if (res.status >= 200 && res.status < 300) {
                const { categoryList } = res.data;

                dispatch({ type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS, payload: { categories: categoryList } });
                console.log('Dispatching GET_ALL_CATEGORIES_SUCCESS:', { categoryList });
            } else {
                dispatch({
                    type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            console.error('Error occurred while fetching categories:', error);
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: 'An error occurred while fetching categories' }
            });
        }
    };
};

export const addCategory = (form) => {
    console.log("please")
    console.log(...form)
    return async (dispatch) => {
        try {
            const token = store.getState().auth;; // Replace with your actual token
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  }
};
            console.log('dispatch time',...form);
            dispatch({ type: categoryConstant.ADD_CATEGORY_REQUEST });

            const res = await axiosInstance.post('/category/create',form,config);
console.log("huaooaokaimam");
console.log(res);
            dispatch({
                type: categoryConstant.ADD_CATEGORY_SUCCESS,
                payload: {category:res.data},
            });

            console.log('Dispatching ADD_CATEGORY_SUCCESS:', res);
        } catch (error) {
            dispatch({
                type: categoryConstant.ADD_CATEGORY_FAILURE,
                payload: error.message || 'An error occurred',
            });

            console.error('Error occurred while adding a category:', error);
        }
    };
};

export const updateCategory = (form) => {
  console.log("poloplo",...form);
    return async (dispatch) => {
      try {
        dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST });
  
        const res = await axiosInstance.post('/category/update', form);
        console.log('ss',res);
        if (res.status === 200) {
          dispatch({
            type: categoryConstant.UPDATE_CATEGORY_SUCCESS,
            payload: { category: res.data},
            
          });
          
        } else {
          dispatch({
            type: categoryConstant.UPDATE_CATEGORY_FAILURE,
            payload: { error: 'Failed to update category' },
          });
        }
      } catch (error) {
        console.error('Error occurred while updating a category:', error);
        dispatch({
          type: categoryConstant.UPDATE_CATEGORY_FAILURE,
          payload: { error: error.message || 'An error occurred' },
        });
        throw error;
      }
    };
  };


  export const deleteIdCategory = (Ids) => {
    return async (dispatch) => {
      // Dispatch the request action
      dispatch({ type: categoryConstant.DELETE_CATEGORY_REQUEST });
  
      try {
        // Assuming you're making a DELETE request to delete categories
        const res = await axiosInstance.delete('/category/delete', {
          data: { payload: { Ids } }, // Send payload in the request body
        });
  
        // Assuming your API returns a success message or data
        console.log("delete checking", res);
  
        // Dispatch the success action with the response data
        dispatch({
          type: categoryConstant.DELETE_CATEGORY_SUCCESS,
          payload: res.data, // Adjust based on your actual response data
        });
  
        // Return the response directly
        return res;
      } catch (error) {
        // Handle errors if necessary
        console.error("Error deleting categories:", error);
  
        // Dispatch the failure action with the error data
        dispatch({
          type: categoryConstant.DELETE_CATEGORY_FAILURE,
          payload: error.response.data, // Adjust based on your actual error response data
        });
  
        // Return the error response directly
        return { error: error.response.data };
      }
    };
  };
  


  