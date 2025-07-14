"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import tmlogo from "@/assets/tmlogo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePostData, usePutData, useUploadData } from "@/hooks/useApi";
import { toast } from "sonner";

interface CampaignFormData {
  title: string;
  type: "INVESTMENT" | "SALE" | "PROMOTION";
  description: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  images: string[];
  isIndefinite: boolean;
}

interface UploadedImage {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
}

export default function CampaignModal({
  open,
  onClose,
  refetch,
  campaignId,
  campaignData,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  campaignId?: string;
  campaignData?: any;
}) {
  const isEditMode = !!campaignId;

  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    type: "INVESTMENT",
    description: "",
    startDate: "",
    endDate: "",
    isActive: true,
    images: [],
    isIndefinite: false,
  });

  const [errors, setErrors] = useState<Partial<CampaignFormData>>({});
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  // API mutations
  const { mutateAsync: createCampaign, isPending: isCreatingCampaign } =
    usePostData("campaigns");
  const { mutateAsync: updateCampaign, isPending: isUpdatingCampaign } =
    usePutData(campaignData?.id ? `campaigns/${campaignData?.id}` : null);

  // File upload mutations
  const { mutateAsync: uploadImages, isPending: isUploadingImages } =
    useUploadData("upload/images");

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // Load campaign data when editing (flat structure)
  useEffect(() => {
    if (campaignData && isEditMode) {
      setFormData({
        title: campaignData.title || "",
        type: campaignData.type || "INVESTMENT",
        description: campaignData.description || "",
        startDate: campaignData.startDate
          ? new Date(campaignData.startDate).toISOString().split("T")[0]
          : "",
        endDate: campaignData.endDate
          ? new Date(campaignData.endDate).toISOString().split("T")[0]
          : "",
        isActive: campaignData.isActive ?? true,
        images: Array.isArray(campaignData.images)
          ? campaignData.images.map((img: any) => img.id)
          : [],
        isIndefinite: campaignData.isIndefinite ?? false,
      });
      // Load existing images if any
      if (Array.isArray(campaignData.images)) {
        setUploadedImages(campaignData.images);
      }
    }
  }, [campaignData, isEditMode]);

  // Reset form when modal opens in create mode
  useEffect(() => {
    if (open && !isEditMode) {
      setFormData({
        title: "",
        type: "INVESTMENT",
        description: "",
        startDate: "",
        endDate: "",
        isActive: true,
        images: [],
        isIndefinite: false,
      });
      setErrors({});
      setUploadedImages([]);
    }
  }, [open, isEditMode]);

  const handleInputChange = (
    field: keyof CampaignFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await uploadImages(formData);

      if (response.success) {
        setUploadedImages((prev) => [...prev, ...response.data]);
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            ...response.data.map((img: UploadedImage) => img.id),
          ],
        }));
        toast.success("Images uploaded successfully");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    }
  };

  // Remove uploaded image
  const removeImage = (imageId: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((id) => id !== imageId),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CampaignFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Campaign title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.isIndefinite && !formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate && !formData.isIndefinite) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);

    // Show first error in toast
    const errorMessages = Object.values(newErrors);
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0]);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Prepare the payload
      const { isIndefinite, ...rest } = formData;
      if (isIndefinite) {
        delete rest.endDate;
      } else {
        rest.endDate = new Date(formData.endDate).toISOString();
      }

      const payload: Record<string, any> = {
        ...rest,
        startDate: new Date(formData.startDate).toISOString(),
      };

      if (isEditMode) {
        await updateCampaign(payload);
        toast.success("Campaign updated successfully");
      } else {
        await createCampaign(payload);
        toast.success("Campaign created successfully");
      }

      onClose();
      refetch();
    } catch (error: any) {
      console.error("Failed to save campaign:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-3xl overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={tmlogo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-2 ">
            <span className="text-[#4C5560] text-sm">Admin</span>
            <span className="text-[#116114]  text-sm font-medium">
              / {isEditMode ? "Edit Campaign" : "Add New Campaign"}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 space-y-6 bg-white">
          <p className="text-[#4C5560] text-xs">
            {isEditMode
              ? "Update your campaign details and settings."
              : "Create a new promotional campaign to feature on the homepage."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Campaign Title
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`bg-[#E5E5E7] text-xs ${errors.title ? "border-red-500" : ""}`}
                placeholder="Enter campaign title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Campaign Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  handleInputChange(
                    "type",
                    value as "INVESTMENT" | "SALE" | "PROMOTION"
                  )
                }
              >
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INVESTMENT">Investment</SelectItem>
                  <SelectItem value="SALE">Sale</SelectItem>
                  <SelectItem value="PROMOTION">Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isIndefinite"
                checked={formData.isIndefinite}
                onChange={(e) =>
                  handleInputChange("isIndefinite", e.target.checked)
                }
                className="rounded accent-[var(--primary-green)]"
              />
              <Label htmlFor="isIndefinite" className="text-[#323539] text-sm">
                Ongoing Campaign (No end date)
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  Start date
                </Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className={`bg-[#E5E5E7] text-xs ${errors.startDate ? "border-red-500" : ""}`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs">{errors.startDate}</p>
                )}
              </div>
              {!formData.isIndefinite && (
                <div className="space-y-2">
                  <Label className="text-[#323539] text-sm font-medium">
                    End date
                  </Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    className={`bg-[#E5E5E7] text-xs ${errors.endDate ? "border-red-500" : ""}`}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-xs">{errors.endDate}</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Banner Images
              </Label>
              <div className="border border-gray-300 rounded-lg p-4 text-center bg-white transition-colors cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                  disabled={isUploadingImages}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <p className="text-sm text-[#292D32]">
                    {isUploadingImages
                      ? "Uploading..."
                      : "Upload banner images"}
                  </p>
                  {isUploadingImages ? (
                    <Loader2 className="mx-auto size-5 text-[#798088] mt-2 animate-spin" />
                  ) : (
                    <Upload className="mx-auto size-5 text-[#798088] mt-2" />
                  )}
                  {uploadedImages.length > 0 && (
                    <p className="text-xs text-green-600 mt-2">
                      {uploadedImages.length} image(s) uploaded
                    </p>
                  )}
                </label>
              </div>

              {/* Display uploaded images */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.imageUrl}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Description
              </Label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`bg-[#E5E5E7] text-xs text-[#323539] placeholder:text-xs ${errors.description ? "border-red-500" : ""}`}
                placeholder="Get 10% ROI with TM HighStandards Investment offer"
                type="text"
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
                className="rounded accent-[var(--primary-green)]"
              />
              <Label htmlFor="isActive" className="text-[#323539] text-sm">
                Active Campaign
              </Label>
            </div>

            <div className="flex flex-col sm:flex-row justify-between pt-4">
              <Button
                type="submit"
                disabled={
                  isCreatingCampaign || isUpdatingCampaign || isUploadingImages
                }
                className="bg-[#116114] font-medium text-sm hover:bg-[#116114] text-white disabled:opacity-50"
              >
                {isCreatingCampaign || isUpdatingCampaign
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                    ? "Update campaign"
                    : "Save campaign"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={
                  isCreatingCampaign || isUpdatingCampaign || isUploadingImages
                }
                className="text-[#323539]"
              >
                Back to homepage
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
