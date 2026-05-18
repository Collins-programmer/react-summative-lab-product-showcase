import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../../components/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 5700,
  category: 'Test Category',
  description: 'Test description',
  imageUrl: 'https://example.com/image.jpg',
  inStock: true
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductCard', () => {
  it('renders product information', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Ksh5700')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('shows "In Stock" badge when inStock is true', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('shows "Out of Stock" badge when inStock is false', () => {
    renderWithRouter(<ProductCard product={{ ...mockProduct, inStock: false }} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('has view details link', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const link = screen.getByText('View Details');
    expect(link).toHaveAttribute('href', '/products/1');
  });
});