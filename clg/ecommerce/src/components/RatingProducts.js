import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../action/admin/productalltypes';
import './RatingProducts.css';
import { Link } from 'react-router-dom';

function RatingProducts() {
  const dispatch = useDispatch();
  const { AllProducts, loading, error } = useSelector((state) => state.getallproducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Sort products by rating in descending order
  const sortedProducts = AllProducts.products?.sort((a, b) => b.rating - a.rating);

  return (
    <div className="top-rated-products">
      <h2>Top Rated Products</h2>
      <div className="product-list">
        {sortedProducts?.map((product) => (
          <Link to={`/${product.slug}/${product._id}`} className="product-link" key={product._id}>
            <div className="product-card">
              <img src={product.productPictures[0]?.img} alt={product.name} />
              <h3>{product.name}</h3>
              {/* <p>Rating: {product.rating}</p> */}
              <p>Price: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RatingProducts;
