import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import anImage from "@/public/templetes/Screenshot (123).png";
import { supabaseClient } from "@/lib/db";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: (StaticImageData | string)[];
}

// Sample product data (replace with real data later)
const sampleProducts = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 99.99,
    description: "High-quality product description goes here...",
    stock: 10,
    images: [anImage],
  },
  {
    id: 2,
    name: "Sample Product 1",
    price: 99.99,
    description: "High-quality product description goes here...",
    stock: 10,
    images: [anImage],
  },
  {
    id: 3,
    name: "Sample Product 1",
    price: 99.99,
    description: "High-quality product description goes here...",
    stock: 0,
    images: [anImage],
  },
  // ... more products
];

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="hover:shadow-lg transition-shadow w-full max-w-[300px] h-[400px]">
      <CardContent className="px-4 h-full">
        <div className="relative w-full h-[150px] mb-4 aspect-[4/3]">
          <Image
            src={product.images[0] || anImage}
            alt={product.name}
            sizes="(max-width: 300px) 100vw"
            fill
            className="object-contain rounded-md"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <Badge
              variant="secondary"
              className={
                product.stock > 0
                  ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                  : "bg-red-500 hover:bg-red-600 cursor-pointer"
              }
            >
              {product.stock > 0 ? `In Stock` : "Out of Stock"}
            </Badge>
          </div>
          <p className="font-medium text-lg text-primary">FR {product.price}</p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link href={`/dashboard/products/${product.id}/edit`}>
          <Button variant="outline" size="sm" className="cursor-pointer">
            Edit
          </Button>
        </Link>
        <Button variant="default" size="sm" className="cursor-pointer">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function ProductsPage() {
  const { data: products, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products</div>;
  }

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6 w-full ">
        <div>
          <h1 className="text-2xl font-bold">Your Products</h1>
          <p className="text-gray-500 mt-1">
            Manage and organize your product catalog
          </p>
        </div>
        <Link href="/dashboard/products/create">
          <Button className="flex items-center gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create New Product
          </Button>
        </Link>
      </div>
      <div className="w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
