import { useContext } from 'react';
import { Product, CartContext } from './index';

type HomeProps = {
  navigate: (page: 'home' | 'store' | 'cart') => void;
  featuredProduct: Product;
};

export default function Home({ navigate, featuredProduct }: HomeProps) {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">MINIMALIST</div>
          <div className="flex space-x-6">
            <button 
              onClick={() => navigate('home')}
              className="font-medium border-b-2 border-white"
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
              className="font-medium hover:border-b-2 hover:border-white relative"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-100 py-16 flex-grow">
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Our Collection</h1>
              <p className="text-gray-600 mb-8 max-w-md">
                Explore our curated selection of minimalist products designed for modern living.
              </p>
              <button 
                onClick={() => navigate('store')}
                className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition duration-300"
              >
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 shadow-lg max-w-sm">
                <img 
                  src={featuredProduct.image} 
                  alt={featuredProduct.name}
                  className="w-full h-64 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{featuredProduct.name}</h3>
                <p className="text-gray-500 mb-2">${featuredProduct.price.toFixed(2)}</p>
                <p className="text-gray-600 mb-4">{featuredProduct.description}</p>
                <p className="text-sm text-gray-500 mb-4">Featured Product</p>
              </div>
            </div>
          </div>
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