// contexts/ProductsContext.jsx
import React, { createContext, useContext } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const productsData = useProducts();
  
  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within ProductsProvider');
  }
  return context;
};