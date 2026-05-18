import { describe, it, expect, beforeEach } from 'vitest';
import { productService } from '../../services/productService';

describe('productService', () => {
  beforeEach(async () => {
    const products = await productService.getProducts();
    for (const product of products.slice(3)) {
      await productService.deleteProduct(product.id);
    }
  });

  it('gets all products', async () => {
    const products = await productService.getProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('creates a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 2000,
      category: 'Test',
      description: 'Test description'
    };
    
    const created = await productService.createProduct(newProduct);
    expect(created.id).toBeDefined();
    expect(created.name).toBe('Test Product');
  });

  it('updates a product', async () => {
    const products = await productService.getProducts();
    const productToUpdate = products[0];
    
    const updated = await productService.updateProduct(productToUpdate.id, {
      price: 1400
    });
    
    expect(updated.price).toBe(1400);
  });

  it('deletes a product', async () => {
    const newProduct = await productService.createProduct({
      name: 'To Delete',
      price: 1000,
      category: 'Test',
      description: 'Will be deleted'
    });
    
    const result = await productService.deleteProduct(newProduct.id);
    expect(result.success).toBe(true);
    
    const products = await productService.getProducts();
    expect(products.find(p => p.id === newProduct.id)).toBeUndefined();
  });
});