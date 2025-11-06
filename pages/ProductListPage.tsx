
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { aliExpressService } from '../services/aliExpressService';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import type { Product } from '../types';

const ProductListPage: React.FC = () => {
  const { query, categoryId } = useParams<{ query?: string; categoryId?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data: Product[];
        if (query) {
          data = await aliExpressService.searchProducts(query);
        } else if (categoryId) {
          data = await aliExpressService.getProductsByCategory(categoryId);
        } else {
            data = [];
        }
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query, categoryId]);

  const pageTitle = query ? `Results for "${query}"` : `Products in ${categoryId}`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No Products Found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search or category selection.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
