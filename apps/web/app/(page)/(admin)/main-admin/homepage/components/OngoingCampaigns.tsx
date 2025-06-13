"use client";
import { Building2, Plus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import two from "@/assets/admin/home/two.webp";
import five from "@/assets/admin/home/five.svg";
import Tooltip from "./modals/Tooltip";

export default function OngoingCampaigns() {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  

  const toggleTooltip = (index: number) => {
    setOpenTooltipIndex((prev) => (prev === index ? null : index));
  };

  const campaigns = [
    {
      title: "TM HighGardens Promo",
      type: "Investment",
      date: "Apr 20 – May 30, 2025",
    },
    {
      title: "Queen Mary Summer Sale",
      type: "Sale",
      date: "May 1 – June 15, 2025",
    },
  ];
  return (
    <div>
      <div className="bg-[#F4F4F4]   rounded-lg  space-y-4">
        <div className="flex flex-row  p-4 items-start justify-between">
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
          <button className="bg-[#116114] text-white flex items-center gap-1 px-3 py-2 rounded-md font-medium text-sm hover:bg-[#116114]">
            <Plus />
            Add new campaign
          </button>
        </div>
        <div className="flex justify-between items-center bg-[#E5E5E7] text-xs font-medium text-[#181818] px-4 py-4">
          <p>Campaign title</p>
          <p>Type</p>
          <p>Date</p>
          <p>Action</p>
        </div>
        <>
          {campaigns.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex justify-between items-center px-4 py-3 border-b border-[#E5E5E7] text-sm text-[#181818]">
                <p>{item.title}</p>
                <p>{item.type}</p>
                <p>{item.date}</p>
                <Image
                  className="cursor-pointer"
                  src={five}
                  alt="options"
                  width={35}
                  height={35}
                  onClick={() => toggleTooltip(index)}
                />
              </div>

              {openTooltipIndex === index && (
                <div className="absolute right-4 top-full z-10 mt-1">
                  <Tooltip />
                </div>
              )}
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
