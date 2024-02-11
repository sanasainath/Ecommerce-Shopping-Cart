// Home.js
import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import SideView from './SideView';

import FeaturedProducts from './FeaturedProducts';
import { useDispatch ,useSelector} from 'react-redux';
import RatingProducts from './RatingProducts';

import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Person4Icon from '@mui/icons-material/Person4';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
function Home() {
  

 
  // const orders=()=>{
  //   dispatch(getAllProducts());
  // }
  return (
    <div className='home-page'>
      <div className='image-first'>
        <img src='./images/person-people-girl-woman-hair-white-588481-pxhere.com_ (1).jpg' alt='not found' />
      </div>
      <div className='product-zone'>
        <Sidebar />
        <SideView />
      </div>
   
<div>

<FeaturedProducts/>

</div>
<div>
<RatingProducts/>
</div>
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
      
      <div  className='allicons' style={{fontSize:'14px'  ,marginLeft:'170px'}} >  <FacebookOutlinedIcon style={{ marginRight:'15px',  borderRadius: '5px',fontSize:'15px'  }} /><TwitterIcon style={{  marginRight:'15px',borderRadius: '5px',fontSize:'15px'  }}/> <GoogleIcon style={{   marginRight:'15px',borderRadius: '2px',fontSize:'15px'  }}/>
        <PinterestIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LanguageIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }}/>
        <InstagramIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <SportsVolleyballIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LinkedInIcon style={{ borderRadius: '1px' ,fontSize:'15px' }} />
        
        </div>

     
    </div>
  );
}

export default Home;
