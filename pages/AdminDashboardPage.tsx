import React, { useState } from 'react';
import { mockProducts, mockCategories, aliExpressService } from '../services/aliExpressService';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types';

const AdminDashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const totalProducts = products.length;
  const totalCategories = mockCategories.length;
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await aliExpressService.deleteProduct(productId);
        setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Could not delete product.");
      }
    }
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-lg min-h-full">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
           <Link
              to="/admin/products/new"
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm"
            >
              Add Product
            </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Products" value={totalProducts.toLocaleString()} icon={<ProductIcon />} />
        <StatCard title="Total Categories" value={totalCategories.toLocaleString()} icon={<CategoryIcon />} />
        <StatCard title="Total Units Sold" value={totalSales.toLocaleString()} icon={<SalesIcon />} />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <h2 className="text-xl font-semibold p-4 border-b">All Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-semibold p-3">Product Name</th>
                <th className="text-right font-semibold p-3">Price</th>
                <th className="text-right font-semibold p-3">Sales</th>
                <th className="text-center font-semibold p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="p-3 flex items-center space-x-3">
                    <img src={product.imageUrl} alt={product.title} className="w-10 h-12 object-cover rounded-md hidden sm:block" />
                    <span className="font-medium text-gray-800">{product.title}</span>
                  </td>
                  <td className="p-3 text-right font-mono">${product.price.value.toFixed(2)}</td>
                  <td className="p-3 text-right">{product.sales.toLocaleString()}</td>
                  <td className="p-3 text-center space-x-2">
                     <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline text-xs font-semibold">View</Link>
                     <Link to={`/admin/products/edit/${product.id}`} className="text-green-600 hover:underline text-xs font-semibold">Edit</Link>
                     <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline text-xs font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper Components
interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm flex items-center space-x-4">
        <div className="bg-red-100 text-red-500 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const ProductIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const CategoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const SalesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;


export default AdminDashboardPage;
