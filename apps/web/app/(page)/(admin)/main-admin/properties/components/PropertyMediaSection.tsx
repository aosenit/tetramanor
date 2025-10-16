import { Skeleton } from "@/components/ui/skeleton";
import { Upload, X } from "lucide-react";
import React from "react";
import {
  UPLOAD_LIMITS,
  ACCEPTED_FILE_TYPES,
  getFileSizeLabel,
  validateFiles,
} from "@/lib/upload-config";
import { toast } from "sonner";

// Copy type definitions from AddProperties
export interface UploadedImage {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
}

export interface UploadedDocument {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  docType: string;
}

type PropertyMediaSectionProps = {
  uploadedImages: UploadedImage[];
  uploadedBanner: UploadedImage | null;
  uploadedDocument: UploadedDocument | null;
  isUploadingImages: boolean;
  isUploadingDocument: boolean;
  handleImageUpload: (files: FileList | null) => void;
  handleDocumentUpload: (files: FileList | null) => void;
  handleBannerUpload: (files: FileList | null) => void;
  removeImage: (id: string) => void;
  removeBanner: (id: string) => void;
  removeDocument: () => void;
  isDeletingImage: boolean;
};

export default function PropertyMediaSection({
  uploadedImages,
  uploadedBanner,
  uploadedDocument,
  isUploadingImages,
  isUploadingDocument,
  handleImageUpload,
  handleDocumentUpload,
  handleBannerUpload,
  removeImage,
  removeBanner,
  removeDocument,
  isDeletingImage,
}: PropertyMediaSectionProps) {
  // Validation wrapper for image upload
  const handleImageUploadWithValidation = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validation = validateFiles(
      files,
      UPLOAD_LIMITS.IMAGE_MAX_SIZE,
      ACCEPTED_FILE_TYPES.ALL_IMAGES
    );

    if (!validation.valid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    handleImageUpload(files);
  };

  // Validation wrapper for document upload
  const handleDocumentUploadWithValidation = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validation = validateFiles(
      files,
      UPLOAD_LIMITS.DOCUMENT_MAX_SIZE,
      ACCEPTED_FILE_TYPES.DOCUMENTS
    );

    if (!validation.valid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    handleDocumentUpload(files);
  };

  // Validation wrapper for banner upload
  const handleBannerUploadWithValidation = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validation = validateFiles(
      files,
      UPLOAD_LIMITS.IMAGE_MAX_SIZE,
      ACCEPTED_FILE_TYPES.ALL_IMAGES
    );

    if (!validation.valid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    handleBannerUpload(files);
  };

  return (
    <div className="mt-8">
      <h3 className="text-base font-medium text-[#116114] mb-4">
        Property Media
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Property Images Upload */}
        <div>
          <label
            htmlFor="image-upload"
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-6 py-4 flex flex-col items-center justify-center text-center transition hover:shadow-md"
          >
            <span className="font-medium text-[#323539] mb-2 flex items-center justify-center gap-2">
              Upload property Images
              <Upload className="w-6 h-6 text-gray-400" />
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Max {getFileSizeLabel(UPLOAD_LIMITS.IMAGE_MAX_SIZE)} • JPEG, PNG,
              WebP
            </span>
            <input
              type="file"
              multiple
              accept={ACCEPTED_FILE_TYPES.ALL_IMAGES}
              onChange={(e) => handleImageUploadWithValidation(e.target.files)}
              className="hidden"
              id="image-upload"
              disabled={isUploadingImages}
            />
          </label>
          {/* Uploaded Images Thumbnails */}
          {uploadedImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {uploadedImages.map((image, index) => (
                <div key={image.id} className="relative group w-16 h-16">
                  {isDeletingImage ? (
                    <div className="absolute top-1 right-1">
                      <Skeleton className="w-14 h-16 " />
                    </div>
                  ) : (
                    <img
                      src={image.imageUrl}
                      alt={image.name}
                      className="w-full h-full object-cover rounded-md border"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-1 right-1 bg-white/80 text-red-500 rounded-full p-1 hover:bg-red-100 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-1 left-1 bg-[#116114] text-white text-[10px] px-1 py-0.5 rounded">
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Property Brochure Upload */}
        <div>
          <label
            htmlFor="document-upload"
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-6 py-4 flex flex-col items-center justify-center text-center transition hover:shadow-md"
          >
            <span className="font-medium text-[#323539] mb-2 flex items-center justify-center gap-2">
              Upload property brochure
              <Upload className="w-6 h-6 text-gray-400" />
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Max {getFileSizeLabel(UPLOAD_LIMITS.DOCUMENT_MAX_SIZE)} • PDF,
              DOC, DOCX
            </span>
            <input
              type="file"
              accept={ACCEPTED_FILE_TYPES.DOCUMENTS}
              onChange={(e) =>
                handleDocumentUploadWithValidation(e.target.files)
              }
              className="hidden"
              id="document-upload"
              disabled={isUploadingDocument}
            />
          </label>
          {/* Uploaded Document */}
          {uploadedDocument?.imageUrl && (
            <div className="flex items-center gap-2 mt-4">
              <a
                href={uploadedDocument.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:text-green-900 underline flex items-center gap-1"
              >
                {uploadedDocument.name}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                  />
                </svg>
              </a>
              <button
                type="button"
                onClick={removeDocument}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {/* Property Banner Upload */}
        <div>
          <label
            htmlFor="banner-upload"
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-6 py-4 flex flex-col items-center justify-center text-center transition hover:shadow-md"
          >
            <span className="font-medium text-[#323539] mb-2 flex items-center justify-center gap-2">
              Upload property banner
              <Upload className="w-6 h-6 text-gray-400" />
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Max {getFileSizeLabel(UPLOAD_LIMITS.IMAGE_MAX_SIZE)} • JPEG, PNG,
              WebP
            </span>
            <input
              type="file"
              accept={ACCEPTED_FILE_TYPES.ALL_IMAGES}
              onChange={(e) => handleBannerUploadWithValidation(e.target.files)}
              className="hidden"
              id="banner-upload"
              disabled={isUploadingImages}
            />
          </label>
          {/* Uploaded Banner */}
          {uploadedBanner && (
            <div className="flex items-center gap-2 mt-4">
              {isDeletingImage ? (
                <Skeleton className="h-16 w-16 rounded-md border" />
              ) : (
                <img
                  src={uploadedBanner.imageUrl}
                  alt={uploadedBanner.name}
                  className="h-16 rounded-md border"
                />
              )}
              <button
                type="button"
                onClick={() => removeBanner(uploadedBanner.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
