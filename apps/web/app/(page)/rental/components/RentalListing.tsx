"use client";

import React, { useState } from "react";
import { useFetchData } from "@/hooks/useApi";
import { RentalListingItem } from "@/types/property";
import RentalPropertyCard from "./RentalPropertyCard";
import FilterSidebar from "./FilterSidebar";
import QuickFilters from "./QuickFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaHome, FaTh, FaList } from "react-icons/fa";
import { SlidersHorizontal } from "lucide-react";

// Loading Skeleton Component
function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse">
      <div className="relative">
        <div className="h-64 w-full bg-gray-300"></div>
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-gray-400 px-3 py-1 w-20 h-6"></div>
        <div className="absolute right-4 top-4 z-10 rounded-lg bg-gray-400 px-3 py-1 w-16 h-6"></div>
      </div>
      <div className="p-5 bg-[#f9f9f9]">
        <div className="flex flex-col gap-2 mb-3">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        </div>
        <div className="flex gap-1 mb-4">
          <div className="h-5 bg-gray-300 rounded-full w-12"></div>
          <div className="h-5 bg-gray-300 rounded-full w-16"></div>
          <div className="h-5 bg-gray-300 rounded-full w-14"></div>
        </div>
        <div className="h-8 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}

// Filter Sidebar Skeleton Component
function FilterSidebarSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="h-5 bg-gray-300 rounded w-20"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Property Type Section */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Location Section */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Price Range Section */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Furnishing Section */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Amenities Section */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FaHome className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No rental properties found
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We couldn&apos;t find any rental properties matching your search
        criteria. Try adjusting your search terms or check back later for new
        listings.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
      >
        Refresh listings
      </button>
    </div>
  );
}

export default function RentalListing() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter state
  const [filters, setFilters] = useState({
    category: "",
    apartmentType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    furnishing: "",
    amenities: [] as string[],
  });

  const { data, isLoading, error, refetch } = useFetchData("rentals/listing");

  let rentals: RentalListingItem[] = data?.data || [];

  // Extract unique categories and apartment types from backend data
  const uniqueCategories = Array.from(
    new Set(rentals.flatMap((rental) => rental.categories || []))
  ).filter(Boolean);

  const uniqueApartmentTypes = Array.from(
    new Set(rentals.flatMap((rental) => rental.apartmentType || []))
  ).filter(Boolean);

  // Extract unique amenities from backend data
  const uniqueAmenities = Array.from(
    new Set(rentals.flatMap((rental) => rental.amenities || []))
  ).filter(Boolean);

  // Extract unique locations from backend data
  const uniqueLocations = Array.from(
    new Set(
      rentals.map((rental) => {
        // Extract location from address (e.g., "Mende, Maryland." -> "Mende")
        const addressParts = rental.address?.split(",") || [];
        return addressParts[0]?.trim();
      })
    )
  ).filter(Boolean);

  // Apply client-side filtering
  rentals = rentals.filter((rental) => {
    // Filter by category (furnishing type)
    if (filters.category && !rental.categories?.includes(filters.category)) {
      return false;
    }

    // Filter by apartment type
    if (
      filters.apartmentType &&
      !rental.apartmentType?.includes(filters.apartmentType)
    ) {
      return false;
    }

    // Filter by location
    if (filters.location) {
      const addressParts = rental.address?.split(",") || [];
      const firstLocation = addressParts[0]?.trim().toLowerCase();
      if (!firstLocation?.includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        rental.amenities?.some((rentalAmenity) =>
          rentalAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  // Apply sorting
  rentals = [...rentals].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return 0; // Keep API order
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const clearAllFilters = () => {
    setFilters({
      category: "",
      apartmentType: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      furnishing: "",
      amenities: [],
    });
  };

  const activeFilterCount =
    (filters.category !== "" ? 1 : 0) +
    (filters.apartmentType !== "" ? 1 : 0) +
    (filters.location !== "" ? 1 : 0) +
    (filters.minPrice !== "" ? 1 : 0) +
    (filters.maxPrice !== "" ? 1 : 0) +
    (filters.furnishing !== "" ? 1 : 0) +
    filters.amenities.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="container mx-auto px-4 lg:px-16 py-8">
          {/* Header Skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-64 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-96"></div>
          </div>

          {/* Quick Filters Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 animate-pulse">
            <div className="space-y-4">
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-20 mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-4">
                <FilterSidebarSkeleton />
              </div>
            </div>

            {/* Properties Grid Skeleton */}
            <div className="lg:col-span-3">
              {/* Toolbar Skeleton */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 bg-gray-200 rounded w-40"></div>
                    <div className="hidden sm:flex gap-1 border border-gray-300 rounded-md p-1">
                      <div className="w-10 h-10 bg-gray-200 rounded"></div>
                      <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <p className="text-red-500 font-medium">
            Failed to load rental properties. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto px-4 lg:px-16 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Property for Rent in Lagos
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-4">
            There are{" "}
            <span className="font-semibold text-[#116114]">
              {rentals.length}
            </span>{" "}
            available rental properties in Lagos. Find your perfect home from
            our curated selection.
          </p>
        </div>
        {/* <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by location, property name, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border bg-white border-gray-300 py-3 pl-12 pr-4 text-base focus:border-[#116114] focus:ring-2 focus:ring-[#116114]/20"
            />
            {currentSearch && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>
        </div> */}

        {/* Quick Filters */}
        <QuickFilters
          activeType={filters.apartmentType}
          activeFurnishing={filters.category}
          onTypeChange={(type) =>
            setFilters({ ...filters, apartmentType: type })
          }
          onFurnishingChange={(furnishing) =>
            setFilters({ ...filters, category: furnishing })
          }
          apartmentTypes={uniqueApartmentTypes}
          categories={uniqueCategories}
        />

        {/* Main Content Area with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={clearAllFilters}
                apartmentTypes={uniqueApartmentTypes}
                categories={uniqueCategories}
                locations={uniqueLocations}
                amenities={uniqueAmenities}
              />
            </div>
          </div>

          {/* Properties Listing */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Results and Mobile Filter Button */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 border-[#116114] text-[#116114]"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-[#116114] text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {rentals.length}
                    </span>{" "}
                    {rentals.length === 1 ? "property" : "properties"}
                  </p>
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center gap-1 border border-gray-300 rounded-md p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid"
                          ? "bg-[#116114] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="Grid view"
                    >
                      <FaTh className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list"
                          ? "bg-[#116114] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="List view"
                    >
                      <FaList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {rentals.length === 0 ? (
              <EmptyState />
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {rentals.map((rental) => (
                  <RentalPropertyCard
                    key={rental.id}
                    rental={rental}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={clearAllFilters}
                isMobile
                onClose={() => setShowMobileFilters(false)}
                apartmentTypes={uniqueApartmentTypes}
                categories={uniqueCategories}
                locations={uniqueLocations}
                amenities={uniqueAmenities}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
