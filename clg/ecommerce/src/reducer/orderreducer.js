
const initialState = {
    orders: [],

    error: null,
};



  
  const orderReducer = (state = initialState, action) => {
    // Your reducer logic here
    switch (action.type) {
        // Cases for specific actions
        // ...
    
        // Default case
        default:
          return state;
      }
  };
  
  export default orderReducer;
  