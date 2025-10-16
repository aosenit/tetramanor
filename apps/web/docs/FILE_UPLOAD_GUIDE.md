# File Upload System Documentation

## Overview

This application uses a centralized, reusable file upload system that allows you to configure file size limits and accepted file types in one place.

## Quick Start

### 1. Import the configuration

```typescript
import {
  UPLOAD_LIMITS,
  ACCEPTED_FILE_TYPES,
  validateFiles,
  getFileSizeLabel,
} from "@/lib/upload-config";
```

### 2. Use the reusable FileUploadZone component

```typescript
import FileUploadZone, { UploadedFilePreview } from "@/components/upload/FileUploadZone";

// In your component:
<FileUploadZone
  id="property-images"
  label="Upload Property Images"
  fileType="image"
  multiple
  onFilesSelected={handleImageUpload}
  isUploading={isUploadingImages}
/>

// Display uploaded files:
{uploadedImages.map((image, index) => (
  <UploadedFilePreview
    key={image.id}
    id={image.id}
    url={image.imageUrl}
    name={image.name}
    type="image"
    isPrimary={index === 0}
    onRemove={removeImage}
    isDeleting={isDeletingImage}
  />
))}
```

## Configuration

### Update File Size Limits

To change file size limits globally, edit `/lib/upload-config.ts`:

```typescript
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 10 * 1024 * 1024, // 10MB (change this value)
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB (change this value)
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB (change this value)
} as const;
```

**Note:** Changes to these values will automatically apply across the entire application wherever the reusable components are used.

### Update Accepted File Types

Edit the `ACCEPTED_FILE_TYPES` in `/lib/upload-config.ts`:

```typescript
export const ACCEPTED_FILE_TYPES = {
  IMAGES: "image/jpeg,image/jpg,image/png,image/webp",
  DOCUMENTS: ".pdf,.doc,.docx",
  ALL_IMAGES: "image/jpeg,image/jpg,image/png,image/webp", // Only JPEG, PNG, WebP allowed
  ALL_DOCUMENTS:
    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;
```

## Components

### FileUploadZone

A fully-featured upload zone with validation and visual feedback.

**Props:**

| Prop               | Type                             | Required | Default | Description                                         |
| ------------------ | -------------------------------- | -------- | ------- | --------------------------------------------------- |
| `id`               | string                           | Yes      | -       | Unique ID for the input element                     |
| `label`            | string                           | Yes      | -       | Label text displayed in the upload zone             |
| `fileType`         | 'image' \| 'document' \| 'video' | Yes      | -       | Type of file being uploaded                         |
| `multiple`         | boolean                          | No       | false   | Allow multiple file selection                       |
| `maxSize`          | number                           | No       | Auto    | Max file size in bytes (auto-set based on fileType) |
| `acceptedTypes`    | string                           | No       | Auto    | Accepted file types (auto-set based on fileType)    |
| `isUploading`      | boolean                          | No       | false   | Show uploading state                                |
| `isDeleting`       | boolean                          | No       | false   | Show deleting state                                 |
| `onFilesSelected`  | (files: FileList) => void        | Yes      | -       | Callback after validation passes                    |
| `showHelperText`   | boolean                          | No       | true    | Show file size and type info                        |
| `customHelperText` | string                           | No       | -       | Override default helper text                        |
| `className`        | string                           | No       | ""      | Additional CSS classes                              |
| `disabled`         | boolean                          | No       | false   | Disable the upload zone                             |

**Example:**

```tsx
<FileUploadZone
  id="banner-upload"
  label="Upload Property Banner"
  fileType="image"
  onFilesSelected={handleBannerUpload}
  isUploading={isUploadingBanner}
  customHelperText="Recommended size: 1920x1080px"
/>
```

### UploadedFilePreview

Display and manage uploaded files (images or documents).

**Props:**

| Prop         | Type                  | Required | Default | Description            |
| ------------ | --------------------- | -------- | ------- | ---------------------- |
| `id`         | string                | Yes      | -       | File ID                |
| `url`        | string                | Yes      | -       | File URL               |
| `name`       | string                | Yes      | -       | File name              |
| `type`       | 'image' \| 'document' | Yes      | -       | File type              |
| `isPrimary`  | boolean               | No       | false   | Show "Primary" badge   |
| `isDeleting` | boolean               | No       | false   | Show deleting state    |
| `onRemove`   | (id: string) => void  | Yes      | -       | Remove callback        |
| `className`  | string                | No       | ""      | Additional CSS classes |

**Example:**

```tsx
{
  uploadedImages.map((image, index) => (
    <UploadedFilePreview
      key={image.id}
      id={image.id}
      url={image.imageUrl}
      name={image.name}
      type="image"
      isPrimary={index === 0}
      onRemove={removeImage}
      isDeleting={isDeletingImage}
    />
  ));
}
```

## Validation Functions

### validateFiles

Validate multiple files at once:

```typescript
import {
  validateFiles,
  UPLOAD_LIMITS,
  ACCEPTED_FILE_TYPES,
} from "@/lib/upload-config";

const handleFileSelect = (files: FileList) => {
  const validation = validateFiles(
    files,
    UPLOAD_LIMITS.IMAGE_MAX_SIZE,
    ACCEPTED_FILE_TYPES.ALL_IMAGES
  );

  if (!validation.valid) {
    validation.errors.forEach((error) => toast.error(error));
    return;
  }

  // Proceed with upload
  uploadFiles(files);
};
```

### validateFile

Validate a single file:

```typescript
import { validateFile } from "@/lib/upload-config";

const validation = validateFile(
  file,
  10 * 1024 * 1024, // 10MB
  "image/*"
);

if (!validation.valid) {
  toast.error(validation.error);
  return;
}
```

## Helper Functions

### getFileSizeLabel

Convert bytes to human-readable format:

```typescript
import { getFileSizeLabel } from "@/lib/upload-config";

const size = getFileSizeLabel(10485760); // "10MB"
const size2 = getFileSizeLabel(1024); // "1KB"
```

## Migration Guide

### Migrating Existing Upload Components

**Before:**

```tsx
<input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e.target.files)}
/>
```

**After:**

```tsx
import FileUploadZone from "@/components/upload/FileUploadZone";

<FileUploadZone
  id="my-upload"
  label="Upload Images"
  fileType="image"
  multiple
  onFilesSelected={handleImageUpload}
  isUploading={isUploading}
/>;
```

## Examples

### Example 1: Property Images Upload

```tsx
import FileUploadZone, {
  UploadedFilePreview,
} from "@/components/upload/FileUploadZone";

function PropertyForm() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: FileList) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
      const response = await uploadImages(formData);
      setImages((prev) => [...prev, ...response.data]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div>
      <FileUploadZone
        id="property-images"
        label="Upload Property Images"
        fileType="image"
        multiple
        onFilesSelected={handleUpload}
        isUploading={isUploading}
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {images.map((image, index) => (
          <UploadedFilePreview
            key={image.id}
            id={image.id}
            url={image.imageUrl}
            name={image.name}
            type="image"
            isPrimary={index === 0}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
```

### Example 2: Document Upload

```tsx
<FileUploadZone
  id="brochure-upload"
  label="Upload Property Brochure"
  fileType="document"
  onFilesSelected={handleDocumentUpload}
  isUploading={isUploadingDoc}
/>;

{
  uploadedDocument && (
    <UploadedFilePreview
      id={uploadedDocument.id}
      url={uploadedDocument.imageUrl}
      name={uploadedDocument.name}
      type="document"
      onRemove={removeDocument}
    />
  );
}
```

### Example 3: Custom Validation

```tsx
import { UPLOAD_LIMITS, validateFile } from "@/lib/upload-config";

// Custom max size (5MB instead of default 10MB)
<FileUploadZone
  id="avatar-upload"
  label="Upload Avatar"
  fileType="image"
  maxSize={5 * 1024 * 1024}
  customHelperText="Max 5MB • Square images work best"
  onFilesSelected={handleAvatarUpload}
/>;
```

## Best Practices

1. **Always use the centralized configuration** - Don't hardcode file size limits
2. **Use the FileUploadZone component** - It includes built-in validation and error handling
3. **Show upload progress** - Use the `isUploading` prop for better UX
4. **Handle errors gracefully** - The validation functions provide detailed error messages
5. **Update config in one place** - All changes to `/lib/upload-config.ts` apply globally

## Troubleshooting

### Files are being rejected

Check the console for validation errors. Common issues:

- File size exceeds the limit (check `UPLOAD_LIMITS`)
- File type not accepted (check `ACCEPTED_FILE_TYPES`)

### Need to increase file size limit

Edit `/lib/upload-config.ts` and update the appropriate limit:

```typescript
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 20 * 1024 * 1024, // Increased to 20MB
  // ...
};
```

### Need to accept new file types

Add to `ACCEPTED_FILE_TYPES` in `/lib/upload-config.ts`:

```typescript
export const ACCEPTED_FILE_TYPES = {
  // ...
  SPREADSHEETS: ".xls,.xlsx,.csv",
};
```

## Support

For questions or issues, contact the development team or check the code comments in:

- `/lib/upload-config.ts` - Configuration and validation logic
- `/components/upload/FileUploadZone.tsx` - Reusable components
