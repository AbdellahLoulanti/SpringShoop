
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 truncate group-hover:text-red-500 transition-colors">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-gray-900 mt-1">${product.price.value.toFixed(2)}</p>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <div className="flex items-center">
            <StarIcon />
            <span className="ml-1">{product.rating}</span>
          </div>
          <span className="mx-2">|</span>
          <span>{product.sales.toLocaleString()} sold</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
