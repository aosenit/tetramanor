"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Filter } from "lucide-react";

interface FilterState {
  category: string;
  apartmentType: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  furnishing: string;
  amenities: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  apartmentTypes?: string[];
  categories?: string[];
  locations?: string[];
  amenities?: string[];
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

const priceRanges = [
  { value: "none", label: "No Min" },
  { value: "100000", label: "₦100,000" },
  { value: "500000", label: "₦500,000" },
  { value: "1000000", label: "₦1,000,000" },
  { value: "2000000", label: "₦2,000,000" },
  { value: "5000000", label: "₦5,000,000" },
  { value: "10000000", label: "₦10,000,000" },
];

const maxPriceRanges = [
  { value: "none", label: "No Max" },
  { value: "500000", label: "₦500,000" },
  { value: "1000000", label: "₦1,000,000" },
  { value: "2000000", label: "₦2,000,000" },
  { value: "5000000", label: "₦5,000,000" },
  { value: "10000000", label: "₦10,000,000" },
  { value: "20000000", label: "₦20,000,000" },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  isMobile = false,
  onClose,
  apartmentTypes = [],
  categories = [],
  locations = [],
  amenities = [],
}: FilterSidebarProps) {
  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];

    onFilterChange({ ...filters, amenities: newAmenities });
  };

  const activeFilterCount =
    (filters.category !== "" ? 1 : 0) +
    (filters.apartmentType !== "" ? 1 : 0) +
    (filters.location !== "" ? 1 : 0) +
    (filters.minPrice !== "" ? 1 : 0) +
    (filters.maxPrice !== "" ? 1 : 0) +
    (filters.furnishing !== "" ? 1 : 0) +
    filters.amenities.length;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${isMobile ? "h-full overflow-y-auto scrollbar-hide" : ""}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-[#116114] text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Property Type */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">
            Property Type
          </Label>
          <Select
            value={filters.apartmentType || "all"}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                apartmentType: value === "all" ? "" : value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {apartmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {formatApartmentType(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">
            Location
          </Label>
          <Select
            value={filters.location || "all"}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                location: value === "all" ? "" : value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">
            Price Range (Annual)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-600 mb-1">Min Price</Label>
              <Select
                value={filters.minPrice || "none"}
                onValueChange={(value) =>
                  onFilterChange({
                    ...filters,
                    minPrice: value === "none" ? "" : value,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="No Min" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem
                      key={range.value || "none"}
                      value={range.value || "none"}
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-600 mb-1">Max Price</Label>
              <Select
                value={filters.maxPrice || "none"}
                onValueChange={(value) =>
                  onFilterChange({
                    ...filters,
                    maxPrice: value === "none" ? "" : value,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="No Max" />
                </SelectTrigger>
                <SelectContent>
                  {maxPriceRanges.map((range) => (
                    <SelectItem
                      key={range.value || "none"}
                      value={range.value || "none"}
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Furnishing */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">
            Furnishing
          </Label>
          <Select
            value={filters.furnishing || "any"}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                furnishing: value === "any" ? "" : value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {formatCategory(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">
            Amenities
          </Label>
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
            {amenities.length > 0 ? (
              amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                    className="data-[state=checked]:bg-[#116114] data-[state=checked]:border-[#116114]"
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No amenities available</p>
            )}
          </div>
        </div>

        {/* Clear Filters Button */}
        {activeFilterCount > 0 && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="w-full border-[#116114] text-[#116114] hover:bg-[#116114] hover:text-white"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
}

