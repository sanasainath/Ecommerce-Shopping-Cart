import { authConstant } from "../action/constants";

const initialState = {
  token:null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
  authenticate: false,
  authenticating: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case authConstant.LOGIN_SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticate: true,
        user: action.payload.user,
        token:action.payload.token
       
        
      };
    case authConstant.LOGIN_FAILED:
      return {
        ...state,
        authenticating: false,
        authenticate: false,
      };
      case authConstant.LOGOUT_REQUEST:
  return {
    ...initialState,
  };


    default:
      return state;
  }
};

export default authReducer;
