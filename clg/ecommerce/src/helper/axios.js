import axios from 'axios';
import store from '../store'; // Import your Redux store
import { authConstant } from '../action/constants';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to handle requests with form data
axiosInstance.interceptors.request.use((config) => {
  const { token } = store.getState().auth; // Get the token from your Redux store
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error.response);
    const { status } = error.response;
    if (status === 500) {
      // Handle 500 error (server error)
      // localStorage.clear();
      // store.dispatch({ type: authConstant.LOGOUT_REQUEST });
    } else if (status === 401) {
      // Handle 401 error (unauthorized)
      // Log the user out or redirect to the login page
      // localStorage.clear();
      // store.dispatch({ type: authConstant.LOGOUT_REQUEST });
      // You can also redirect to the login page, for example:
      // window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
