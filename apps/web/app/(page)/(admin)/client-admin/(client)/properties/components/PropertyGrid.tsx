"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Home, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import placeholder from "@/assets/placeholder.svg";
import { useFetchData } from "@/hooks/useApi";

export function PropertyGrid() {
  const { data, isLoading, error } = useFetchData("customer/properties");

  const purchases = data?.data;

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-white shadow-sm p-4 animate-pulse"
          >
            <div className="relative">
              <div className="w-full h-[160px] bg-gray-200 rounded-md"></div>
              <div className="absolute top-3 left-3 bg-gray-200 text-gray-200 font-medium px-2 py-1 rounded text-sm">
                Loading...
              </div>
            </div>
            <div className="flex justify-between items-center py-4">
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Unable to load properties
        </h3>
        <p className="text-gray-500 mb-6 max-w-md">
          There was an error loading your purchased properties. Please try again
          later.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Package className="w-4 h-4" />
          <span>Retry</span>
        </Button>
      </div>
    );
  }

  // Empty state
  if (!purchases || purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Home className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No properties found
        </h3>
        <p className="text-gray-500 mb-6 max-w-md">
          You haven't purchased any properties yet. Start your investment
          journey by exploring available properties.
        </p>
        <Link href="/investment">
          <Button className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Explore Properties</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {purchases.map((purchase) => {
        // Get the primary image or first image from the images array
        const primaryImage =
          purchase.images?.find((img) => img.isPrimary) || purchase.images?.[0];
        const imageUrl = primaryImage?.imageUrl || placeholder;

        return (
          <div
            key={purchase.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <Image
                src={imageUrl}
                alt={purchase.name}
                width={400}
                height={250}
                className="w-full h-[160px] object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-white text-black font-medium shadow-sm">
                {purchase.totalUnitsPurchased}{" "}
                {purchase.totalUnitsPurchased === 1 ? "unit" : "units"}
              </Badge>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {purchase.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{purchase.address}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Link href={`/client-admin/properties/property-overview?id=${purchase.id}&name=${purchase.name}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
