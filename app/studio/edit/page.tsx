"use client";

import React, { useState, useEffect, useRef } from "react";
import Index from "@/templetes/minimal";
import { motion, useMotionValue } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export default function Page() {
  const [zoom, setZoom] = useState(0.7); // Start with 60% zoom
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for tracking position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Initial centering with a short delay to ensure DOM is fully rendered
  useEffect(() => {
    // Initial delay for first render
    const initialTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(initialTimer);
  }, []);

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2)); // Max zoom 2x
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.3)); // Min zoom 0.3x
  };

  const handleResetView = () => {
    setZoom(0.7); // Reset to 70%
  };

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden relative">
      {/* Canvas Info - Near Left Sidebar */}
      <div className="absolute top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-3 text-sm text-gray-600">
        Drag to move • Use controls to zoom
      </div>

      {/* Zoom Controls - Near Right Sidebar */}
      <div className="absolute top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-black text-white rounded hover:bg-gray-800 flex items-center justify-center"
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-black text-white rounded hover:bg-gray-800 flex items-center justify-center"
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={handleResetView}
          className="w-8 h-8 bg-black text-white rounded hover:bg-gray-800 flex items-center justify-center"
          title="Reset View"
        >
          <Maximize2 size={18} />
        </button>
        <div className="text-sm text-gray-600 min-w-[40px] text-center">
          {Math.round(zoom * 100) + 30}%
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden bg-gray-200 relative"
      >
        {/* Fixed positioning wrapper */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Canvas Guidelines */}
          <div className="border-2 border-dashed border-gray-400 rounded-lg">
            {/* Draggable Template Container */}
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0}
              style={{
                x,
                y,
                scale: zoom,
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              className="bg-white rounded-lg shadow-2xl origin-center"
            >
              {/* Template Viewport */}
              <div className="w-[1200px] overflow-hidden">
                <div className="min-h-screen flex flex-col">
                  <Index />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
