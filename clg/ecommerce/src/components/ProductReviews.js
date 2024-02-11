// ProductReviews.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../action/review';
import './ProductReviews.css';

function ProductReviews({ productId }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { gettingAllReviews, reviews, error } = useSelector((state) => state.review);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await dispatch(getAllReviews(productId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [dispatch, productId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (gettingAllReviews) {
    return <p>Fetching reviews...</p>;
  }

  if (error) {
    return <p>Error fetching reviews: {error}</p>;
  }

  return (
    <div className="review-container">
      <h3>Product Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available for this product.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <div className="rating-container">
                <div className="star-rating">
                  
                  {Array.from({ length: review.rating }, (_, index) => (
                    <span key={index} role="img" aria-label="star">
                      ⭐
                    </span>
                  ))}
                </div>
                <div className="numeric-rating"></div>
              </div>
              <div className="review-user">{review.user.name}</div>
              <div className="review-comment">{review.comment}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductReviews;
