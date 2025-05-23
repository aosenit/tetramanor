import React from "react";
import Hero from "./components/hero";
import Ongoing from "./sections/ongoing";
import Completed from "./sections/completed";
import ContactSection from "../../../components/shared/contact";
import Footer from "@/components/home/Footer";

function Page() {
  return (
    <div>
      <Hero />
      <Ongoing />
      <Completed />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Page;
