
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aliExpressService } from '../services/aliExpressService';
import type { Category } from '../types';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await aliExpressService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to AlliShop</h1>
        <p className="text-lg text-gray-600 mt-2">Explore millions of products with an elegant interface.</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
        {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({length: 8}).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => (
                <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex items-center justify-center p-4 bg-white text-center rounded-lg shadow-md hover:shadow-lg hover:text-red-500 font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                {category.name}
                </Link>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
