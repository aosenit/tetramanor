"use client";

import React, { useState } from "react";
import { RentalUnit } from "@/types/property";
import { FaBed, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import PropertyDetailsModal from "./PropertyDetailsModal";
import SimpleCurrencyToggle from "@/components/ui/SimpleCurrencyToggle";
import {
  convertCurrency,
  formatCurrency,
  Currency,
} from "@/lib/simpleCurrencyConverter";
import Link from "next/link";

interface ApartmentCardProps {
  apartment: RentalUnit;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("USD");

  // Get the best available price and currency for each fee
  const getBestPrice = (ngnAmount: number, usdAmount: number) => {
    // If USD amount is available and greater than 0, use it
    if (usdAmount > 0) {
      return { amount: usdAmount, originalCurrency: "USD" as Currency };
    }
    // Otherwise use NGN amount
    return { amount: ngnAmount, originalCurrency: "NGN" as Currency };
  };

  // Convert and format price for display
  const formatPrice = (ngnAmount: number, usdAmount: number) => {
    const { amount, originalCurrency } = getBestPrice(ngnAmount, usdAmount);

    if (displayCurrency === originalCurrency) {
      return formatCurrency(amount, originalCurrency);
    }

    const convertedAmount = convertCurrency(
      amount,
      originalCurrency,
      displayCurrency
    );
    return formatCurrency(convertedAmount, displayCurrency);
  };

  // Check if price is converted
  const isPriceConverted = (ngnAmount: number, usdAmount: number) => {
    const { originalCurrency } = getBestPrice(ngnAmount, usdAmount);
    return displayCurrency !== originalCurrency;
  };

  // Format category
  const formatCategory = (category: string) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#116114] to-[#0d4d10] p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">
              {apartment.apartmentType}
            </h3>
            <div className="flex items-center text-sm text-white/90">
              <FaMapMarkerAlt className="mr-1 h-3 w-3" />
              <span>{apartment.location}</span>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              apartment.status === "AVAILABLE"
                ? "bg-white text-[#116114]"
                : "bg-red-500 text-white"
            }`}
          >
            {apartment.status === "AVAILABLE" ? "Available" : "Unavailable"}
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-100">
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
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-700">Pricing</h4>
          <SimpleCurrencyToggle
            currentCurrency={displayCurrency}
            onCurrencyChange={setDisplayCurrency}
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Rent Fee ({apartment.frequency.toLowerCase()}):
            </span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">
                {formatPrice(apartment.rentFee, apartment.dollarPrice.rentFee)}
              </span>
              {isPriceConverted(
                apartment.rentFee,
                apartment.dollarPrice.rentFee
              ) && (
                <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                  ~
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Agency Fee:</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">
                {formatPrice(
                  apartment.agencyFee,
                  apartment.dollarPrice.agencyFee
                )}
              </span>
              {isPriceConverted(
                apartment.agencyFee,
                apartment.dollarPrice.agencyFee
              ) && (
                <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                  ~
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Caution Fee:</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">
                {formatPrice(
                  apartment.cautionFee,
                  apartment.dollarPrice.cautionFee
                )}
              </span>
              {isPriceConverted(
                apartment.cautionFee,
                apartment.dollarPrice.cautionFee
              ) && (
                <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                  ~
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Available Units:</span>
            <span className="font-semibold text-gray-900">
              {apartment.numberOfUnits}
            </span>
          </div>
        </div>
        {(apartment.features.length > 0 || apartment.amenities.length > 0) && (
          <div className="mt-4 space-y-2">
            {apartment.features.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Features:
                </h4>
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
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Amenities:
                </h4>
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
        <div className="mt-6 flex flex-col gap-3">
          {apartment.status === "AVAILABLE" ? (
            <Link href="/login" className="w-full">
              <Button className="w-full bg-[#116114] hover:bg-[#0d4d10] text-white font-semibold">
                Rent This Unit
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full bg-gray-300 text-gray-600 cursor-not-allowed"
              disabled
            >
              Not Available
            </Button>
          )}
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="w-full border-[#116114] text-[#116114] hover:bg-[#116114] hover:text-white"
          >
            View Full Details
          </Button>
        </div>
      </div>
      <PropertyDetailsModal
        apartment={apartment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApartmentCard;
