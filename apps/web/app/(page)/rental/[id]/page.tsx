import React from "react";
import PropertyDetail from "./components/PropertyDetail";
import Footer from "@/components/home/Footer";

interface PageProps {
  params: {
    id: string;
  };
}

function page({ params }: PageProps) {
  return (
    <>
      <PropertyDetail propertyId={params.id} />
      <Footer />
    </>
  );
}

export default page;
