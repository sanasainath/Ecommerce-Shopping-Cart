import React from 'react';
import './WishList.css';
import Breadcrumb from './Breadcrumb';
import SearchIcon from '@mui/icons-material/Search';
import { BreadcrumbProvider } from './BreadcrumbContext';

function WishList() {
  return (
    <BreadcrumbProvider>
      <div className='wishlist-start'>
        <div className='wishlist-menu'>
          <div className='wishlist-menu1'>
          <Breadcrumb/>
        <h2>My wishlist on Shopping Cart</h2>
        <table className="custom-table">
      <tbody>
        <tr>
        <td style={{ width: '3%',paddingTop:'3px',paddingBottom:'3px' }}></td>
          <td style={{ width: '7%' }}></td>
          <td style={{ width: '23%',fontWeight:'650',textAlign: 'left',fontSize:'13px',paddingTop:'3px',paddingBottom:'3px' }}>PRODUCT NAME</td>
          <td style={{ width: '17%' ,fontWeight:'650',textAlign: 'left',fontSize:'13px' }}>UNIT PRICE</td>
          <td style={{ width: '23%',fontWeight:'650',textAlign: 'left',fontSize:'13px' ,paddingTop:'7px',paddingBottom:'7px' }}>STOCK STATUS</td>
          <td style={{ width: '4%',fontWeight:'650',textAlign: 'left',fontSize:'13px'  }}></td>
        </tr>
        <tr>
          <td colSpan="6" style={{fontSize:'11px',padding:'14px',fontWeight:'600'}}> No products added to the wishlist</td>
        </tr>
      </tbody>
    </table>
        </div>
        </div>
        <div  className='column-end'>
          <div className='wishlist-searchoption'>
            <input type='search' placeholder='Search...' className='wishlist-search' />
            <SearchIcon className='wishlist-searchicon'/>
          </div>
          <div  className='wishlist-post'>
            <h3>POPULAR POSTS</h3>
            <h4>Hello world</h4>

            
       
          </div>
          <p>w</p>
          <p>w</p>
          <p>w</p>
          <p>w</p>
          <p>w</p>
          <p>w</p>
          <p>w</p>
          <p>w</p>
          
          <div >
          
          </div>
          <div >
          
          </div>
          <div >
           
          </div>
         
        </div>
      </div>
    </BreadcrumbProvider>
  );
}


export default WishList;
