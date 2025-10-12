"use client";

import React from "react";
import { useFetchData } from "@/hooks/useApi";
import { RentalListingItem } from "@/types/property";
import SimplePropertyCard from "./SimplePropertyCard";
import { FaHome } from "react-icons/fa";

// Loading Skeleton Component
function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse">
      {/* Image skeleton */}
        <div className="h-64 w-full bg-gray-300"></div>
      {/* Name skeleton */}
      <div className="p-5 bg-white">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
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
  const { data, isLoading, error, refetch } = useFetchData("rentals/listing");

  const rentals: RentalListingItem[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="container mx-auto px-4 lg:px-16 py-8">
          {/* Header Skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-64 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-96"></div>
              </div>

              {/* Property Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
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
          <p className="text-gray-600 text-base md:text-lg">
            There are{" "}
            <span className="font-semibold text-[#116114]">
              {rentals.length}
            </span>{" "}
            available rental properties in Lagos. Find your perfect home from
            our curated selection.
          </p>
        </div>

        {/* Properties Grid */}
            {rentals.length === 0 ? (
              <EmptyState />
            ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rentals.map((rental) => (
              <SimplePropertyCard key={rental.id} rental={rental} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
