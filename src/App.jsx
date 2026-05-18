import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductsContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/products/:id/edit" element={<EditProductPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
            </Routes>
          </main>
        </div>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;