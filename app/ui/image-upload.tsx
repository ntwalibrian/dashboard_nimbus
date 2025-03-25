import React, { useState } from 'react';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, maxImages }) => {
  const [images, setImages] = useState<string[]>(value);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(Array.from(event.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = imageFiles.map(file => URL.createObjectURL(file));
    const updatedImages = [...images, ...newImages].slice(0, maxImages);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <label 
          className={`flex flex-col items-center justify-center w-full h-34 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : ''}
            ${images.length >= maxImages ? 'bg-gray-100 border-gray-300' : 'border-gray-400 hover:bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-2 pb-2">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. {maxImages} images)</p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={images.length >= maxImages}
            className="hidden"
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group h-20 w-20 bg-gray-100 rounded-lg overflow-hidden"
            >
              <img 
                src={image} 
                alt={`Uploaded ${index}`} 
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};