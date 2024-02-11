import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../action/admin/productalltypes';
import { Link } from 'react-router-dom';
import './ShopHead.css'; // Import your CSS file

function ShopHead() {
  const dispatch = useDispatch();
  const { AllProducts, loading, error } = useSelector((state) => state.getallproducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { products } = AllProducts;

  return (
    <div className="shop-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {products && products.length > 0 && (
        <div>
          <h2>All Products</h2>
          <div className="product-list">
            {products.map((product) => (
                     <Link to={`/${product.slug}/${product._id}`} className="product-link" key={product._id}>
              <div key={product._id} className="product-card">
                <img src={product.productPictures[0].img} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopHead;
