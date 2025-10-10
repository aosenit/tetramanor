"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiPhone, FiHeart, FiCamera, FiHome } from "react-icons/fi";
import { FaBed } from "react-icons/fa";
import placeholder from "@/assets/placeholder.jpg";
import { Property } from "../types";
import { Button } from "@/components/ui/button";

interface PropertyCardNewProps {
  property: Property;
  className?: string;
}

export default function PropertyCardNew({ property, className = "" }: PropertyCardNewProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const getPropertyType = () => {
    if (property.units && property.units.length > 0) {
      const unitType = property.units[0].unitType;
      return `${unitType.toLowerCase()} for sale`;
    }
    return "Property for sale";
  };

  const getPrice = () => {
    if (property.units && property.units.length > 0) {
      const unit = property.units[0];
      const currency = unit.currency === "USD" ? "$" : unit.currency === "NGN" ? "₦" : "";
      return `${currency}${unit.unitPrice.toLocaleString()}`;
    }
    return null;
  };

  const getPropertyFeatures = () => {
    // Extract features from property data
    let bedrooms = 0;
    const totalUnits = property.totalUnits || 0;

    // Parse unit types to extract bedroom info
    if (property.units && property.units.length > 0) {
      const unitType = property.units[0].unitType.toLowerCase();
      
      // Extract bedroom count from unit type
      const bedroomMatch = unitType.match(/(\d+)\s*bedroom/i);
      if (bedroomMatch) {
        bedrooms = parseInt(bedroomMatch[1]);
      }
    }

    // Fallback to features array if available
    if (property.features && property.features.length > 0) {
      property.features.forEach(feature => {
        const featureName = feature.name.toLowerCase();
        if (featureName.includes('bedroom')) {
          const match = featureName.match(/(\d+)/);
          if (match) bedrooms = parseInt(match[1]);
        }
      });
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

  const displayImage = property.coverImage?.imageUrl || 
                      property.images?.[0]?.imageUrl || 
                      placeholder;

  return (
    <Link href={`/portfolio/view-property/${property.id}`}>
      <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}>
        {/* Header with Premium Plus Tag */}
        {property.featured && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-sm clip-path-arrow">
              Premium Plus Listing
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Property Image */}
          <div className="relative w-full lg:w-1/2 h-48 lg:h-auto">
            <Image
              src={displayImage}
              alt={property.name}
              fill
              className="object-cover"
            />
            
            {/* Image Count Overlay */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <FiCamera className="w-3 h-3" />
              <span>{property.images?.length || 0}</span>
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
                <span className="text-xs">{property.address}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                {truncateText(property.about, 60)}
              </p>

              {/* More Details Button */}
              <Button 
                variant="link" 
                size="sm"
                className="text-[#116114] p-0 h-auto font-medium hover:underline mb-2 justify-start text-xs"
                asChild
              >
                <Link href={`/portfolio/view-property/${property.id}`}>
                  More details
                </Link>
              </Button>

              {/* Price - only show if available */}
              {getPrice() && (
                <div className="text-[#116114] text-xl font-bold mb-2">
                  {getPrice()}
                </div>
              )}

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
            {getPropertyFeatures().map((feature, index) => (
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
