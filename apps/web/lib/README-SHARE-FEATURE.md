# Share Feature Documentation

## Overview
The share functionality allows users to share property listings via the Web Share API (on supported devices) or by copying the link to clipboard.

## Components Created

### 1. **shareUtils.ts** (`lib/shareUtils.ts`)
Utility functions for sharing content:

- `shareContent(data)` - Main share function that tries Web Share API first, then falls back to clipboard
- `copyToClipboard(text)` - Copies text to clipboard with fallbacks for older browsers
- `getCurrentUrl()` - Gets the current page URL
- `shareProperty(propertyName, propertyId)` - Convenience function for sharing property listings

### 2. **toast-notification.tsx** (`components/ui/toast-notification.tsx`)
Custom toast notification system:

- `ToastProvider` - Context provider for toast notifications
- `useToast()` - Hook to show toast notifications
- Supports success, error, and info types
- Auto-dismisses after specified duration
- Clean, modern design matching app colors

## Implementation

### Rental Property Details
**File:** `apps/web/app/(page)/rental/[id]/components/PropertyDetail.tsx`

Features:
- Share button with Web Share API / Clipboard fallback
- Save/Favorite button with visual feedback
- Toast notifications for user feedback
- Wrapped with `ToastProvider`

### Portfolio Property Details
**File:** `apps/web/app/(page)/portfolio/view-property/[id]/page.tsx`

Features:
- Share button with improved UX
- Replaced Chakra UI toast with custom toast system
- Uses same shareProperty utility
- Consistent behavior across app

## Usage

### Basic Share Implementation
```tsx
import { useToast } from "@/components/ui/toast-notification";
import { shareProperty } from "@/lib/shareUtils";

function MyComponent() {
  const { showToast } = useToast();

  const handleShare = async () => {
    const success = await shareProperty("Property Name", "property-id");
    if (success) {
      showToast(
        "Shared successfully!",
        "Property link has been shared.",
        "success"
      );
    }
  };

  return <button onClick={handleShare}>Share</button>;
}
```

### Toast Notifications
```tsx
const { showToast } = useToast();

// Success toast
showToast("Success!", "Operation completed successfully.", "success");

// Error toast
showToast("Error!", "Something went wrong.", "error");

// Info toast
showToast("Info", "Here's some information.", "info", 5000); // 5 second duration
```

## Browser Support

### Web Share API
- ✅ iOS Safari (12.2+)
- ✅ Android Chrome (61+)
- ✅ Android Firefox
- ✅ Safari on macOS (12.1+)
- ❌ Desktop Chrome (fallback to clipboard)
- ❌ Desktop Firefox (fallback to clipboard)

### Clipboard API
- ✅ All modern browsers
- ✅ Fallback for older browsers using execCommand

## Features

1. **Smart Fallback**: Tries Web Share API first, falls back to clipboard
2. **User Feedback**: Toast notifications inform users of success/failure
3. **Mobile Optimized**: Native share sheet on mobile devices
4. **Accessible**: Works with keyboard navigation
5. **Consistent**: Same behavior across rental and portfolio sections

## Color Scheme

Toast notifications use app colors:
- Success: Green (`#116114`)
- Error: Red
- Info: Blue

## Testing

Test the share functionality on:
- ✅ Mobile devices (iOS/Android) - should show native share sheet
- ✅ Desktop browsers - should copy to clipboard
- ✅ Older browsers - should use execCommand fallback

