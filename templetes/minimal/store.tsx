import { useContext, useState } from 'react';
import { Product, CartContext } from './index';

type StoreProps = {
  navigate: (page: 'home' | 'store' | 'cart') => void;
  products: Product[];
};

export default function Store({ navigate, products }: StoreProps) {
  const { cart, addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

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
              className="font-medium border-b-2 border-white"
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

      {/* Store Content */}
      <div className="bg-gray-100 py-12 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white shadow-md">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mb-3">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="text-xl font-semibold mb-4">${selectedProduct.price.toFixed(2)}</p>
            <button 
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
              className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

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