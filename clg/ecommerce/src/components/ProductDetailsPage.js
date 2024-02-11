import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../action/productslugaction';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsPage.css';
import { addToCart } from '../action/cartaction';
import RelatedProducts from './RelatedProducts';
import { clearProduct } from '../action/relatedproductclear';
import { getRelatedProducts } from '../action/productaction';
import ProductReviews from './ProductReviews';
import ReviewForm from './ReviewForm';
import { createReviewProduct, getAllReviews } from '../action/review';
import Star from './Star';

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const productDetails = useSelector((state) => state.productdetails);
  const relatedproducts = useSelector((state) => state.relatedProduct);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getProductById(_id));
  }, [dispatch, _id]);

  useEffect(() => {
    if (productDetails.product && productDetails.product.productPictures.length > 0) {
      setSelectedImage(productDetails.product.productPictures[0].img);
    }
  }, [productDetails.product]);

  const fetchRelatedProducts = async () => {
    try {
      setRelatedProductsLoading(true);
      dispatch(clearProduct());
      dispatch(getRelatedProducts(productDetails.product.category._id));
      setRelatedProductsLoading(false);
    } catch (error) {
      console.error('Error fetching related products:', error);
      setRelatedProductsLoading(false);
    }
  };

  useEffect(() => {
    if (productDetails.product && productDetails.product.category) {
      fetchRelatedProducts();
    }
  }, [productDetails.product]);

  const handleAddToCart = () => {
    if (productDetails.product) {
      const { _id, name, price, productPictures } = productDetails.product;
      dispatch(addToCart({ _id, name, price, productPictures }));
      navigate('/cart');
    } else {
      console.error('Product details are not available');
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (!productDetails.product) {
    return <p>Loading...</p>;
  }

  const { name, price, description } = productDetails.product;

  const handleReviewSubmit = async (reviewData) => {
    try {
      dispatch(createReviewProduct(reviewData));
      setTimeout(() => {
        dispatch(getAllReviews(productDetails.product._id));
      }, 700);
      console.log('Submitting review:', reviewData);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      <div className="product-details-container">
        <div className="product-images-container">
          {selectedImage && (
            <img src={selectedImage} alt={`Product ${name}`} className="main-image" />
          )}
          <div className="thumbnail-images-container">
            {productDetails.product.productPictures.map((picture) => (
              <img
                key={picture._id}
                src={picture.img}
                alt={`Product ${name}`}
                className="thumbnail-image"
                onClick={() => handleImageClick(picture.img)}
              />
            ))}
          </div>
        </div>
        <div className="product-details1">
          <h2>{name}</h2>
          <p style={{ fontWeight: "bold" }}>$ {price}</p>
          {productDetails.product && productDetails.product._id && (
  <Star rating={productDetails.averageRating} />
)}
<p>{description}</p>

          <div className="action-buttons1">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="add-to-wishlist">Add to Wishlist</button>
          </div>
        </div>
      </div>

      <div>
        {/* <h3 style={{ margin: "60px" }}>->Ratings & Reviews</h3> */}
        <div>
        {/* <div className="star-rating">
          {productDetails.averageRating}
  <span
    role="img"
    aria-label="star"
    style={{ color: 'black', fontSize: '24px' }}
  >
    ⭐
  </span>
</div>
<div>

</div> */}

        </div>
        <ProductReviews style={{ marginLeft: "70px" }} productId={productDetails.product._id} />
        <ReviewForm productId={productDetails.product._id} onSubmit={handleReviewSubmit} />
      </div>

      <h3 className="nam">Related Products</h3>
      {!relatedProductsLoading &&
        relatedproducts.relatedProducts &&
        relatedproducts.relatedProducts.length > 0 && (
          <RelatedProducts
            relatedProducts={relatedproducts.relatedProducts}
            currentProductId={productDetails.product._id}
            handleAddToCart={handleAddToCart}
          />
        )}
    </>
  );
}

export default ProductDetailsPage;
