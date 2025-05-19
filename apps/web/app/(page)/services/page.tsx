import React from "react";
import Hero from "./sections/hero";
import ValueSection from "./sections/value";
import ContactSection from "@/components/shared/contact";
import InteriorShowcase from "./sections/interior-showcase";
import Footer from "@/components/home/Footer";

function Page() {
  return (
    <div>
      <Hero />
      <ValueSection />
      <InteriorShowcase />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Page;
