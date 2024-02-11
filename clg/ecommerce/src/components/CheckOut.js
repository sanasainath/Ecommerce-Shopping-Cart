import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CheckOut.css';

import { addAddress, getAddress,getOrder,updateAddress } from '../action/addressaction';
import { removeFromCart, addToCart, getCartItems } from '../action/cartaction';
import { signout } from '../action/authaction';
import {useNavigate} from 'react-router-dom'
import { addOrder } from '../action/addressaction';
import CartTable from './CartTable';
// import { getOrder } from '../action/addressaction';


import debounce from 'lodash.debounce';

function CheckOut() {
 
  const userAddress = useSelector((state) => state.address);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate();


  const [Name, setName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [operationType, setOperationType] = useState('add');
  const [PinCode, setPinCode] = useState('');
  const [Locality, setLocality] = useState('');
  const [Address, setAddress] = useState('');
  const [CityDistrictTown, setCityDistrictTown] = useState('');
  const [State, setState] = useState('');
  const [LandMark, setLandMark] = useState('');
  const [AlternatePhone, setAlternatePhone] = useState('');
  const [AddressType, setAddressType] = useState('home');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSelectedAddress, setShowSelectedAddress] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(true);
  const [editedAddress, setEditedAddress] = useState({});
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isNewAddressFormVisible, setIsNewAddressFormVisible] = useState(false);
  const [isEditingUser,setisEditingUser]=useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isStep2Enabled, setStep2Enabled] = useState(false);
  const [isStep3Enabled, setStep3Enabled] = useState(false);
  const [isDeliveryHereClicked, setIsDeliveryHereClicked] = useState(false);
  const [orderConfirma,setorderConfirm]=useState(false);
  const [isCartTableVisible, setIsCartTableVisible] = useState(true);
  const [isMessageVisible, setIsMessageVisible] = useState(true);


   const cart = useSelector((state) => state.cart);

  const[cartItems,setCartItems]=useState(cart.cartItems);
 
  useEffect(()=>{
    setCartItems(cart.cartItems);
  },[cart.cartItems]);
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);
  
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
    const subtotal = Object.entries(cartItems).reduce((acc, [productId, product]) => {
      return acc + product.price * product.qty;
    }, 0);
    return subtotal.toFixed(2); // You may adjust the number of decimal places as needed
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
    dispatch(removeFromCart({productId}));
  };


  const handleEditClick = () => {
    if (selectedAddress) {
      console.log('Edit button clicked for address:', selectedAddress);
      setIsEditingAddress(true);
      setIsEditing(true);
      setEditedAddress({ ...selectedAddress });
      setIsNewAddressFormVisible(false);
      // Set form fields with selected address details
      setName(selectedAddress.name || '');
      setMobileNumber(selectedAddress.MobileNumber || '');
      setPinCode(selectedAddress.pinCode || '');
      setLocality(selectedAddress.locality || '');
      setAddress(selectedAddress.address || '');
      setCityDistrictTown(selectedAddress.cityDistrictTown || '');
      setState(selectedAddress.state || '');
      setLandMark(selectedAddress.landMark || '');
      setAlternatePhone(selectedAddress.alternatePhone || '');
      setAddressType(selectedAddress.addressType || 'home');
      setOperationType('update');
    }
  };
const orderConfirmation=()=>{
  setorderConfirm(true);
  setIsCartTableVisible(false);
  setIsMessageVisible(false);

}
  const handleDeliveryHereClick = () => {
    if (selectedAddress) {
      console.log('Delivery Here button clicked for address:', selectedAddress);
      setIsEditingAddress(true);
      setShowSelectedAddress(true);
      setShowAllAddresses(false);
      setCurrentStep(3);
      setIsDeliveryHereClicked(true);
    }
  };

  const showAddNewAddressForm = () => {
    setIsEditing(true);
    setIsEditingAddress(false);
    setEditedAddress({});
    setIsNewAddressFormVisible(true);
    setName('');
    setMobileNumber('');
    setPinCode('');
    setLocality('');
    setAddress('');
    setCityDistrictTown('');
    setState('');
    setLandMark('');
    setAlternatePhone('');
    setAddressType('home');
    setOperationType('add');
  };
  useEffect(() => {
    // Check if the user is authenticated
    if (auth.authenticate) {
      // Enable Step 2 if the user is authenticated
      setStep2Enabled(true);
      setCurrentStep(2);
    } else {
      // Disable Step 2 and 3 if the user is not authenticated
      setStep2Enabled(false);
      setStep3Enabled(false);
    }
  }, [auth.authenticate]);
  useEffect(() => {
    // Disable Step 3 if the current step is 2
    setStep3Enabled(currentStep > 2);
  }, [currentStep]);


  const showremoveAddressForm = () => {
    setIsEditing(false);
    setIsEditingAddress(false);
    setEditedAddress({});
    setIsNewAddressFormVisible(false);
    setCurrentStep(3); 
  };

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getAddress());
    }
  }, [dispatch, auth.authenticate]);

  const saveAddress = async (e) => {
    e.preventDefault();
    if (operationType === 'update' && !selectedAddress) {
      console.error('Please select an address.');
      return;
    }
    console.log('Selected Address:', selectedAddress);
    setIsLoading(true);

    try {
      if (
        !Name ||
        !MobileNumber ||
        !PinCode ||
        !Locality ||
        !Address ||
        !CityDistrictTown ||
        !State ||
        !AddressType
      ) {
        console.error('Please fill in all required fields.');
        return;
      }
      const payload = {
        operationType,
        address: {
          name: Name,
          MobileNumber,
          pinCode: PinCode,
          locality: Locality,
          address: Address,
          cityDistrictTown: CityDistrictTown,
          state: State,
          landMark: LandMark,
          alternatePhone: AlternatePhone,
          addressType: AddressType,
        },
      };

      if (operationType === 'add') {
        console.log("we came to add");
        await dispatch(addAddress(payload));
      } else if (operationType === 'update') {
        console.log("we came to update");
        await dispatch(updateAddress(selectedAddress._id, payload));
      }
      setIsEditing(false);
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditUser = () => {
    setisEditingUser(!isEditingUser);
  };
  const handleLogout = () => {
    // Implement your logout logic here
    if (auth && auth.user) {
    dispatch(signout());
    navigate('/signin');
    }
  };
  const orderAdd = async (e) => {
    try {
      // Validate whether a selected address is available
      if (!selectedAddress) {
        console.error('Please select an address to place the order.');
        return;
      }
  
      // Prepare the order payload
      const orderPayload = {
        user: auth.user._id, // Replace with the actual user ID
        addressId: selectedAddress._id, // Use the selected address ID
        totalAmount: parseFloat(calculateSubtotal()), // Replace with your actual total amount calculation logic
        items: Object.values(cartItems).map((item) => ({
          productId: item._id,
          purchasedQty: item.qty, // Assuming you have a quantity property in your cartItems
          payablePrice: parseFloat(item.price),
        })),
        paymentStatus: 'pending',
        paymentType: 'cod', // You may want to include the payment type based on your logic
        orderStatus: [
          {
            type: 'ordered', // Initial order status
          },
        ],
        isCompleted: false, // Set to true if the order is completed
        date: new Date(), // Replace with the actual date and time
      };
      
    
      // Dispatch the addOrder action
      await dispatch(addOrder(orderPayload));

      // Wait for some time (e.g., 1000 milliseconds)
      // await new Promise(resolve => setTimeout(resolve, 1000));
  
      // // Access the updated state
      // const updatedOrders = useSelector((state) => state.address.orders);
  
      // // Now you can safely access the orders array
      // const latestOrder = updatedOrders[updatedOrders.length - 1];
      // console.log("Latest Order ID:", latestOrder._id);



//     var options = {
//       "key": "rzp_test_wTDxLl7JVZeF9t", // Enter the Key ID generated from the Dashboard
//       "amount":  parseFloat(calculateSubtotal()), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       "currency": "INR",
//       "name": "Acme Corp", //your business name
//       "description": "Test Transaction",
//       "image": "https://example.com/your_logo",
//       "order_id":  `${latestOrder._id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       "handler": function (response){
//           alert(response.razorpay_payment_id);
//           alert(response.razorpay_order_id);
//           alert(response.razorpay_signature)
//       },
//       "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
//           "name": "Gaurav Kumar", //your customer's name
//           "email": "gaurav.kumar@example.com", 
//           "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
//       },
//       "notes": {
//           "address": "Razorpay Corporate Office"
//       },
//       "theme": {
//           "color": "#3399cc"
//       }
//   };
//   var rzp1 = new window.Razorpay(options);
//   rzp1.on('payment.failed', function (response){
//           alert(response.error.code);
//           alert(response.error.description);
//           alert(response.error.source);
//           alert(response.error.step);
//           alert(response.error.reason);
//           alert(response.error.metadata.order_id);
//           alert(response.error.metadata.payment_id);
//   });
// var rzp1 = new window.Razorpay(options);
// rzp1.open();

// e.preventDefault();
 
  
      // const emailPayload = {
      //   toEmail: auth.user.email,
      //   orderDetails: orderPayload,
      // };
      // await axios.post('http://localhost:3001/send-confirmation-email', emailPayload);
      
  
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };
  
  
  return (
    <div className='address-form'>
    <div className="user-profile-container1">
      <div className={`step-content step1 ${currentStep === 1 ? 'active' : ''}`}>
      <div className="user-details">
      <h3>Step 1</h3>
        <h3>login</h3>
        <div className="user-name">{auth.user.firstName + auth.user.lastName}
        <button onClick={() => handleEditUser()}>Edit</button></div>
        {isEditingUser && (
   
      <button onClick={() => handleLogout()}>Logout & Sign In with Another Account</button>
 
   
  )}
  </div>
  </div>
  <div className={`step-content step2 ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed-step' : ''}`} style={{ opacity: isStep2Enabled ? 1 : 0.5, pointerEvents: isStep2Enabled ? 'auto' : 'none' }}>
  <h3>Step 2</h3>
  
        <div className="user-address">
     
          <h3>Address</h3>
          {isEditing && !isNewAddressFormVisible && (
  <div className="edit-address-form">
    <form method="post" action="/user/address/edit">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="text"
        id="mobileNumber"
        name="mobileNumber"
        value={MobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />

      <label htmlFor="pinCode">Pin Code:</label>
      <input
        type="text"
        id="pinCode"
        name="pinCode"
        value={PinCode}
        onChange={(e) => setPinCode(e.target.value)}
      />

      <label htmlFor="locality">Locality:</label>
      <input
        type="text"
        id="locality"
        name="locality"
        value={Locality}
        onChange={(e) => setLocality(e.target.value)}
      />

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={Address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <label htmlFor="cityDistrictTown">City/District/Town:</label>
      <input
        type="text"
        id="cityDistrictTown"
        name="cityDistrictTown"
        value={CityDistrictTown}
        onChange={(e) => setCityDistrictTown(e.target.value)}
      />

      <label htmlFor="state">State:</label>
      <input
        type="text"
        id="state"
        name="state"
        value={State}
        onChange={(e) => setState(e.target.value)}
      />

      <label htmlFor="landmark">Landmark:</label>
      <input
        type="text"
        id="landmark"
        name="landmark"
        value={LandMark}
        onChange={(e) => setLandMark(e.target.value)}
      />

      <label htmlFor="alternatePhone">Alternate Phone:</label>
      <input
        type="text"
        id="alternatePhone"
        name="alternatePhone"
        value={AlternatePhone}
        onChange={(e) => setAlternatePhone(e.target.value)}
      />

      <label htmlFor="addressType">Address Type:</label>
      <select
        id="addressType"
        name="addressType"
        value={AddressType}
        onChange={(e) => setAddressType(e.target.value)}
      >
        <option value="home">Home</option>
        <option value="work">Work</option>
      </select>

      <button onClick={saveAddress}>Save Address</button>
      <button onClick={showremoveAddressForm}>Cancel Address</button>
    </form>
  </div>
)}
          {userAddress.address && userAddress.address.length > 0 ? (
  userAddress.address.map((address) => (
    <div
      key={address._id}
      className={`existing-address ${selectedAddress === address ? 'selected' : ''}`}
      style={{ display: showAllAddresses || selectedAddress === address ? 'block' : 'none' }}
    >
                <div className="address-row">
                  <input
                    type="radio"
                    id={`address-${address._id}`}
                    name="selectedAddress"
                    checked={selectedAddress === address}
                    onChange={() => setSelectedAddress(address)}
                  />
                  <label htmlFor={`address-${address._id}`} className="address-label">
                    <p>{address.name}</p>
                    <p>{address.mobileNumber}</p>
                    <p>{address.pinCode}</p>
                    <p>{address.locality}</p>
                    <p>{address.address}</p>
                    <p>{address.cityDistrictTown}</p>
                    <p>{address.state}</p>
                    <p>{address.landmark}</p>
                    <p>{address.alternatePhone}</p>
                    <p>{address.addressType}</p>
                  </label>
                  {selectedAddress === address && (
                  <button
                  onClick={handleEditClick}
                  disabled={!selectedAddress || selectedAddress !== address}
                >
                  Edit
                </button>
                )}
                </div>
                {selectedAddress === address && (
                <div className="delivery-here">
                        {!showSelectedAddress && (
                <button
                  onClick={handleDeliveryHereClick}
                  disabled={!selectedAddress || selectedAddress !== address}
                >
                  Delivery Here
                </button>
                   )}
                </div >
                  )}
              </div>
            ))
          ) : (
            <p>No existing address found. Please add a new address.</p>
          )}
      
      
  
      <button
  onClick={showAddNewAddressForm}
  style={{ display: showAllAddresses && !showSelectedAddress ? 'block' : 'none' }}
>
  + Add New Address
</button>
</div>
</div>
{isEditing && isNewAddressFormVisible && (
  <div className="new-address-form">
    <form method="post" action="/user/address/create">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="text"
        id="mobileNumber"
        name="mobileNumber"
        value={MobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />

      <label htmlFor="pinCode">Pin Code:</label>
      <input
        type="text"
        id="pinCode"
        name="pinCode"
        value={PinCode}
        onChange={(e) => setPinCode(e.target.value)}
      />

      <label htmlFor="locality">Locality:</label>
      <input
        type="text"
        id="locality"
        name="locality"
        value={Locality}
        onChange={(e) => setLocality(e.target.value)}
      />

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={Address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <label htmlFor="cityDistrictTown">City/District/Town:</label>
      <input
        type="text"
        id="cityDistrictTown"
        name="cityDistrictTown"
        value={CityDistrictTown}
        onChange={(e) => setCityDistrictTown(e.target.value)}
      />

      <label htmlFor="state">State:</label>
      <input
        type="text"
        id="state"
        name="state"
        value={State}
        onChange={(e) => setState(e.target.value)}
      />

      <label htmlFor="landmark">Landmark:</label>
      <input
        type="text"
        id="landmark"
        name="landmark"
        value={LandMark}
        onChange={(e) => setLandMark(e.target.value)}
      />

      <label htmlFor="alternatePhone">Alternate Phone:</label>
      <input
        type="text"
        id="alternatePhone"
        name="alternatePhone"
        value={AlternatePhone}
        onChange={(e) => setAlternatePhone(e.target.value)}
      />

      <label htmlFor="addressType">Address Type:</label>
      <select
        id="addressType"
        name="addressType"
        value={AddressType}
        onChange={(e) => setAddressType(e.target.value)}
      >
        <option value="home">Home</option>
        <option value="work">Work</option>
      </select>

      <button onClick={saveAddress}>Save Address</button>
      <button onClick={showremoveAddressForm}>Cancel Address</button>
    </form>
  </div>
)}


<div className={`step-content step3 ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed-step' : ''}`} style={{ opacity: isStep3Enabled ? 1 : 0.5, pointerEvents: isStep3Enabled ? 'auto' : 'none' }}>
      <div className="product-details">
      <h3>orderSummary</h3>
    
      {showSelectedAddress && isMessageVisible && (
            <CartTable
              validCartItems={validCartItems}
              onQuantityIncrement={onQuantityIncrement}
              onQuantityDecrement={onQuantityDecrement}
              handleRemoveFromCart={handleRemoveFromCart}
              calculateSubtotal={calculateSubtotal}
            />
          )}
            
      {showSelectedAddress && isMessageVisible && (
            <div>
              <p>send the confirm order to the mail {auth.user.email}</p>
              <button onClick={orderConfirmation}>Continue</button>
            </div>
          )}

      {!isMessageVisible && (
            <div>
              <p>Total Products: {validCartItems.length}</p>
            </div>
          )}


<div>


</div>
      
        <button onClick={orderAdd}>order</button>
      </div>
      </div>
      
    </div>
    <div>
{/* <Order/> */}
    </div>
    </div>
  );
}

export default CheckOut;