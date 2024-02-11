import React, { useState } from 'react';
import './SearchResults.css'
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom'; 



const SearchResults = () => {
  
  const { searchResults, loading, error } = useSelector((state) => state.searchProduct);

  const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');




  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or a more detailed loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // You can customize the error handling based on your requirements
  }
  const filteredResults = searchResults.filter((result) => {
    const productPrice = result.price;
    const isWithinRange =
      (!minPrice || productPrice >= parseFloat(minPrice)) &&
      (!maxPrice || productPrice <= parseFloat(maxPrice));
  
    return isWithinRange;
  });
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <input
        type="text"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <div className="results-container">
        {searchResults.map((result) => (
              <Link to={`/${result.slug}/${result._id}`}>
          <div key={result._id} className="product-card">
          <img src={result.productPictures.length > 0 ? result.productPictures[0].img : 'placeholder-image-url'} alt={result.name} className="product-image" />

            <div className="product-details">
              <h3>{result.name}</h3>
              <p>{result.description}</p>
              <p className="product-price">${result.price.toFixed(2)}</p>
              {/* Add more details as needed */}
            </div>
          </div>
          </Link>
        ))}
      </div>
    
    </div>
  );
};

export default SearchResults;
