// action/review.js

import { reviewProducts } from "./constants";
import axiosInstance from "../helper/axios";

export const createReviewProduct = (reviewData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reviewProducts.CREATE_REVIEW_PRODUCT_REQUEST });

      const res = await axiosInstance.put('/product/review', reviewData);

      if (res.status === 200 || res.status === 201) {
        // Assuming the API response contains the updated review
        const { reviewItem } = res.data;

        if (reviewItem) {
          dispatch({
            type: reviewProducts.CREATE_REVIEW_PRODUCT_SUCCESS,
            payload: { reviewItem },
          });
        }
      }
    } catch (error) {
      console.error("Error creating review:", error);
      dispatch({
        type: reviewProducts.CREATE_REVIEW_PRODUCT_FAILURE,
        payload: { error },
      });
    }
  };
};

export const getAllReviews = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reviewProducts.GET_ALL_REVIEW_PRODUCT_REQUEST });

      const res = await axiosInstance.get(`/products/${productId}/reviews`);

      if (res.status === 200 || res.status === 201) {
        const { reviews } = res.data;

        if (reviews) {
          dispatch({
            type: reviewProducts.GET_ALL_REVIEW_PRODUCT_SUCCESS,
            payload: { reviews },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      dispatch({
        type: reviewProducts.GET_ALL_REVIEW_PRODUCT_FAILURE,
        payload: { error },
      });
    }
  };
};
