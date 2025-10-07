import React from "react";
import PropertyDetail from "./components/PropertyDetail";
import Footer from "@/components/home/Footer";
import Header from "../../portfolio/components/header";
import { ToastProvider } from "@/components/ui/toast-notification";

interface PageProps {
  params: {
    id: string;
  };
}

function page({ params }: PageProps) {
  return (
    <ToastProvider>
      <Header />
      <PropertyDetail propertyId={params.id} />
      <Footer />
    </ToastProvider>
  );
}

export default page;
