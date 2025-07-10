"use client";
import React from "react";
import Hero from "../view-property/sections/hero";
import AboutProperty from "./sections/about-property";
import WhyInvest from "./sections/why-invest";
import MorePictures from "./sections/more-pictures";
import EconomicAdvantages from "./sections/economic-advantages";
import ScheduleInspection from "./sections/schedule-inspection";
import Footer from "@/components/home/Footer";
import MapSection from "./sections/map";
import { FiShare2 } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import { useFetchData } from "@/hooks/useApi";

interface PageProps {
  searchParams: {
    title?: string;
    location?: string;
    status?: string;
    image?: string;
  }
}

export default function Page({ searchParams }: PageProps) {
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

  // Fetch property data by title
  const { data: propertyResponse, isLoading, error } = useFetchData("property", {
    page: 1,
    limit: 1,
    search: searchParams.title,
  });
  const property = propertyResponse?.data?.items?.[0];

  // Pass the dynamic data to the components that need it
  return (
    <div>
      <div className="flex justify-end p-4">
        <button className="flex items-center text-[#151515] font-medium text-sm hover:text-gray-900" onClick={handleShare}>
          <FiShare2 className="mr-1" />
          <span>Share</span>
        </button>
      </div>
      {isLoading ? (
        <div className="p-8 text-center">Loading property...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">Failed to load property.</div>
      ) : property ? (
        <>
          <Hero property={property} />
          <AboutProperty property={property} />
          <WhyInvest property={property} />
          <MorePictures property={property} />
          <MapSection location={property.address} />
          <EconomicAdvantages location={property.address} />
          <ScheduleInspection propertyTitle={property.name} />
        </>
      ) : (
        <div className="p-8 text-center">No property found.</div>
      )}
      <Footer />
    </div>
  );
}
