"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import two from "@/assets/admin/home/two.webp";
import five from "@/assets/admin/home/five.svg";
import Tooltip from "./modals/Tooltip";
import CampaignModal from "./modals/Campain";
import { useFetchData } from "@/hooks/useApi";

export default function OngoingCampaigns() {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const [showPropertyCampaign, setShowPropertyCampaign] = useState(false);

  const {
    data: campaignResponse,
    isLoading: isOngoingCampaignsLoading,
    error,
    refetch,
  } = useFetchData("campaigns");

  const toggleTooltip = (index: number) => {
    setOpenTooltipIndex((prev) => (prev === index ? null : index));
  };

  // Get campaigns from API response
  const campaigns = campaignResponse?.data || [];

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startFormatted = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endFormatted = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `${startFormatted} – ${endFormatted}`;
  };

  // Get campaign type display name
  const getCampaignTypeDisplay = (type: string) => {
    switch (type) {
      case "INVESTMENT":
        return "Investment";
      case "SALE":
        return "Sale";
      case "PROMOTION":
        return "Promotion";
      default:
        return type;
    }
  };

  // Loading state
  if (isOngoingCampaignsLoading) {
    return (
      <div>
        <div className="bg-[#F4F4F4] rounded-lg space-y-4">
          <div className="flex flex-row p-4 items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <Image
                  src={two}
                  alt="ongoing campaign"
                  width={35}
                  height={35}
                />
              </div>
              <div className="h-3 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex justify-between items-center bg-[#E5E5E7] text-xs font-medium text-[#181818] px-4 py-4">
            <p>Campaign title</p>
            <p>Type</p>
            <p>Date</p>
            <p>Action</p>
          </div>

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 border-b border-[#E5E5E7]"
            >
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="bg-[#F4F4F4] rounded-lg space-y-4">
          <div className="flex flex-row p-4 items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[#181818] font-medium text-base">
                  Ongoing Campaigns
                </p>
                <Image
                  src={two}
                  alt="ongoing campaign"
                  width={35}
                  height={35}
                />
              </div>
              <p className="text-xs text-[#4C5560] mt-2">
                Add or manage homepage promotions, investment offers, and sales
              </p>
            </div>
            <button
              onClick={() => setShowPropertyCampaign(true)}
              className="bg-[#116114] text-white flex items-center gap-1 px-3 py-2 rounded-md font-medium text-sm hover:bg-[#116114]"
            >
              <Plus />
              Add new campaign
            </button>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load campaigns</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#116114] text-white px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#F4F4F4] rounded-lg space-y-4">
        <div className="flex flex-row p-4 items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[#181818] font-medium text-base">
                Ongoing Campaigns
              </p>
              <Image src={two} alt="ongoing campaign" width={35} height={35} />
            </div>
            <p className="text-xs text-[#4C5560] mt-2">
              Add or manage homepage promotions, investment offers, and sales
            </p>
          </div>

          <button
            onClick={() => setShowPropertyCampaign(true)}
            className="bg-[#116114] text-white flex items-center gap-1 px-3 py-2 rounded-md font-medium text-sm hover:bg-[#116114]"
          >
            <Plus />
            Add new campaign
          </button>
          <CampaignModal
            open={showPropertyCampaign}
            onClose={() => setShowPropertyCampaign(false)}
            refetch={refetch}
          />
        </div>

        <div className="flex justify-between items-center bg-[#E5E5E7] text-xs font-medium text-[#181818] px-4 py-4">
          <p>Campaign title</p>
          <p>Type</p>
          <p>Date</p>
          <p>Action</p>
        </div>

        {campaigns.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No campaigns found</p>
              <p className="text-sm text-gray-400">
                Create your first campaign to get started
              </p>
            </div>
          </div>
        ) : (
          <>
            {campaigns.map((campaign, index) => (
              <div key={campaign.id} className="relative">
                <div className="flex justify-between items-center px-4 py-3 border-b border-[#E5E5E7] text-sm text-[#181818]">
                  <div className="flex items-center gap-2">
                    <p>{campaign.title}</p>
                    {!campaign.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p>{getCampaignTypeDisplay(campaign.type)}</p>
                  <p>{formatDateRange(campaign.startDate, campaign.endDate)}</p>
                  <Image
                    className="cursor-pointer"
                    src={five}
                    alt="options"
                    width={35}
                    height={35}
                    onClick={() => {
                      toggleTooltip(index);
                    }}
                  />
                </div>

                {openTooltipIndex === index && (
                  <div className="absolute right-4 top-full z-10 mt-1">
                    <Tooltip
                      campaign={campaign}
                      refetch={refetch}
                      closeTooltip={() => toggleTooltip(null)}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
