import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);


const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { toggleCart, cartCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500">
          AlliShop
        </Link>
        
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for clothes, accessories..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                <SearchIcon />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Link to="/admin" className="text-gray-600 hover:text-red-500 transition-colors flex items-center space-x-2 text-sm font-medium">
              <UserIcon />
              <span className="truncate max-w-28">{user?.email}</span>
            </Link>
          ) : (
             <Link to="/login" className="text-gray-600 hover:text-red-500 transition-colors flex items-center space-x-1 text-sm font-medium">
              <UserIcon />
              <span>Login</span>
            </Link>
          )}

          <button onClick={toggleCart} className="relative text-gray-600 hover:text-red-500 transition-colors">
            <ShoppingBagIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
       <div className="md:hidden px-4 pb-3">
           <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                <SearchIcon />
            </button>
          </form>
       </div>
    </header>
  );
};

export default Header;
