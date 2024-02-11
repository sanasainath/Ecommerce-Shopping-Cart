import axiosInstance from "../helper/axios";
import { productConstantData, productFetchId } from "./constants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get(`/products/${slug}`);
      console.log('slug checking', res);
      if(res.status===200)
      {
        dispatch({
          type:productConstantData.GET_PRODUCTS_BY_SLUG,
          payload: 
             res.data,
            // ... other properties you might want to include in the payload
        
        })
      }
      // Dispatch your action or handle the response here
    } catch (error) {
      console.error('Error fetching products by slug:', error);
      // Handle the error, dispatch an error action, or perform other actions as needed
    }
  };
};
// export const getProductsPage = (payload) => {
//   return async (dispatch) => {
//     try {
//       const res = await axiosInstance.get(`/products/${slug}`);
//       console.log('slug checkingggg', res);
//       if(res.status===200)
//       {
//         dispatch({
//           type:productConstantData.GET_PRODUCTS_BY_SLUG,
//           payload: 
//              res.data,
//             // ... other properties you might want to include in the payload
        
//         })
//       }
//       // Dispatch your action or handle the response here
//     } catch (error) {
//       console.error('Error fetching products by slug:', error);
//       // Handle the error, dispatch an error action, or perform other actions as needed
//     }
//   };
// };


export const getProductById = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productFetchId.GET_PRODUCT_ID_REQUEST,
      });

      const res = await axiosInstance.get(`/product/${_id}`);
      console.log("this is the best resssss,re",res);
dispatch({
  type:productFetchId.GET_RATING,
  payload:res.data.averageRating,
})
      if (res.status === 200) {
        dispatch({
          type: productFetchId.GET_PRODUCT_ID_SUCCESS,

          payload: res.data.product, // Assuming your response has a 'product' property
          // ... other properties you might want to include in the payload
         

        });
      } else {
        dispatch({
          type: productFetchId.GET_PRODUCT_ID_FAILURE,
          payload: 'Failed to fetch product by ID', // Adjust the error message as needed
        });
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      dispatch({
        type: productFetchId.GET_PRODUCT_ID_FAILURE,
        payload: 'Internal Server Error', // You can customize this error message
      });
    }
  };
};
