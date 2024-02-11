import axiosInstance from "../helper/axios";
import store from "../store";
import { pageConstants } from "./constants";

export const savePage = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });

      const token = store.getState().auth.token; // Replace with your actual token
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axiosInstance.post('/page/creates', formData, config);
      console.log('check page create',res);

      dispatch({
        type: pageConstants.CREATE_PAGE_SUCCESS,
        payload: res.data.page // Assuming the response has a 'page' property
      });

      // You can dispatch additional actions or handle the response as needed

    } catch (error) {
      console.error('Error creating page:', error);

      dispatch({
        type: pageConstants.CREATE_PAGE_FAILURE,
        payload: error.message // You can customize the payload based on your needs
      });
    }
  };
};
