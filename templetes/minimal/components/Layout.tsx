"use client";

import { useContext } from "react";
import { CartContext } from "../index";

type LayoutProps = {
  children: React.ReactNode;
  navigate: (page: "home" | "store" | "cart") => void;
  currentPage: "home" | "store" | "cart";
};

export default function Layout({
  children,
  navigate,
  currentPage,
}: LayoutProps) {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-black text-white p-4 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("home")}
          >
            MINIMALIST
          </div>
          <div className="flex space-x-6">
            {["home", "store", "cart"].map((page) => (
              <button
                key={page}
                onClick={() => navigate(page as "home" | "store" | "cart")}
                className={`font-medium hover:text-gray-300 transition-colors ${
                  currentPage === page ? "border-b-2 border-white" : ""
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
                {page === "cart" && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">© 2025 MINIMALIST</div>
            <div className="flex space-x-4">
              <span className="text-sm hover:text-gray-300 cursor-pointer">
                Privacy
              </span>
              <span className="text-sm hover:text-gray-300 cursor-pointer">
                Terms
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
