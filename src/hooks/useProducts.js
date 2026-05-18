import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { useLocalStorage } from './useLocalStorage';

export function useProducts() {
  const [products, setProducts] = useLocalStorage('products', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  const updateProduct = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await productService.updateProduct(id, updates);
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  const getProduct = useCallback((id) => {
    return products.find(p => p.id === parseInt(id));
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
  };
}