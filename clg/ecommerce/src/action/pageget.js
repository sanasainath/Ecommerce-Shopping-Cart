import axiosInstance from "../helper/axios";
import { pageGetConstants } from "./constants";

export const getProductPage = (payload) => {
  return async (dispatch) => {
    const { cid, type } = payload;
    console.log("in action", payload);

    try {
      const res = await axiosInstance.get(`/page/${cid}/${type}`);
      console.log('Product Page Data:', res.data);

      if (res.status === 200) {
        dispatch({
          type: pageGetConstants.GET_PAGE_REQUEST,
        });

        dispatch({
          type: pageGetConstants.GET_PAGE_SUCCESS,
          payload: res.data, // Use res.data directly as the payload
        });
      } else {
        // Handle other status codes
        dispatch({
          type: pageGetConstants.GET_PAGE_FAILURE,
          payload: 'Error fetching product page data',
        });
      }
    } catch (error) {
      // Handle network errors or other issues
      dispatch({
        type: pageGetConstants.GET_PAGE_FAILURE,
        payload: 'Error fetching product page data',
      });
    }
  };
};
