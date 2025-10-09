"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaHome, FaBuilding, FaCouch, FaBed } from "react-icons/fa";

interface QuickFiltersProps {
  activeType: string;
  activeFurnishing: string;
  onTypeChange: (type: string) => void;
  onFurnishingChange: (furnishing: string) => void;
}

const propertyTypes = [
  { value: "all", label: "All Properties", icon: FaHome },
  { value: "STUDIO", label: "Studio", icon: FaBed },
  { value: "ONE_BEDROOM", label: "1 Bedroom", icon: FaBed },
  { value: "TWO_BEDROOM", label: "2 Bedrooms", icon: FaBuilding },
  { value: "THREE_BEDROOM", label: "3 Bedrooms", icon: FaBuilding },
];

const furnishingOptions = [
  { value: "any", label: "Any" },
  { value: "furnished", label: "Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export default function QuickFilters({
  activeType,
  activeFurnishing,
  onTypeChange,
  onFurnishingChange,
}: QuickFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="space-y-4">
        {/* Property Types */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Property Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              const isActive = (activeType || "all") === type.value;
              return (
                <Button
                  key={type.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTypeChange(type.value === "all" ? "" : type.value)}
                  className={`${
                    isActive
                      ? "bg-[#116114] text-white hover:bg-[#0d4d10]"
                      : "border-gray-300 text-gray-700 hover:border-[#116114] hover:text-[#116114]"
                  } transition-colors`}
                >
                  <Icon className="w-3 h-3 mr-2" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Furnishing Options */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Furnishing
          </h3>
          <div className="flex flex-wrap gap-2">
            {furnishingOptions.map((option) => {
              const isActive = (activeFurnishing || "any") === option.value;
              return (
                <Button
                  key={option.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFurnishingChange(option.value === "any" ? "" : option.value)}
                  className={`${
                    isActive
                      ? "bg-[#CD6115] text-white hover:bg-[#b55512]"
                      : "border-gray-300 text-gray-700 hover:border-[#CD6115] hover:text-[#CD6115]"
                  } transition-colors`}
                >
                  {option.value === "furnished" && (
                    <FaCouch className="w-3 h-3 mr-2" />
                  )}
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

