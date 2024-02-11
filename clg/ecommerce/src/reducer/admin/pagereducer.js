// Import the page constants at the top of your reducer file
import { pageConstants } from "../../action/constants";

// Initial state for the page reducer
const initialState = {
  // Add any initial state properties you need
  loading: false,
  error: null,
  createdPage: null,
};

// Page reducer function
const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case pageConstants.CREATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        createdPage: action.payload,
        error: null,
      };

    case pageConstants.CREATE_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        createdPage: null,
        error: action.payload,
      };

    // Add more cases for other actions if needed

    default:
      return state;
  }
};

export default pageReducer;
