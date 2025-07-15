"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import PropertyCard from "../components/property-card";
import { Button } from "@/components/ui/button";
import type { PropertyItem } from "@/types/property";

export default function ViewMorePortfolio() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "ongoing";
  const isOngoing = type === "ongoing";

  const {
    data: propertyResponse,
    isLoading,
    error,
  } = useFetchData("property", {
    page: 1,
    limit: 100,
    constructionStatus: isOngoing ? "ONGOING" : "COMPLETED",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const properties: PropertyItem[] = propertyResponse?.data?.items || [];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-16 bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 text-center">
        {isOngoing ? "All Ongoing Projects" : "All Completed Projects"}
      </h2>
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-full min-h-[400px] bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      ) : error ? null : properties.length === 0 ? (
        <div className="text-center">No properties found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              image={property.images[0]?.imageUrl}
              title={property.name}
              location={property.address}
              status={
                property.constructionStatus === "ONGOING"
                  ? "Ongoing"
                  : property.status
              }
              className="h-full min-h-[400px]"
              slug={property.id}
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