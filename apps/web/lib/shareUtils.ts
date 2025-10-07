/**
 * Share utility functions for sharing property links
 */

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

/**
 * Share content using Web Share API if available, otherwise copy to clipboard
 * @param data - Share data containing title, text, and url
 * @returns Promise that resolves to true if shared successfully, false otherwise
 */
export async function shareContent(data: ShareData): Promise<boolean> {
  // Check if Web Share API is available (works on mobile and modern browsers)
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
      });
      return true;
    } catch (error) {
      // User cancelled the share or error occurred
      if ((error as Error).name === "AbortError") {
        // User cancelled - not an error
        return false;
      }
      // Fall through to clipboard method
      console.error("Error sharing:", error);
    }
  }

  // Fallback to clipboard
  return copyToClipboard(data.url);
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves to true if copied successfully
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Modern clipboard API
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      textArea.remove();
      return successful;
    }
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    return false;
  }
}

/**
 * Get the current page URL
 * @returns Current page URL or empty string if not in browser
 */
export function getCurrentUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

/**
 * Share a property listing
 * @param propertyName - Name of the property
 * @param propertyId - Optional property ID for custom URL
 * @returns Promise that resolves to true if shared successfully
 */
export async function shareProperty(
  propertyName: string,
  propertyId?: string
): Promise<boolean> {
  const url = getCurrentUrl();
  const shareData: ShareData = {
    title: `${propertyName} | Tetramanor`,
    text: `Check out this property: ${propertyName}`,
    url: url,
  };

  return shareContent(shareData);
}

