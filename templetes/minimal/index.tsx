"use client"
import { useState } from 'react';
import { createContext } from 'react';
import Home from './home';
import Store from './store';
import CartCheckout from './cartCheckout';

// Define product type
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

// Define cart item type
export type CartItem = {
  product: Product;
  quantity: number;
};

// Create cart context
export const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Watch",
    price: 99.99,
    image: "/api/placeholder/300/300",
    description: "A sleek, minimalist watch with a leather strap."
  },
  {
    id: 2,
    name: "Black T-Shirt",
    price: 29.99,
    image: "/api/placeholder/300/300",
    description: "Premium cotton black t-shirt, perfect for any occasion."
  },
  {
    id: 3,
    name: "Grey Sneakers",
    price: 79.99,
    image: "/api/placeholder/300/300",
    description: "Comfortable grey sneakers with white soles."
  },
  {
    id: 4,
    name: "White Ceramic Mug",
    price: 19.99,
    image: "/api/placeholder/300/300",
    description: "Elegant white ceramic mug for your morning coffee."
  }
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState<'home' | 'store' | 'cart'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Navigation function
  const navigate = (page: 'home' | 'store' | 'cart') => {
    setCurrentPage(page);
  };

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} featuredProduct={products[0]} />;
      case 'store':
        return <Store navigate={navigate} products={products} />;
      case 'cart':
        return <CartCheckout navigate={navigate} />;
      default:
        return <Home navigate={navigate} featuredProduct={products[0]} />;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      <div className="min-h-screen bg-white">
        {renderPage()}
      </div>
    </CartContext.Provider>
  );
}