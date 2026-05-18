import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../contexts/ProductsContext';
import ProductForm from '../components/ProductForm';
import ErrorMessage from '../components/ErrorMessage';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, error } = useProductsContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateProduct(id, formData);
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  const initialValues = {
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    imageUrl: product.imageUrl || '',
    inStock: product.inStock
  };

  return (
    <ProductForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel="Update Product"
      isSubmitting={isSubmitting}
    />
  );
};

export default EditProductPage;