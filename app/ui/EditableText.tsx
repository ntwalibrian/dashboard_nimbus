"use client";

import { useState, useEffect } from "react";

interface EditableTextProps {
  initialText: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "button";
  onTextChange?: (newText: string) => void;
}

export default function EditableText({
  initialText,
  className = "",
  tag = "p",
  onTextChange,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onTextChange) {
      onTextChange(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (onTextChange) {
        onTextChange(text);
      }
    }
  };

  const Tag = tag;

  return isEditing ? (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`bg-transparent outline-none border-b border-black px-1 w-full ${className}`}
      autoFocus
    />
  ) : (
    <Tag
      className={`cursor-text ${className}`}
      onDoubleClick={handleDoubleClick}
    >
      {text}
    </Tag>
  );
}
