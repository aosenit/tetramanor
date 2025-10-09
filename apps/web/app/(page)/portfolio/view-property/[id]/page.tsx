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
import { FiShare2, FiArrowLeft, FiHeart } from "react-icons/fi";
import { ToastProvider, useToast } from "@/components/ui/toast-notification";
import { shareProperty } from "@/lib/shareUtils";
import { useFetchData } from "@/hooks/useApi";
import { Property } from "../../types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { id: string };
}

function PageContent({ params }: PageProps) {
  const { showToast } = useToast();
  const [isFavorited, setIsFavorited] = React.useState(false);

  const { data, isLoading, error } = useFetchData(
    `property/detail/${params.id}`
  );
  const property: Property = data?.data;

  const handleShare = async () => {
    if (!property) return;

    const success = await shareProperty(property.name, property.id);
    if (success) {
      showToast(
        "Shared successfully!",
        "Property link has been shared or copied to clipboard.",
        "success"
      );
    } else {
      showToast(
        "Failed to share",
        "Could not share the property. Please try again.",
        "error"
      );
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    showToast(
      isFavorited ? "Removed from favorites" : "Added to favorites",
      isFavorited
        ? "Property has been removed from your favorites."
        : "Property has been added to your favorites.",
      "success"
    );
  };

  const handleBackToPortfolio = () => {
    window.history.back();
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center p-4">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
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
          We couldn&apos;t load this property right now. Please try again later.
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
          The property you are looking for might have been removed or
          doesn&apos;t exist.
        </p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-14">

      <Hero property={property} />
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[#151515] font-medium text-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          onClick={handleBackToPortfolio}
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg text-[#151515] hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            onClick={handleShare}
          >
            <FiShare2 className="w-4 h-4" />
          </button>

          <button
            className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg transition-all duration-200 ${
              isFavorited
                ? "text-red-500 border-red-200 bg-red-50"
                : "text-[#151515] hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={handleFavorite}
          >
            <FiHeart
              className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>
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

export default function Page({ params }: PageProps) {
  return (
    <ToastProvider>
      <PageContent params={params} />
    </ToastProvider>
  );
}
