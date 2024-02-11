import React, { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const StoreProduct = lazy(() => import('./StoreProduct'));
const Producttype = lazy(() => import('./Producttype'));
const NotFoundComponent = lazy(() => import('./NotFoundComponent'));
const ProductListPage = lazy(() => import('./ProductListPage'));

function TotalProductPages() {
  const location = useLocation();
  const type = new URLSearchParams(location.search).get('type');

  const renderProduct = () => {
    switch (type) {
      case 'store':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <StoreProduct />
          </Suspense>
        );
      case 'product':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Producttype />
          </Suspense>
        );
      case 'page':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductListPage />
          </Suspense>
        );
        case 'undefined':
          return(
            <Suspense fallback={<div>Loading...</div>}>
         <NotFoundComponent  />;
          </Suspense>
          )
      default:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            
          </Suspense>
        );
    }
  };

  return <div>{renderProduct()}</div>;
}

export default TotalProductPages;
