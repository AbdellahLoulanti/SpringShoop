import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { aliExpressService } from '../services/aliExpressService';
import type { Product } from '../types';

const ProductFormPage: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [product, setProduct] = useState({
    title: '',
    imageUrl: '',
    price: { value: 0, currency: 'USD' },
    rating: 0,
    sales: 0,
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      setIsEditMode(true);
      const fetchProduct = async () => {
        try {
          const data = await aliExpressService.getProductById(productId);
          setProduct({
            title: data.title,
            imageUrl: data.imageUrl,
            price: data.price,
            rating: data.rating,
            sales: data.sales,
          });
        } catch (error) {
          console.error("Failed to fetch product for editing:", error);
          navigate('/admin');
        } finally {
            setPageLoading(false);
        }
      };
      fetchProduct();
    } else {
        setPageLoading(false);
    }
  }, [productId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
        setProduct(prev => ({ ...prev, price: { ...prev.price, value: parseFloat(value) || 0 } }));
    } else if (name === 'rating' || name === 'sales') {
        setProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
        setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode && productId) {
        await aliExpressService.updateProduct(productId, product);
      } else {
        await aliExpressService.addProduct(product);
      }
      navigate('/admin');
    } catch (error) {
      console.error("Failed to save product:", error);
      alert('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (pageLoading) {
      return <div>Loading form...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Product' : 'Create New Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Product Title" name="title" value={product.title} onChange={handleChange} required />
        <InputField label="Image URL" name="imageUrl" value={product.imageUrl} onChange={handleChange} required />
        <InputField label="Price (USD)" name="price" type="number" value={product.price.value} onChange={handleChange} required step="0.01" />
        <InputField label="Rating (0.0-5.0)" name="rating" type="number" value={product.rating} onChange={handleChange} required step="0.1" max="5" />
        <InputField label="Sales Count" name="sales" type="number" value={product.sales} onChange={handleChange} required step="1" />
        
        <div className="flex items-center space-x-4 pt-4">
          <button type="submit" disabled={loading} className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-green-300">
            {loading ? 'Saving...' : 'Save Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin')} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper component for form fields
const InputField = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input name={name} id={name} {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition" />
    </div>
);


export default ProductFormPage;
