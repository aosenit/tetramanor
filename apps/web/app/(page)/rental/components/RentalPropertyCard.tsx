"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaDoorOpen,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { RentalListingItem } from "@/types/property";
import placeholder from "@/assets/placeholder.svg";

interface RentalPropertyCardProps {
  rental: RentalListingItem;
  viewMode?: "grid" | "list";
}

const RentalPropertyCard: React.FC<RentalPropertyCardProps> = ({
  rental,
  viewMode = "grid",
}) => {
  // Get the main image - prefer coverImage, then first image, then placeholder
  const mainImage =
    rental.coverImage?.imageUrl || rental.images[0]?.imageUrl || placeholder;

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get primary category
  const primaryCategory = rental.categories[0]
    ? formatCategory(rental.categories[0])
    : "Standard";

  // Format apartment type
  const formatApartmentType = (type: string) => {
    return type?.replace(/_/g, " ") || "Apartment";
  };

  if (viewMode === "list") {
    return (
      <Link href={`/rental/${rental.id}`}>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex flex-col sm:flex-row">
            {/* Image Section */}
            <div className="relative sm:w-80 h-64 sm:h-auto overflow-hidden">
              <div className="absolute left-4 top-4 z-10 rounded-md bg-[#116114]/90 px-2 py-1 text-xs font-medium text-white">
                {primaryCategory}
              </div>
              <div className="absolute right-4 top-4 z-10 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-[#116114]">
                Available
              </div>
              <Image
                src={mainImage}
                alt={rental.name}
                width={400}
                height={300}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#116114] transition-colors">
                    {rental.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-2 h-4 w-4 text-[#CD6115]" />
                    <span>{rental.address}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {rental.apartmentType.slice(0, 2).map((type, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-[#116114] text-[#116114] bg-[#E8F5E8]"
                      >
                        <FaDoorOpen className="mr-1 h-3 w-3" />
                        {formatApartmentType(type)}
                      </Badge>
                    ))}
                  </div>

                  {rental.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {rental.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {rental.amenities.length > 4 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{rental.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[#116114] font-semibold text-lg">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link href={`/rental/${rental.id}`}>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
        {/* Image Section */}
        <div className="relative">
          {/* Category Badge */}
          <div className="absolute left-3 top-3 z-10 rounded-md bg-[#116114]/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
            {primaryCategory}
          </div>

          {/* Status Badge */}
          <div className="absolute right-3 top-3 z-10 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-[#116114] shadow-sm">
            Available
          </div>

          <div className="h-56 w-full overflow-hidden bg-gray-100">
            <Image
              src={mainImage}
              alt={rental.name}
              width={600}
              height={400}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Image Count Indicator */}
          {rental.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
              +{rental.images.length} photos
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col bg-white">
          {/* Title and Location */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#116114] transition-colors">
              {rental.name}
            </h3>

            <div className="flex items-center text-sm text-gray-600 mb-3">
              <FaMapMarkerAlt className="mr-1.5 h-3.5 w-3.5 text-[#CD6115] flex-shrink-0" />
              <span className="line-clamp-1">{rental.address}</span>
            </div>

            {/* Property Type */}
            {rental.apartmentType.length > 0 && (
              <div className="mb-3">
                <Badge
                  variant="outline"
                  className="border-[#116114] text-[#116114] bg-[#E8F5E8] font-medium"
                >
                  <FaDoorOpen className="mr-1 h-3 w-3" />
                  {formatApartmentType(rental.apartmentType[0])}
                </Badge>
              </div>
            )}

            {/* Amenities Preview */}
            {rental.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {rental.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded border border-gray-200"
                  >
                    {amenity}
                  </span>
                ))}
                {rental.amenities.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1 font-medium">
                    +{rental.amenities.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="bg-[#116114] text-white px-4 py-2.5 text-sm font-semibold text-center rounded-md group-hover:bg-[#0d4d10] transition-colors">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RentalPropertyCard;
