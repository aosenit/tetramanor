import React, { Suspense } from "react";
import HomeHero from "./components/Hero";
import Footer from "@/components/home/Footer";
import PropertyListing from "./components/ShortletProperty";
import Loader from "@/components/Loader";

const RentalPage = () => {
  return (
    <>
      <HomeHero />
      <Suspense fallback={<Loader />}>
        <PropertyListing />
      </Suspense>
      <Footer />
    </>
  );
};

export default RentalPage;
