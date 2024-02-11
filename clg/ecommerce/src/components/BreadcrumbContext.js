// BreadcrumbContext.js
import React, { createContext, useContext, useMemo } from 'react';

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const { pathname } = window.location;

  const value = useMemo(() => {
    const pathSegments = pathname.split('/').filter((segment) => segment !== '');
    const breadcrumbItems = pathSegments.map((segment, index) => ({
      path: `/${pathSegments.slice(0, index + 1).join('/')}`,
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
    }));

    // Always include the home route
    breadcrumbItems.unshift({ path: '/', label: 'Home' });

    return {
      breadcrumbItems,
    };
  }, [pathname]);

  return (
    <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};
