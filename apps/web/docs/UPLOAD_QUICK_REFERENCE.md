# File Upload System - Quick Reference Card

## 🎯 To Change File Size Limits

**Edit ONE file: `/lib/upload-config.ts`**

```typescript
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 10 * 1024 * 1024, // Change this number (in bytes)
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // Change this number (in bytes)
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // Change this number (in bytes)
};
```

**Common Conversions:**

- 1MB = `1 * 1024 * 1024`
- 5MB = `5 * 1024 * 1024`
- 10MB = `10 * 1024 * 1024`
- 20MB = `20 * 1024 * 1024`
- 50MB = `50 * 1024 * 1024`
- 100MB = `100 * 1024 * 1024`

## 🚀 Basic Usage

```tsx
import FileUploadZone from "@/components/upload/FileUploadZone";

<FileUploadZone
  id="my-upload"
  label="Upload Images"
  fileType="image" // or "document" or "video"
  multiple // optional: allow multiple files
  onFilesSelected={handleUpload}
  isUploading={isUploading}
/>;
```

## 📋 File Types

```tsx
fileType = "image"; // For images (automatically validates images)
fileType = "document"; // For PDFs and docs
fileType = "video"; // For videos
```

## 🎨 Display Uploaded Files

```tsx
import { UploadedFilePreview } from "@/components/upload/FileUploadZone";

<UploadedFilePreview
  id={file.id}
  url={file.imageUrl}
  name={file.name}
  type="image" // or "document"
  isPrimary={index === 0} // optional: show "Primary" badge
  onRemove={removeFile}
  isDeleting={isDeleting} // optional: show loading state
/>;
```

## ⚙️ Current Limits

| Type      | Size | Location to Change              |
| --------- | ---- | ------------------------------- |
| Images    | 10MB | `/lib/upload-config.ts` line 8  |
| Documents | 10MB | `/lib/upload-config.ts` line 9  |
| Videos    | 50MB | `/lib/upload-config.ts` line 10 |

## 🔍 Quick Examples

### Image Upload

```tsx
<FileUploadZone
  id="property-images"
  label="Upload Property Images"
  fileType="image"
  multiple
  onFilesSelected={handleImageUpload}
  isUploading={isUploadingImages}
/>
```

### Document Upload

```tsx
<FileUploadZone
  id="brochure"
  label="Upload Brochure"
  fileType="document"
  onFilesSelected={handleDocUpload}
  isUploading={isUploadingDoc}
/>
```

### Custom Size Limit

```tsx
<FileUploadZone
  id="avatar"
  label="Upload Avatar"
  fileType="image"
  maxSize={5 * 1024 * 1024} // Override: 5MB instead of 10MB
  onFilesSelected={handleAvatarUpload}
/>
```

## 📁 File Locations

```
/lib/upload-config.ts                    ← Change limits here
/components/upload/FileUploadZone.tsx    ← Reusable components
/docs/FILE_UPLOAD_GUIDE.md               ← Full documentation
```

## ✅ Benefits

- ✅ Change all upload limits in ONE place
- ✅ Automatic validation
- ✅ Consistent UI across app
- ✅ Clear error messages
- ✅ Easy to use

## 🆘 Need Help?

See full documentation: `/docs/FILE_UPLOAD_GUIDE.md`
