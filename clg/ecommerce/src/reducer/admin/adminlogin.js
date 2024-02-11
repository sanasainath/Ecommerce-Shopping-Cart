import { authAdminConstant } from "../../action/constants";

const initialState = {
  token:null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
  adminauthenticate: false,
  adminauthenticating: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case  authAdminConstant.LOGIN_REQUEST:
      return {
        ...state,
       adminauthenticating: true,
      };
    case authAdminConstant.LOGIN_SUCCESS:
      return {
        ...state,
        adminauthenticating: false,
        adminauthenticate: true,
        user: action.payload.user,
        token:action.payload.token
       
        
      };
    case authAdminConstant.LOGIN_FAILED:
      return {
        ...state,
        adminauthenticating: false,
        adminauthenticate: false,
      };
      case authAdminConstant.LOGOUT_REQUEST:
        return{
          state:{
          ...initialState},
          adminauthenticating:false,
          adminauthenticate:false,
        }

    default:
      return state;
  }
};

export default authReducer;
