"use client";
import { useContext, useState } from "react";
import { CartContext } from "./index";
import Layout from "./components/Layout";

type CartCheckoutProps = {
  navigate: (page: "home" | "store" | "cart") => void;
};

export default function CartCheckout({ navigate }: CartCheckoutProps) {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Calculate cart totals
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
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
    <Layout navigate={navigate} currentPage="cart">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {checkoutComplete ? (
            <div className="bg-white p-8 text-center rounded-lg">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully.
              </p>
              <button
                onClick={() => {
                  navigate("store");
                  setCheckoutComplete(false);
                  setIsCheckingOut(false);
                }}
                className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-lg">
              <h2 className="text-xl mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Add some products to your cart to continue.
              </p>
              <button
                onClick={() => navigate("store")}
                className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white p-4 rounded-lg flex items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6">
                      <p className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
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

              <div className="bg-white p-6 rounded-lg h-fit">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 text-white mt-6 transition ${
                    isCheckingOut ? "bg-gray-500" : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
