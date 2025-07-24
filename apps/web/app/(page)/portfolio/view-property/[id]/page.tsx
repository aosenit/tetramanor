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
  if (error || !property) return null;
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
      <ScheduleInspection propertyTitle={property.name} />
      <Footer />
    </div>
  );
}
