import TagInputGroup from "./PropertyFeaturesForm";
import React from "react";

type FeaturesAmenitiesSectionProps = {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  errors: any;
};

export default function FeaturesAmenitiesSection({
  formData,
  handleInputChange,
  errors,
}: FeaturesAmenitiesSectionProps) {
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-base font-medium text-[#116114]">
        Property Features and Amenities
      </h3>
      <div className="space-y-6">
        <TagInputGroup
          label="Features"
          placeholder="Add a feature and press Enter or comma"
          value={formData.features}
          onChange={(tags: string[]) => handleInputChange("features", tags)}
        />
        <TagInputGroup
          label="Amenities"
          placeholder="Add an amenity and press Enter or comma"
          value={formData.amenities}
          onChange={(tags: string[]) => handleInputChange("amenities", tags)}
        />
      </div>
      {errors.features && (
        <p className="text-red-500 text-sm">{errors.features}</p>
      )}
      {errors.amenities && (
        <p className="text-red-500 text-sm">{errors.amenities}</p>
      )}
    </div>
  );
}
