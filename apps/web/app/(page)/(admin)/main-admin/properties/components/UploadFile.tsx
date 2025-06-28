"use client";

import { useState } from "react";
import { BsCloudArrowUp, BsX } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useUploadData } from "@/hooks/useApi";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
}

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  id?: string;
  onImagesChange?: (images: UploadedImage[]) => void;
  disabled?: boolean;
}

export default function FileUpload({
  label,
  accept = "image/*",
  multiple = true,
  id = "file-input",
  onImagesChange,
  disabled = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadImages } = useUploadData("upload/images");

  const handleFileUpload = async (files: File[]) => {
    if (disabled || isUploading) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await uploadImages(formData);

      if (response.success) {
        const newImages = [...uploadedImages, ...response.data];
        setUploadedImages(newImages);
        onImagesChange?.(newImages);
        toast.success("Images uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeImage = (imageId: string) => {
    const newImages = uploadedImages.filter((img) => img.id !== imageId);
    setUploadedImages(newImages);
    onImagesChange?.(newImages);
  };

  return (
    <div className="pt-8 pb-4 w-full">
      <div
        className={cn(
          "relative border-2 border-gray-200 rounded-lg p-6 text-center transition-colors cursor-pointer hover:border-gray-400",
          isDragOver && "border-blue-400 bg-blue-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById(id)?.click()}
      >
        <input
          id={id}
          type="file"
          multiple={multiple}
          accept={accept}
          className="hidden"
          onChange={handleFileSelect}
          disabled={disabled}
        />

        <div className="flex items-center justify-center gap-2 text-gray-600">
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">{label}</span>
              <BsCloudArrowUp className="w-5 h-5" />
            </>
          )}
        </div>
      </div>

      {/* Display uploaded images */}
      {uploadedImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative group">
              <Image
                src={image.imageUrl}
                alt={image.name}
                width={100}
                height={100}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={disabled}
              >
                <BsX className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
