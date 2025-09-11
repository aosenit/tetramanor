"use client";

import { useState } from "react";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";
import { useFetchData } from "@/hooks/useApi";
import { Button } from "@/components/ui/button"; 

// Skeleton Loading Component
const InvestmentModelSkeleton = () => (
  <div className="space-y-12">
    <div className="bg-[#f9f4f0] rounded-xl p-2 md:p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="space-y-3 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full mt-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-6">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-gray-200 rounded-xl w-full h-64 animate-pulse"></div>
        </div>
      </div>
    </div>
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function InvestmentModels() {
  const [activeTab, setActiveTab] = useState("fixed-roi");

  const { data, isLoading, error, refetch } = useFetchData("investments"); // ✅ added refetch
  const investments = data?.data || [];

  const fixedROI = investments.filter(
    (inv: any) => inv.investmentType === "FIXED_ROI"
  );
  const equityShare = investments.filter(
    (inv: any) => inv.investmentType === "EQUITY_SHARE"
  );

  return (
    <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-[#EB8A43] font-semibold text-sm uppercase tracking-wide">
            INVESTMENT MODELS
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-center md:text-left">
            Choose the Investment Model That Fits Your Goals
          </h1>

          <div className="inline-flex items-center justify-center rounded-md p-1 self-center md:self-auto">
            <button
              onClick={() => setActiveTab("fixed-roi")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium transition-all focus:outline-none ${
                activeTab === "fixed-roi"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Fixed ROI
            </button>
            <button
              onClick={() => setActiveTab("equity-based")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium transition-all focus:outline-none ${
                activeTab === "equity-based"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Equity-Based
            </button>
          </div>
        </div>

        <div>
          {isLoading && <InvestmentModelSkeleton />}

          {error && (
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-8">
              <p className="text-red-500 font-medium">
                Failed to load investment models.
              </p>
              <Button onClick={() => refetch()} size="sm" variant="default">
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {activeTab === "fixed-roi" && <TabOne investments={fixedROI} />}
              {activeTab === "equity-based" && (
                <TabTwo investments={equityShare} />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
