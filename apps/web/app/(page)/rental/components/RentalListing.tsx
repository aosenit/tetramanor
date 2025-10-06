"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { RentalListingItem } from "@/types/property";
import RentalPropertyCard from "./RentalPropertyCard";
import { Input } from "@/components/ui/input";
import { FaSearch, FaHome } from "react-icons/fa";

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
        We couldn&apos;t find any rental properties matching your search criteria. Try
        adjusting your search terms or check back later for new listings.
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current search term from URL params
  const currentSearch = searchParams.get("search") || "";
  
  // Local state for search input
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Update local state when URL params change
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  // Function to update URL params
  const updateURLParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === "") {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Build query parameters for API
  const queryParams = new URLSearchParams();
  if (currentSearch) {
    queryParams.set("search", currentSearch);
  }

  const { data, isLoading, error, refetch } = useFetchData(
    `rentals/listing${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
  );

  const rentals: RentalListingItem[] = data?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURLParams({ search: searchTerm });
  };

  const clearSearch = () => {
    setSearchTerm("");
    updateURLParams({ search: "" });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <div className="mb-10 flex flex-col xl:flex-row lg:items-center lg:justify-between gap-6">
          <h4 className="text-2xl sm:text-3xl text-black font-semibold xl:max-w-lg">
            Looking for a Premium Rental or Short-let Property in Lagos?
          </h4>
          <p className="text-[#202020] xl:max-w-xl text-sm sm:text-base leading-relaxed text-justify">
            Tetramanor offers a curated selection of luxury apartments and
            homes, perfect for short-term stays or long-term rentals. Whether
            you need a fully serviced apartment for a getaway or a stylish home
            for an extended stay – enjoy comfort, security, and convenience in
            prime locations.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search rental properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border bg-white border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:outline-none"
              />
            </div>
            {currentSearch && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 whitespace-nowrap"
              >
                Clear search
              </button>
            )}
          </form>
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-16 py-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col xl:flex-row lg:items-center lg:justify-between gap-6">
          <h4 className="text-2xl sm:text-3xl text-black font-semibold xl:max-w-lg">
            Premium Rental Properties in Lagos
          </h4>
          <p className="text-[#202020] xl:max-w-xl text-sm sm:text-base leading-relaxed text-justify">
            Discover our carefully curated selection of luxury apartments and homes, 
            perfect for short-term stays or long-term rentals. Experience comfort, 
            security, and convenience in prime locations across Lagos.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search rental properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border bg-white border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:outline-none"
              />
            </div>
            {currentSearch && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 whitespace-nowrap"
              >
                Clear search
              </button>
            )}
          </form>
        </div>

        {/* Results Count */}
        {currentSearch && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {rentals.length} propert{rentals.length === 1 ? 'y' : 'ies'} found for "{currentSearch}"
            </p>
          </div>
        )}

        {/* Properties Grid */}
        {rentals.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => (
              <RentalPropertyCard key={rental.id} rental={rental} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
