"use client";
import React from "react";
import PropertyCardNew from "../components/property-card-new";
import { useFetchData } from "@/hooks/useApi";
import type { Property } from "../types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Completed() {
  const router = useRouter();

  // Fetch completed properties (limit 3)
  const {
    data: propertyResponse,
    isLoading,
    error,
    refetch, // ✅ add refetch
  } = useFetchData("property", {
    page: 1,
    limit: 3,
    constructionStatus: "COMPLETED",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const properties: Property[] = propertyResponse?.data?.items || [];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">
        Completed Projects
      </h2>

      {isLoading ? (
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-full min-h-[400px] bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <p className="text-red-500 font-medium">
            Failed to load completed projects.
          </p>
          <Button onClick={() => refetch()} size="sm">
            Try Again
          </Button>
        </div>
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <p>No completed projects available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {/* Large card on top */}
            {properties[0] && (
              <div className="w-full">
                <PropertyCardNew
                  key={properties[0].id}
                  property={properties[0]}
                  size="large"
                  className="w-full"
                />
              </div>
            )}

            {/* Two smaller cards below */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {properties.slice(1, 3).map((property) => (
                <PropertyCardNew
                  key={property.id}
                  property={property}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={() => router.push("/portfolio/view-more?type=completed")}
            >
              View More
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

export default Completed;
