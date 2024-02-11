// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import the separate CSS file for the navigation bar styling
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Navigation = () => {
  const [showUser, setShowUser] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleUser = () => {
    setShowUser(!showUser);
  };

  return (
    <>
      {windowWidth <= 768 ? (
        <div className='sidebar-button1' onClick={toggleUser}>
          <h3 style={{ marginRight: '9px', fontWeight: 'bold' }}>MENU</h3>
          {showUser ? <CloseIcon /> : '☰'}
        </div>
      ) : null}
      {(showUser || windowWidth > 768) && (
        <div className="navigation-menu">
          <nav>
            <ul>
              <li className="dropdown">
                <Link to="/home" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='./images/icons8-home-50 (1).png' width='17px' alt='not found' />Home
                </Link>
                <div className="dropdown-content">
                  <Link to="/home-option1">Option 1</Link>
                  <Link to="/home-option2">Option 2</Link>
                  {/* Add more options as needed */}
                </div>
              </li>
              <li className="dropdown">
                <Link to="/sections" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='./images/icons8-menu-24.png' width='17px' alt='not found' />Sections
                </Link>
                <div className="dropdown-content">
                  <Link to="/sections-option1">Option 1</Link>
                  <Link to="/sections-option2">Option 2</Link>
                  {/* Add more options as needed */}
                </div>
              </li>
              <li>
                <Link to="/shop" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='./images/icons8-cart-30.png' width='17px' alt='not found' />Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='./images/icons8-blog-64.png' width='17px' alt='not found' />Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='./images/icons8-contact-48.png' width='17px' alt='not found' />Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
