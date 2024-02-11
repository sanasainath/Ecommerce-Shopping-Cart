import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProductsBySlug } from '../action/productslugaction';
import './ProductListPage.css';
import { generatePublicUrl } from '../urlConfig';

function ProductListPage(props) {
  const product = useSelector((state) => state.productslugretrieve);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [range, setrange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    above20k: 7000,
  });

  const initialProductCount = 7; // Number of products to display initially
  const [displayedProducts, setDisplayedProducts] = useState(initialProductCount);

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, [dispatch, slug]);

  const handleViewAllClick = () => {
    // Show all products when "View All" is clicked
    setDisplayedProducts(product.productsByPrice.length);
  };

  return (
    <div>
      {Object.keys(product.productsByPrice).length > 0 &&
        Object.keys(product.productsByPrice).map((key, index) => (
          <div className="card" key={index}>
            <div className="container">
              <div>{slug} mobiles under {range[key]} </div>
              <button onClick={handleViewAllClick}>View All</button>
            </div>
            <div className="horizontal-scroll-container">
              {product.productsByPrice[key].slice(0, displayedProducts).map((productItem) => (
                <Link to={`/${productItem.slug}/${productItem._id}`} key={productItem._id}>
                  <div className="product-container21">
                    <div className="product-img">
                      <img src={generatePublicUrl(productItem.productPictures[0].img)} alt="" />
                    </div>
                    <div className="product-info">
                      <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                        {productItem.name}
                        <div>
                          <span>4.3</span>&nbsp;
                          <span>3342</span>
                        </div>
                        <div className="product-price">{productItem.price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductListPage;
