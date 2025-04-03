"use client";

import { useContext, useState } from "react";
import { Product, CartContext } from "./index";
import Layout from "./components/Layout";

type StoreProps = {
  navigate: (page: "home" | "store" | "cart") => void;
  products: Product[];
};

export default function Store({ navigate, products }: StoreProps) {
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Layout navigate={navigate} currentPage="store">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mb-3">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white py-2 hover:bg-gray-800 transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full p-6 relative rounded-lg">
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
            <p className="text-xl font-semibold mb-4">
              ${selectedProduct.price.toFixed(2)}
            </p>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
              className="w-full bg-black text-white py-2 hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
