"use client";

import {
  motion,
  useMotionValue,
  useDragControls,
} from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface DraggableResizableProps {
  children: ReactNode;
  className?: string;
  gridSize?: number;
  minWidth?: number;
  minHeight?: number;
  initialWidth?: number;
  initialHeight?: number;
}

export default function DraggableResizable({
  children,
  className = "",
  gridSize = 20,
  minWidth = 100,
  minHeight = 100,
  initialWidth = 200,
  initialHeight = 200,
}: DraggableResizableProps) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  // Refs to track initial values during resize
  const initialX = useRef(0);
  const initialY = useRef(0);
  const initialWidthRef = useRef(initialWidth);
  const initialHeightRef = useRef(initialHeight);
  const initialMouseX = useRef(0);
  const initialMouseY = useRef(0);

  // Snap to grid function
  const snapToGrid = (value: number) => Math.round(value / gridSize) * gridSize;

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    x.set(snapToGrid(x.get()));
    y.set(snapToGrid(y.get()));
  };

  // Handle resize start
  const startResize = (clientX: number, clientY: number) => {
    initialMouseX.current = clientX;
    initialMouseY.current = clientY;
    initialX.current = x.get();
    initialY.current = y.get();
    initialWidthRef.current = width;
    initialHeightRef.current = height;
    setIsResizing(true);
  };

  // Handle resize
  const handleResize = (event: MouseEvent, direction: string) => {
    if (!isResizing) return;

    const deltaX = event.clientX - initialMouseX.current;
    const deltaY = event.clientY - initialMouseY.current;

    let newWidth = initialWidthRef.current;
    let newHeight = initialHeightRef.current;
    let newX = initialX.current;
    let newY = initialY.current;

    switch (direction) {
      case "e":
        newWidth += deltaX;
        break;
      case "w":
        newWidth -= deltaX;
        newX += deltaX;
        break;
      case "s":
        newHeight += deltaY;
        break;
      case "n":
        newHeight -= deltaY;
        newY += deltaY;
        break;
      case "se":
        newWidth += deltaX;
        newHeight += deltaY;
        break;
      case "sw":
        newWidth -= deltaX;
        newX += deltaX;
        newHeight += deltaY;
        break;
      case "ne":
        newWidth += deltaX;
        newHeight -= deltaY;
        newY += deltaY;
        break;
      case "nw":
        newWidth -= deltaX;
        newX += deltaX;
        newHeight -= deltaY;
        newY += deltaY;
        break;
    }

    // Apply grid snapping
    newWidth = snapToGrid(newWidth);
    newHeight = snapToGrid(newHeight);
    newX = snapToGrid(newX);
    newY = snapToGrid(newY);

    // Ensure minimum dimensions
    newWidth = Math.max(minWidth, newWidth);
    newHeight = Math.max(minHeight, newHeight);

    setWidth(newWidth);
    setHeight(newHeight);
    x.set(newX);
    y.set(newY);
  };

  // Resize handle component
  const ResizeHandle = ({
    direction,
    position,
  }: {
    direction: string;
    position: string;
  }) => (
    <motion.div
      className={`absolute w-4 h-4 cursor-${direction}-resize bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity`}
      style={{
        ...(position === "top" && { top: -8, left: "50%", transform: "translateX(-50%)" }),
        ...(position === "right" && { right: -8, top: "50%", transform: "translateY(-50%)" }),
        ...(position === "bottom" && { bottom: -8, left: "50%", transform: "translateX(-50%)" }),
        ...(position === "left" && { left: -8, top: "50%", transform: "translateY(-50%)" }),
        ...(position === "top-left" && { top: -8, left: -8 }),
        ...(position === "top-right" && { top: -8, right: -8 }),
        ...(position === "bottom-right" && { bottom: -8, right: -8 }),
        ...(position === "bottom-left" && { bottom: -8, left: -8 }),
      }}
      onPointerDown={(event) => {
        event.preventDefault();
        startResize(event.clientX, event.clientY);
      }}
      onPointerUp={() => setIsResizing(false)}
      onPointerMove={(event) => {
        if (isResizing) {
          event.preventDefault();
          handleResize(event.nativeEvent, direction);
        }
      }}
    />
  );

  return (
    <motion.div
      ref={constraintsRef}
      className={`relative ${className}`}
      style={{ width, height, x, y }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02 }}
    >
      {children}

      {/* Resize handles */}
      <ResizeHandle direction="n" position="top" />
      <ResizeHandle direction="e" position="right" />
      <ResizeHandle direction="s" position="bottom" />
      <ResizeHandle direction="w" position="left" />
      <ResizeHandle direction="nw" position="top-left" />
      <ResizeHandle direction="ne" position="top-right" />
      <ResizeHandle direction="se" position="bottom-right" />
      <ResizeHandle direction="sw" position="bottom-left" />
    </motion.div>
  );
}