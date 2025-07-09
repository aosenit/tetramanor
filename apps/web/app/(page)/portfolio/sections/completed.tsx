"use client";
import React from "react";
import PropertyCard from "../components/property-card";
import { useFetchData } from "@/hooks/useApi";
import type { PropertyResponse, PropertyItem } from "@/types/property";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Completed() {
  const router = useRouter();
  // Fetch completed properties (limit 3)
  const {
    data: propertyResponse,
    isLoading,
    error,
  } = useFetchData("property", {
    page: 1,
    limit: 3,
    constructionStatus: "COMPLETED",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const properties: PropertyItem[] = propertyResponse?.data?.items || [];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-16 bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Completed Projects
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">Failed to load properties</div>
      ) : (
        <>
          <div className="grid gap-6">
            {/* Top: First card spans full width */}
            {properties[0] && (
              <div className="w-full">
                <PropertyCard
                  key={properties[0].id}
                  slug={properties[0].id}
                  image={properties[0].images[0]?.imageUrl}
                  title={properties[0].name}
                  location={properties[0].address}
                  status={properties[0].status === "SOLDOUT" ? "Sold Out" : properties[0].status}
                  className="h-full min-h-[400px]"
                />
              </div>
            )}
            {/* Bottom: Next two cards side by side */}
            <div className="grid md:grid-cols-2 gap-6">
              {properties.slice(1, 3).map((property) => (
                <PropertyCard
                  key={property.id}
                  slug={property.id}
                  image={property.images[0]?.imageUrl}
                  title={property.name}
                  location={property.address}
                  status={property.status === "SOLDOUT" ? "Sold Out" : property.status}
                  className="h-full min-h-[400px]"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button size="lg" onClick={() => router.push("/portfolio/view-more?type=completed")}>View More</Button>
          </div>
        </>
      )}
    </section>
  );
}

export default Completed;
