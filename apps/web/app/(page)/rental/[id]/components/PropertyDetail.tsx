"use client";

import React, { useState } from "react";
import { useFetchData } from "@/hooks/useApi";
import { RentalPropertyDetail } from "@/types/property";
import ApartmentCard from "./ApartmentCard";
import ImageGallery from "./ImageGallery";
import ContactAgentSidebar from "./ContactAgentSidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast-notification";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shareProperty } from "@/lib/shareUtils";
import {
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaShareAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface PropertyDetailProps {
  propertyId: string;
}

// Loading Skeleton Component
function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 lg:px-16 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>

        {/* Apartments Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-16 w-full mb-4" />
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
  const { data, isLoading, error, refetch } = useFetchData(
    `rentals/listing/${propertyId}`
  );

  // Fetch property specs for features and amenities
  const { data: specsData } = useFetchData("admin/property-specs");
  const propertySpecs = specsData?.data || { features: [], amenities: [] };

  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedFrequency, setSelectedFrequency] = useState<string>("ALL");

  const property: RentalPropertyDetail | null = data?.data || null;

  const handleShare = async () => {
    if (!property) return;

    const success = await shareProperty(property.name, property.id);
    if (success) {
      showToast("Property link has been  copied to clipboard.", "success");
    } else {
      showToast(
        "Failed to share",
        "Could not share the property. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) {
    return <PropertyDetailSkeleton />;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 lg:px-16 py-8">
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <p className="text-red-500 font-medium">
              Failed to load property details. Please try again.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
              <Link href="/rental">
                <Button variant="outline">Back to Rentals</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Define all possible filter categories (including ones not in current data)
  const allPossibleCategories = [
    "STANDARD_FURNISHED",
    "LUXURY_FURNISHED",
    "UNFURNISHED",
  ];

  // Define all possible rental frequencies
  const allPossibleFrequencies = [
    "MONTHLY",
    "QUARTERLY",
    "SEMI-ANNUALLY",
    "ANNUALLY",
  ];

  // Filter rentals by selected category and frequency
  const filteredRentals = property.rental.filter((unit) => {
    const categoryMatch =
      selectedCategory === "ALL" || unit.unitCategory === selectedCategory;
    const frequencyMatch =
      selectedFrequency === "ALL" || unit.frequency === selectedFrequency;
    return categoryMatch && frequencyMatch;
  });

  // Get unit categories from FILTERED rentals (not all rentals)
  const visibleUnitCategories = new Set<string>();
  filteredRentals.forEach((unit) => {
    if (unit.unitCategory) {
      visibleUnitCategories.add(unit.unitCategory);
    }
  });

  // Filter amenities based on furnishType matching VISIBLE unit categories
  // This makes features/amenities dynamic based on the selected filter
  const uniqueAmenities =
    propertySpecs.amenities?.filter(
      (amenity: {
        id: string;
        name: string;
        icon?: string | null;
        furnishType?: string | null;
      }) => {
        // If "All" is selected, show items with null furnishType OR matching any category
        if (selectedCategory === "ALL") {
          return (
            !amenity.furnishType ||
            amenity.furnishType === null ||
            visibleUnitCategories.has(amenity.furnishType)
          );
        }

        // If specific category is selected, ONLY show items matching that category
        // (exclude null items for strict filtering)
        return visibleUnitCategories.has(amenity.furnishType || "");
      }
    ) || [];

  // Filter features based on furnishType matching VISIBLE unit categories
  const uniqueFeatures =
    propertySpecs.features?.filter(
      (feature: {
        id: string;
        name: string;
        icon?: string | null;
        furnishType?: string | null;
      }) => {
        // If "All" is selected, show items with null furnishType OR matching any category
        if (selectedCategory === "ALL") {
          return (
            !feature.furnishType ||
            feature.furnishType === null ||
            visibleUnitCategories.has(feature.furnishType)
          );
        }

        // If specific category is selected, ONLY show items matching that category
        // (exclude null items for strict filtering)
        return visibleUnitCategories.has(feature.furnishType || "");
      }
    ) || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      <div className="container mx-auto px-4 lg:px-16 py-8">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/rental">
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:border-[#116114] hover:text-[#116114]"
            >
              <FaArrowLeft className="h-4 w-4" />
              Back to Listings
            </Button>
          </Link>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="hover:border-[#116114] hover:text-[#116114] transition-colors"
              title="Share this property"
            >
              <FaShareAlt className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {property.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="mr-2 h-5 w-5 text-[#CD6115]" />
                  <span className="text-lg">{property.address}</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Property Photos
              </h2>
              {property.images.length > 0 ? (
                <ImageGallery
                  images={property.images}
                  propertyName={property.name}
                />
              ) : (
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Property Description
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="leading-relaxed">
                  Welcome to {property.name}, located in the heart of{" "}
                  {property.address}. This premium property offers luxury living
                  with modern amenities and excellent accessibility. Perfect for
                  families and professionals seeking comfort and convenience in
                  Lagos.
                </p>
                <p className="leading-relaxed mt-3">
                  The property features {property.rental.length} different units
                  available for rent. Each unit is designed with attention to
                  detail and equipped with premium finishes.
                </p>
              </div>
            </div>

            {/* Amenities */}
            {uniqueAmenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {uniqueAmenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      {amenity.icon && amenity.icon.trim() !== "" ? (
                        <Image
                          src={amenity.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="flex-shrink-0 object-contain"
                        />
                      ) : (
                        <FaCheckCircle className="text-[#116114] flex-shrink-0" />
                      )}
                      <span>{amenity.name.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {uniqueFeatures.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {uniqueFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      {feature.icon && feature.icon.trim() !== "" ? (
                        <Image
                          src={feature.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="flex-shrink-0 object-contain"
                        />
                      ) : (
                        <FaCheckCircle className="text-[#CD6115] flex-shrink-0" />
                      )}
                      <span>{feature.name.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Units */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Rental Units
                </h2>
              </div>

              {/* Compact Filter Section */}
              <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* <div className="flex items-center gap-2 text-gray-700 flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#116114]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold text-sm">Filter Units:</span>
                  </div> */}

                  {/* Furnishing Type Dropdown */}
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs text-gray-600 mb-1 font-medium">
                      Furnishing Type
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select furnishing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All</SelectItem>
                        {allPossibleCategories.map((category) => {
                          return (
                            <SelectItem key={category} value={category}>
                              {category.replace(/_/g, " ")}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 min-w-0">
                    <label className="block text-xs text-gray-600 mb-1 font-medium">
                      Rental Frequency
                    </label>
                    <Select
                      value={selectedFrequency}
                      onValueChange={setSelectedFrequency}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select rental frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All</SelectItem>
                        {allPossibleFrequencies.map((frequency) => {
                          return (
                            <SelectItem key={frequency} value={frequency}>
                              {frequency.replace(/-/g, " ")}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters Button */}
                  {(selectedCategory !== "ALL" ||
                    selectedFrequency !== "ALL") && (
                    <div className="flex-shrink-0 sm:self-end">
                      <button
                        onClick={() => {
                          setSelectedCategory("ALL");
                          setSelectedFrequency("ALL");
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors"
                        title="Clear all filters"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="hidden sm:inline">Clear</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {filteredRentals.length === 0 ? (
                <div className="text-center py-12">
                  <div className=" max-w-md mx-auto">
                    <p className="text-gray-600 mb-2">
                      {selectedCategory === "ALL" && selectedFrequency === "ALL"
                        ? "No rental units are currently available for this property."
                        : `No units available with the selected filters.`}
                    </p>
                    {(selectedCategory !== "ALL" ||
                      selectedFrequency !== "ALL") && (
                      <>
                        <p className="text-sm text-gray-500 mb-4">
                          Try selecting different filters or view all available
                          units.
                        </p>
                        <button
                          onClick={() => {
                            setSelectedCategory("ALL");
                            setSelectedFrequency("ALL");
                          }}
                          className="bg-[#116114] text-white px-4 py-2 rounded-lg hover:bg-[#0d4d10] transition-colors"
                        >
                          View All
                        </button>
                      </>
                    )}
                    {selectedCategory === "ALL" &&
                      selectedFrequency === "ALL" && (
                        <p className="text-sm text-gray-500">
                          Please check back later or contact us for more
                          information.
                        </p>
                      )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredRentals.map((apartment) => (
                    <ApartmentCard
                      key={apartment.id}
                      apartment={apartment}
                      propertyName={property.name}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Sidebar */}
          <div className="lg:col-span-1">
            <ContactAgentSidebar
              propertyName={property.name}
              rentalId={property.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
