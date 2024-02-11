import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Person4Icon from '@mui/icons-material/Person4';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import { Link,useNavigate } from 'react-router-dom'
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { signout } from '../action/authaction';
import { searchProducts } from '../action/productaction';
import { getOrder } from '../action/addressaction';

function Header() {
   

  // console.log("in hpme checking",orders);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [showUserSections, setShowUserSections] = useState(true);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isAuthenticated = useSelector((state) => state.auth.authenticate);
  const[cartItems,setCartItems]=useState(cart.cartItems);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const isAdmin = useSelector((state) => state.admin);
  console.log("checking admin",isAdmin);
  useEffect(()=>{
    setCartItems(cart.cartItems);
  },[cart.cartItems]);
  const handleLoginClick = () => {
    // Check if the user is authenticated before navigating
    console.log('isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      // Do nothing or provide feedback (optional)
      console.log('User is already authenticated');
    } else {
      // If not authenticated, navigate to the login page
      if (auth && auth.user) {
      navigate('/signin');
      }
    }
  };
  const handleSignoutClick=()=>{
    dispatch(signout());
  }
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);  
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // useEffect(() => {
  //   // Use useEffect for navigation based on isAuthenticated
  //   if (isAuthenticated) {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);

  const toggleUserSections = () => {
    setShowUserSections(!showUserSections);
  };
  const handleSearch = async () => {
    console.log('Search Query:', searchQuery);
  
    if (searchQuery.trim() !== '') {
      // Dispatch the searchProducts action with the search query
   
      dispatch(searchProducts(searchQuery));
      navigate(`/searchResults/${searchQuery}`);
      
    } else {
      // Handle empty search query if needed
      console.error('Search query is empty.');
    }
  };
  
  
  
  

  // Calculate total sum of all cart items
  const totalSum = Object.values(cartItems || {}).reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  // Calculate the number of products in the cart
  const numberOfProducts = Object.keys(cartItems || {}).length;

 
  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };
  


  return (

   
    <div className='header-top'>  
      <div className='addresss'>
      <div className='headerss' style={{ fontSize: '14px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
      <FmdGoodIcon style={{ paddingRight: '5px', borderRadius: '2px', fontSize: '15px', verticalAlign: 'middle' }} />
      Themefreesia, Abc Building, 5th floor, Zyz Street
      <CallIcon style={{ paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px', fontSize: '15px', verticalAlign: 'middle' }} />
      (123)456-7890
      <EmailIcon style={{ paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px', fontSize: '15px', verticalAlign: 'middle' }} />
      support@support.com Themefreesia
    </div>

        <div  className='allicons' style={{fontSize:'14px'  ,marginLeft:'170px'}} >  <FacebookOutlinedIcon style={{ marginRight:'15px',  borderRadius: '5px',fontSize:'15px'  }} /><TwitterIcon style={{  marginRight:'15px',borderRadius: '5px',fontSize:'15px'  }}/> <GoogleIcon style={{   marginRight:'15px',borderRadius: '2px',fontSize:'15px'  }}/>
        <PinterestIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LanguageIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }}/>
        <InstagramIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <SportsVolleyballIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LinkedInIcon style={{ borderRadius: '1px' ,fontSize:'15px' }} />
        
        </div>
        {/* {windowWidth <= 768 && (
          <div className='sidebar-button' onClick={toggleUserSections}>
            <h3 style={{marginRight:'2px'}}>Menu</h3>☰ 
          </div>
        )} */}
                {windowWidth <= 768 ? (
          <div className='sidebar-button' onClick={toggleUserSections}>
            <h3 style={{marginRight:'2px',fontWeight:'bold'}}>MENU</h3> {showUserSections ? <CloseIcon />: '☰' } {/* Toggle between hamburger icon and close icon */}
          </div>
        ) : null}
         {(showUserSections || windowWidth > 768) && (
            <div className='user-sections'>
           <div className="account-user" onClick={toggleAccountDropdown}>
  <Person4Icon style={{ paddingRight: '0px', borderRadius: '1px', fontSize: '15px', color: 'gray' }} />
  <p style={{ fontSize: '15px' }}>My Account</p>
  {showAccountDropdown && (
    <div className="account-dropdown">
      <ul>
        {/* Display "Orders" option */}
        <li>
          <Link to="/ordersplaced"  style={{ color: 'black', textDecoration: 'none' }}>Orders</Link>
        </li>
        {/* Display "Admin" option if the user is an admin */}
      
          <li>
            <Link to="/admin/signin/admin/change" style={{ color: 'black', textDecoration: 'none' }}>Admin</Link>
          </li>
      
      </ul>
    </div>
  )}
</div>

        
          
          {/* <Link to='signin'>
          <div className='login-user'  onClick={handleLoginClick}>
       <LockOpenIcon style={{ paddingLeft:'10px',borderRadius: '1px' ,fontSize:'15px' }} />
       <p style={{fontSize:'15px',paddingRight:'10px'}}>Login</p>
          </div>
          </Link> */}
              {isAuthenticated ? (
      // If authenticated, show "Signout" and attach an onClick handler
      <div className='login-user' onClick={handleSignoutClick}>
        <LockOpenIcon style={{ paddingLeft: '10px', borderRadius: '1px', fontSize: '15px' }} />
        <p style={{ fontSize: '15px', paddingRight: '10px' }}>Signout</p>
      </div>
    ) : (
      // If not authenticated, show "Login" and attach an onClick handler
      <Link to='signin'>
        <div className='login-user' onClick={handleLoginClick}>
          <LockOpenIcon style={{ paddingLeft: '10px', borderRadius: '1px', fontSize: '15px' }} />
          <p style={{ fontSize: '15px', paddingRight: '10px' }}>Login</p>
        </div>
      </Link>
    )}
              
          </div>
         )}

      </div>
    <div className='header-start'>

      <div className='header-name'>
        <img
          src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/site-logo.png'
          width="60px"
          className='header-image'
          alt='not found'
        />
        <div className='text-container' >
          <Link to='/'  style={{ textDecoration: 'none'}}>
          <h1 style={{color:"#FF5F1F",fontSize:'30px',fontWeight: 'normal', marginBottom: '10px'}}>Shopping Cart</h1>
          <p style={{fontSize:'13px',marginBottom:'20px'}} >BUILD YOUR OWN ONLINE STORE</p>
          </Link>
        </div>
      </div>  
      <div style={{ flexGrow: '0.42' }} className="header-search">
      <input
        type="search"
        style={{ flexBasis: '440px' }}
        className="search-one"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="search-icon-wrapper" onClick={handleSearch}>
  <SearchIcon className="search-icon" />
</div>



      <div className='love'>
        <Link to='wishlist'>
        <img src='./images/icons8-heart-100 (1).png' width='25px'  height='43px'alt='not ofund'/>
        <p style={{backgroundColor:" #FF5F1F",borderRadius:'70%'}}>0</p>
        </Link>
      </div>
      <div className='love1'>
        <Link to='cart'>
    <img src='./images/icons8-basket-24.png' width="14px" height='40px' backgroundColor="gray"alt='not found'/>
        <p style={{backgroundColor:' #FF5F1F',borderRadius:'80%'}}>{numberOfProducts}</p></Link>
      </div>
      <div className='love2'>
        <p style={{marginBottom:'-10px'}}>Total</p>
        <p >${totalSum.toFixed(2)}</p>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Header;
