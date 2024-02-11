import { addressConstants, cartConstants } from "./constants";
import axiosInstance from "../helper/axios";
import { adminConstant } from "./constants";
export const getAddress = () => {
    return async (dispatch) => {
      try {
        console.log(axiosInstance.defaults.baseURL);
const res = await axiosInstance.post('/user/getaddress');
        

        dispatch({ type:addressConstants.GET_USER_ADDRESS_REQUEST });
        if (res.status === 200) {
          const {
            userAddress: { address },
          } = res.data;
          dispatch({
            type: addressConstants.GET_USER_ADDRESS_SUCCESS,
            payload: { address },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: addressConstants.GET_USER_ADDRESS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
export const addAddress = (payload) => {
  console.log("checking form data",payload);
    return async (dispatch) => {
      try {
       
        const res = await axiosInstance.post('/user/address/create',{payload});
        dispatch({ type:addressConstants.ADD_USER_ADDRESS_REQUEST});
        if (res.status === 201) {
          console.log(res);
            const {
                address: { address },
            } = res.data;
        
          dispatch({
            type: addressConstants.ADD_USER_ADDRESS_SUCCESS,
            payload: { address },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type:addressConstants.ADD_USER_ADDRESS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  export const addOrder = (payload) => {
    console.log("checking orderrrrrrrrrrrrrrrrrrrrrrrr data", payload);
    return async (dispatch) => {
      try {
        const res = await axiosInstance.post('/add/order', payload);
        
        dispatch({type:addressConstants.ADD_ORDER_REQUEST});
        console.log("checking res in while ordering aeding",res);
  
        // Reset the cart after placing an order
        dispatch({ type: cartConstants.RESET_CART });
        if (res.status === 201) {
          // If order is added successfully, dispatch GET_ORDER_SUCCESS
          const { orders } = res.data;
          dispatch({
            type: addressConstants.GET_ORDER_SUCCESS,
            payload: { orders },
          });
        }
        // Uncomment the following lines if you have ADD_ORDER_SUCCESS action
        // const { address } = res.data;
        // if (address) {
        //     dispatch({
        //         type: addressConstants.ADD_ORDER_SUCCESS,
        //         payload: { address },
        //     });
        // } else {
        //     const { error } = res.data;
        //     dispatch({
        //         type: addressConstants.ADD_ORDER_FAILURE,
        //         payload: { error },
        //     });
        // }
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const getOrder = () => {

    return async (dispatch) => {
      try {
        const res = await axiosInstance.get('/get/orders' );
        dispatch({type:addressConstants.GET_ORDER_REQUEST});
 
    console.log("gettingg",res);
if(res.status===200)
{
  const {orders}=res.data;
  dispatch({type:addressConstants.GET_ORDER_SUCCESS,
    payload:{orders},
  
  
  })
}
        // Reset the cart after placing an order
        dispatch({ type: cartConstants.RESET_CART });
  
        // Uncomment the following lines if you have ADD_ORDER_SUCCESS action
        // const { address } = res.data;
        // if (address) {
        //     dispatch({
        //         type: addressConstants.ADD_ORDER_SUCCESS,
        //         payload: { address },
        //     });
        // } else {
        //     const { error } = res.data;
        //     dispatch({
        //         type: addressConstants.ADD_ORDER_FAILURE,
        //         payload: { error },
      } catch (error) {
        console.error('Error fetching orders:', error);
        dispatch({ type: addressConstants.GET_ORDER_FAILURE, payload: { error } });
      }
      
    };
  };
  
  // addressActions.js
// addressActions.js
// addressaction.js

// Function to save the selected address to local storage
export const updateAddress = (addressId, payload) => {
  console.log("in address updating we checking ",payload);
  console.log("checking address Id",addressId);
  return async (dispatch) => {
    try {
      dispatch({ type: addressConstants.UPDATE_USER_ADDRESS_REQUEST });

      const res = await axiosInstance.put(`/user/address/update/${addressId}`,{ payload});

      if (res.status === 200) {
        const {
          address: { address },
        } = res.data;

        dispatch(getAddress());


        dispatch({
          type: addressConstants.UPDATE_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: addressConstants.UPDATE_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};


export const updateOrderStatus = (userId, orderId,type) => {
  console.log("user",userId);
  console.log("order",orderId);
  // console.log("productid",productId);
  console.log("selectedsttaus",type);


  return async (dispatch) => {
    try {
      dispatch({ type: adminConstant.UPDATE_ORDER_STATUS_REQUEST });
      const res = await axiosInstance.post('/update/order', {
      
        orderId,
        // productId,
     type
      });

      if (res.status === 200) {
        const { message, updatedOrder } = res.data;
        dispatch({ type: adminConstant.UPDATE_ORDER_STATUS_SUCCESS, payload: { message, updatedOrder } });
      } else {
        dispatch({
          type: adminConstant.UPDATE_ORDER_STATUS_FAILURE,
          payload: { error: res.data.message }
        });
      }
    } catch (error) {
      console.error('Error occurred during order status update:', error);
      dispatch({
        type: adminConstant.UPDATE_ORDER_STATUS_FAILURE,
        payload: { error: error.response?.data?.message || 'An error occurred during order status update' }
      });
    }
  };
};


  