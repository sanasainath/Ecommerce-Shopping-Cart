import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { BreadcrumbProvider } from './BreadcrumbContext';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { removeFromCart, addToCart, getCartItems } from '../action/cartaction';
import CartTable from './CartTable';
import debounce from 'lodash.debounce';

function CartPage() {
  const cart = useSelector((state) => state.cart);
  console.log("Check cart please",cart)
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  let navigate = useNavigate();
  const dispatch = useDispatch(); // Declare dispatch here

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate, dispatch]);

  const validCartItems = Object.entries(cartItems || {}).filter(([key, value]) => key !== 'undefined');

  const debouncedIncrement = debounce((_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  }, 500);

  const debouncedDecrement = debounce((_id, qty) => {
    const { name, price, img } = cartItems[_id];
    if (qty === 1) {
      return;
    }
    dispatch(addToCart({ _id, name, price, img }, -1));

    if (cartItems[_id].qty === 0) {
      handleRemoveFromCart(_id);
    }
  }, 300);

  const calculateSubtotal = () => {
    if (!cartItems || typeof cartItems !== 'object') {
      return '0.00';
    }

    const subtotal = Object.entries(cartItems).reduce((acc, [productId, product]) => {
      return acc + product.price * product.qty;
    }, 0);

    return subtotal.toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    return () => {
      debouncedIncrement.cancel();
      debouncedDecrement.cancel();
    };
  }, [debouncedIncrement, debouncedDecrement]);

  const onQuantityIncrement = (_id, qty) => {
    debouncedIncrement(_id, qty);
  };

  const onQuantityDecrement = (_id, qty) => {
    debouncedDecrement(_id, qty);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  return (
    <BreadcrumbProvider>
      <div className='wishlist-start'>
        <div className='wishlist-menu'>
          <div className='wishlist-menu1'>
            <Breadcrumb />
            <h2>Shopping Cart</h2>
            <CartTable
              validCartItems={validCartItems} 
              onQuantityIncrement={onQuantityIncrement}
              onQuantityDecrement={onQuantityDecrement}
              handleRemoveFromCart={handleRemoveFromCart}
              calculateSubtotal={calculateSubtotal}
              handleProceedToCheckout={handleProceedToCheckout}
            />
   <div style={{ marginTop: '20px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h3>Subtotal:</h3>
    <span>${calculateSubtotal()}</span> {/* You need to implement a function to calculate the subtotal */}
  </div>
  <button
    style={{
      background: '#FF5F1F',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px'
    }}   onClick={handleProceedToCheckout}
   
  >
    Proceed to Checkout
  </button>
</div>
          </div>
        </div>
        <div className='column-end'>
          <div className='wishlist-searchoption'>
            <input type='search' placeholder='Search...' className='wishlist-search' />
            <SearchIcon className='wishlist-searchicon' />
          </div>
          <div className='wishlist-post'>
            <h3>POPULAR POSTS</h3>
            <h4>Hello world</h4>
          </div>
         
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </BreadcrumbProvider>
  );
}

export default CartPage;
