import React, {  useState } from 'react';
import './FlipSign.css';
import { login } from '../action/authaction';// Assuming the path to the action file is correct
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { UserLogin } from './action';
import { Link } from 'react-router-dom';
import { UserLogin } from '../action/authaction';

const FlipSign = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const auth=useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.authenticate);
    const navigate = useNavigate();
   
    useEffect(() => {
       
            dispatch(UserLogin());
        
        
    }, []);
    
    
    
     // Added 'auth' as a dependency

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted'); // Check if the form submission is triggered
        console.log('Email:', email); // Check the value of the email state
        console.log('Password:', password); // Check the value of the password state
        const user = {
            email: email,
            password:password,
        };
        console.log('User:', user); // Check the user object before dispatching
        dispatch(login(user));
    };
  

    console.log('Component Rendered'); // Check if the component is rendered
    if (isAuthenticated) {
        return navigate('/');
    }
    return (
        <div className='form-data'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-group'>
                    <label>Email Address:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            console.log('Email Changed:', e.target.value); // Check if email is changing
                        }}
                        className='input'
                    />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            console.log('Password Changed:', e.target.value); // Check if password is changing
                        }}
                        className='input'
                    />
                </div>
                <button type='submit' className='submit-btn'>
                    Submit
                </button>
            </form>
             {/* Add a link to the signup page if not authenticated */}
      {!isAuthenticated && (
        <div className='signup-link'>
          <p>Don't have an account?</p>
          <Link to='/signup'>Signup</Link>
        </div>
      )}
        </div>
    );
};

export default FlipSign;








