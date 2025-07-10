import Image, { StaticImageData } from "next/image";
import { Loader2 } from "lucide-react";

import placeholder from "@/assets/placeholder.svg";

type Property = {
  id?: string;
  name: string;
  rooms: string;
  location: string;
  status: string;
  furnished: boolean;
  image: StaticImageData;
};

export default function PropertyCard({
  property,
  isSelected = false,
  onSelect,
  type,
  isLoading = false,
}: {
  property: Property;
  isSelected?: boolean;
  onSelect?: () => void;
  type?: "property" | "rental" | "investment";
  isLoading?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between bg-white p-4 rounded-xl shadow-sm w-full max-w-6xl mb-4 cursor-pointer transition-all duration-200 ${
        isSelected ? "opacity-80" : "hover:bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <Image
          src={property.image || placeholder}
          alt={property.name}
          width={100}
          height={100}
          className="w-28 h-20 object-cover rounded-lg"
        />
        <div>
          <div
            className={`inline-block text-[#4C5560] text-xs px-2 py-1 rounded-md mb-1 ${
              property.furnished ? "bg-[#C5FDC7]" : "bg-[#E2E3F2]"
            }`}
          >
            {property.furnished ? "Furnished" : "Not Furnished"}
          </div>
          <p className="text-sm font-semibold text-[#1E1E1E]">
            {property.name}
          </p>
          <p className="text-sm text-gray-500">{property.rooms}</p>
        </div>
      </div>

      <div className="w-px h-12 bg-gray-200 mx-4" />
      <p className="text-sm text-[#1E1E1E] font-medium">{property.location}</p>

      <div className="w-px h-12 bg-gray-200 mx-4" />
      <div
        className={`text-sm font-semibold px-3 py-1 rounded-md ${
          property.status === "Available"
            ? "bg-[#C5FDC7] text-[#858C95]"
            : property.status === "Sold"
              ? "bg-[#FFEFEE] text-[#858C95]"
              : "bg-[#888CA0] text-[#E5E5E7]"
        }`}
      >
        {property.status}
      </div>

      <div className="w-px h-12 bg-gray-200 mx-4" />
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#116114]" />
          <span className="text-sm text-[#116114]">Updating...</span>
        </div>
      ) : (
        <input
          type="radio"
          name="property-selection"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-5 w-5 text-[#116114] border-[#116114] focus:ring-[#116114]"
        />
      )}
    </div>
  );
}
