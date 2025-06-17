"use client";

import { useState } from "react";
import { BsCloudArrowUp } from "react-icons/bs";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  id?: string;
}

export default function FileUpload({
  label,
  accept = "image/*",
  multiple = true,
  id = "file-input",
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
    // Handle file upload logic here
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log("Selected files:", files);
    // Handle file upload logic here
  };

  return (
    <div className="pt-8 pb-4 w-full">
      <div
        className={cn(
          "relative border-2 border-gray-200 rounded-lg p-6 text-center transition-colors cursor-pointer hover:border-gray-400",
          isDragOver && "border-blue-400 bg-blue-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(id)?.click()}
      >
        <input
          id={id}
          type="file"
          multiple={multiple}
          accept={accept}
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="flex items-center justify-center gap-2 text-gray-600">
          <span className="text-sm font-medium">{label}</span>
          <BsCloudArrowUp className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
