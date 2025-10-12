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
import { shareProperty } from "@/lib/shareUtils";
import {
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaBuilding,
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
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

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

  // Get all unique amenities and features
  const allAmenities = Array.from(
    new Map(
      property.rental
        .flatMap((unit) => unit.amenities)
        .map((item) => [item.id, item])
    ).values()
  );
  const allFeatures = Array.from(
    new Map(
      property.rental
        .flatMap((unit) => unit.features)
        .map((item) => [item.id, item])
    ).values()
  );

  // Get all unique unit categories
  const uniqueCategories = Array.from(
    new Set(property.rental.map((unit) => unit.unitCategory).filter(Boolean))
  );

  // Filter rentals by selected category
  const filteredRentals =
    selectedCategory === "ALL"
      ? property.rental
      : property.rental.filter(
          (unit) => unit.unitCategory === selectedCategory
  );

  const availableUnits = property.rental.filter(
    (unit) => unit.status === "AVAILABLE"
  );

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

                {/* Property Stats - Only show if there are rental units */}
                {property.rental.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#E8F5E8] rounded-lg">
                      <FaBuilding className="text-[#116114]" />
                      <span className="text-sm font-semibold text-gray-900">
                        {property.rental.length} Unit{" "}
                        {property.rental.length !== 1 ? "Types" : "Type"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                      <FaCheckCircle className="text-green-600" />
                      <span className="text-sm font-semibold text-gray-900">
                        {availableUnits.length === 0
                          ? "Unavailable"
                          : `${availableUnits.length} Available`}
                      </span>
                    </div>
                  </div>
                )}
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
            {allAmenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allAmenities.map((amenity) => (
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
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {allFeatures.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allFeatures.map((feature) => (
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
                      <span>{feature.name}</span>
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

              {/* Category Filters */}
              {uniqueCategories.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("ALL")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === "ALL"
                          ? "bg-[#116114] text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </button>
                    {uniqueCategories.map((category) => {
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? "bg-[#116114] text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category.replace(/_/g, " ")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredRentals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No rental units available{" "}
                    {selectedCategory !== "ALL" &&
                      `in the ${selectedCategory.replace(/_/g, " ").toLowerCase()} category`}
                    .
                  </p>
                  {selectedCategory !== "ALL" && (
                    <button
                      onClick={() => setSelectedCategory("ALL")}
                      className="mt-4 text-[#116114] hover:underline font-medium"
                    >
                      View all units
                    </button>
                  )}
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
            <ContactAgentSidebar propertyName={property.name} rentalId={property.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
