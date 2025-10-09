"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiPhone, FiHeart, FiCamera, FiHome } from "react-icons/fi";
import { FaBed } from "react-icons/fa";
import placeholder from "@/assets/placeholder.jpg";
import { RentalListingItem } from "@/types/property";
import { Button } from "@/components/ui/button";

interface RentalPropertyCardNewProps {
  rental: RentalListingItem;
  className?: string;
}

export default function RentalPropertyCardNew({ rental, className = "" }: RentalPropertyCardNewProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const getPropertyType = () => {
    if (rental.apartmentType && rental.apartmentType.length > 0) {
      const apartmentType = rental.apartmentType[0];
      return `${apartmentType.toLowerCase().replace(/_/g, ' ')} for rent`;
    }
    return "Property for rent";
  };

  const getRentalFeatures = () => {
    // Extract features from rental data
    let bedrooms = 0;
    let totalUnits = 1; // Default for rental properties

    // Parse apartment type to extract bedroom info
    if (rental.apartmentType && rental.apartmentType.length > 0) {
      const apartmentType = rental.apartmentType[0].toLowerCase();
      
      // Extract bedroom count from apartment type
      const bedroomMatch = apartmentType.match(/(\d+)\s*bedroom/i);
      if (bedroomMatch) {
        bedrooms = parseInt(bedroomMatch[1]);
      }
    }

    // Build features array with labels in front like the reference image
    const features = [];
    
    if (bedrooms > 0) {
      features.push({ 
        icon: FaBed, 
        label: `${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`, 
        value: bedrooms.toString() 
      });
    }
    
    if (totalUnits > 0) {
      features.push({ 
        icon: FiHome, 
        label: `${totalUnits} Unit${totalUnits > 1 ? 's' : ''}`, 
        value: totalUnits.toString() 
      });
    }

    return features;
  };

  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const displayImage = rental.coverImage?.imageUrl || 
                      rental.images?.[0]?.imageUrl || 
                      placeholder;

  return (
    <Link href={`/rental/${rental.id}`}>
      <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}>
        {/* Header with Category Tag */}
        {rental.categories && rental.categories.length > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-sm clip-path-arrow">
              {rental.categories[0].replace(/_/g, ' ').toUpperCase()}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Property Image */}
          <div className="relative w-full lg:w-1/2 h-48 lg:h-auto">
            <Image
              src={displayImage}
              alt={rental.name}
              fill
              className="object-cover"
            />
            
            {/* Status Badge */}
            <div className="absolute top-2 left-2 bg-white/95 text-[#116114] text-xs font-medium px-2 py-1 rounded shadow-sm">
              Available
            </div>
            
            {/* Image Count Overlay */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <FiCamera className="w-3 h-3" />
              <span>{rental.images?.length || 0}</span>
            </div>
          </div>

          {/* Right Side - Property Details */}
          <div className="w-full lg:w-1/2 p-4 flex flex-col justify-between">
            <div>
              {/* Property Type */}
              <h3 className="text-[#116114] font-semibold text-base mb-1">
                {getPropertyType()}
              </h3>

              {/* Location */}
              <div className="flex items-center text-gray-700 mb-2">
                <FiMapPin className="w-3 h-3 mr-1" />
                <span className="text-xs">{rental.address}</span>
              </div>

              {/* Description - using apartment type as description */}
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                {truncateText(rental.name, 60)}
              </p>

              {/* More Details Button */}
              <Button 
                variant="link" 
                size="sm"
                className="text-[#116114] p-0 h-auto font-medium hover:underline mb-4 justify-start text-xs"
                asChild
              >
                <Link href={`/rental/${rental.id}`}>
                  More details
                </Link>
              </Button>

              {/* Agent/Company Info */}
              <div className="text-gray-700 text-xs">
                <div className="font-medium mb-1">Tetramanor Properties</div>
                <div className="flex items-center">
                  <FiPhone className="w-3 h-3 mr-1" />
                  <span>+234 800 000 0000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Features and Save */}
        <div className="bg-[#E8F5E8] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getRentalFeatures().map((feature, index) => (
              <div key={index} className="flex items-center gap-1 text-[#116114]">
                <feature.icon className="w-3 h-3" />
                <span className="text-xs font-medium">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <button
            onClick={handleFavorite}
            className={`flex items-center gap-1 text-xs font-medium transition-colors ${
              isFavorited 
                ? 'text-[#116114]' 
                : 'text-gray-700 hover:text-[#116114]'
            }`}
          >
            <FiHeart className={`w-3 h-3 ${isFavorited ? 'fill-current' : ''}`} />
            <span>Save</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
