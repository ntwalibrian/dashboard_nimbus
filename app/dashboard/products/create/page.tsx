'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/app/ui/image-upload'
import * as RadioGroup from '@radix-ui/react-radio-group'

export default function CreateProduct() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      tags: selectedTags,
      price: parseFloat(formData.get('price') as string),
      unit: formData.get('unit'),
      images: images
    }

    try {
      // Add your API call here to save the product
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // })
      
      // Reset form or redirect after successful creation
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Product Name</label>
          <Input 
            name="name" 
            required 
            placeholder="Enter product name"
          />
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
              "snacks"
            ].map((tag) => (
              <div
                key={tag}
                className={`
                  relative flex items-center rounded-3xl border p-2 cursor-pointer
                  ${selectedTags.includes(tag) 
                    ? 'border-primary bg-primary/10' 
                    : 'border-white hover:border-primary/50'}
                `}
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  )
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
          <label className="block mb-2">Product Images (up to 7)</label>
          <ImageUpload 
            value={images} 
            onChange={(urls) => setImages(urls)}
            maxImages={7}
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </div>
  )
}
