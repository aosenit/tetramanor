import React from "react";
import { Upload, X, File as FileIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  UPLOAD_LIMITS,
  ACCEPTED_FILE_TYPES,
  getFileSizeLabel,
  validateFiles,
} from "@/lib/upload-config";
import { toast } from "sonner";

interface FileUploadZoneProps {
  /** Unique ID for the input element */
  id: string;
  /** Label text displayed in the upload zone */
  label: string;
  /** Whether multiple files can be selected */
  multiple?: boolean;
  /** Maximum file size in bytes (uses default from config if not provided) */
  maxSize?: number;
  /** Accepted file types (uses default from config if not provided) */
  acceptedTypes?: string;
  /** File type category: 'image', 'document', or 'video' */
  fileType: "image" | "document" | "video";
  /** Whether the upload is in progress */
  isUploading?: boolean;
  /** Whether a delete operation is in progress */
  isDeleting?: boolean;
  /** Callback when files are selected (after validation) */
  onFilesSelected: (files: FileList) => void;
  /** Show helper text with accepted formats and size */
  showHelperText?: boolean;
  /** Custom helper text (overrides default) */
  customHelperText?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Disable the upload zone */
  disabled?: boolean;
}

/**
 * Reusable File Upload Zone Component
 *
 * Usage:
 * ```tsx
 * <FileUploadZone
 *   id="property-images"
 *   label="Upload Property Images"
 *   fileType="image"
 *   multiple
 *   onFilesSelected={handleImageUpload}
 *   isUploading={isUploadingImages}
 * />
 * ```
 */
export default function FileUploadZone({
  id,
  label,
  multiple = false,
  maxSize,
  acceptedTypes,
  fileType,
  isUploading = false,
  isDeleting = false,
  onFilesSelected,
  showHelperText = true,
  customHelperText,
  className = "",
  disabled = false,
}: FileUploadZoneProps) {
  // Get default values based on file type
  const getDefaults = () => {
    switch (fileType) {
      case "image":
        return {
          maxSize: UPLOAD_LIMITS.IMAGE_MAX_SIZE,
          acceptedTypes: ACCEPTED_FILE_TYPES.ALL_IMAGES,
          helperText: `Max ${getFileSizeLabel(UPLOAD_LIMITS.IMAGE_MAX_SIZE)} • JPEG, PNG, WebP`,
        };
      case "document":
        return {
          maxSize: UPLOAD_LIMITS.DOCUMENT_MAX_SIZE,
          acceptedTypes: ACCEPTED_FILE_TYPES.DOCUMENTS,
          helperText: `Max ${getFileSizeLabel(UPLOAD_LIMITS.DOCUMENT_MAX_SIZE)} • PDF, DOC, DOCX`,
        };
      case "video":
        return {
          maxSize: UPLOAD_LIMITS.VIDEO_MAX_SIZE,
          acceptedTypes: "video/*",
          helperText: `Max ${getFileSizeLabel(UPLOAD_LIMITS.VIDEO_MAX_SIZE)} per video`,
        };
    }
  };

  const defaults = getDefaults();
  const finalMaxSize = maxSize || defaults.maxSize;
  const finalAcceptedTypes = acceptedTypes || defaults.acceptedTypes;
  const helperText = customHelperText || defaults.helperText;

  // Handle file selection with validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validation = validateFiles(files, finalMaxSize, finalAcceptedTypes);

    if (!validation.valid) {
      validation.errors.forEach((error) => toast.error(error));
      // Reset the input
      e.target.value = "";
      return;
    }

    onFilesSelected(files);
    // Reset the input to allow selecting the same file again
    e.target.value = "";
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`cursor-pointer rounded-xl border border-gray-200 bg-white px-6 py-4 flex flex-col items-center justify-center text-center transition hover:shadow-md ${
          disabled || isUploading || isDeleting
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isUploading || isDeleting ? (
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <span className="text-sm text-gray-500">
              {isUploading ? "Uploading..." : "Deleting..."}
            </span>
          </div>
        ) : (
          <>
            <span className="font-medium text-[#323539] mb-2 flex items-center justify-center gap-2">
              {label}
              <Upload className="w-6 h-6 text-gray-400" />
            </span>
            {showHelperText && (
              <span className="text-xs text-gray-500 mt-1">{helperText}</span>
            )}
          </>
        )}
        <input
          type="file"
          id={id}
          multiple={multiple}
          accept={finalAcceptedTypes}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled || isUploading || isDeleting}
        />
      </label>
    </div>
  );
}

interface UploadedFilePreviewProps {
  /** File ID */
  id: string;
  /** File URL */
  url: string;
  /** File name */
  name: string;
  /** File type: 'image' or 'document' */
  type: "image" | "document";
  /** Whether this is the primary/featured item */
  isPrimary?: boolean;
  /** Whether a delete operation is in progress */
  isDeleting?: boolean;
  /** Callback when remove button is clicked */
  onRemove: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable File Preview Component
 *
 * Usage:
 * ```tsx
 * <UploadedFilePreview
 *   id={image.id}
 *   url={image.imageUrl}
 *   name={image.name}
 *   type="image"
 *   isPrimary={index === 0}
 *   onRemove={removeImage}
 *   isDeleting={isDeletingImage}
 * />
 * ```
 */
export function UploadedFilePreview({
  id,
  url,
  name,
  type,
  isPrimary = false,
  isDeleting = false,
  onRemove,
  className = "",
}: UploadedFilePreviewProps) {
  if (type === "image") {
    return (
      <div className={`relative group w-16 h-16 ${className}`}>
        {isDeleting ? (
          <Skeleton className="w-full h-full rounded-md" />
        ) : (
          <img
            src={url}
            alt={name}
            className="w-full h-full object-cover rounded-md border"
          />
        )}
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="absolute top-1 right-1 bg-white/80 text-red-500 rounded-full p-1 hover:bg-red-100 transition"
          disabled={isDeleting}
        >
          <X className="w-3 h-3" />
        </button>
        {isPrimary && (
          <div className="absolute bottom-1 left-1 bg-[#116114] text-white text-[10px] px-1 py-0.5 rounded">
            Primary
          </div>
        )}
      </div>
    );
  }

  // Document preview
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <FileIcon className="w-5 h-5 text-gray-500" />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700 hover:text-green-900 underline flex items-center gap-1 flex-1"
      >
        <span className="truncate max-w-[200px]">{name}</span>
        <svg
          className="w-4 h-4 flex-shrink-0"
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
        onClick={() => onRemove(id)}
        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
        disabled={isDeleting}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
