"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaExchangeAlt } from "react-icons/fa";
import { Currency, getCurrencySymbol } from "@/hooks/useCurrencyConverter";

interface SimpleCurrencyToggleProps {
  onCurrencyChange: (currency: Currency) => void;
  currentCurrency: Currency;
  className?: string;
  availableCurrencies?: Currency[];
}

export default function SimpleCurrencyToggle({
  onCurrencyChange,
  currentCurrency,
  className = "",
  availableCurrencies = ['USD', 'NGN'],
}: SimpleCurrencyToggleProps) {
  const [isVisible, setIsVisible] = useState(false);

  const getCurrencyLabel = (currency: Currency) => {
    return currency;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center gap-2 text-xs px-3 py-1 h-8"
      >
        <FaExchangeAlt className="h-3 w-3" />
        <span>{getCurrencySymbol(currentCurrency)}</span>
        <span>{getCurrencyLabel(currentCurrency)}</span>
      </Button>

      {/* Dropdown Menu */}
      {isVisible && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
          <div className="py-1">
            {availableCurrencies.map((currency) => (
              <button
                key={currency}
                onClick={() => {
                  onCurrencyChange(currency);
                  setIsVisible(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                  currentCurrency === currency ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span>{getCurrencySymbol(currency)}</span>
                <span>{currency}</span>
                {currentCurrency === currency && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isVisible && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsVisible(false)}
        />
      )}
    </div>
  );
}
