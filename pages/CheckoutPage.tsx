import React, { useState, FormEvent, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

const CheckoutPage: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      navigate('/');
    }
  }, [cartItems, navigate, isProcessing]);

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call and order processing
    setTimeout(() => {
      const orderDetails = {
        orderId: `AS-${Date.now()}`,
        items: [...cartItems],
        subtotal: subtotal,
      };
      
      clearCart();
      navigate('/confirmation', { state: { order: orderDetails }, replace: true });
    }, 2000);
  };
  
  const shippingTotal = subtotal > 50 ? 0.00 : 5.99;
  const total = subtotal + shippingTotal;
  
  if (cartItems.length === 0) {
      return null; // Render nothing while redirecting
  }

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Forms Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Full Name" id="name" required />
                            <InputField label="Email Address" id="email" type="email" required />
                            <div className="sm:col-span-2">
                                <InputField label="Address" id="address" required />
                            </div>
                            <InputField label="City" id="city" required />
                            <InputField label="ZIP / Postal Code" id="zip" required />
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <p className="text-sm text-gray-500 mb-4">This is a mock checkout. Please do not enter real card details.</p>
                        <div className="space-y-4">
                            <InputField label="Card Number" id="cardNumber" placeholder="1234 5678 9101 1121" required />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Expiry Date" id="expiry" placeholder="MM/YY" required />
                                <InputField label="CVC" id="cvc" placeholder="123" required />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-28">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-3">Order Summary</h2>
                        <div className="space-y-3 my-4 max-h-64 overflow-y-auto pr-2">
                            {cartItems.map(item => <OrderItem key={item.product.id} item={item} />)}
                        </div>
                        <div className="border-t pt-4 space-y-2">
                            <SummaryLine label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                            <SummaryLine label="Shipping" value={shippingTotal === 0 ? 'Free' : `$${shippingTotal.toFixed(2)}`} />
                            <div className="flex justify-between font-bold text-lg pt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isProcessing && <SpinnerIcon />}
                            {isProcessing ? 'Processing...' : `Place Order`}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
};

// Helper components
const InputField = ({ id, label, type = 'text', required = false, placeholder = '' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} name={id} id={id} required={required} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition" />
    </div>
);

const OrderItem: React.FC<{ item: CartItem }> = ({ item }) => (
    <div className="flex items-center space-x-3">
        <img src={item.product.imageUrl} alt={item.product.title} className="w-12 h-14 object-cover rounded-md border" />
        <div className="flex-grow">
            <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.title}</p>
            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
        </div>
        <p className="text-sm font-semibold">${(item.product.price.value * item.quantity).toFixed(2)}</p>
    </div>
);

const SummaryLine = ({ label, value }) => (
    <div className="flex justify-between text-gray-600">
        <span>{label}</span>
        <span>{value}</span>
    </div>
);

const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export default CheckoutPage;
