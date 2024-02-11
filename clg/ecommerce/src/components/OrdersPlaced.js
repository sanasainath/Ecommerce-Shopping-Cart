import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../action/addressaction';






function OrdersPlaced() {
  const dispatch=useDispatch();
  const orders = useSelector((state) => state.address.orders);
  console.log('orderhu',orders);
  useEffect(()=>
  {
    dispatch(getOrder());
  },[])
  return (
    <div>
      <h2>Orders Placed</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Order ID: {order._id}</h3>
          <p>Payment Status: {order.paymentStatus}</p>
          <p>Order Status:</p>
          <ul>
            {order.orderStatus.map((status) => (
              <li
                key={status.type}
                style={{
                  color: status.isCompleted ? 'green' : 'red',
                  fontWeight: status.isCompleted ? 'bold' : 'normal',
                }}
              >
                {status.type}: {status.isCompleted ? 'Completed' : 'Pending'}
              </li>
            ))}
          </ul>
          <ul>
            {order.items.map((item) => (
              <li key={item._id}>
                {item.productId && item.productId.name && item.productId.productPictures && (
                  <>
                    <p>Product: {item.productId.name}</p>
                    <p>Payable Price: ${item.payablePrice}</p>
                    {item.productId.productPictures.length > 0 && (
                      <img
                        src={item.productId.productPictures[0].img}
                        alt={item.productId.name}
                        style={{ width: '100px', height: '100px' }}
                      />
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrdersPlaced;
