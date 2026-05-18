import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, PackagePlus } from 'lucide-react';
import { useProductsContext } from '../contexts/ProductsContext';
import ProductCard from '../components/ProductCard';
import ErrorMessage from '../components/ErrorMessage';

const ProductsPage = () => {
  const { products, error, deleteProduct } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setDeletingId(id);
      await deleteProduct(id);
      setDeletingId(null);
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-600 mt-1">Manage and browse all your products</p>
        </div>
        <Link
          to="/add-product"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2 w-fit"
        >
          <PackagePlus className="h-4 w-4" />
          Add New Product
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      <p className="text-gray-600 mb-4">Found {filteredProducts.length} product(s)</p>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {products.length === 0 
              ? "No products yet. Click 'Add New Product' to get started!" 
              : `No products found matching "${searchTerm}"`}
          </p>
          {searchTerm && products.length > 0 && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-indigo-600 hover:text-indigo-700"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              isDeleting={deletingId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;