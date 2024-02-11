


import React, { useState, useEffect } from 'react';
import './SideView.css';

const imagePaths = [
  'https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/mannequin-3616355.jpg',
  'https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/StockSnap_G2V8G1H1AQ.jpg',
  'https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/girl-hair-female-pattern-model-spring-625342-pxhere.jpg',
  // Add more image paths as needed
];

function SideView() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const switchImage = () => {
      setCurrentImage((prevImage) => (prevImage + 1) % imagePaths.length);
    };

    const interval = setInterval(switchImage, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='sideview-start'  onMouseEnter={() => setShowButtons(true)}
    onMouseLeave={() => setShowButtons(false)}>
        {showButtons && (
        <button className='carousel-button left' onClick={() => setCurrentImage((prevImage) => (prevImage - 1 + imagePaths.length) % imagePaths.length)}>
          &lt; {/* Left arrow */}
        </button>
      )}
      <div className='main-image1'>
        <img
          src={imagePaths[currentImage]}
          alt={`Slide ${currentImage + 1}`}
        />
      </div>
      {showButtons && (
        <button className='carousel-button right' onClick={() => setCurrentImage((prevImage) => (prevImage + 1) % imagePaths.length)}>
          &gt; {/* Right arrow */}
        </button>
      )}
      <div className='additional-image1'>
        <div className='additional-image-row'>
          <img src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/StockSnap_BXQV774BOY.jpg' alt='Additional 1' />
        </div>
        <div className='additional-image-row'>
          <img src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/ring-jewelry-jewellery-jewel-silver-bright-833724-pxhere.com_.jpg' alt='Additional 2' />
        </div>
        <div className='additional-image-row'>
          <img src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/tool-razor-utility-knife-small-appliances-home-appliances-1157294-pxhere.com_.jpg' alt='Additional 3' />
        </div>
      </div>
      
    </div>
  );
}

export default SideView;
