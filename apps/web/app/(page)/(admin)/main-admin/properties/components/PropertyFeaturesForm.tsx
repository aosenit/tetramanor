"use client";
import React, { useState } from "react";
import FileUpload from "./UploadFile";

interface TagInputGroupProps {
  label: string;
  placeholder?: string;
}

export default function TagInputGroup({
  label,
  placeholder,
}: TagInputGroupProps) {
  const [confirmedTags, setConfirmedTags] = useState<string[]>([]);
  const [inputTags, setInputTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!inputTags.includes(newTag) && !confirmedTags.includes(newTag)) {
        setInputTags([...inputTags, newTag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tag: string, fromConfirmed = false) => {
    if (fromConfirmed) {
      setConfirmedTags(confirmedTags.filter((t) => t !== tag));
    } else {
      setInputTags(inputTags.filter((t) => t !== tag));
    }
  };

  const confirmTags = () => {
    const newConfirmed = inputTags.filter(
      (tag) => !confirmedTags.includes(tag)
    );
    setConfirmedTags([...confirmedTags, ...newConfirmed]);
    setInputTags([]);
  };

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        onBlur={confirmTags}
        className="flex flex-wrap items-center gap-2 px-2 py-2 border-none rounded-md bg-[#e5e5e7] "
      >
        {inputTags.map((tag) => (
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
          className="flex-1 resize-none bg-[#e5e5e7] py-2 border-none  outline-none text-sm min-w-[100px]"
        />
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500">Separate tags with commas</p>

      {/* Confirmed tags */}
      <div className="flex flex-wrap gap-2 mt-1">
        {confirmedTags.map((tag) => (
          <span
            key={tag}
            className="flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm bg-white"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag, true)}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        ))}
          </div>
    </div>
  );
}
