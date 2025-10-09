"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RentalUnit } from "@/types/property";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FaBed,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaHome,
  FaCar,
  FaWifi,
  FaSwimmingPool,
  FaDumbbell,
  FaShieldAlt,
  FaTv,
  FaUtensils,
  FaWind,
} from "react-icons/fa";
import placeholder from "@/assets/placeholder.svg";
import SimpleCurrencyToggle from "@/components/ui/SimpleCurrencyToggle";
import {
  Currency,
  useCurrencyConverter,
  formatCurrency,
} from "@/hooks/useCurrencyConverter";

interface PropertyDetailsModalProps {
  apartment: RentalUnit | null;
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
  onScheduleInspectionClick: () => void;
  onRentClick: () => void;
}

// Amenity icon mapping
const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <FaWifi className="h-4 w-4" />,
  parking: <FaCar className="h-4 w-4" />,
  pool: <FaSwimmingPool className="h-4 w-4" />,
  gym: <FaDumbbell className="h-4 w-4" />,
  security: <FaShieldAlt className="h-4 w-4" />,
  tv: <FaTv className="h-4 w-4" />,
  kitchen: <FaUtensils className="h-4 w-4" />,
  ac: <FaWind className="h-4 w-4" />,
  furnished: <FaHome className="h-4 w-4" />,
};

export default function PropertyDetailsModal({
  apartment,
  isOpen,
  onClose,
  onContactClick,
  onScheduleInspectionClick,
  onRentClick,
}: PropertyDetailsModalProps) {
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("USD");
  const { convertCurrencySync } = useCurrencyConverter();

  if (!apartment) return null;

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

    const convertedAmount = convertCurrencySync(
      amount,
      originalCurrency,
      displayCurrency
    );
    return formatCurrency(convertedAmount, displayCurrency);
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

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    for (const [key, icon] of Object.entries(amenityIcons)) {
      if (lowerAmenity.includes(key)) {
        return icon;
      }
    }
    return <FaHome className="h-4 w-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {apartment.apartmentType} - Detailed Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <Image
                src={placeholder}
                alt={apartment.apartmentType}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="relative h-20 w-full rounded overflow-hidden"
                >
                  <Image
                    src={placeholder}
                    alt={`${apartment.apartmentType} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-3 h-4 w-4 text-[#CD6115]" />
                    <span>{apartment.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBed className="mr-3 h-4 w-4 text-[#CD6115]" />
                    <span>{bedroomCount} Bedrooms</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-3 h-4 w-4 text-[#CD6115]" />
                    <span>{apartment.frequency} Rental</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCheckCircle className="mr-3 h-4 w-4 text-[#CD6115]" />
                    <span className="capitalize">
                      {apartment.status === "AVAILABLE"
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {formatCategory(apartment.unitCategory)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {apartment.description}
                </p>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pricing Details
                </h3>
                <SimpleCurrencyToggle
                  currentCurrency={displayCurrency}
                  onCurrencyChange={setDisplayCurrency}
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="font-semibold text-lg text-gray-900">
                    {formatPrice(
                      apartment.rentFee,
                      apartment.dollarPrice.rentFee
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Agency Fee:</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(
                      apartment.agencyFee,
                      apartment.dollarPrice.agencyFee
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Caution Fee:</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(
                      apartment.cautionFee,
                      apartment.dollarPrice.cautionFee
                    )}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Total Move-in Cost:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      {formatPrice(
                        apartment.rentFee +
                          apartment.agencyFee +
                          apartment.cautionFee,
                        apartment.dollarPrice.rentFee +
                          apartment.dollarPrice.agencyFee +
                          apartment.dollarPrice.cautionFee
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Unit Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Property Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Type:</span>
                    <span className="font-medium">
                      {apartment.propertyUnit.unitType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Units:</span>
                    <span className="font-medium">
                      {apartment.propertyUnit.availableUnits}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Units:</span>
                    <span className="font-medium">
                      {apartment.propertyUnit.numberOfUnits}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Price Threshold:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        apartment.propertyUnit.priceThreshold,
                        apartment.propertyUnit.currency as Currency
                      )}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Features and Amenities */}
          <div className="grid md:grid-cols-2 gap-6">
            {apartment.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {apartment.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      <FaHome className="h-3 w-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {apartment.amenities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {apartment.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Property Unit Description */}
          {apartment.propertyUnit.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Property Overview
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {apartment.propertyUnit.description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            {apartment.status === "AVAILABLE" ? (
              <Button
                onClick={onRentClick}
                className="w-full bg-green-700 hover:bg-green-800 text-white"
              >
                Rent This Apartment
              </Button>
            ) : (
              <Button
                className="flex-1 bg-gray-400 text-gray-600 cursor-not-allowed"
                disabled
              >
                Not Available
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1"
              onClick={onScheduleInspectionClick}
            >
              Schedule Viewing
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onContactClick}
            >
              Contact Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
