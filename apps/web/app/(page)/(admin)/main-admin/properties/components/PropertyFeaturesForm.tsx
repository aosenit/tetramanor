"use client";
import React, { useState } from "react";
import FileUpload from "./UploadFile";

interface TagInputGroupProps {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInputGroup({
  label,
  placeholder,
  value,
  onChange,
}: TagInputGroupProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap items-center gap-2 px-2 py-2 border-none rounded-md bg-[#e5e5e7] ">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm bg-white"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        ))}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder={placeholder}
          className="flex-1 resize-none bg-[#e5e5e7] py-2 border-none  outline-none text-sm min-w-[100px]"
        />
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500">Separate tags with commas</p>
    </div>
  );
}
