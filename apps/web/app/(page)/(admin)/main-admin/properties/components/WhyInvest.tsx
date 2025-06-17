"use client";
import Image from "next/image";
import four from "@/assets/admin/home/four.webp"; // Adjust the path as necessary
import React, { useState } from "react";

const unitTypes = [
  "3-Bedroom Apartment",
  "2 bedroom condo",
  "Studio apartment",
  "4-Bedroom Maisonettes",
  "4-Bedroom + BQ Semi-Detached Duplexes",
];

export default function InvestmentForm() {
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ new state
  const [whyInvestOpen, setWhyInvestOpen] = useState(true);
  const [advantageOpen, setAdvantageOpen] = useState(true);

  const toggleUnit = (unit: string) => {
    setSelectedUnits((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]
    );
  };

  const filteredTypes = unitTypes.filter((type) =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 mt-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unit type
        </label>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border-none bg-[#e5e5e7] rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
        />

        <div className="mt-2 flex flex-wrap gap-2">
          {filteredTypes.map((type) => (
            <div
              key={type}
              onClick={() => toggleUnit(type)}
              className={`cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg border text-sm ${
                selectedUnits.includes(type)
                  ? "bg-green-100 border-green-400"
                  : "bg-white border-gray-300"
              }`}
            >
              <Image
                src={four}
                alt="Unit type"
                className="rounded-full h-5 w-5"
              />
              {type}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setWhyInvestOpen((prev) => !prev)}
        >
          <h3 className="text-base font-medium text-[#116114]">Why invest</h3>
          <span className="text-xl">{whyInvestOpen ? "+" : "+"}</span>
        </div>
        {whyInvestOpen && (
          <div className="mt-3 space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border-none bg-[#e5e5e7] rounded-md p-2"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description </label>
            <textarea
              rows={4}
              className="w-full border-none rounded-md bg-[#e5e5e7] p-2"
            />
          </div>
        )}
      </div>
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setAdvantageOpen((prev) => !prev)}
        >
          <h3 className="text-base font-medium text-[#116114]">
            Advantages of investment
          </h3>
          <span className="text-xl">{advantageOpen ? "+" : "+"}</span>
        </div>
        {advantageOpen && (
          <div className="mt-3 space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full border-none bg-[#e5e5e7] rounded-md p-2"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full border-none bg-[#e5e5e7] rounded-md p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
