/**
 * Centralized Upload Configuration
 * Update these values in one place to apply across the entire application
 */

// File size limits (in bytes)
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
} as const;

// Accepted file types
export const ACCEPTED_FILE_TYPES = {
  IMAGES: "image/jpeg,image/jpg,image/png,image/webp",
  DOCUMENTS: ".pdf,.doc,.docx",
  ALL_IMAGES: "image/jpeg,image/jpg,image/png,image/webp",
  ALL_DOCUMENTS:
    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

// Human-readable size labels for UI display
export const getFileSizeLabel = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(0)}MB`;
  }
  return `${(bytes / 1024).toFixed(0)}KB`;
};

// Validation function for file size
export const validateFileSize = (
  file: File,
  maxSize: number
): { valid: boolean; error?: string } => {
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${getFileSizeLabel(maxSize)}. Please choose a smaller file.`,
    };
  }
  return { valid: true };
};

// Validation function for file type
export const validateFileType = (
  file: File,
  acceptedTypes: string
): { valid: boolean; error?: string } => {
  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  const fileMimeType = file.type.toLowerCase();

  // Check if accepted types include wildcards (e.g., "image/*")
  if (acceptedTypes.includes("/*")) {
    const acceptedCategories = acceptedTypes
      .split(",")
      .map((type) => type.trim())
      .filter((type) => type.includes("/*"))
      .map((type) => type.split("/")[0]);

    const fileCategory = fileMimeType.split("/")[0];
    if (acceptedCategories.includes(fileCategory)) {
      return { valid: true };
    }
  }

  // Check specific mime types
  const acceptedMimeTypes = acceptedTypes
    .split(",")
    .map((type) => type.trim())
    .filter((type) => !type.includes("/*"));

  const isValidMimeType = acceptedMimeTypes.some((type) => {
    if (type.startsWith(".")) {
      return fileExtension === type;
    }
    return fileMimeType === type;
  });

  if (!isValidMimeType) {
    return {
      valid: false,
      error: `Invalid file type. Accepted types: ${acceptedTypes}`,
    };
  }

  return { valid: true };
};

// Combined validation
export const validateFile = (
  file: File,
  maxSize: number,
  acceptedTypes: string
): { valid: boolean; error?: string } => {
  // Check file size
  const sizeValidation = validateFileSize(file, maxSize);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  // Check file type
  const typeValidation = validateFileType(file, acceptedTypes);
  if (!typeValidation.valid) {
    return typeValidation;
  }

  return { valid: true };
};

// Validate multiple files
export const validateFiles = (
  files: FileList | File[],
  maxSize: number,
  acceptedTypes: string
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const fileArray = Array.from(files);

  fileArray.forEach((file, index) => {
    const validation = validateFile(file, maxSize, acceptedTypes);
    if (!validation.valid && validation.error) {
      errors.push(`File ${index + 1} (${file.name}): ${validation.error}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};
