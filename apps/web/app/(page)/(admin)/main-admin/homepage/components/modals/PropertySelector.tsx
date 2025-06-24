"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/home/logo.webp";
import PropertyCard from "../cards/Property";
import four from "@/assets/admin/home/four.webp";
import { useFetchData } from "@/hooks/useApi";

export default function PropertySelector({
  open,
  onClose,
  type = "property",
}: {
  open: boolean;
  onClose: () => void;
  type?: "property" | "rental" | "investment";
}) {
  const {
    data: response,
    isLoading,
    error,
  } = useFetchData(
    open
      ? type === "property"
        ? "admin/properties/featured"
        : "rentals"
      : null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // Get properties from API response
  const properties = response?.data || [];

  // Filter properties based on search term
  const filtered = properties.filter((property) =>
    `${property.name} ${property.address} ${property.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-4xl bg-white overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4 flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white hover:text-red-300" />
          </button>
        </header>

        {/* Main Content */}
        <div className="px-4 py-8">
          <div className="text-sm font-medium text-[#116114] mb-4">
            Select for featured property
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search Properties"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-200 border-0 text-gray-600 placeholder:text-gray-500"
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Failed to load properties</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#116114] text-white px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Properties List */}
          {!isLoading && !error && (
            <div className="space-y-4">
              {filtered.length > 0 ? (
                filtered.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={{
                      name: property.name,
                      location: property.address,
                      rooms: property.unitTypes.join(", ") || "N/A",
                      status: property.status,
                      furnished: property.features.includes("FURNISHED"),
                      image: four, // Using fallback image since PropertyCard expects StaticImageData
                    }}
                  />
                ))
              ) : searchTerm ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-2">
                    No properties found matching "{searchTerm}"
                  </p>
                  <p className="text-sm text-gray-400">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-2">No properties available</p>
                  <p className="text-sm text-gray-400">
                    Add some properties to get started
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
