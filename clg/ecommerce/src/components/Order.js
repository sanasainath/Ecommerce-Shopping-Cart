// OrderTable component
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Order.css';
import { getCartItems } from '../action/cartaction';

function Order() {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  // Convert cartItems to an array of values
  const cartItemsArray = Object.values(cartItems);

  if (cartItemsArray.length === 0) {
    return <p>No items in the cart.</p>;
  }

  const totalQuantity = cartItemsArray.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItemsArray.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal;

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <tbody>
        <h2>Price Details</h2>
        {cartItemsArray.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>${(item.price * item.qty).toFixed(2)}</td>
          </tr>
        ))}
        <tr>
          <td>Total Quantity</td>
          <td>{totalQuantity}</td>
        </tr>
        <tr>
          <td>Subtotal</td>
          <td>${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>${total.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Order;
