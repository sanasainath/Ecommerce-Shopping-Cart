import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProductByCat } from '../action/productaction';
import { generatePublicUrl } from '../urlConfig';
import { Link } from 'react-router-dom';
import ReactSlider from 'react-slider';
import { useSelector } from 'react-redux';

import './NotFoundComponent.css';
import { getAllCategories } from '../action/categoryaction';

function NotFoundComponent() {
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();
  const location = useLocation();
 
  console.log("Cehckinfg catgegories in not fund",categories);
  const products = useSelector((state) => state.getproductbycat.productsbycat);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [initialLoad, setInitialLoad] = useState(true);
useEffect(()=>{
dispatch(getAllCategories())
},[dispatch])
  useEffect(() => {
    
    if (location && location.search && initialLoad) {
      const params = new URLSearchParams(location.search);
      const cid = params.get('cid');

      dispatch(getProductByCat({ cid, minPrice: priceRange[0], maxPrice: priceRange[1] }));
      setInitialLoad(false);
    }
  }, [dispatch, location, priceRange, initialLoad]);

  const handleFilterClick = () => {
    if (location && location.search) {
      const params = new URLSearchParams(location.search);
      const cid = params.get('cid');

      dispatch(getProductByCat({ cid, minPrice: priceRange[0], maxPrice: priceRange[1] }));
    }
  };
  

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className="product-page-container">
      <div className="product-list-container">
      
        {products.length > 0 ? (
          products.map((productItem) => (
            <div className="product-card" key={productItem._id}>
              <Link to={`/${productItem.slug}/${productItem._id}`}>
                <div className="product-container21">
                  <div className="product-img">
                    <img src={generatePublicUrl(productItem.productPictures[0].img)} alt="" />
                  </div>
                  <div className="product-info">
                    <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                      {productItem.name}
                      <div>
                        <span>{productItem.ratings}</span>&nbsp;
                        {/* <span>3342</span> */}
                      </div>
                      <div className="product-price">${productItem.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
      <div className="categories-container">
       
      
     
        <div className="price-range-bar">
          <p>Price Range</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={priceRange}
            min={0}
            max={1000}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            onChange={handlePriceChange}
          />
           <button onClick={handleFilterClick} className='button-down'>Apply Filter</button>
        </div>
        

<div className='catg'>
  <p style={{ marginBottom: '10px' }}>Categories</p>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {categories
      .filter((category) => category.children.length > 0)
      .flatMap((category) => category.children)
      .filter((subcategory) => subcategory.children.length === 0)
      .map((subcategory) => {
        return (
          <li key={subcategory._id} style={{ marginBottom: '8px', paddingBottom: '8px', display: 'block' }}>
            {subcategory.name}
          </li>
        );
      })}
  </ul>
</div>





      </div>
     
    </div>
  );
}

export default NotFoundComponent;
