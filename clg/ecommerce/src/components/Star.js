// StarRating.js

import React from 'react';
import './Star.css'
const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={`star ${index < rating ? 'selected' : 'star-fill'}`}>
      &#9733;
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
