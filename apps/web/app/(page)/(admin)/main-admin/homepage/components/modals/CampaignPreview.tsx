"use client";
import Image from "next/image";
import tmlogo from "@/assets/tmlogo.png";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface CampaignData {
  title: string;
  type: "INVESTMENT" | "SALE" | "PROMOTION";
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  images: Array<{ id: string; imageUrl: string; name: string }>;
}

export default function CampaignPreview({
  open,
  onClose,
  campaignData,
  onEdit,
}: {
  open: boolean;
  onClose: () => void;
  campaignData?: CampaignData;
  onEdit?: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Reset image index when modal opens
  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0);
    }
  }, [open]);

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startFormatted = start.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    const endFormatted = end.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${startFormatted} - ${endFormatted}`;
  };

  // Format campaign type for display
  const formatCampaignType = (type: string) => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  // Get campaign type color
  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case "INVESTMENT":
        return "bg-blue-100 text-blue-800";
      case "SALE":
        return "bg-green-100 text-green-800";
      case "PROMOTION":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-4xl overflow-hidden">
        <header className="bg-[#323539] rounded-t-md text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={tmlogo} alt="Logo" width={40} height={40} />
              <span className="text-lg font-medium">Campaign Preview</span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <span className="text-[#4C5560] text-sm">Admin</span>
            <span className="text-[#116114] text-sm font-medium">
              / Campaign Preview
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 space-y-6 bg-white">
          <p className="text-[#4C5560] text-sm">
            This is how your campaign will appear on the homepage.
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Campaign Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[#000000] mb-2">
                  {campaignData?.title || "TM HighGardens Promo"}
                </h2>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCampaignTypeColor(campaignData?.type || "INVESTMENT")}`}
                  >
                    {formatCampaignType(campaignData?.type || "INVESTMENT")}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${campaignData?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {campaignData?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Image */}
            <div className="mb-6">
              <div className="relative">
                <Image
                  src={campaignData?.images?.[currentImageIndex]?.imageUrl}
                  alt={campaignData?.title || "Campaign Banner"}
                  width={800}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Image Navigation */}
                {campaignData?.images && campaignData.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {campaignData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm">
                <p className="font-medium text-[#383D43] w-32">Date Range:</p>
                <p className="font-medium text-[#116114]">
                  {campaignData?.startDate && campaignData?.endDate
                    ? formatDateRange(
                        campaignData.startDate,
                        campaignData.endDate
                      )
                    : "April 20 - May 30, 2025"}
                </p>
              </div>

              <div className="flex items-center text-sm">
                <p className="font-medium text-[#383D43] w-32">
                  Campaign Type:
                </p>
                <p className="font-medium text-[#116114]">
                  {formatCampaignType(campaignData?.type || "INVESTMENT")}
                </p>
              </div>

              <div className="flex items-start text-sm">
                <p className="font-medium text-[#383D43] w-32">Description:</p>
                <p className="font-medium text-[#116114] flex-1">
                  {campaignData?.description ||
                    "Invest now and earn 10% ROI annually with TM HighGardens. Limited slots available for this exclusive investment opportunity."}
                </p>
              </div>

              <div className="flex items-center text-sm">
                <p className="font-medium text-[#383D43] w-32">Images:</p>
                <p className="font-medium text-[#116114]">
                  {campaignData?.images?.length || 0} banner image
                  {(campaignData?.images?.length || 0) !== 1 ? "s" : ""}{" "}
                  uploaded
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={onEdit}
                className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className="text-[#323539] hover:text-[#323539] text-sm"
              >
                Back to homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
