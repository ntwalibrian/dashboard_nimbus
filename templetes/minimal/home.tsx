"use client";

import { Product } from "./index";
import Layout from "./components/Layout";
import EditableText from "../../app/ui/EditableText";
import DraggableResizable from "../../app/ui/DraggableResizable";

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
              <DraggableResizable
                initialWidth={400}
                initialHeight={80}
                gridSize={20}
                className="mb-4"
              >
                <EditableText
                  initialText="Discover Our Collection"
                  storageKey="my-editable-text"
                  tag="h1"
                  className="text-4xl md:text-5xl font-bold"
                />
              </DraggableResizable>

              <DraggableResizable
                initialWidth={400}
                initialHeight={60}
                gridSize={20}
                className="mb-8"
              >
                <EditableText
                  initialText="Explore our curated selection of minimalist products."
                  tag="p"
                  className="text-gray-600 max-w-md"
                />
              </DraggableResizable>

              <DraggableResizable
                initialWidth={120}
                initialHeight={48}
                gridSize={20}
              >
                <EditableText
                  initialText="Shop Now"
                  tag="button"
                  className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition w-full h-full flex items-center justify-center"
                />
              </DraggableResizable>
            </div>

            <DraggableResizable
              initialWidth={400}
              initialHeight={500}
              gridSize={20}
              className="md:w-1/2"
            >
              <div className="bg-white p-6 shadow-lg h-full">
                <DraggableResizable
                  initialWidth={300}
                  initialHeight={256}
                  gridSize={20}
                  className="mb-4"
                >
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover"
                  />
                </DraggableResizable>

                <DraggableResizable
                  initialWidth={300}
                  initialHeight={40}
                  gridSize={20}
                  className="mb-2"
                >
                  <EditableText
                    initialText={featuredProduct.name}
                    tag="h3"
                    className="text-xl font-semibold"
                  />
                </DraggableResizable>

                <DraggableResizable
                  initialWidth={300}
                  initialHeight={30}
                  gridSize={20}
                >
                  <EditableText
                    initialText={`$${featuredProduct.price.toFixed(2)}`}
                    tag="p"
                    className="text-gray-500"
                  />
                </DraggableResizable>
              </div>
            </DraggableResizable>
          </div>
        </div>
      </div>
    </Layout>
  );
}
