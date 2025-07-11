"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Details from "./components/Details";

function RentalDetailsPage() {
  const router = useRouter();

  // Create a comprehensive refetch function that can trigger multiple refetches
  const handleRefetch = useCallback(() => {
    // This function can be called to refresh both rental data and stats
    console.log("Refetching rental data and stats...");

    // You can add logic here to trigger refetch of stats from the main rentals page
    // For now, we'll use a custom event that the main page can listen to
    window.dispatchEvent(new CustomEvent("refetch-rentals-stats"));
  }, []);

  return <Details refetch={handleRefetch} />;
}

export default RentalDetailsPage;
