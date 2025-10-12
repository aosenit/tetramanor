"use client";

import React, { useState } from "react";
import { PropertyUnit } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaHome, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import SimpleCurrencyToggle from "@/components/ui/SimpleCurrencyToggle";
import {
  Currency,
  useCurrencyConverter,
  formatCurrency,
} from "@/hooks/useCurrencyConverter";

interface UnitDetailsModalProps {
  unit: PropertyUnit | null;
  propertyName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UnitDetailsModal({
  unit,
  propertyName,
  isOpen,
  onClose,
}: UnitDetailsModalProps) {
  const [displayCurrency, setDisplayCurrency] = useState<Currency>(
    (unit?.currency as Currency) || "NGN"
  );
  const { convertCurrencySync } = useCurrencyConverter();

  if (!unit) return null;

  const originalCurrency = (unit.currency as Currency) || "NGN";

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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {unit.unitType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Name */}
          {propertyName && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Property
              </h4>
              <p className="text-lg font-bold text-gray-900">{propertyName}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Unit Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaHome className="mr-3 h-4 w-4 text-[#116114]" />
                    <div>
                      <span className="text-sm text-gray-500">Unit Type:</span>
                      <p className="font-medium">{unit.unitType}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCheckCircle className="mr-3 h-4 w-4 text-[#116114]" />
                    <div>
                      <span className="text-sm text-gray-500">
                        Availability:
                      </span>
                      <p className="font-medium">
                        {unit.availableUnits > 0 ? "Available" : "Sold Out"}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-3 h-4 w-4 text-[#116114]" />
                    <div>
                      <span className="text-sm text-gray-500">
                        Created Date:
                      </span>
                      <p className="font-medium">
                        {formatDate(unit.createdAt)}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Description */}
              {unit.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {unit.description}
                  </p>
                </div>
              )}
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
                  <span className="text-gray-600">Unit Price:</span>
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
                    <span className="text-gray-600">Price Threshold:</span>
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

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Units:</span>
                    <span className="font-semibold text-gray-900">
                      {unit.numberOfUnits}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Units:</span>
                    <span className="font-semibold text-green-600">
                      {unit.availableUnits}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sold Units:</span>
                    <span className="font-semibold text-gray-900">
                      {unit.numberOfUnits - unit.availableUnits}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Total (All Units):
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-lg text-gray-900">
                        {formatPrice(
                          unit.unitPrice * unit.numberOfUnits,
                          originalCurrency
                        )}
                      </span>
                      {isPriceConverted(originalCurrency) && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                          ~
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            {unit.availableUnits > 0 && (
              <Button className="flex-1 bg-[#116114] hover:bg-[#0d4d10] text-white">
                Express Interest
              </Button>
            )}
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

