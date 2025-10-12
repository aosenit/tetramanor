"use client";

import React, { useState } from "react";
import { PropertyUnit } from "../../types";
import { FaHome, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SimpleCurrencyToggle from "@/components/ui/SimpleCurrencyToggle";
import {
  Currency,
  useCurrencyConverter,
  formatCurrency,
} from "@/hooks/useCurrencyConverter";
import UnitDetailsModal from "./UnitDetailsModal";

interface UnitCardProps {
  unit: PropertyUnit;
  propertyName?: string;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, propertyName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState<Currency>(
    unit.currency as Currency || "NGN"
  );
  const { convertCurrencySync } = useCurrencyConverter();

  // Convert and format price for display
  const formatPrice = (amount: number, originalCurrency: Currency) => {
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

  // Check if price is converted
  const isPriceConverted = (originalCurrency: Currency) => {
    return displayCurrency !== originalCurrency;
  };

  const originalCurrency = (unit.currency as Currency) || "NGN";

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#116114] to-[#0d4d10] p-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">{unit.unitType}</h3>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-100">
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {unit.description}
        </p>

        {/* Unit Details */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <FaCheckCircle className="mr-2 h-4 w-4 text-[#116114]" />
            <span>{unit.availableUnits} Units Available</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-700">Unit Price</h4>
          <SimpleCurrencyToggle
            currentCurrency={displayCurrency}
            onCurrencyChange={setDisplayCurrency}
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Price per unit:</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-xl text-[#116114]">
                {formatPrice(unit.unitPrice, originalCurrency)}
              </span>
              {isPriceConverted(originalCurrency) && (
                <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                  ~
                </span>
              )}
            </div>
          </div>

          {unit.priceThreshold && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Price Threshold:</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">
                  {formatPrice(unit.priceThreshold, originalCurrency)}
                </span>
                {isPriceConverted(originalCurrency) && (
                  <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                    ~
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {unit.availableUnits > 0 ? (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#116114] hover:bg-[#0d4d10] text-white font-semibold"
            >
              View  Details
            </Button>
          ) : (
            <Button
              className="w-full bg-gray-300 text-gray-600 cursor-not-allowed"
              disabled
            >
              Sold Out
            </Button>
          )}
        </div>
      </div>

      <UnitDetailsModal
        unit={unit}
        propertyName={propertyName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UnitCard;

