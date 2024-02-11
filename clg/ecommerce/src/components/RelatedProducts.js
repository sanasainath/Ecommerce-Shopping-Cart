import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedProducts.css'
const RelatedProducts = ({ relatedProducts, currentProductId, handleAddToCart }) => {
  return (
    <div className="ohonah">
      {relatedProducts && relatedProducts.length > 0 ? (
        relatedProducts
          .filter((relatedProduct) => relatedProduct._id !== currentProductId)
          .map((relatedProduct) => (
            <div className="opop" key={relatedProduct._id}>
              <Link to={`/product/${relatedProduct._id}`}>
                <img
                  src={relatedProduct.productPictures.length > 0 && relatedProduct.productPictures[0].img}
                  alt={`Related Product ${relatedProduct.name}`}
                  className="related-product-image"
                  style={{ width: '330px', height: '300px' }}
                />
                <p>Name: {relatedProduct.name}</p>
                <p>Price: {relatedProduct.price}</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(relatedProduct)}>
                  Add to Cart
                </button>
              </Link>
            </div>
          ))
      ) : (
        <p>No related products found</p>
      )}
    </div>
  );
};

export default RelatedProducts;
