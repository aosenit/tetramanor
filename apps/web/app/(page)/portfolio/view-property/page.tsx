import React from "react";
import Hero from "../view-property/sections/hero";
import AboutProperty from "./sections/about-property";
import WhyInvest from "./sections/why-invest";
import MorePictures from "./sections/more-pictures";
import EconomicAdvantages from "./sections/economic-advantages";
import ScheduleInspection from "./sections/schedule-inspection";
import Footer from "@/components/home/Footer";
import MapSection from "./sections/map";
import { FiShare2 } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";

interface PageProps {
  searchParams: {
    title?: string;
    location?: string;
    status?: string;
    image?: string;
  }
}

export default function Page({ searchParams }: PageProps) {
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
  // Pass the dynamic data to the components that need it
  return (
    <div>
      <div className="flex justify-end p-4">
        <button className="flex items-center text-[#151515] font-medium text-sm hover:text-gray-900" onClick={handleShare}>
          <FiShare2 className="mr-1" />
          <span>Share</span>
        </button>
      </div>
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
