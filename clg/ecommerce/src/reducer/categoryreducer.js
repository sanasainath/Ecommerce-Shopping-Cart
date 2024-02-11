// categoryReducer.js

import { categoryConstant } from "../action/constants";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNew = (id, categories, category) => {
  let myCategories = [];

  if (id === undefined || id === null || id === '') {
    return [
      ...categories,
      {
        ...category,
        children: [],
        key: category._id, // Add the key prop here
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id === id) {
      myCategories.push({
        ...cat,
        children: cat.children ? buildNew(id, [...cat.children, category], category) : [],
        key: cat._id, // Add the key prop here
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children && cat.children.length > 0 ? buildNew(id, cat.children, category) : [],
        key: cat._id, // Add the key prop here
      });
    }
  }

  return myCategories;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstant.GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
    case categoryConstant.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConstant.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case categoryConstant.ADD_CATEGORY_SUCCESS:
      const addedCategory = action.payload.category;
      const updatedAddCategories = buildNew(addedCategory.parentId, state.categories, addedCategory);

      return {
        ...state,
        loading: false,
        categories: updatedAddCategories,
      };
    case categoryConstant.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConstant.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case categoryConstant.UPDATE_CATEGORY_SUCCESS:
      const updatedCategory = action.payload.category;
      const updatedCategories = buildNew(updatedCategory.parentId, state.categories, updatedCategory);

      return {
        ...state,
        loading: false,
        categories: updatedCategories,
      };
    case categoryConstant.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

      case categoryConstant.DELETE_CATEGORY_REQUEST:
        // Handle request action
        return {
          ...state,
          loading:true,
          // Update state for the loading state, if needed
        };
  
      case categoryConstant.DELETE_CATEGORY_SUCCESS:
        // Handle success action
        return {
          ...state,
          loading:false,
          // Update state with the success payload
        };
  
      case categoryConstant.DELETE_CATEGORY_FAILURE:
        // Handle failure action
        return {
          ...state,
          loading:false,
          // Update state with the failure payload
        };
    default:
      return state;
  }
};

export default categoryReducer;
