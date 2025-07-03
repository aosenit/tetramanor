import React, { Suspense } from "react";
import HomeHero from "./components/Hero";
import Footer from "@/components/home/Footer";
import PropertyListing from "./components/ShortletProperty";

const RentalPage = () => {
  return (
    <>
      <HomeHero />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading properties...</span>
            </div>
          </div>
        }
      >
        <PropertyListing />
      </Suspense>
      <Footer />
    </>
  );
};

export default RentalPage;
