import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image, {StaticImageData} from "next/image";
import anImage from "@/public/templetes/Screenshot (123).png"

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  image: StaticImageData | string;
}

// Sample product data (replace with real data later)
const sampleProducts = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 99.99,
    description: "High-quality product description goes here...",
    status: "In Stock",
    image: anImage,
  },
  {
    id: 2,
    name: "Sample Product 1",
    price: 99.99,
    description: "High-quality product description goes here...",
    status: "In Stock",
    image: anImage,
  },
  {
    id: 3,
    name: "Sample Product 1",
    price: 99.99,
    description: "High-quality product description goes here...",
    status: "In Stock",
    image: anImage,
  },
  // ... more products
];

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="px-4">
        <div className="relative w-full h-30 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <Badge variant="secondary">{product.status}</Badge>
          </div>
          <p className="font-medium text-lg text-primary">${product.price}</p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="cursor-pointer">
          Edit
        </Button>
        <Button variant="default" size="sm" className="cursor-pointer">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ProductsPage() {
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
      <div className="flex w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
