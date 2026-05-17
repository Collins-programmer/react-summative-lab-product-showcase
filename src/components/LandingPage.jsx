import React from 'react';
import { ShoppingBag, PackagePlus, Edit2, Search } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
          <ShoppingBag className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Weclome To The Product Showcase App</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Complete product management system for your e-commerce store
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 rounded-lg p-2 mr-3">
              <PackagePlus className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg">Add Products</h3>
          </div>
          <p className="text-gray-600">Easily add new products to your inventory with our simple form interface.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 rounded-lg p-2 mr-3">
              <Edit2 className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg">Edit & Update</h3>
          </div>
          <p className="text-gray-600">Modify product details, update prices, and manage inventory in real-time.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 rounded-lg p-2 mr-3">
              <Search className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg">Smart Search</h3>
          </div>
          <p className="text-gray-600">Quickly find products with our dynamic search functionality.</p>
        </div>
      </div>
</div>
  );
};

export default LandingPage;