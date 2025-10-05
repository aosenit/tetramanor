"use client";

import React, { useState } from "react";
import { RentalUnit } from "@/types/property";
import { FaBed, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import PropertyDetailsModal from "./PropertyDetailsModal";

interface ApartmentCardProps {
  apartment: RentalUnit;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format category
  const formatCategory = (category: string) => {
    return category.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get bedroom count from apartment type
  const getBedroomCount = (apartmentType: string) => {
    if (apartmentType.includes("1 bedroom")) return 1;
    if (apartmentType.includes("2 bedroom")) return 2;
    if (apartmentType.includes("3 bedroom")) return 3;
    if (apartmentType.includes("4 bedroom")) return 4;
    return 2; // default
  };

  const bedroomCount = getBedroomCount(apartment.apartmentType);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {apartment.apartmentType}
            </h3>
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-1 h-3 w-3 text-[#CD6115]" />
              <span>{apartment.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <FaCheckCircle className="mr-1 h-3 w-3" />
              {apartment.status}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {apartment.description}
        </p>

        {/* Property Details */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <FaBed className="mr-2 h-4 w-4 text-[#CD6115]" />
            <span>{bedroomCount} Bedrooms</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 h-4 w-4 text-[#CD6115]" />
            <span>{apartment.frequency}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {formatCategory(apartment.unitCategory)}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Rent Fee:</span>
            <span className="font-semibold text-gray-900">
              {apartment.dollarPrice.rentFee > 0 
                ? formatCurrency(apartment.dollarPrice.rentFee, apartment.dollarPrice.currency)
                : formatCurrency(apartment.rentFee, apartment.propertyUnit.currency)
              }
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Agency Fee:</span>
            <span className="font-semibold text-gray-900">
              {apartment.dollarPrice.agencyFee > 0 
                ? formatCurrency(apartment.dollarPrice.agencyFee, apartment.dollarPrice.currency)
                : formatCurrency(apartment.agencyFee, apartment.propertyUnit.currency)
              }
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Caution Fee:</span>
            <span className="font-semibold text-gray-900">
              {apartment.dollarPrice.cautionFee > 0 
                ? formatCurrency(apartment.dollarPrice.cautionFee, apartment.dollarPrice.currency)
                : formatCurrency(apartment.cautionFee, apartment.propertyUnit.currency)
              }
            </span>
          </div>
        </div>

        {/* Features and Amenities */}
        {(apartment.features.length > 0 || apartment.amenities.length > 0) && (
          <div className="mt-4 space-y-2">
            {apartment.features.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {apartment.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {apartment.features.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{apartment.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {apartment.amenities.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-1">
                  {apartment.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {apartment.amenities.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{apartment.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="outline" 
            className="w-full"
          >
            View Details
          </Button>
          <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
            Rent This Apartment
          </Button>
        </div>
      </div>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        apartment={apartment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApartmentCard;
