import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useProducts() {
  const [products, setProducts] = useLocalStorage('products', []);
  const [error, setError] = useState(null);

  const createProduct = useCallback(async (productData) => {
    try {
      const newProduct = {
        ...productData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inStock: productData.inStock ?? true
      };
      
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [setProducts]);

  const updateProduct = useCallback(async (id, updates) => {
    try {
      setProducts(prev => prev.map(product => {
        if (product.id === parseInt(id)) {
          return { 
            ...product, 
            ...updates, 
            updatedAt: new Date().toISOString() 
          };
        }
        return product;
      }));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [setProducts]);

  const deleteProduct = useCallback(async (id) => {
    try {
      setProducts(prev => prev.filter(product => product.id !== parseInt(id)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [setProducts]);

  const getProduct = useCallback((id) => {
    return products.find(product => product.id === parseInt(id));
  }, [products]);

  return {
    products,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
  };
}