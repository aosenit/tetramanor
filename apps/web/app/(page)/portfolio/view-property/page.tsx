import React from "react";
import Hero from "../view-property/sections/hero";
import AboutProperty from "./sections/about-property";
import WhyInvest from "./sections/why-invest";
import MorePictures from "./sections/more-pictures";
import EconomicAdvantages from "./sections/economic-advantages";
import ScheduleInspection from "./sections/schedule-inspection";
import Footer from "@/components/home/Footer";
import MapSection from "./sections/map";

interface PageProps {
  searchParams: {
    title?: string;
    location?: string;
    status?: string;
    image?: string;
  }
}

export default function Page({ searchParams }: PageProps) {
  // Pass the dynamic data to the components that need it
  return (
    <div>
      <Hero 
        title={searchParams.title} 
        location={searchParams.location}
        status={searchParams.status}
        image={searchParams.image}
      />
      <AboutProperty 
        title={searchParams.title}
        location={searchParams.location}
        image={searchParams.image}
      />
      <WhyInvest />
      <MorePictures/>
      <MapSection location={searchParams.location} />
      <EconomicAdvantages location={searchParams.location} />
      <ScheduleInspection propertyTitle={searchParams.title} />
      <Footer />
    </div>
  );
}
