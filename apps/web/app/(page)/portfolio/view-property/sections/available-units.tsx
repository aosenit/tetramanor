"use client";

import React from "react";
import { Property } from "../../types";
import UnitCard from "../components/UnitCard";

interface AvailableUnitsProps {
  property: Property;
}

export default function AvailableUnits({ property }: AvailableUnitsProps) {
  // If no units available, don't render this section
  if (!property.units || property.units.length === 0) {
    return null;
  }

  // Calculate total available units
  const totalAvailableUnits = property.units.reduce(
    (sum, unit) => sum + (unit.availableUnits || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 bg-[#FAFAFA]">
      {/* Section Header */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-4 text-[#0b0a0a]">
          Available Unit Types
        </h2>
        <h3 className="text-2xl font-semibold text-[#0b0a0a]">
          {totalAvailableUnits} Available Units
        </h3>
      </div>

      {/* Units Grid */}
      {property.units.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {property.units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} propertyName={property.name} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">
            No unit information available for this property.
          </p>
        </div>
      )}
    </div>
  );
}

