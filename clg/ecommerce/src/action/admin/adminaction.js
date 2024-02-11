import axiosInstance from "../../helper/axios";
import { authAdminConstant } from "../constants";
// ... (imports)

export const adminLogin = (admin) => {
    return async (dispatch) => {
        try {
            dispatch({ type:  authAdminConstant.LOGIN_REQUEST });
            console.log('Login request dispatched:', admin);
            const res = await axiosInstance.post('/signup/login', { ...admin });

            if (res.status >= 200 && res.status < 300) {
                const { token, profile } = res.data;
                // localStorage.setItem('token', token);
                // localStorage.setItem('user', JSON.stringify(profile));
                console.log('Dispatching LOGIN_SUCCESS:', { token, user: profile });
                dispatch({ type:  authAdminConstant.LOGIN_SUCCESS, payload: { token, user: profile } });
            } else {
                dispatch({
                    type:  authAdminConstant.LOGIN_FAILED,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            dispatch({
                type:  authAdminConstant.LOGIN_FAILED,
                payload: { error: 'An error occurred during login' }
            });
        }
    };
};

export const adminSignIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // Add logic to verify the token if needed
                const userString = localStorage.getItem('user');
                if (!userString) {
                    throw new Error('User data not found in local storage');
                }
                const user = JSON.parse(userString);
                dispatch({
                    type: authAdminConstant.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user,
                        authenticate: true,
                    },
                });
            } catch (error) {
                console.error('Error verifying token:', error);
                dispatch({
                    type:  authAdminConstant.LOGIN_FAILED,
                    payload: {
                        authenticate: false,
                        message: 'Error verifying token',
                    },
                });
            }
        } else {
            dispatch({
                type:  authAdminConstant.LOGIN_FAILED,
                payload: {
                    authenticate: false,
                    message: 'User needs to be logged in',
                },
            });
        }
    };
};


export const signout=()=>{
    return async dispatch=>{
        localStorage.clear();
        dispatch({
            type:  authAdminConstant.LOGOUT_REQUEST,
            
        })
    }
}

