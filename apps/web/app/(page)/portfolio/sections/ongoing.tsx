"use client";
import React from "react";
import PropertyCardNew from "../components/property-card-new";
import { useFetchData } from "@/hooks/useApi";
import type { Property } from "../types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Ongoing() {
  const router = useRouter();

  // Fetch ongoing properties (limit 3)
  const {
    data: propertyResponse,
    isLoading,
    error,
    refetch, // ✅ add refetch support
  } = useFetchData("property", {
    page: 1,
    limit: 3,
    constructionStatus: "ONGOING",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const properties: Property[] = propertyResponse?.data?.items || [];

  return (
    <section className="py-16 px-4 container mx-auto md:px-10 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">
        Ongoing Projects
      </h2>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
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
            Failed to load ongoing projects.
          </p>
          <Button onClick={() => refetch()} size="sm">
            Try Again
          </Button>
        </div>
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <p>No ongoing projects available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6">
            {/* Large card on the left - spans 2 rows */}
            {properties[0] && (
              <div className="lg:row-span-2">
                <PropertyCardNew
                  key={properties[0].id}
                  property={properties[0]}
                  size="large"
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Two smaller cards on the right */}
            {properties[1] && (
              <div className="lg:row-span-1">
                <PropertyCardNew
                  key={properties[1].id}
                  property={properties[1]}
                  className="w-full"
                />
              </div>
            )}

            {properties[2] && (
              <div className="lg:row-span-1">
                <PropertyCardNew
                  key={properties[2].id}
                  property={properties[2]}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={() => router.push("/portfolio/view-more?type=ongoing")}
            >
              View More
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

export default Ongoing;
