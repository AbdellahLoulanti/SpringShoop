import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';

const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 id="cart-heading" className="text-xl font-semibold">Shopping Cart</h2>
            <button onClick={toggleCart} className="text-gray-500 hover:text-gray-800" aria-label="Close cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.map(item => (
                <CartDrawerItem key={item.product.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-4 border-t space-y-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={toggleCart}
                className="w-full block text-center bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};


interface CartDrawerItemProps {
    item: CartItem;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
}

const CartDrawerItem: React.FC<CartDrawerItemProps> = ({ item, updateQuantity, removeFromCart }) => {
    return (
        <div className="flex items-start space-x-4">
            <img src={item.product.imageUrl} alt={item.product.title} className="w-20 h-24 object-cover rounded-md border" />
            <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{item.product.title}</h3>
                <p className="text-gray-600 text-sm">${item.product.price.value.toFixed(2)}</p>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-gray-600" aria-label="Decrease quantity">-</button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-gray-600" aria-label="Increase quantity">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-xs text-red-500 hover:underline">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};


export default CartDrawer;