import React from 'react';

const CartTable = ({ validCartItems, onQuantityIncrement, onQuantityDecrement, handleRemoveFromCart, calculateSubtotal, handleProceedToCheckout }) => {
  return (

<table className="custom-table">
<tbody>
  <tr className='below'>
    <td style={{ width: '8%', paddingTop: '3px', paddingBottom: '3px' }}></td>
    <td style={{ width: '8%' }}></td>
    <td style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px', paddingTop: '3px', paddingBottom: '3px' }}>PRODUCT </td>
    <td style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>PRICE</td>
    <td style={{ width: '13%', fontWeight: '650', textAlign: 'center', fontSize: '13px', paddingTop: '7px', paddingBottom: '7px' }}>QUANTITY</td>
    <td style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>SUBTOTAL</td>
  </tr>
  {validCartItems.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ fontSize: '11px', padding: '14px', fontWeight: '600' }}> No products added to the cart</td>
    </tr>
  ) : (
    validCartItems.map(([productId, product]) => {
  

      const imgSrc = product.img || '';


     
      return (
        <tr key={productId}>
        <td>
            <button  style={{ color: 'red', fontWeight: '900px' }} onClick={() => handleRemoveFromCart(productId)}>x</button>
          </td>
          <td>
            
          {imgSrc && <img src={imgSrc} alt={product.name} style={{ width: '50px', height: '50px' }} />}


          </td>
          <td style={{color:'#f28c28'}}>{product.name}</td>
          <td style={{color:'#f28c28'}}>${product.price}</td>
          <td style={{color:'#f28c28'}}>
          <button
style={{ marginRight: '8px' }}
onClick={() => onQuantityDecrement(productId, product.qty)}>
-
</button>

            {product.qty}
            <button
style={{marginLeft:'8px'}}
onClick={() => onQuantityIncrement(productId, product.qty)}>
+
</button>
          </td>
          <td style={{color:'#f28c28'}}>${product.price * product.qty}</td>
        </tr>
      );
    })
  )}
</tbody>
</table>
  );
};

export default CartTable;