"use client";
import React from "react";
import PropertyCard from "../components/property-card";
import { useFetchData } from "@/hooks/useApi";
import type {PropertyItem } from "@/types/property";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Ongoing() {
  const router = useRouter();
  // Fetch ongoing properties (limit 3)
  const {
    data: propertyResponse,
    isLoading,
    error,
  } = useFetchData("property", {
    page: 1,
    limit: 3,
    constructionStatus: "ONGOING",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const properties: PropertyItem[] = propertyResponse?.data?.items || [];

  return (
    <section className="py-16 px-4 container mx-auto md:px-10 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Ongoing Projects
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">Failed to load properties</div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: First card spans full height */}
            {properties[0] && (
              <div className="w-full h-full">
                <PropertyCard
                  key={properties[0].id}
                  image={properties[0].images[0]?.imageUrl}
                  title={properties[0].name}
                  location={properties[0].address}
                  status={properties[0].constructionStatus === "ONGOING" ? "Ongoing" : properties[0].constructionStatus}
                  className="h-full min-h-[700px]"
                  slug={properties[0].id}
                />
              </div>
            )}
            {/* Right: Stack next two cards */}
            <div className="flex flex-col gap-6">
              {properties.slice(1, 3).map((property) => (
                <PropertyCard
                  key={property.id}
                  image={property.images[0]?.imageUrl}
                  title={property.name}
                  location={property.address}
                  status={property.constructionStatus === "ONGOING" ? "Ongoing" : property.constructionStatus}
                  className="flex-1"
                  slug={property.id}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button size="lg" onClick={() => router.push("/portfolio/view-more?type=ongoing")}>View More</Button>
          </div>
        </>
      )}
    </section>
  );
}

export default Ongoing;
