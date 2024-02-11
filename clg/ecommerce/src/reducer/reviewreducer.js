// reducer/review.js

import { reviewProducts } from "../action/constants";

const initialState = {
  creatingReview: false,
  gettingAllReviews: false,
  reviews: [],
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case reviewProducts.CREATE_REVIEW_PRODUCT_REQUEST:
      return {
        ...state,
        creatingReview: true,
      };

    case reviewProducts.CREATE_REVIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        creatingReview: false,
        reviews: [...state.reviews, action.payload.reviewItem],
        error: null,
      };

    case reviewProducts.CREATE_REVIEW_PRODUCT_FAILURE:
      return {
        ...state,
        creatingReview: false,
        error: action.payload.error,
      };

    case reviewProducts.GET_ALL_REVIEW_PRODUCT_REQUEST:
      return {
        ...state,
        gettingAllReviews: true,
      };

    case reviewProducts.GET_ALL_REVIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        gettingAllReviews: false,
        reviews: action.payload.reviews,
        error: null,
      };

    case reviewProducts.GET_ALL_REVIEW_PRODUCT_FAILURE:
      return {
        ...state,
        gettingAllReviews: false,
        reviews: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reviewReducer;
