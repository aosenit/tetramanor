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
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("NGN");
  const { convertCurrencySync } = useCurrencyConverter();

  if (!apartment) return null;

  // Format category
  const formatCategory = (category: string) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    if (!amenity) {
      return <FaHome className="h-4 w-4" />;
    }
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
            {apartment.apartmentType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
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
                  <span className="text-gray-600">
                    {apartment.frequency === "MONTHLY"
                      ? "Monthly Rent:"
                      : `Rent (${apartment.frequency}):`}
                  </span>
                  <span className="font-semibold text-lg text-gray-900">
                    {displayCurrency === "NGN"
                      ? formatCurrency(apartment.rentFee, "NGN")
                      : formatCurrency(
                          convertCurrencySync(
                            apartment.rentFee,
                            "NGN",
                            displayCurrency
                          ),
                          displayCurrency
                        )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Agency Fee:</span>
                  <span className="font-semibold text-gray-900">
                    {displayCurrency === "NGN"
                      ? formatCurrency(apartment.agencyFee, "NGN")
                      : formatCurrency(
                          convertCurrencySync(
                            apartment.agencyFee,
                            "NGN",
                            displayCurrency
                          ),
                          displayCurrency
                        )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Caution Fee:</span>
                  <span className="font-semibold text-gray-900">
                    {displayCurrency === "NGN"
                      ? formatCurrency(apartment.cautionFee, "NGN")
                      : formatCurrency(
                          convertCurrencySync(
                            apartment.cautionFee,
                            "NGN",
                            displayCurrency
                          ),
                          displayCurrency
                        )}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Total Move-in Cost:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      {displayCurrency === "NGN"
                        ? formatCurrency(
                            apartment.rentFee +
                              apartment.agencyFee +
                              apartment.cautionFee,
                            "NGN"
                          )
                        : formatCurrency(
                            convertCurrencySync(
                              apartment.rentFee +
                                apartment.agencyFee +
                                apartment.cautionFee,
                              "NGN",
                              displayCurrency
                            ),
                            displayCurrency
                          )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Rental Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Category:</span>
                    <span className="font-medium">
                      {formatCategory(apartment.unitCategory)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Units:</span>
                    <span className="font-medium">
                      {apartment.numberOfUnits === 0
                        ? "Unavailable"
                        : apartment.numberOfUnits}
                    </span>
                  </div>
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
                  {apartment.features.map((feature, index) => {
                    // Handle both string and object formats
                    const isString = typeof feature === "string";
                    const featureName = isString ? feature : feature.name;
                    const featureIcon = isString ? null : feature.icon;
                    const featureKey = isString
                      ? `feature-${index}`
                      : feature.id;

                    return (
                      <span
                        key={featureKey}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {featureIcon && featureIcon.trim() !== "" ? (
                          <Image
                            src={featureIcon}
                            alt=""
                            width={12}
                            height={12}
                            className="object-contain"
                          />
                        ) : (
                          getAmenityIcon(featureName)
                        )}
                        {featureName.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              </div>
            )
            }

            {apartment.amenities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {apartment.amenities.map((amenity, index) => {
                    // Handle both string and object formats
                    const isString = typeof amenity === "string";
                    const amenityName = isString ? amenity : amenity.name;
                    const amenityIcon = isString ? null : amenity.icon;
                    const amenityKey = isString
                      ? `amenity-${index}`
                      : amenity.id;

                    return (
                      <span
                        key={amenityKey}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {amenityIcon && amenityIcon.trim() !== "" ? (
                          <Image
                            src={amenityIcon}
                            alt=""
                            width={12}
                            height={12}
                            className="object-contain"
                          />
                        ) : (
                          getAmenityIcon(amenityName)
                        )}
                        {amenityName.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
