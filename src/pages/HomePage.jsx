import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, PackagePlus, Edit2, Search, TrendingUp, Shield, Clock } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <ShoppingBag className="h-10 w-10 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Collo Shopping District</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your complete product management solution for showcasing and managing your product catalog
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
              <PackagePlus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Add Products</h3>
            <p className="text-gray-600">Easily add new products to your inventory with our intuitive form interface.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
              <Edit2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Edit & Update</h3>
            <p className="text-gray-600">Modify product details, update prices, and manage inventory in real-time.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
              <Search className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-600">Quickly find products with our dynamic search functionality.</p>
          </div>
        </div>
      </div> 

    <footer className="w-full border-t border-gray-200 bg-black mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-100">
            E-commerce Admin Portal © {new Date().getFullYear()} | Manage your products efficiently
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;