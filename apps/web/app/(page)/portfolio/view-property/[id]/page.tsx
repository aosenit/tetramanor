"use client";
import React from "react";
import Hero from "../sections/hero";
import AboutProperty from "../sections/about-property";
import WhyInvest from "../sections/why-invest";
import MorePictures from "../sections/more-pictures";
import EconomicAdvantages from "../sections/economic-advantages";
import ScheduleInspection from "../sections/schedule-inspection";
import Footer from "@/components/home/Footer";
import MapSection from "../sections/map";
import { FiShare2 } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import { useFetchData } from "@/hooks/useApi";
import { Property } from "../../types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const toast = useToast();
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Page link copied to clipboard.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const { data, isLoading, error } = useFetchData(
    `property/detail/${params.id}`
  );
  const property: Property = data?.data;

  // Loading skeleton
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-end p-4">
          <Skeleton className="h-8 w-32 mb-4" />
        </div>
        <div className="p-8">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-2" />
        </div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn’t load this property right now. Please try again later.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  // No property found
  if (!property) {
    return (
      <div className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Property not found
        </h2>
        <p className="text-gray-600 mb-6">
          The property you are looking for might have been removed or doesn’t
          exist.
        </p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  // Main content
  return (
    <div>
      <div className="flex pt-6 justify-end p-4">
        <button
          className="flex items-center ml-2 text-[#151515] font-medium text-xs hover:text-gray-900"
          onClick={handleShare}
        >
          <FiShare2 className="mr-1" />
          <span>Share</span>
        </button>
      </div>
      <Hero property={property} />
      <AboutProperty property={property} />
      <WhyInvest property={property} />
      <MorePictures property={property} />
      <MapSection location={property.address} />
      <EconomicAdvantages property={property} />
      <ScheduleInspection
        propertyTitle={property.name}
        propertyId={property.id}
      />
      <Footer />
    </div>
  );
}
