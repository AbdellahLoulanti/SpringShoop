import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Redirect to home if there's no order data in state (e.g., direct navigation)
  useEffect(() => {
    if (!order) {
      navigate('/', { replace: true });
    }
  }, [order, navigate]);

  if (!order) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">Thank You For Your Order!</h1>
            <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
            <p className="text-sm text-gray-500 mt-4">Order ID: <span className="font-mono bg-gray-100 p-1 rounded">{order.orderId}</span></p>

            <div className="text-left mt-8 border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                    {order.items.map((item: CartItem) => (
                        <div key={item.product.id} className="flex items-center space-x-4">
                             <img src={item.product.imageUrl} alt={item.product.title} className="w-16 h-20 object-cover rounded-md border" />
                             <div className="flex-grow">
                                 <p className="font-medium text-gray-800">{item.product.title}</p>
                                 <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                             </div>
                             <p className="font-semibold">${(item.product.price.value * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between font-bold text-xl mt-6 border-t pt-4">
                    <span>Total</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                </div>
            </div>

            <Link to="/" className="inline-block mt-8 bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                Continue Shopping
            </Link>
        </div>
    </div>
  );
};

export default OrderConfirmationPage;
