import { fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";

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

        <form action="#" method="POST" className="space-y-6">
          <Input type="hidden" name="id" value={product.id} />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <Input
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
              <Input
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Price per Unit</label>
              <Input
                name="price"
                type="number"
                min="0"
                defaultValue={product.price}
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block mb-2">Unit</label>
              <Input name="unit" placeholder="e.g., kg, piece, dozen" />
            </div>
          </div>

          <div className="space-y-4">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Images
            </label>

            {/* Large Image Preview */}
            <div className="w-full aspect-video relative rounded-lg overflow-hidden border border-gray-200">
              {product.images[0] && (
                <img
                  src={product.images[0]}
                  alt="Main preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Thumbnail Preview Section */}
            <div className="flex gap-2 flex-wrap">
              {product.images.map((image: string, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg cursor-pointer border border-gray-200 hover:border-blue-500"
                  />
                  <button
                    type="button"
                    // onClick={() => {
                    //   /* Handle delete */
                    // }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 
                             hidden group-hover:block hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Add New Image Input */}
              <div
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg 
                          flex items-center justify-center cursor-pointer hover:border-blue-500"
              >
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="add-image"
                />
                <label htmlFor="add-image" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-4 border-t mt-8">
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
