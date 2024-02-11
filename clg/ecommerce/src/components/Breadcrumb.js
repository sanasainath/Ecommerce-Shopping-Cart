// Breadcrumb.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from './BreadcrumbContext';

const Breadcrumb = ({ showCurrentPage = true }) => {
  const { breadcrumbItems } = useBreadcrumb();

  return (
    <div>
      {breadcrumbItems.map((item, index) => (
        <span key={item.path}>
          {index > 0 && ' / '}
          {index < breadcrumbItems.length - 1 ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            showCurrentPage && item.label // Render the current page label if showCurrentPage is true
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
 



