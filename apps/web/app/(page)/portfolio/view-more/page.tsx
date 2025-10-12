"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import PropertyCardNew from "../components/property-card-new";
import { Button } from "@/components/ui/button";
import type { Property } from "../types";

export default function ViewMorePortfolio() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "ongoing";
  const isOngoing = type === "ongoing";

  const {
    data: propertyResponse,
    isLoading,
    error,
    refetch, // ✅ allow retry
  } = useFetchData("property", {
    page: 1,
    limit: 100,
    constructionStatus: isOngoing ? "ONGOING" : "COMPLETED",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const properties: Property[] = propertyResponse?.data?.items || [];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 text-center">
        {isOngoing ? "All Ongoing Projects" : "All Completed Projects"}
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <p className="text-red-500 font-medium">
            Failed to load {isOngoing ? "ongoing" : "completed"} projects.
          </p>
          <Button onClick={() => refetch()} size="sm">
            Try Again
          </Button>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center text-gray-500">
          No {isOngoing ? "ongoing" : "completed"} projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCardNew
              key={property.id}
              property={property}
              className="w-full"
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>
    </section>
  );
}
