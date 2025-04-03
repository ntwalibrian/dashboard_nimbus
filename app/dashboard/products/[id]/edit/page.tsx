import { fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [product] = await Promise.all([fetchProductById(id)]);
  if (!product) {
    notFound();
  }
  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Edit Product
        </h1>

        <form action="/api/products/update" method="POST" className="space-y-6">
          <input type="hidden" name="id" value={product.id} />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.name}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                transition duration-150 ease-in-out p-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={product.description}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                transition duration-150 ease-in-out p-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={product.price}
                step="0.01"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                  transition duration-150 ease-in-out p-2.5 pl-8"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={product.images[0]}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                transition duration-150 ease-in-out p-2.5"
            />
          </div>

          <div className="flex items-center justify-end pt-4 border-t mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 transform transition-all duration-150 ease-in-out
                shadow-md hover:shadow-lg"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
