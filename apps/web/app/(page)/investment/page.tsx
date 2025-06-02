import React from "react";
import Footer from "@/components/home/Footer";
import Hero from "./components/Hero";
import InvestmentOpportunities from "./components/InvestmentOpportunities";
import InvestmentModels from "./components/InvestmentModel";
// import HowItWorks from "./components/TabOne";
import WhyPartnerWithTetramore from "./components/WhyPartnerWithTetramore";
import RoiCalculator from "./components/RoiCalculator";



function Page() {
  return (
    <div className="bg-[#fafafa]">
          <Hero />
      <InvestmentOpportunities />
      <InvestmentModels />
      <RoiCalculator/>
      <WhyPartnerWithTetramore/>
      <Footer />
    </div>
  );
}

export default Page;
