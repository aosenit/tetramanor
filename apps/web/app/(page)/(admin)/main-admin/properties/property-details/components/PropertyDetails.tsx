import Image from "next/image";
import { ChevronUp, Download } from "lucide-react";
import React from "react";
import { GrLocation } from "react-icons/gr";
import four from "@/assets/admin/home/four.webp";
import c from "@/assets/investment/icons/c.webp";
import h from "@/assets/investment/icons/h.svg";
import g from "@/assets/investment/icons/g.svg";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Contact from "./Contact";

const features = [
  "High-Quality Kitchen Cabinets & Wardrobes",
  "Walk-in Closets",
  "POP Ceilings",
  "Premium Sanitary Fittings",
  "Vintage PVC French Windows",
  "Uninterrupted Power Supply",
  "Efficient Waste Disposal & Central Sewage Management",
  "Vitrified & Granite Tiles",
  "Backup Power Supply",
  "24/7 Concierge Services",
];
const amenities = [
  "Fiber Optic Connectivity",
  "Fully Equipped Gym",
  "Stunning Sea View",
  "Uninterrupted Power Supply",
  "Stunning Sea View",
  "Lounge/Bar",
  "Fiber Optic Connectivity",
  "24/7 Concierge Services",
  "State of the art interior decor",
];
const advantages = [
  {
    icon: c,
    title: "High Returns",
    description: "Earn up to 50% ROI over a short duration (~18 months)",
  },
  {
    icon: g,
    title: "Minimal Risk",
    description:
      "Tetramanor handles the entire process, from land acquisition to sales",
  },
  {
    icon: h,
    title: "Flexible Investment Options",
    description: "Choose between Fixed ROI or Equity-Based Profit Sharing",
  },
  {
    icon: h,
    title: "Flexible Investment Options",
    description: "Choose between Fixed ROI or Equity-Based Profit Sharing",
  },
];
export default function PropertyDetails () {
  return (
    <div className="min-h-screen px-4">
      <div className="border-b">
        <div className="py-2">
          <nav className="">
            <span className="text-[#858C95]">Home</span>
            <span className="mx-2 text-xl text-[#116114]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              property overview
            </span>
          </nav>
        </div>
      </div>

      <div className="mt-2">
        <div className="">
          <h2 className="text-sm font-medium text-[#323539] mb-4">
            View property listing
          </h2>
        </div>
        <div className="bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-medium text-[#116114]">
              View property details
            </h2>
            <Button className="bg-[#116114] text-white">
              <Download className="w-4 h-4 mr-2" />
              Download brochure
            </Button>
          </div>

          {/* Property Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src={four}
                alt="Property exterior view"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src={four}
                alt="Property exterior view"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src={four}
                alt="Property exterior view"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-12">
                <label className="text-xs font-medium text-[#181818] block ">
                  Property name
                </label>
                <p className="text-[#116114] font-medium text-sm">Tm meadows</p>
              </div>

              <div className="flex gap-4 items-start">
                {/* Label on the left */}
                <label className="text-xs font-medium text-[#181818] min-w-[100px] pt-2">
                  Property units
                </label>

                {/* Collapsible on the right */}
                <Collapsible className="flex-1 mt-1">
                  <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                    <span className="text-[#116114] font-medium text-sm">
                      8 Units
                    </span>
                    <ChevronUp className="text-[#4C5560]" />
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="text-sm text-[#4C5560] space-y-1">
                      <p>2 bedroom condo</p>
                      <p>Studio apartment (3)</p>
                      <p>4 bedroom Maisonettes (2)</p>
                      <p>3 bedroom Apartment</p>
                      <p>4 bedroom + BQ Semi-Detached Duplexes</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#116114] flex  gap-2 items-center">
                  <GrLocation />
                  Ebute meta lagos
                </p>
              </div>
              <div>
                <p className="text-sm text-[#4C5560]">Ongoing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[#181818] mb-4">
          Why invest:{" "}
        </h2>
        <p className="text-[#116114] text-sm font-medium">
          Exceptional Location, Guaranteed Returns
        </p>
        <p className="text-sm leading-relaxed text-[#181818] mt-2">
          Positioned in the heart of Victoria Island, this stunning apartment
          complex is designed for both luxury and high returns. Investors
          benefit from its prime location, which is just minutes away from
          Lagos’ financial district, major shopping centers, and vibrant
          nightlife. The property is designed with modern architecture and
          offers 24/7 power supply, dedicated parking, and top-tier security,
          ensuring tenant satisfaction and retention. With steady market
          appreciation and a growing demand for upscale living, this investment
          is set to yield substantial returns.
        </p>
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[#181818] mb-4">
          Advantage of investment{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advantages.map((adv, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <Image
                src={adv.icon}
                alt="Investment advantage icon"
                width={40}
                height={40}
              />
              <div>
                <h4 className="text-[#116114] font-semibold">{adv.title}</h4>
                <p className="text-sm text-[#202020]">{adv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white mt-4 p-8 space-y-6">
        <h2 className="text-sm font-medium text-[#181818]  mb-6">Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
            >
              <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
              <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden  w-full">
                {feature}
              </span>
            </div>
          ))}
        </div>
        <h2 className="text-sm font-medium text-[#181818] mb-6">Amenities </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
            >
              <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
              <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden  w-full">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </div>
        <Contact/>
    </div>
  );
}
