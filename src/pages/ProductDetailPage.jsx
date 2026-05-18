import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, ShoppingBag, Check, X } from 'lucide-react';
import { useProductsContext } from '../contexts/ProductsContext';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, deleteProduct, error } = useProductsContext();
  const [product, setProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await deleteProduct(parseInt(id));
        navigate('/products');
      } catch (error) {
        console.error('Failed to delete product:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-80 md:h-full bg-gray-100 flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <ShoppingBag className="h-20 w-20" />
                  <span className="text-sm mt-2">No image available</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.inStock ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">{product.category}</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-indigo-600">Ksh {product.price.toFixed(2)}</span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            
            {product.createdAt && (
              <div className="mb-6 text-sm text-gray-500">
                <p>Added on: {new Date(product.createdAt).toLocaleDateString()}</p>
                {product.updatedAt && <p>Last updated: {new Date(product.updatedAt).toLocaleDateString()}</p>}
              </div>
            )}
            
            <div className="flex gap-3">
              <Link
                to={`/products/${product.id}/edit`}
                className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit Product
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;