"use client";
import React from "react";
import Image from "next/image";
import three from "@/assets/admin/home/three.webp";
import four from "@/assets/admin/home/four.webp";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import one from "@/assets/admin/home/one.webp";
import OngoingCampaigns from "./OngoingCampaigns";
import PropertySelector from "./modals/PropertySelector";



export default function FeaturedProperty() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="bg-white space-y-10 p-4">
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
        <div className="w-full  rounded-lg p-4 bg-[#F4F4F4] shadow-sm space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[#181818] font-medium text-base">
                Featured property
              </p>
              <Image
                src={three}
                alt="Featured property"
                width={35}
                height={35}
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-[#4C5560]">
              Set the property that appears at the top of the homepage
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[#000000] font-medium">
              Current -{" "}
              <span className="text-[#116114] text-sm">Tm highgardens</span>
            </p>

            <div className="flex gap-4 items-center">
              <Image
                src={four}
                alt="Featured property"
                width={120}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex gap-2">
                <button className="border bg-white font-medium rounded-md px-3 py-1 text-sm">
                  View
                </button>
                <button className="border bg-white rounded-md font-medium px-3 py-1 text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 bg-[#116114] hover:bg-[#116114] text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              Select new property
              <MdOutlineKeyboardArrowDown />
            </button>
            <PropertySelector
              open={showModal}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
        <div className="w-full  rounded-lg p-4 bg-[#F4F4F4] shadow-sm space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[#181818] font-medium text-base">
                Rental Highlight
              </p>
              <Image src={one} alt="Featured property" width={35} height={35} />
            </div>
          </div>
          <div>
            <p className="text-xs text-[#4C5560]">
              Set the property that appears at the top of the homepage
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[#000000] font-medium">
              Current -{" "}
              <span className="text-[#116114] text-sm">Queen Mary –</span>-
              <span className="text-[#116114] text-sm">
                {" "}
                2 Bedroom Apartment
              </span>
            </p>

            <div className="flex gap-4 items-center">
              <Image
                src={four}
                alt="Featured property"
                width={120}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex gap-2">
                <button className="border bg-white font-medium rounded-md px-3 py-1 text-sm">
                  View
                </button>
                <button className="border bg-white rounded-md font-medium px-3 py-1 text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div>
            <button className="flex items-center gap-1 bg-[#116114] hover:bg-[#116114] text-white text-sm font-medium px-4 py-2 rounded-md">
              Select new property
              <MdOutlineKeyboardArrowDown />
            </button>
          </div>
        </div>
      </div>
      <OngoingCampaigns />
    </div>
  );
}
