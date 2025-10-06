"use client";

import React from "react";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";
import { RentalPropertyDetail } from "@/types/property";
import ApartmentCard from "./ApartmentCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";

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
          <div className="grid md:grid-cols-2 gap-8">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  const property: RentalPropertyDetail | null = data?.data || null;

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

  const mainImage =
    property.coverImage?.imageUrl ||
    property.images[0]?.imageUrl ||
    placeholder;
  const otherImages = property.images
    .filter((img) => img.imageUrl !== mainImage)
    .slice(0, 3)
    .map((img) => img.imageUrl);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 lg:px-16 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/rental">
            <Button variant="outline" className="flex items-center gap-2">
              <FaArrowLeft className="h-4 w-4" />
              Back to Rentals
            </Button>
          </Link>
        </div>

        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={mainImage}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
              </div>
              {otherImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {otherImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-16 w-full rounded overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${property.name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2 h-4 w-4 text-[#CD6115]" />
                  <span>{property.address}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Property Overview
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Units:</span>
                    <span className="ml-2 font-semibold">
                      {property.rental.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Available Units:</span>
                    <span className="ml-2 font-semibold text-green-600">
                      {
                        property.rental.filter(
                          (unit) => unit.status === "AVAILABLE"
                        ).length
                      }
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      Total Available Units:
                    </span>
                    <span className="ml-2 font-semibold text-green-600">
                      {property.rental
                        .filter((unit) => unit.status === "AVAILABLE")
                        .reduce((sum, unit) => sum + unit.numberOfUnits, 0)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Unit Types:</span>
                    <span className="ml-2 font-semibold">
                      {Array.from(
                        new Set(
                          property.rental.map((unit) => unit.apartmentType)
                        )
                      ).join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/contact">
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    Contact Agent
                  </Button>
                </Link>
                <Button variant="outline">Download Brochure</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Apartments */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Rental Units ({property.rental.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing all rental units
            </div>
          </div>

          {property.rental.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No apartments available at this time.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {property.rental.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
