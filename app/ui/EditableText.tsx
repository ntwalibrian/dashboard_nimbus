"use client";

import { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  initialText: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "button";
  onTextChange?: (newText: string) => void;
  storageKey?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
}

export default function EditableText({
  initialText,
  className = "",
  tag = "p",
  onTextChange,
  storageKey,
  placeholder = "Click to edit...",
  multiline = false,
  rows = 3,
  disabled = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load text from local storage if storageKey is provided
  useEffect(() => {
    if (storageKey) {
      const savedText = localStorage.getItem(storageKey);
      if (savedText) {
        setText(savedText);
      } else {
        setText(initialText);
      }
    } else {
      setText(initialText);
    }
  }, [initialText, storageKey]);

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing) {
      const element = multiline ? textareaRef.current : inputRef.current;
      if (element) {
        element.focus();
        // Place cursor at the end of the text
        const length = element.value.length;
        element.setSelectionRange(length, length);
      }
    }
  }, [isEditing, multiline]);

  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const saveText = () => {
    setIsEditing(false);
    if (onTextChange) {
      onTextChange(text);
    }
    // Save to local storage if storageKey is provided
    if (storageKey) {
      localStorage.setItem(storageKey, text);
    }
  };

  const handleBlur = () => {
    saveText();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      saveText();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setText(initialText);
      setIsEditing(false);
    }
  };

  const Tag = tag;

  const commonInputProps = {
    value: text,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setText(e.target.value),
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    placeholder: placeholder,
    disabled: disabled,
    className: `bg-transparent outline-none border border-gray-300 rounded px-2 py-1 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ${className}`,
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        {...commonInputProps}
        rows={rows}
        ref={textareaRef}
        className={`${commonInputProps.className} resize-y`}
      />
    ) : (
      <input type="text" {...commonInputProps} ref={inputRef} />
    );
  }

  return (
    <Tag
      className={`cursor-text hover:bg-gray-50 rounded px-2 py-1 transition-colors ${
        disabled ? "cursor-not-allowed opacity-70" : ""
      } ${className}`}
      onClick={handleClick}
    >
      {text || placeholder}
    </Tag>
  );
}
