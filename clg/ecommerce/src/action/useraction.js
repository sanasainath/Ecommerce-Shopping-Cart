import axiosInstance from "../helper/axios";
import { authConstant, userConstant } from "./constants";
export const signup = (user) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstant.USER_REGISTER_REQUEST });
        console.log('Signup request dispatched:', user);
        const res = await axiosInstance.post('signup', { ...user });
  
        if (res.status >= 200 && res.status < 300) {
          const { message } = res.data;
          dispatch({ type: userConstant.USER_REGISTER_SUCCESS, payload: { message } });
        } else {
          dispatch({
            type: authConstant.LOGIN_FAILED,
            payload: { error: res.data.error }
          });
        }
      } catch (error) {
        console.error('Error occurred during signup:', error);
        dispatch({
          type: userConstant.USER_REGISTER_FAILURE,
          payload: { error: error.response?.data?.message || 'An error occurred during signup' }
        });
      }
      
    };
  };
  