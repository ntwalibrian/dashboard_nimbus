"use client";

import { Product } from "./index";
import Layout from "./components/Layout";
import EditableText from "../../app/ui/EditableText";

type HomeProps = {
  navigate: (page: "home" | "store" | "cart") => void;
  featuredProduct: Product;
};

export default function Home({ navigate, featuredProduct }: HomeProps) {
  return (
    <Layout navigate={navigate} currentPage="home">
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <EditableText
                initialText="Discover Our Collection"
                tag="h1"
                className="text-4xl md:text-5xl font-bold mb-4"
              />
              <EditableText
                initialText="Explore our curated selection of minimalist products."
                tag="p"
                className="text-gray-600 mb-8 max-w-md"
              />
              <EditableText
                initialText="Shop Now"
                tag="button"
                className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
              />
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 shadow-lg max-w-sm">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-64 object-cover mb-4"
                />
                <EditableText
                  initialText={featuredProduct.name}
                  tag="h3"
                  className="text-xl font-semibold"
                />
                <EditableText
                  initialText={`$${featuredProduct.price.toFixed(2)}`}
                  tag="p"
                  className="text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
