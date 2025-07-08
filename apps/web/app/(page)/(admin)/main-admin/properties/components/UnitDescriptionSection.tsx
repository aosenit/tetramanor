import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type UnitDescriptionSectionProps = {
  formData: any;
  errors: any;
  customUnitType: string;
  setCustomUnitType: (v: string) => void;
  handleInputChange: (field: string, value: any) => void;
  handleAddCustomUnitType: () => void;
  handleRemoveUnitType: (type: string) => void;
  unitTypeOptions: string[];
};

export default function UnitDescriptionSection({
  formData,
  errors,
  customUnitType,
  setCustomUnitType,
  handleInputChange,
  handleAddCustomUnitType,
  handleRemoveUnitType,
  unitTypeOptions,
}: UnitDescriptionSectionProps) {
  return (
    <div className="bg-white mt-4 p-6">
      <div className="space-y-6">
        <h2 className="text-base font-medium text-[#116114]">
          Unit Description
        </h2>
        <div className="space-y-2">
          <Label
            htmlFor="no-of-units"
            className="text-sm font-medium text-[#323539]"
          >
            Number of Units *
          </Label>
          <Input
            id="no-of-units"
            type="number"
            value={formData.unitAmount}
            placeholder="Enter number of units"
            onChange={(e) =>
              handleInputChange("unitAmount", parseInt(e.target.value))
            }
            className={`w-full bg-[#e5e5e7] border ${errors.unitAmount ? "border-red-500" : "border-[#116114]"}`}
            min="0"
            required
          />
          {errors.unitAmount && (
            <p className="text-red-500 text-sm">{errors.unitAmount}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#323539]">
            Unit Types *
          </Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {unitTypeOptions.map((type) => {
              const label = type.replace(/_/g, " ");
              const selected = formData.unitTypes.includes(label);
              return (
                <button
                  type="button"
                  key={type}
                  className={`flex items-center px-3 py-1 rounded-full border text-sm transition-colors ${selected ? "bg-[#116114] text-white border-[#116114]" : "bg-white text-[#323539] border-gray-300"}`}
                  onClick={() => {
                    if (selected) {
                      handleRemoveUnitType(label);
                    } else {
                      handleInputChange("unitTypes", [
                        ...formData.unitTypes,
                        label,
                      ]);
                    }
                  }}
                >
                  {label}
                  {selected && (
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveUnitType(label);
                      }}
                    >
                      &times;
                    </span>
                  )}
                </button>
              );
            })}
            {/* Custom unit types as pills */}
            {formData.unitTypes
              .filter(
                (type) =>
                  !unitTypeOptions
                    .map((opt) => opt.replace(/_/g, " "))
                    .includes(type)
              )
              .map((type) => (
                <span
                  key={type}
                  className="flex items-center px-3 py-1 rounded-full border bg-[#116114] text-white border-[#116114] text-sm"
                >
                  {type}
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => handleRemoveUnitType(type)}
                  >
                    &times;
                  </button>
                </span>
              ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              type="text"
              placeholder="Add custom unit type"
              value={customUnitType}
              onChange={(e) => setCustomUnitType(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustomUnitType();
                }
              }}
              className="flex-1 bg-[#E5E5E7] border border-[#116114]"
            />
            <button
              type="button"
              onClick={handleAddCustomUnitType}
              className="bg-[#116114] text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          {errors.unitTypes && (
            <p className="text-red-500 text-sm">{errors.unitTypes}</p>
          )}
        </div>
      </div>
    </div>
  );
}
