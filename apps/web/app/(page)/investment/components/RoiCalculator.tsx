"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import three from "@/assets/investment/three.webp";

export default function RoiCalculator() {
  const [interestRate, setInterestRate] = useState(7.2);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [years, setYears] = useState("");
  const [roi, setRoi] = useState<{ profit: number; total: number } | null>(
    null
  );
  const [error, setError] = useState<string>("");

  // Currency symbols mapping
  const currencySymbols: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  // Format large numbers in M format (e.g., 10,800,000 -> 10.8M)
  const formatLargeNumber = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    return amount.toLocaleString();
  };

  const calculateROI = () => {
    setError("");

    const principal = parseFloat(investmentAmount);
    const rate = interestRate / 100; // Convert percentage to decimal
    const time = parseFloat(years);

    if (isNaN(principal) || principal <= 0) {
      setError("Please enter a valid investment amount");
      return;
    }

    if (isNaN(time) || time <= 0) {
      setError("Please enter a valid duration in years");
      return;
    }

    // Simple Interest Formula: A = P + (P × r × t)
    // Where: P = Principal, r = Interest Rate (decimal), t = Time in years
    const interest = principal * rate * time;
    const total = principal + interest;

    setRoi({ profit: interest, total });
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center p-4 md:p-8">
      <Image src={three} alt="Skyscraper" className="object-cover" fill />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      <div className="container mx-auto px-4 lg:px-16 z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        <div className="w-full lg:w-1/2 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Calculate Your ROI
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-12">
            Estimate your investment returns using our calculator to project
            profits with simple interest.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Want to talk about this property?
            </h2>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="h-5 w-5 text-white" />
              <span className="text-lg">+234 812 345 67</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="h-5 w-5 text-white" />
              <span className="text-lg">tetramanor@mail.com</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6">
              Investment Calculator
            </h3>

            <div className="mb-8">
              <div className="font-medium mb-2">Amount to invest (P)</div>
              <div className="flex gap-4">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-28 border rounded-md px-3 py-2 text-sm"
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>

                <input
                  type="number"
                  placeholder="e.g., 50,000,000"
                  className="flex-1 border rounded-md px-4 py-2"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Annual Interest Rate (r)</span>
                <span className="font-semibold text-green-700">
                  {interestRate}%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">1%</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="flex-1 accent-green-700"
                />
                <span className="text-sm text-gray-500">100%</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="font-medium mb-2">Duration in Years (t)</div>
              <input
                type="number"
                placeholder="e.g., 3"
                className="w-full border rounded-md px-3 py-2"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="0.1"
                step="0.1"
              />
            </div>

            <button
              className="w-full bg-green-700 hover:bg-green-800 text-white rounded-sm py-2 text-lg font-medium transition-colors"
              type="button"
              onClick={calculateROI}
            >
              Calculate ROI
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md text-center">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {roi && (
              <div className="mt-6 space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    PROFIT
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {currencySymbols[currency]}
                    {formatLargeNumber(roi.profit)}
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-sm font-medium text-green-600 mb-1">
                    TOTAL RETURN
                  </p>
                  <p className="text-2xl font-bold text-green-800">
                    {currencySymbols[currency]}
                    {formatLargeNumber(roi.total)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
