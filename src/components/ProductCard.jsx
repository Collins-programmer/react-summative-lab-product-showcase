import React from 'react';
import { ShoppingBag, Edit2, Save, X } from 'lucide-react';

const ProductCard = ({ product, onEdit, onSave, editingId, editData, setEditData, onCancelEdit }) => {
  const isEditing = editingId === product.id;

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-indigo-200 overflow-hidden">
        <div className="p-5">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded font-semibold text-lg"
          />
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Price (Ksh)</label>
              <input
                type="number"
                step="100"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <input
                type="text"
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onSave(product.id)}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-1"
              >
                <Save className="h-4 w-4" /> Save
              </button>
              <button
                onClick={onCancelEdit}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 flex items-center justify-center gap-1"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <ShoppingBag className="h-12 w-12" />
            <span className="text-sm mt-2">No image</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">Ksh {product.price.toLocaleString()}</span>
          <button
            onClick={() => onEdit(product)}
            className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 flex items-center gap-1 text-sm"
          >
            <Edit2 className="h-4 w-4" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;