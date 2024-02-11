// import React from 'react'

// import { Navigate,Outlet } from 'react-router-dom';
// const  PrivateRoutes=()=>{



// let auth={'token':false}
// return (
//     auth.token?<Outlet/>:<Navigate to='signin'/>
// )

// }
// export default PrivateRoutes

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  // Check if the token exists in local storage
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null && token !== undefined;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;

