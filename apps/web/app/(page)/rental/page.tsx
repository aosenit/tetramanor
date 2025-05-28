import React from "react";
import HomeHero from "./components/Hero";
import Footer from "@/components/home/Footer";
import PropertyListing from "./components/ShortletProperty";


const RentalPage = () => {
  return (
    <><HomeHero />
      <PropertyListing/>
      <Footer /></>
  );
};

export default RentalPage;
