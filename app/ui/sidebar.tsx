'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home,PackageOpen,ChartNoAxesColumn,Plus } from 'lucide-react';


export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-full px-2 py-3 flex flex-col" style={{ height: "100dvh" }}>
      <div
        className="text-primary font-normal cursor-pointer mb-5 flex justify-center items-center text-black"
        onClick={() => router.push('/dashboard')}
      >
        Your Company
      </div>
      <div className="w-full rounded-md flex grow flex-col justify-between space-y-3">
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="flex h-10 hover:bg-neutral-300 items-center justify-start rounded-md p-3 text-black"
          >
            <Home size={18} className="mr-2 text-black" />
            <span className="font-normal">Home</span>
          </Link>
          <Link
            href="/products"
            className="flex h-10 hover:bg-neutral-300 items-center justify-start rounded-md p-3 text-black"
          >
            <PackageOpen  size={18} className="mr-2 text-black" />
            <span className="font-normal">Products</span>
          </Link>
          <Link
            href="/analytics"
            className="flex h-10 hover:bg-neutral-300 items-center justify-start rounded-md p-3 text-black"
          >
           <ChartNoAxesColumn size={18} className="mr-2 text-black" />
            <span className="font-normal">Analytics</span>
          </Link>
          <div className="pt-4">
            <Link
              href="/create-store"
              className="flex h-10 hover:bg-neutral-300 items-center justify-start rounded-md p-3 text-black"
            >
              <Plus size={18} className="mr-2 text-black" />
              <span className="font-normal">Create your first store</span>
            </Link>
          </div>
        </nav>
        <div className="flex grow"></div>
        
      </div>
    </div>
  );
}