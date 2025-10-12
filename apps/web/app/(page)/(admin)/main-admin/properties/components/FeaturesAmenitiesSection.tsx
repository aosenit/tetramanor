import React, { SetStateAction, useEffect, useState } from "react";
import TagSelectGroup from "./TagSelectorGroup";
import { useFetchData } from "@/hooks/useApi";

type FeaturesAmenitiesSectionProps = {
	formData: any;
	handleInputChange?: (field: string, value: any) => void;
	errors: any;
	selectedFeatures: any[];
	selectedAmenities: any[];
	setSelectedFeatures: React.Dispatch<SetStateAction<any[]>>;
	setSelectedAmenities: React.Dispatch<SetStateAction<any[]>>;
};

export default function FeaturesAmenitiesSection({
	formData,
	errors,
	selectedAmenities,
	setSelectedFeatures,
	selectedFeatures,
	setSelectedAmenities,
}: FeaturesAmenitiesSectionProps) {
	const { data: specs } = useFetchData("/admin/property-specs");
	const { features, amenities } = specs?.data || {};

	return (
		<div className="mt-8 space-y-6">
			<h3 className="text-base font-medium text-[#116114]">
				Property Features and Amenities
			</h3>
			<div className="space-y-6">
				<TagSelectGroup
					label="Features"
					options={features}
					value={selectedFeatures}
					onChange={setSelectedFeatures}
				/>
				<TagSelectGroup
					label="Amenities"
					options={amenities}
					value={selectedAmenities}
					onChange={setSelectedAmenities}
				/>
				{/* <TagInputGroup
            label="Features"
            placeholder="Add a feature and press Enter or comma"
            value={formData.features}
            onChange={(tags: string[]) => handleInputChange("features", tags)}
          /> */}
				{/* <TagInputGroup
					label="Amenities"
					placeholder="Add an amenity and press Enter or comma"
					value={formData.amenities}
					onChange={(tags: string[]) => handleInputChange("amenities", tags)}
				/> */}
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
