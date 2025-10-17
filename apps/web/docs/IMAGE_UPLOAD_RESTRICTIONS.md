# Image Upload Restrictions

## 📸 Allowed Image Formats

**Only the following image formats are accepted:**

- ✅ **JPEG** (.jpg, .jpeg)
- ✅ **PNG** (.png)
- ✅ **WebP** (.webp)

**Not allowed:**

- ❌ GIF
- ❌ BMP
- ❌ TIFF
- ❌ SVG
- ❌ Other formats

## 📏 File Size Limit

- **Maximum:** 10MB per image
- Users will see an error if they try to upload larger files

## 🎯 Where This Applies

This restriction applies to **all image uploads** across the application:

- Property images
- Property banners
- Rental images
- User avatars
- Campaign images
- Blog post images
- Any other image uploads

## 🔧 Technical Details

The restriction is enforced in `/lib/upload-config.ts`:

```typescript
export const ACCEPTED_FILE_TYPES = {
  IMAGES: "image/jpeg,image/jpg,image/png,image/webp",
  ALL_IMAGES: "image/jpeg,image/jpg,image/png,image/webp",
  // ...
} as const;
```

## 💡 Why These Formats?

1. **JPEG** - Best for photographs and complex images with many colors
2. **PNG** - Best for graphics, logos, and images requiring transparency
3. **WebP** - Modern format with better compression than JPEG/PNG, good browser support

## 🎨 User Experience

When a user tries to upload an unsupported format, they will see:

- ❌ Toast error message: "Invalid file type. Accepted types: image/jpeg,image/jpg,image/png,image/webp"
- The file will be rejected before upload

When uploading images, users see:

- "Max 10MB • JPEG, PNG, WebP" helper text

## 🔄 To Change Accepted Formats

Edit `/lib/upload-config.ts`:

```typescript
export const ACCEPTED_FILE_TYPES = {
  // To add GIF back:
  ALL_IMAGES: "image/jpeg,image/jpg,image/png,image/webp,image/gif",

  // To remove WebP:
  ALL_IMAGES: "image/jpeg,image/jpg,image/png",

  // To accept all image formats:
  ALL_IMAGES: "image/*", // Not recommended
} as const;
```

**Remember:** After changing, update the helper text in `/components/upload/FileUploadZone.tsx` line 78.

## ✅ Current Status

- ✅ Configuration updated in `/lib/upload-config.ts`
- ✅ Helper text updated in components
- ✅ Validation enforced automatically
- ✅ User-friendly error messages
- ✅ Documentation updated

## 📋 Testing

To test the restriction:

1. Try uploading a .gif, .bmp, or .svg file
2. You should see an error message
3. Upload a .jpg, .png, or .webp file
4. It should work successfully (if under 10MB)
