"use client";

import React from "react";
import { RentalListingItem } from "@/types/property";

interface PropertyStatsProps {
  rentals: RentalListingItem[];
}

export default function PropertyStats({ rentals }: PropertyStatsProps) {
  // Calculate statistics
  const totalProperties = rentals.length;

  // Count by apartment type
  const apartmentTypeCounts = rentals.reduce((acc, rental) => {
    rental.apartmentType.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Format type name
  const formatTypeName = (type: string) => {
    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get top property types
  const topTypes = Object.entries(apartmentTypeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Available Property
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Currently available for rent in Lagos
      </p>

      {/* Property Types Table */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Property Type
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Count
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {topTypes.map(([type, count]) => (
              <tr key={type} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-900">
                  {formatTypeName(type)}
                </td>
                <td className="py-3 px-4 text-right">
                  <a
                    href={`#`}
                    className="text-[#116114] hover:text-[#0d4d10] font-medium"
                  >
                    {count}
                  </a>
                </td>
              </tr>
            ))}
            {topTypes.length === 0 && (
              <tr>
                <td colSpan={2} className="py-4 px-4 text-center text-gray-500">
                  No properties available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-[#E8F5E8] rounded-lg">
            <div className="text-2xl font-bold text-[#116114]">
              {totalProperties}
            </div>
            <div className="text-xs text-gray-600 mt-1">Total Properties</div>
          </div>
          <div className="text-center p-3 bg-[#FFF4E6] rounded-lg">
            <div className="text-2xl font-bold text-[#CD6115]">
              {Object.keys(apartmentTypeCounts).length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Property Types</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-xs text-gray-600 mt-1">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}

