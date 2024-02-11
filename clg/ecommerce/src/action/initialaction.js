import { InitialData, InitialProductData, categoryConstant } from "./constants";
import axiosInstance from "../helper/axios";

export const getInitialData = () => {
    return async (dispatch) => {
        dispatch({ type: InitialData.FETCH_INITIAL_DATA_REQUEST });

        try {
            const res = await axiosInstance.post('initialdata');

            if (res.status === 200) {
                // Check if 'categories' and 'products' exist in the response body
                if (res.data && res.data.categories && res.data.products) {
                    const { categories, products } = res.data;

                    dispatch({
                        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                        payload: {
                            categories
                        }
                    });

                    dispatch({
                        type: InitialProductData.FETCH_INITIAL_PRODUCT_DATA_SUCCESS,
                        payload: {
                            
                            products
                        }
                    });
                } else {
                    console.error("Categories or products not found in the response body");
                }
            } else {
                console.error(res);
            }
        } catch (error) {
            console.error("Error fetching initial data:", error);
            // Handle error as needed
        }
    };
};
