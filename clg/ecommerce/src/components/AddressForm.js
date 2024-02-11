// AddressForm.js
import React from 'react';
// import './AddressForm.css'
const AddressForm = ({
  isEditing,
  Name,
  MobileNumber,
  PinCode,
  Locality,
  Address,
  CityDistrictTown,
  State,
  LandMark,
  AlternatePhone,
  AddressType,
  setName,
  setMobileNumber,
  setPinCode,
  setLocality,
  setAddress,
  setCityDistrictTown,
  setState,
  setLandMark,
  setAlternatePhone,
  setAddressType,
  saveAddress,
  showremoveAddressForm,
}) => {
  return (
    <form  method="post" action='/user/address/create'>
                
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" name="name" value={Name}      onChange={(e) => setName(e.target.value)} />

    <label htmlFor="mobileNumber">Mobile Number:</label>
    <input type="text" id="mobileNumber" name="mobileNumber" value={MobileNumber}      onChange={(e) => setMobileNumber(e.target.value)} />

    <label htmlFor="pinCode">Pin Code:</label>
    <input type="text" id="pinCode" name="pinCode" value={PinCode}      onChange={(e) => setPinCode(e.target.value)} />

    <label htmlFor="locality">Locality:</label>
    <input type="text" id="locality" name="locality" value={Locality}      onChange={(e) => setLocality(e.target.value)}/>

    <label htmlFor="address">Address:</label>
    <input type="text" id="address" name="address" value={Address}      onChange={(e) => setAddress(e.target.value)} />

    <label htmlFor="cityDistrictTown">City/District/Town:</label>
    <input type="text" id="cityDistrictTown" name="cityDistrictTown" value={CityDistrictTown}      onChange={(e) => setCityDistrictTown(e.target.value)} />

    <label htmlFor="state">State:</label>
    <input type="text" id="state" name="state" value={State}      onChange={(e) => setState(e.target.value)}/>

    <label htmlFor="landmark">Landmark:</label>
    <input type="text" id="landmark" name="landmark" value={LandMark}      onChange={(e) => setLandMark(e.target.value)} />

    <label htmlFor="alternatePhone">Alternate Phone:</label>
    <input type="text" id="alternatePhone" name="alternatePhone" value={AlternatePhone}      onChange={(e) => setAlternatePhone(e.target.value)} />

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


  
{isEditing ? (
        <button onClick={saveAddress}>Save Address</button>
      ) : (
        <button onClick={showremoveAddressForm}>Cancel Address</button>
      )}
  </form>
  );
};

export default AddressForm;
