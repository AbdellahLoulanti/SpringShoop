import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductFormPage from './pages/ProductFormPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen font-sans text-gray-800">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search/:query" element={<ProductListPage />} />
                <Route path="/category/:categoryId" element={<ProductListPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirmation" element={<OrderConfirmationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <Routes>
                        <Route path="/" element={<AdminDashboardPage />} />
                        <Route path="/products/new" element={<ProductFormPage />} />
                        <Route path="/products/edit/:productId" element={<ProductFormPage />} />
                      </Routes>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <CartDrawer />
            <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
              <div className="container mx-auto">
                <p>&copy; 2024 AlliShop. All rights reserved. Not affiliated with AliExpress.</p>
              </div>
            </footer>
          </div>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
