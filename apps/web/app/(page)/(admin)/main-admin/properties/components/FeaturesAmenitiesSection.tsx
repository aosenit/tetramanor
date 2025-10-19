import React, { SetStateAction, useState } from "react";
import { useFetchData } from "@/hooks/useApi";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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

  const [customFeatureInput, setCustomFeatureInput] = useState("");
  const [customAmenityInput, setCustomAmenityInput] = useState("");
  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [showAmenityInput, setShowAmenityInput] = useState(false);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);

  // Handle adding custom feature
  const handleAddCustomFeature = () => {
    if (customFeatureInput.trim()) {
      const uppercaseName = customFeatureInput.trim().toUpperCase();
      const customFeature = {
        id: `custom-feature-${Date.now()}`,
        name: uppercaseName,
        icon: "",
      };
      setSelectedFeatures([...selectedFeatures, customFeature]);
      setCustomFeatureInput("");
      setShowFeatureInput(false);
    }
  };

  // Handle adding custom amenity
  const handleAddCustomAmenity = () => {
    if (customAmenityInput.trim()) {
      const uppercaseName = customAmenityInput.trim().toUpperCase();
      const customAmenity = {
        id: `custom-amenity-${Date.now()}`,
        name: uppercaseName,
        icon: "",
      };
      setSelectedAmenities([...selectedAmenities, customAmenity]);
      setCustomAmenityInput("");
      setShowAmenityInput(false);
    }
  };

  // Handle key press for custom inputs
  const handleKeyPress = (
    e: React.KeyboardEvent,
    type: "feature" | "amenity"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "feature") {
        handleAddCustomFeature();
      } else {
        handleAddCustomAmenity();
      }
    }
  };

  // Available options (excluding already selected)
  const availableFeatures = features?.filter(
    (opt: any) => !selectedFeatures?.some((tag) => tag.id === opt.id)
  );
  const availableAmenities = amenities?.filter(
    (opt: any) => !selectedAmenities?.some((tag) => tag.id === opt.id)
  );

  // Get first 10 or all based on toggle
  const displayedFeatures = showMoreFeatures
    ? availableFeatures
    : availableFeatures?.slice(0, 10);
  const displayedAmenities = showMoreAmenities
    ? availableAmenities
    : availableAmenities?.slice(0, 10);

  // Handle selecting from dropdown
  const handleSelectFeature = (id: string) => {
    const selected = features.find((opt: any) => opt.id === id);
    if (selected && !selectedFeatures?.some((tag) => tag.id === id)) {
      setSelectedFeatures([...selectedFeatures, selected]);
    }
  };

  const handleSelectAmenity = (id: string) => {
    const selected = amenities.find((opt: any) => opt.id === id);
    if (selected && !selectedAmenities?.some((tag) => tag.id === id)) {
      setSelectedAmenities([...selectedAmenities, selected]);
    }
  };

  // Handle removing selected items
  const handleRemoveFeature = (id: string) => {
    setSelectedFeatures(selectedFeatures?.filter((tag) => tag.id !== id));
  };

  const handleRemoveAmenity = (id: string) => {
    setSelectedAmenities(selectedAmenities?.filter((tag) => tag.id !== id));
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-base font-medium text-[#116114]">
        Property Features and Amenities
      </h3>

      {/* Features Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Features</label>
        <div className="flex flex-wrap items-center gap-2 px-3 py-3 rounded-md bg-[#e5e5e7] min-h-[60px]">
          {/* Selected Features */}
          {selectedFeatures?.map((tag) => (
            <span
              key={tag.id}
              className="flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white"
            >
              {tag.icon ? (
                <Image
                  src={tag.icon}
                  alt={tag.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-2"
                />
              ) : (
                <span className="text-green-600 font-semibold text-xs mr-2">
                  TM
                </span>
              )}
              <span className="uppercase text-xs font-medium">
                {tag?.name?.toLocaleUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(tag.id)}
                className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {/* Dropdown for existing features */}
          {displayedFeatures?.length > 0 && (
            <div className="flex items-center gap-1">
              <select
                value=""
                onChange={(e) => handleSelectFeature(e.target.value)}
                className="bg-transparent border-none outline-none text-sm min-w-[140px] py-1 cursor-pointer"
              >
                <option value="">Select feature...</option>
                {displayedFeatures.map((opt: any) => (
                  <option key={opt.id} value={opt.id}>
                    {opt?.name?.toLocaleUpperCase()}
                  </option>
                ))}
              </select>
              {availableFeatures?.length > 10 && (
                <button
                  type="button"
                  onClick={() => setShowMoreFeatures(!showMoreFeatures)}
                  className="text-xs text-[#116114] hover:underline whitespace-nowrap"
                >
                  {showMoreFeatures
                    ? "Show less"
                    : `+${availableFeatures.length - 10} more`}
                </button>
              )}
            </div>
          )}

          {/* Custom Feature Input */}
          {showFeatureInput ? (
            <div className="flex items-center gap-2 bg-white rounded-md px-2 py-1 border border-[#116114]">
              <Input
                type="text"
                value={customFeatureInput}
                onChange={(e) =>
                  setCustomFeatureInput(e.target.value.toUpperCase())
                }
                onKeyPress={(e) => handleKeyPress(e, "feature")}
                placeholder="Enter custom feature..."
                className="!border-none !focus:ring-0 !focus:ring-offset-0 !ring-0 !ring-offset-0 h-8 text-xs uppercase"
                autoFocus
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddCustomFeature}
                className="h-7 px-2 bg-[#116114] hover:bg-green-700"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
              <button
                type="button"
                onClick={() => {
                  setShowFeatureInput(false);
                  setCustomFeatureInput("");
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowFeatureInput(true)}
              className="text-xs text-[#116114] hover:text-green-700 hover:bg-white"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Custom
            </Button>
          )}
        </div>
        {errors.features && (
          <p className="text-red-500 text-xs mt-1">{errors.features}</p>
        )}
      </div>

      {/* Amenities Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Amenities</label>
        <div className="flex flex-wrap items-center gap-2 px-3 py-3 rounded-md bg-[#e5e5e7] min-h-[60px]">
          {/* Selected Amenities */}
          {selectedAmenities?.map((tag) => (
            <span
              key={tag.id}
              className="flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white"
            >
              {tag.icon ? (
                <Image
                  src={tag.icon}
                  alt={tag.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-2"
                />
              ) : (
                <span className="text-green-600 font-semibold text-xs mr-2">
                  TM
                </span>
              )}
              <span className="uppercase text-xs font-medium">
                {tag?.name?.toLocaleUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveAmenity(tag.id)}
                className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {/* Dropdown for existing amenities */}
          {displayedAmenities?.length > 0 && (
            <div className="flex items-center gap-1">
              <select
                value=""
                onChange={(e) => handleSelectAmenity(e.target.value)}
                className="bg-transparent border-none outline-none text-sm min-w-[140px] py-1 cursor-pointer"
              >
                <option value="">Select amenity...</option>
                {displayedAmenities.map((opt: any) => (
                  <option key={opt.id} value={opt.id}>
                    {opt?.name?.toLocaleUpperCase()}
                  </option>
                ))}
              </select>
              {availableAmenities?.length > 10 && (
                <button
                  type="button"
                  onClick={() => setShowMoreAmenities(!showMoreAmenities)}
                  className="text-xs text-[#116114] hover:underline whitespace-nowrap"
                >
                  {showMoreAmenities
                    ? "Show less"
                    : `+${availableAmenities.length - 10} more`}
                </button>
              )}
            </div>
          )}

          {/* Custom Amenity Input */}
          {showAmenityInput ? (
            <div className="flex items-center gap-2 bg-white rounded-md px-2 py-1 border border-[#116114]">
              <Input
                type="text"
                value={customAmenityInput}
                onChange={(e) =>
                  setCustomAmenityInput(e.target.value.toUpperCase())
                }
                onKeyPress={(e) => handleKeyPress(e, "amenity")}
                placeholder="Enter custom amenity..."
                className="focus:ring-0 h-8 text-xs uppercase !border-none !focus:ring-0 !focus:ring-offset-0 !ring-0 !ring-offset-0"
                autoFocus
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddCustomAmenity}
                className="h-7 px-2 bg-[#116114] hover:bg-green-700"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
              <button
                type="button"
                onClick={() => {
                  setShowAmenityInput(false);
                  setCustomAmenityInput("");
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAmenityInput(true)}
              className="text-xs text-[#116114] hover:text-green-700 hover:bg-white"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Custom
            </Button>
          )}
        </div>
        {errors.amenities && (
          <p className="text-red-500 text-xs mt-1">{errors.amenities}</p>
        )}
      </div>
    </div>
  );
}
