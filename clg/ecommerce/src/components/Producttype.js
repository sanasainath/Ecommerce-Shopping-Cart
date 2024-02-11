import React from 'react'
import { useSelector } from 'react-redux';
function Producttype() {
  const product  = useSelector(state => state.productdetails);
  console.log("now its now or never",product);
  return (
    <div>
     
      <h1>hello</h1>
    </div>

  )
}

export default Producttype
