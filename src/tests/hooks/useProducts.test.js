import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/productService';

vi.mock('../../services/productService');

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const mockProducts = [
    { id: 1, name: 'Product 1', price: 400, category: 'Electronics', description: 'Test' }
  ];

  it('should fetch products (READ)', async () => {
    productService.getProducts.mockResolvedValue(mockProducts);
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    expect(result.current.products).toEqual(mockProducts);
  });

  it('should create product (CREATE)', async () => {
    const newProduct = { name: 'New', price: 500, category: 'Test', description: 'Test' };
    const created = { ...newProduct, id: 2 };
    
    productService.getProducts.mockResolvedValue(mockProducts);
    productService.createProduct.mockResolvedValue(created);
    
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    await act(async () => {
      await result.current.createProduct(newProduct);
    });
    
    expect(result.current.products).toContainEqual(created);
  });

  it('should update product (UPDATE)', async () => {
    productService.getProducts.mockResolvedValue(mockProducts);
    productService.updateProduct.mockResolvedValue({ ...mockProducts[0], price: 7000 });
    
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    await act(async () => {
      await result.current.updateProduct(1, { price: 7000 });
    });
    
    expect(result.current.products[0].price).toBe(7000);
  });

  it('should delete product (DELETE)', async () => {
    productService.getProducts.mockResolvedValue(mockProducts);
    productService.deleteProduct.mockResolvedValue({ success: true });
    
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(1);
    
    await act(async () => {
      await result.current.deleteProduct(1);
    });
    
    expect(result.current.products).toHaveLength(0);
  });

  it('should get single product', async () => {
    productService.getProducts.mockResolvedValue(mockProducts);
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    expect(result.current.getProduct(1)).toEqual(mockProducts[0]);
  });

  it('should handle errors gracefully', async () => {
    productService.getProducts.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    expect(result.current.error).toBe('Network error');
  });
});