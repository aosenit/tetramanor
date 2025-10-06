import React from "react";
import PropertyDetail from "./components/PropertyDetail";
import Footer from "@/components/home/Footer";
import Header from "../../portfolio/components/header";

interface PageProps {
  params: {
    id: string;
  };
}

function page({ params }: PageProps) {
  return (
    <>
      <Header />
      <PropertyDetail propertyId={params.id} />
      <Footer />
    </>
  );
}

export default page;
