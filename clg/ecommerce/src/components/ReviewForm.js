import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewProduct } from '../action/review';
import './ReviewForm.css';

function ReviewForm({ productId, onSubmit }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (rating === 0) {
      // Rating validation, you may show an error message or handle it according to your needs
      return;
    }
  
    const reviewData = {
      rating,
      comment,
      productId,
    };
  
    // Execute the custom onSubmit function if provided
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(reviewData);
    }
  
    // Clear the form fields
    setRating(0);
    setComment('');
  };
  

  return (
    <div className="review-form-container">
      <h3 className="review-form-heading">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Rating</label>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'selected' : ''}`}
                onClick={() => handleStarClick(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="label">Comment</label>
          <textarea
            className="input-field"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;