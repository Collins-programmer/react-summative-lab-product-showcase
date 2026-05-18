import React, { useState } from 'react';
import { PackageSearch, Search } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductPage = ({ products, onUpdateProduct }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  const handleSave = (id) => {
    if (editData && editData.name.trim() && editData.price > 0) {
      onUpdateProduct(id, editData);
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <PackageSearch className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Product Catalog</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <p className="text-gray-600 mb-4">Found {filteredProducts.length} product(s)</p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <PackageSearch className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No products found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onSave={handleSave}
                editingId={editingId}
                editData={editData}
                setEditData={setEditData}
                onCancelEdit={handleCancelEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;