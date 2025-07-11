import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Downloads a document by id from the backend and triggers a file download.
 * @param {string} id - The document id.
 * @param {string} filename - The filename to save as.
 * @param {object} body - The request body containing name, email, and phone.
 */
export async function downloadDocument(id: string, filename: string, body: { name: string; email: string; phone: string }) {
  try {
    const response = await axiosInstance.post(`/upload/download-document/${id}`, body, {
      responseType: "blob",
    });
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    // toast.success("Brochure downloaded successfully!");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Failed to download brochure. Please try again."
    );
  }
}
