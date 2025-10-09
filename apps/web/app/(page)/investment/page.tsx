import React from "react";
import Footer from "@/components/home/Footer";
import Hero from "./components/Hero";
import InvestmentOpportunities from "./components/InvestmentOpportunities";
import InvestmentModels from "./components/InvestmentModel";
// import HowItWorks from "./components/TabOne";
import WhyPartnerWithTetramore from "./components/WhyPartnerWithTetramore";
import { ToastProvider } from "@/components/ui/toast-notification";

function Page() {
  return (
    <ToastProvider>
      <div className="bg-[#fafafa]">
        <Hero />
        <InvestmentOpportunities />
        <InvestmentModels />
        {/* <RoiCalculator /> */}
        <WhyPartnerWithTetramore />
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default Page;
