import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../contexts/ProductsContext';
import ProductForm from '../components/ProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();
  const { createProduct } = useProductsContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: '',
    price: '',
    category: '',
    description: '',
    imageUrl: '',
    inStock: true
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createProduct(formData);
      navigate('/products');
    } catch (error) {
      console.error('Failed to add product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel="Add Product"
      isSubmitting={isSubmitting}
    />
  );
};

export default AddProductPage;