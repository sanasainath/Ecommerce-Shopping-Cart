// StoreProduct.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductPage } from '../action/pageget';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './StoreProduct.css';

function StoreProduct() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { page } = useSelector(state => state.getpage);

  useEffect(() => {
    if (location && location.search) {
      const params = new URLSearchParams(location.search);
      const cid = params.get('cid');
      const type = params.get('type');

      const payload = {
        cid,
        type,
      };

      dispatch(getProductPage(payload));
    }
  }, [dispatch, location]);

  return (
    <>
    <div className="carousel-container">
      <h1>{page.title}</h1>

      {/* Banner Section */}
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoPlay={true}
        interval={3000}
        emulateTouch={true}
        swipeable={true}
        stopOnHover={true}
        dynamicHeight={true}
      >
        {page.banner &&
          Array.isArray(page.banner) &&
          page.banner.map((bannerItem, index) => (
            <div key={index} className="banner-slide">
              <a href={bannerItem.navigateTo} rel="noopener noreferrer">
                <img src={bannerItem.img} alt={`Banner Slide ${index + 1}`} />
              </a>
              <p>{bannerItem.description}</p>
            </div>
          ))}
      </Carousel>
      {/* <p>{page.description}</p> */}
      </div>
     

      {/* Product Section */}
      <div className="product-section12">
        <h2>iPhone Products</h2>
        <div className="product-container19">
          {page.product &&
            Array.isArray(page.product) &&
            page.product.map((productItem, index) => (
              <div key={index} className="product-item">
                <img src={productItem.img} alt={`Product ${index + 1}`} />
                <div className="product-info">
                  <p className="product-name">{productItem.name}</p>
                  <p className="product-description">{productItem.description}</p>
                  <p className="product-price">Price: ${productItem.price}</p>
                  {/* Add more styling for product information if needed */}
                  {/* <a href={productItem.navigateTo} className="product-link" rel="noopener noreferrer">
                    Details
                  </a> */}
                </div>
              </div>
            ))}
        </div>
      </div>
      </>
  );
}

export default StoreProduct;
