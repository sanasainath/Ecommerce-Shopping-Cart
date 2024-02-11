// StepIndicator.js

import React from 'react';
import './StepIndicator.css'; // Import a separate stylesheet for StepIndicator styles

const StepIndicator = ({ currentStep }) => {
  const steps = ['Login', 'Address', 'Order Total'];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${currentStep === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
