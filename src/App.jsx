import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PackagePlus, 
  PackageSearch, 
  Home, 
  ShoppingBag,
  Edit2,
  Save,
  X,
  Search
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import AddProductForm from './components/AddProductForm';
import ProductPage from './components/ProductPage';

const App = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || 'landing';
  });

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      return parsedProducts.map(product => ({
        ...product,
        price: typeof product.price === 'number' ? product.price : parseFloat(product.price || 0)
      }));
    }
  return [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 4000,
        category: 'Electronics',
        description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
      },
      {
        id: 2,
        name: 'Minimalist Backpack',
        price: 5500,
        category: 'Accessories',
        description: 'Durable water-resistant backpack perfect for daily commute or travel.',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'
      },
      {
        id: 3,
        name: 'Smart Watch Pro',
        price: 6000,
        category: 'Electronics',
        description: 'Track your fitness, receive notifications, and monitor your health.',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setActiveTab('products');
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(products.map(product =>
      product.id === id ? { ...updatedProduct, id } : product
    ));
  };

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'add', label: 'Add Product', icon: PackagePlus },
    { id: 'products', label: 'Products', icon: PackageSearch },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Product Showcase App</span>
            </div>
            <div className="flex space-x-1">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      activeTab === item.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'add' && <AddProductForm onAddProduct={handleAddProduct} />}
        {activeTab === 'products' && (
          <ProductPage products={products} onUpdateProduct={handleUpdateProduct} />
        )}
      </main>

      <footer className="border-t border-gray-200 bg-black mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-100">
            E-commerce Admin Portal © {new Date().getFullYear()} | Manage your products efficiently
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;