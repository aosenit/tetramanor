"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaBed, FaDoorOpen } from "react-icons/fa";
import { RentalListingItem } from "@/types/property";
import placeholder from "@/assets/placeholder.svg";

interface RentalPropertyCardProps {
  rental: RentalListingItem;
}

const RentalPropertyCard: React.FC<RentalPropertyCardProps> = ({ rental }) => {
  // Get the main image - prefer coverImage, then first image, then placeholder
  const mainImage = rental.coverImage || rental.images[0] || placeholder;

  // Get bedroom count from apartment type
  const getBedroomCount = (apartmentTypes: string[]) => {
    const type = apartmentTypes[0] || "";
    if (type.includes("1 bedroom")) return 1;
    if (type.includes("2 bedroom")) return 2;
    if (type.includes("3 bedroom")) return 3;
    if (type.includes("4 bedroom")) return 4;
    return 2; // default
  };

  const bedroomCount = getBedroomCount(rental.apartmentType);

  // Format category for display
  const formatCategory = (category: string) => {
    return category.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get primary category
  const primaryCategory = rental.categories[0] ? formatCategory(rental.categories[0]) : "Standard";

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group">
      {/* Image Section */}
      <div className="relative">
        {/* Category Badge */}
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-gray-800/80 px-3 py-1 text-xs font-medium text-white">
          {primaryCategory}
        </div>
        
        {/* Status Badge */}
        <div className="absolute right-4 top-4 z-10 rounded-lg bg-green-600/80 px-3 py-1 text-xs font-medium text-white">
          Available
        </div>
        
        <div className="h-64 w-full overflow-hidden">
          <Image
            src={mainImage}
            alt={rental.name}
            width={600}
            height={400}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-[#f9f9f9]">
        {/* Title and Location */}
        <div className="flex flex-col gap-2 mb-3">
          <h3 className="text-lg font-semibold text-[#1D1D1D] line-clamp-1">
            {rental.name}
          </h3>
          <div className="flex items-center text-sm text-[#4D4E53]">
            <FaMapMarkerAlt className="mr-1 h-3 w-3 text-[#CD6115]" />
            <span className="line-clamp-1">{rental.address}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-[#BBBCCD]">
            <FaBed className="text-[#CD6115] text-sm" />
            <span className="text-xs font-medium text-[#4D4E53]">{bedroomCount} Beds</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-[#BBBCCD]">
            <FaDoorOpen className="text-[#CD6115] text-sm" />
            <span className="text-xs font-medium text-[#4D4E53]">
              {rental.apartmentType[0]?.replace(/_/g, " ") || "Apartment"}
            </span>
          </div>
        </div>

        {/* Amenities Preview */}
        {rental.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {rental.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-[#E8F5E8] text-[#2B5A2B] px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {rental.amenities.length > 3 && (
                <span className="text-xs text-[#4D4E53] px-2 py-1">
                  +{rental.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <Link
            href={`/rental/${rental.id}`}
            className="flex-1 bg-green-700 text-white px-4 py-2 text-sm font-medium text-center rounded-md hover:bg-green-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalPropertyCard;
