
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { aliExpressService } from '../services/aliExpressService';
import { useCart } from '../context/CartContext';
import AIAssistant from '../components/AIAssistant';
import type { ProductDetail } from '../types';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const data = await aliExpressService.getProductById(productId);
        setProduct(data);
        setActiveImage(0);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div className="text-center py-16">
      <h2 className="text-2xl font-semibold text-gray-700">Product Not Found</h2>
      <p className="text-gray-500 mt-2">The product you are looking for does not exist.</p>
    </div>;
  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="aspect-w-1 aspect-h-1 mb-4">
            <img src={product.images[activeImage]} alt={`${product.title} view ${activeImage + 1}`} className="w-full h-full object-contain rounded-lg" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setActiveImage(index)} className={`w-16 h-16 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-red-500' : 'border-transparent'}`}>
                <img src={img} alt={`thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.sales.toLocaleString()} sold</span>
          </div>
          
          <p className="text-4xl font-extrabold text-red-600 my-4">${product.price.value.toFixed(2)}</p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-800">Quantity</h3>
            <div className="flex items-center border rounded-md w-28 mt-2">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600">-</button>
              <span className="px-4 text-center flex-grow">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-gray-600">+</button>
            </div>
          </div>

          <div className="mt-6">
            <button onClick={handleAddToCart} className="w-full sm:w-auto bg-red-500 text-white px-12 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors text-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant productTitle={product.title} />
    </div>
  );
};

const ProductDetailSkeleton: React.FC = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div className="bg-gray-300 h-96 rounded-lg mb-4"></div>
                <div className="flex space-x-2">
                    <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                    <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                    <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                </div>
            </div>
            <div>
                <div className="h-8 bg-gray-300 rounded w-full mb-3"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3 mb-6"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
                <div className="h-12 bg-gray-300 rounded-lg w-48"></div>
            </div>
        </div>
    </div>
);


export default ProductDetailPage;
