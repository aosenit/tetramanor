import React from "react";
import PropertyDetails from "./components/Details";
import Footer from "@/components/home/Footer";
import MapSection from "../../portfolio/view-property/sections/map";
import PropertyEnquiryForm from "./components/Contact";
import ExploreMore from "./components/ExploreMore";

function page() {
  return (
    <div className="bg-[#fafafa] pt-10">
      <PropertyDetails />
      <MapSection />
      <PropertyEnquiryForm />
      <ExploreMore />
      <Footer />
    </div>
  );
}

export default page;
