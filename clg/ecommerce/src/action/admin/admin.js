import { adminConstant } from "../constants";
import axiosInstance from "../../helper/axios";

export const adminsignup = (admin) => {
    return async (dispatch) => {
      try {
        dispatch({ type: adminConstant.ADMIN_REGISTER_REQUEST });
        console.log('Signup request dispatched:', admin);
        const res = await axiosInstance.post('/signup/admin', { ...admin });
  
        if (res.status >= 200 && res.status < 300) {
          const { message } = res.data;
          dispatch({ type: adminConstant.ADMIN_REGISTER_SUCCESS, payload: { message } });
        } else {
          dispatch({
            type: adminConstant.ADMIN_REGISTER_FAILURE,
            payload: { error: res.data.error }
          });
        }
      } catch (error) {
        console.error('Error occurred during signup:', error);
        dispatch({
          type: adminConstant.ADMIN_REGISTER_FAILURE,
          payload: { error: error.response?.data?.message || 'An error occurred during signup' }
        });
      }
      
    };
  };
  