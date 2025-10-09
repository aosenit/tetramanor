import React, { Suspense } from "react";
import HomeHero from "./components/Hero";
import Footer from "@/components/home/Footer";
import RentalListing from "./components/RentalListing";
import Loader from "@/components/Loader";

const RentalPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <HomeHero />
      <Suspense fallback={<Loader />}>
        <RentalListing />
      </Suspense>
      <Footer />
    </div>
  );
};

export default RentalPage;
