import React from 'react';
import './ContactPage.css';

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
const ContactPage = () => {
  return (
    <div className='contact-one'>
      {/* Contact Details Box */}
      <div className="contact-details-box">
        <div className="contact-container1">
          <div className="contact-header1">
            <h1>Contact Us</h1>
            <p>Have questions or feedback? Reach out to us!</p>
          </div>

          {/* Contact Form */}
          <form className="contact-form1">
            <div className="form-group1">
              <label htmlFor="name">Your Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group1">
              <label htmlFor="email">Your Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group1">
              <label htmlFor="message">Your Message:</label>
              <textarea id="message" name="message" rows="4" required />
            </div>
            <button type="submit">Send Message</button>
          </form>

          {/* Social Media Icons */}
          <div className="social-icons1">
          <FacebookOutlinedIcon style={{ marginRight:'15px',  borderRadius: '5px',fontSize:'15px'  }} /><TwitterIcon style={{  marginRight:'15px',borderRadius: '5px',fontSize:'15px'  }}/> <GoogleIcon style={{   marginRight:'15px',borderRadius: '2px',fontSize:'15px'  }}/>
            {/* Add more social media icons as needed */}
            <PinterestIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LanguageIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }}/>
        <InstagramIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <SportsVolleyballIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LinkedInIcon style={{ borderRadius: '1px' ,fontSize:'15px' }} />
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="additional-content">
        <div>
        <img
          src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/site-logo.png'
          width="60px"
          className='header-image'
          alt='not found'
        />
            <h2>ShoppingCart</h2>
            <p>this is the shopping cart where we can buy products like clothes,mobiles,groceries etc... </p>
        </div>
        <div className='headerss' style={{ fontSize: '14px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
            <div className='down1'>
            <h2>Shop location</h2>
            <FmdGoodIcon style={{ paddingRight: '5px', borderRadius: '2px', fontSize: '15px', verticalAlign: 'middle' }} />
      Themefreesia, Abc Building, 5th floor, Zyz Street
      <CallIcon style={{ paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px', fontSize: '15px', verticalAlign: 'middle' }} />
      (123)456-7890
      <EmailIcon style={{ paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px', fontSize: '15px', verticalAlign: 'middle' }} />
      support@support.com Themefreesia
            </div>
           

      
    </div>
        
      </div>
    </div>
  );
};

export default ContactPage;
