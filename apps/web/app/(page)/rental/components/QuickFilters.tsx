"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaHome, FaBuilding, FaCouch, FaBed } from "react-icons/fa";

interface QuickFiltersProps {
  activeType: string;
  activeFurnishing: string;
  onTypeChange: (type: string) => void;
  onFurnishingChange: (furnishing: string) => void;
  apartmentTypes?: string[];
  categories?: string[];
}

// Helper function to format apartment type labels
const formatApartmentType = (type: string) => {
  return type
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Helper function to format category labels
const formatCategory = (category: string) => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function QuickFilters({
  activeType,
  activeFurnishing,
  onTypeChange,
  onFurnishingChange,
  apartmentTypes = [],
  categories = [],
}: QuickFiltersProps) {
  // Create property types from backend data
  const propertyTypes = [
    { value: "all", label: "All Properties", icon: FaHome },
    ...apartmentTypes.map((type) => ({
      value: type,
      label: formatApartmentType(type),
      icon: type.includes("BEDROOM") ? FaBuilding : FaBed,
    })),
  ];

  // Create furnishing options from backend data
  const furnishingOptions = [
    { value: "any", label: "Any" },
    ...categories.map((category) => ({
      value: category,
      label: formatCategory(category),
    })),
  ];
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
                  onClick={() =>
                    onTypeChange(type.value === "all" ? "" : type.value)
                  }
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
                  onClick={() =>
                    onFurnishingChange(
                      option.value === "any" ? "" : option.value
                    )
                  }
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

