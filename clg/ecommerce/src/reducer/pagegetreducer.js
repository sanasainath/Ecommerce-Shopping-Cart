import { pageGetConstants } from "../action/constants";

const initialState = {
 
  pageRequest:false,
  page:{
    
  },
  error:null,
};

const pagegetreducer= (state = initialState, action) => {
  switch (action.type) {
  
    
      case pageGetConstants.GET_PAGE_REQUEST:
        return {
          ...state,
        pageRequest:true,
        error:null,
       
        };
        case pageGetConstants.GET_PAGE_SUCCESS:
          return {
            ...state,
          pageRequest:false,
          page:action.payload.page
          };
        case pageGetConstants.GET_PAGE_FAILURE:
            return {
              ...state,
              pageRequest: false,
              error: action.payload.error,
            };
          
    // Handle other cases if needed
    default:
      return state;
  }
};
export default pagegetreducer