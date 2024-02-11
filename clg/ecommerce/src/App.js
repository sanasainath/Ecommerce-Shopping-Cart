import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import WishList from './components/WishList';
import Navigation from './components/Navigation';
import { BreadcrumbProvider } from './components/BreadcrumbContext'; 
import FlipSign from './components/FlipSign';
import FlipSignUp from './components/FlipSignUp';
import PrivateRoutes from './PrivateRoutes'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserLogin } from './action/authaction';
import Category from './components/Category';
import ProductDetailsPage from './components/ProductDetailsPage'
import Product from './components/Product'
import { getAllCategories } from './action/categoryaction';
import {getInitialData} from './action/initialaction'
import Realme from './components/Realme'
import TotalProductPages from './components/TotalProductPages';
import NewPag from './components/NewPage'
import ProductListPage from './components/ProductListPage';
import CartPage from './components/CartPage'
  import { getCartItems, updateCart } from './action/cartaction';
import CheckOut from './components/CheckOut';
import SearchResults from './components/SearchResults';
import OrdersPlaced from './components/OrdersPlaced';
import AdminSignUp from './components/admin/AdminSignUp';
import AdminSignin from './components/admin/AdminSignin';
import AdminOrdering from './components/AdminOrdering';
import Contact from './components/Contact'
import AdminPage from './components/AdminPage'
import Blog from './components/Blog';
import ShopHead from './components/ShopHead';
import OrderPayment from './components/OrderPayment';

// import axios from 'axios';
function App() {
  // const [file,setFile]=useState();
  // const handleupload = () => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  
  //   axios.post('http://localhost:3001/upload', formData)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  
  //   console.log(file);
  // };
  
const dispatch=useDispatch();
const auth= useSelector((state) => state.auth.authenticate);
    
  useEffect(() => {
       
if(!auth.authenticate)
{
  dispatch(UserLogin());
}

    // dispatch(getAllCategories());
    if(auth.authenticate)
    {
      dispatch(getInitialData());


    }
   


}, [auth.authenticate]);
useEffect(()=>{
  dispatch(updateCart());
  // dispatch(getCartItems());
},[auth.authenticate]);

  return (
    <div className="App">
   
      <Router>
      <BreadcrumbProvider> 
          <Header />
          
          <Navigation />

          <Routes>
            <Route element={<PrivateRoutes/>}>
            <Route path="/" element={<Home />} exact />
            <Route path="wishlist" element={<WishList />} />
            <Route path='/admin/signin/admin/change/product' element={<Product/>}/>
            <Route path='/admin/signin/admin/change/category' element={<Category/>}/>
            <Route path='/admin/signin/admin/change/page' element={<NewPag/>}/> 
            </Route>
           
            <Route path="/signup" element={<FlipSignUp />} />
            {/* <Route path="/admin/signup" element={<AdminSignUp/>} />
            <Route path="/admin/signin" element={<AdminSignin/>} /> */}
            <Route path="/shop" element={<ShopHead  />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/order/pay" element={<OrderPayment />} />
            <Route path="/admin/signin/admin/change" element={<AdminPage/>} />
            <Route path="/admin/signin/admin/change/admin/order" element={<AdminOrdering />} />
            <Route path="/ordersplaced" element={<OrdersPlaced/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/:slug/:_id" element={<ProductDetailsPage/>} />

            <Route path='/:slug' element={<TotalProductPages />} />
       
            <Route path='/checkout' element={<CheckOut />} />


        <Route path="/signin" element={<FlipSign />} />
        <Route path="/searchResults/:searchQuery" element={<SearchResults />} />
          </Routes>
         
          </BreadcrumbProvider>
  
      </Router>
    
      {/* <div>
        <input type='file' onChange={e=>setFile(e.target.files[0])}/>
        <button onClick={handleupload}>upload</button>
      </div> */}
    </div>
  );
}

export default App;



