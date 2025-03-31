"use client"
import { useContext, useState } from 'react';
import { CartContext } from './index';

type CartCheckoutProps = {
  navigate: (page: 'home' | 'store' | 'cart') => void;
};

export default function CartCheckout({ navigate }: CartCheckoutProps) {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  
  // Calculate cart totals
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  // Handle checkout process
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setCheckoutComplete(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('home')}>MINIMALIST</div>
          <div className="flex space-x-6">
            <button 
              onClick={() => navigate('home')}
              className="font-medium hover:border-b-2 hover:border-white"
            >
              Home
            </button>
            <button 
              onClick={() => navigate('store')}
              className="font-medium hover:border-b-2 hover:border-white"
            >
              Store
            </button>
            <button 
              onClick={() => navigate('cart')}
              className="font-medium border-b-2 border-white"
            >
              Cart
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="bg-gray-100 py-12 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {checkoutComplete ? (
            <div className="bg-white p-8 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
              <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
              <button 
                onClick={() => {
                  navigate('store');
                  setCheckoutComplete(false);
                  setIsCheckingOut(false);
                }}
                className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="bg-white p-8 text-center">
              <h2 className="text-xl mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to your cart to continue.</p>
              <button 
                onClick={() => navigate('store')}
                className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition duration-300"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {cart.map(item => (
                  <div key={item.product.id} className="bg-white mb-4 p-4 flex items-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="bg-gray-200 px-3 py-1"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="bg-gray-200 px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6">
                      <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-4 text-gray-400 hover:text-black"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="bg-white p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="mb-4 flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="mb-4 flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="mb-6 pt-4 border-t border-gray-200 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 text-white font-medium ${isCheckingOut ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'} transition duration-300`}
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">© 2025 MINIMALIST. All rights reserved.</div>
            <div className="flex space-x-4">
              <span className="text-sm">Privacy Policy</span>
              <span className="text-sm">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}