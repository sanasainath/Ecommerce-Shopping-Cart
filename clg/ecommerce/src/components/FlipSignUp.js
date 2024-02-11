// FlipSignUp.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './FlipSignUp.css';
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {useDispatch} from 'react-redux'
import { signup } from '../action/useraction';
const FlipSignUp = () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticate);
  

  const navigate = useNavigate();
  const dispatch=useDispatch();

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const user={firstName,lastName,email,password,userName}
    dispatch(signup(user))
    console.log('Form Data:', user);
   
  
  };

  return (
    <div className='form-data'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <label>First Name:</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className='form-group'>
          <label>Last Name:</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className='form-group'>
          <label>User Name:</label>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='input'
            required
          />
        </div>
        <button type='submit' className='submit-btn'>
          Sign Up
        </button>
      </form>
      <div className='signin-link'>
        <p>Already have an account? </p>
        <Link to='/signin'>Sign In</Link>
      </div>
    </div>
  );
};

export default FlipSignUp;
