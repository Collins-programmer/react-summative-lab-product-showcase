import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Edit2, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onDelete, isDeleting }) => {
  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price || 0);
    return isNaN(numPrice) ? '00' : numPrice.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <ShoppingBag className="h-12 w-12" />
              <span className="text-sm mt-2">No image</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">Ksh {formatPrice(product.price)}</span>
          <div className="flex gap-2">
            <Link
              to={`/products/${product.id}/edit`}
              className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
              title="Edit product"
            >
              <Edit2 className="h-4 w-4" />
            </Link>
            <button
              onClick={() => onDelete(product.id)}
              disabled={isDeleting === product.id}
              className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
              title="Delete product"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;