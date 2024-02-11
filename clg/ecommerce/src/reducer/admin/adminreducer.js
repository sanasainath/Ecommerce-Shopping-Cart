import { adminConstant } from "../../action/constants";


const initialState={
    error:null,
    message:'',
    loading:false
}



const adminreducer = (state = initialState, action) => {
    switch (action.type) {
        case adminConstant.ADMIN_REGISTER_REQUEST:
        return {
          ...state,
          loading:true,
        };
        case adminConstant.ADMIN_REGISTER_SUCCESS:
        return {
          ...state,
          loading:false,message:action.payload.message
         
          
        };
      case adminConstant.ADMIN_REGISTER_FAILURE:
        return {
       ...state,loading:false,
       error:action.payload.error
        };
        
  
      default:
        return state;
    }
  };
  
  export default adminreducer;