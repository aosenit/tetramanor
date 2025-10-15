"use client";

import React, { useState } from "react";
import { RentalUnit } from "@/types/property";
import { FaCalendarAlt, FaCouch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import PropertyDetailsModal from "./PropertyDetailsModal";
import RentalInquiryModal from "./RentalInquiryModal";
import ContactModal from "./ContactModal";
import ScheduleInspectionModal from "./ScheduleInspectionModal";
import SimpleCurrencyToggle from "@/components/ui/SimpleCurrencyToggle";
import {
  Currency,
  useCurrencyConverter,
  formatCurrency,
} from "@/hooks/useCurrencyConverter";

// Utility function to format text from backend (removes underscores and formats properly)
const formatBackendText = (text: string): string => {
  if (!text) return "";
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

interface ApartmentCardProps {
  apartment: RentalUnit;
  propertyName?: string;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartment,
  propertyName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("NGN");
  const { convertCurrencySync } = useCurrencyConverter();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#116114] to-[#0d4d10] p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">
              {apartment.apartmentType}
            </h3>
            <div className="flex items-center text-sm text-white">
              <FaCouch className="mr-1.5 h-3.5 w-3.5 text-[#CD6115]" />
              <span className="font-medium">
                {formatBackendText(apartment.unitCategory)}
              </span>
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
            <FaCalendarAlt className="mr-2 h-4 w-4 text-[#CD6115]" />
            <span>{apartment.frequency}</span>
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
            <span className="font-semibold text-gray-900">
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
            <span className="text-sm text-gray-600">Agency Fee:</span>
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
            <span className="text-sm text-gray-600">Caution Fee:</span>
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

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Number of Units:</span>
            <span className="font-semibold text-gray-900">
              {apartment.numberOfUnits === 0
                ? "Unavailable"
                : apartment.numberOfUnits}
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
                  {apartment.features.slice(0, 3).map((feature, index) => {
                    // Handle both string and object formats
                    const isString = typeof feature === "string";
                    const featureName = isString ? feature : feature.name;
                    const featureKey = isString
                      ? `feature-${index}`
                      : feature.id;

                    return (
                      <span
                        key={featureKey}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {featureName.toUpperCase()}
                      </span>
                    );
                  })}
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
                  {apartment.amenities.slice(0, 3).map((amenity, index) => {
                    // Handle both string and object formats
                    const isString = typeof amenity === "string";
                    const amenityName = isString ? amenity : amenity.name;
                    const amenityKey = isString
                      ? `amenity-${index}`
                      : amenity.id;

                    return (
                      <span
                        key={amenityKey}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                      >
                        {amenityName.toUpperCase()}
                      </span>
                    );
                  })}
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
            <Button
              onClick={() => setIsInquiryModalOpen(true)}
              className="w-full bg-[#116114] hover:bg-[#0d4d10] text-white font-semibold"
            >
              Rent This Unit
            </Button>
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
        onContactClick={() => {
          setIsModalOpen(false);
          setIsContactModalOpen(true);
        }}
        onScheduleInspectionClick={() => {
          setIsModalOpen(false);
          setIsInspectionModalOpen(true);
        }}
        onRentClick={() => {
          setIsModalOpen(false);
          setIsInquiryModalOpen(true);
        }}
      />
      <RentalInquiryModal
        apartment={apartment}
        propertyName={propertyName}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyName={apartment.apartmentType}
        rentalId={apartment.id}
      />
      <ScheduleInspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
        propertyId={apartment.propertyId}
        propertyName={apartment.apartmentType}
      />
    </div>
  );
};

export default ApartmentCard;
