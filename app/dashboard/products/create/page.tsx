"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/app/ui/image-upload";
import { supabaseClient } from "@/lib/db";

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
  //   try {
  //     // Fetch the blob
  //     const response = await fetch(blobUrl);
  //     const blob = await response.blob();

  //     // Convert blob to base64
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => resolve(reader.result as string);
  //       reader.onerror = reject;
  //       reader.readAsDataURL(blob);
  //     });
  //   } catch (error) {
  //     console.error("Error converting blob to base64:", error);
  //     return "";
  //   }
  // };
  const uploadImage = async (blobUrl: string): Promise<string> => {
    try {
      const responce = await fetch(blobUrl);
      const blob = await responce.blob();

      // Generate a unique filename
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}`;

      const { data, error } = await supabaseClient.storage
        .from("images")
        .upload(`product-image/${fileName}`, blob, {
          contentType: blob.type,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabaseClient.storage
        .from("images")
        .getPublicUrl(`product-image/${fileName}`);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageUrls = await Promise.all(
      images.map(async (blob) => await uploadImage(blob))
    );
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      tags: selectedTags,
      price: parseFloat(formData.get("price") as string),
      unit: formData.get("unit"),
      stock: parseInt(formData.get("stock") as string),
      images: imageUrls,
    };

    console.log(data);
    console.log(data.images[0]);
    try {
      const { data: productData, error } = await supabaseClient
        .from("products")
        .insert([
          {
            name: formData.get("name"),
            description: formData.get("description"),
            images: imageUrls,
            stock: parseInt(formData.get("stock") as string),
            price: parseInt(formData.get("price") as string),
            unit: formData.get("unit"),
          },
        ])
        .select();

      if (error) throw error;

      // Show success message and redirect after a delay
      setShowSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard/products";
      }, 2000);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mb-auto mt-auto h-auto min-h-fit p-6 bg-white rounded-3xl relative">
      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Product created successfully! Redirecting...</span>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
      >
        <div className="space-y-6 flex flex-col min-h-full">
          <div>
            <label className="block mb-2">Product Name</label>
            <Input name="name" required placeholder="Enter product name" />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <Textarea
              name="description"
              required
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-2">Tags</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "vegetables",
                "fruits",
                "meat",
                "dairy",
                "grains",
                "beverages",
                "snacks",
              ].map((tag) => (
                <div
                  key={tag}
                  className={`
                  relative flex items-center rounded-3xl border p-2 cursor-pointer
                  ${
                    selectedTags.includes(tag)
                      ? "border-primary bg-primary/10"
                      : "border-white hover:border-primary/50"
                  }
                `}
                  onClick={() => {
                    setSelectedTags((prev) =>
                      prev.includes(tag)
                        ? prev.filter((t) => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium capitalize">
                        {tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Click multiple tags to select them
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Price per Unit</label>
              <Input
                name="price"
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block mb-2">Unit</label>
              <Input
                name="unit"
                required
                placeholder="e.g., kg, piece, dozen"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Stock</label>
            <Input
              name="stock"
              type="number"
              required
              min="0"
              placeholder="Enter stock quantity"
            />
          </div>

          <div className="flex-grow"></div>
          <Button type="submit" className="w-full">
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
        <div className="space-y-6">
          <label className="block mb-2">Product Images (up to 7)</label>
          <ImageUpload
            value={images}
            onChange={(urls) => setImages(urls)}
            maxImages={7}
          />
        </div>
      </form>
    </div>
  );
}
