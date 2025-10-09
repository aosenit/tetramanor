"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Currency,
  useCurrencyConverter,
  formatCurrency,
  CurrencyConversionResponse,
} from "@/hooks/useCurrencyConverter";
import { FaExchangeAlt, FaSpinner } from "react-icons/fa";

export default function CurrencyConverterDemo() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
  const [toCurrency, setToCurrency] = useState<Currency>("NGN");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const { convertCurrency, useConversionRate } = useCurrencyConverter();

  // Use the conversion rate hook for real-time rates
  const { data: rateData, isLoading: isRateLoading } = useConversionRate(
    fromCurrency,
    toCurrency,
    amount
  ) as { data: CurrencyConversionResponse | undefined; isLoading: boolean };

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const result = await convertCurrency(amount, fromCurrency, toCurrency);
      setConvertedAmount(result);
    } catch (error) {
      console.error("Conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setConvertedAmount(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Currency Converter
      </h3>
      
      <div className="space-y-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="w-full"
          />
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">From</Label>
            <Select value={fromCurrency} onValueChange={(value) => setFromCurrency(value as Currency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="NGN">NGN</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">To</Label>
            <Select value={toCurrency} onValueChange={(value) => setToCurrency(value as Currency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="NGN">NGN</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSwapCurrencies}
            variant="outline"
            size="sm"
            className="rounded-full p-2"
          >
            <FaExchangeAlt className="h-4 w-4" />
          </Button>
        </div>

        {/* Convert Button */}
        <Button
          onClick={handleConvert}
          disabled={isConverting || amount <= 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isConverting ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert"
          )}
        </Button>

        {/* Result */}
        {convertedAmount !== null && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Converted Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(convertedAmount, toCurrency)}
              </p>
            </div>
          </div>
        )}

        {/* Live Rate Display */}
        {rateData && (
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              Live Rate: 1 {fromCurrency} = {rateData.rate} {toCurrency}
            </p>
          </div>
        )}

        {isRateLoading && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 flex items-center">
              <FaSpinner className="mr-2 h-3 w-3 animate-spin" />
              Loading live rates...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
