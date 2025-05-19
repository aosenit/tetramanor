import React from "react";
import Hero from "../components/hero";
import AboutProperty from "./sections/about-property";
import WhyInvest from "./sections/why-invest";
import MorePictures from "./sections/more-pictures";
import EconomicAdvantages from "./sections/economic-advantages";
import ScheduleInspection from "./sections/schedule-inspection";
import Footer from "@/components/home/Footer";
import MapSection from "./sections/map";
function Page() {
  return (
    <div>
      <Hero />
      <AboutProperty />
      <WhyInvest />
      <MorePictures />
     <MapSection/>
      <EconomicAdvantages />
      <ScheduleInspection />
      <Footer />
    </div>
  );
}

export default Page;
