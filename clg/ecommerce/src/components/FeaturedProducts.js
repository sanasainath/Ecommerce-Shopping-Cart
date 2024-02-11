// FeaturedProducts.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../action/productaction';
import './FeaturedProducts.css'; // Import the CSS file

function FeaturedProducts() {
  const dispatch = useDispatch();
  const featuredProducts = useSelector((state) => state.featuredProducts);

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="featured-products-container">
      <h2>Featured Products</h2>
      <div className="featured-products-grid">
        {featuredProducts.loading && <p>Loading...</p>}
        {featuredProducts.error && <p>Error: {featuredProducts.error}</p>}
        {featuredProducts.featuredProducts.map((product) => (
          <div key={product._id} className="featured-product">
            <Link to={`/${product.slug}/${product._id}`} >
              <img
                src={product.productPictures[0].img}
                alt={product.name}
              />
              <div className="featured-product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="featured-product-price">Price: ${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
