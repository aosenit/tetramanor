"use client"

import { useState } from "react"
import TabOne from "./TabOne"
import TabTwo from "./TabTwo"

export default function InvestmentModels() {
  const [activeTab, setActiveTab] = useState("fixed-roi")

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
          {activeTab === "fixed-roi" && <TabOne />}
          {activeTab === "equity-based" && <TabTwo />}
        </div>
      </div>
    </main>
  )
}
