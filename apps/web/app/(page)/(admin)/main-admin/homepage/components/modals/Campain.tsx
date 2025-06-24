"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "@/assets/home/logo.webp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsCloudArrowUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import { usePostData } from "@/hooks/useApi";
import { toast } from "sonner";

interface CampaignFormData {
  title: string;
  type: "INVESTMENT" | "SALE" | "PROMOTION";
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  images: string[];
  documentId: string;
}

export default function CampaignModal({
  open,
  onClose,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    type: "INVESTMENT",
    description: "",
    startDate: "",
    endDate: "",
    isActive: true,
    images: [],
    documentId: "",
  });

  const [errors, setErrors] = useState<Partial<CampaignFormData>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { mutateAsync: createCampaign, isPending: isCreatingCampaign } =
    usePostData("campaigns");

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

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setFormData({
        title: "",
        type: "INVESTMENT",
        description: "",
        startDate: "",
        endDate: "",
        isActive: true,
        images: [],
        documentId: "",
      });
      setErrors({});
      setSelectedFiles([]);
    }
  }, [open]);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    const fileIds = files.map((file) => file.name); // This should be actual file IDs from upload
    setFormData((prev) => ({
      ...prev,
      images: fileIds,
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

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Prepare the payload
      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      const response = await createCampaign(payload);

      if (response) {
        toast.success("Campaign created successfully");
        onClose();
        refetch();
      }
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-3xl overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-2 ">
            <span className="text-[#4C5560] text-sm">Admin</span>
            <span className="text-[#116114]  text-sm font-medium">
              / Add New Campaign
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 space-y-6 bg-white">
          <p className="text-[#4C5560] text-xs">
            Create a new promotional campaign to feature on the homepage.
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
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  End date
                </Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={`bg-[#E5E5E7] text-xs ${errors.endDate ? "border-red-500" : ""}`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs">{errors.endDate}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Banner Images
              </Label>
              <div className="border border-gray-300 rounded-lg p-8 text-center bg-white transition-colors cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <p className="text-sm text-[#292D32]">Upload banner images</p>
                  <BsCloudArrowUp className="mx-auto h-8 w-8 text-[#798088] mt-2" />
                  {selectedFiles.length > 0 && (
                    <p className="text-xs text-green-600 mt-2">
                      {selectedFiles.length} file(s) selected
                    </p>
                  )}
                </label>
              </div>
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
                className="rounded"
              />
              <Label htmlFor="isActive" className="text-[#323539] text-sm">
                Active Campaign
              </Label>
            </div>

            <div className="flex flex-col sm:flex-row justify-between pt-4">
              <Button
                type="submit"
                disabled={isCreatingCampaign}
                className="bg-[#116114] font-medium text-sm hover:bg-[#116114] text-white disabled:opacity-50"
              >
                {isCreatingCampaign ? "Creating..." : "Save campaign"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isCreatingCampaign}
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
