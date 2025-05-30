import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PropertyMaintenance from "../components/PropertyMaintenance";
import PropertyDocument from "../components/PropertyDocument";
import PropertyPaymentHistory from "../components/PropertyPaymentHistory";
import PropertyDetailOverview from "../components/PropertyDetailOverview";

export default function PropertyPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data based on the ID
  const property = {
    id: params.id,
    name: "Queen Mary",
    location: "Ebutte Metta, Lagos, Nigeria.",
    description:
      "Queen Mary is a thoughtfully designed residential estate featuring multi-family homes in the heart of Surulere, Lagos. Strategically located near Funsho Williams Avenue, it offers seamless access to both the Island and Mainland, making it an ideal choice for professionals, families, and investors seeking a well-connected and serene living environment. Completed in July 2017, this estate combines modern architectural excellence with high-end finishing to deliver superior comfort and style.",
    status: "Project completed",
    contactPerson: {
      name: "John D. Patkins",
      role: "Account Officer",
      phone: "+234 812 345 67",
      email: "johndpatkins@mail.com",
    },
    features: [
      "Swimming Pool",
      "Study/Office",
      "Air Conditioning",
      "Garden",
      "Security System",
      "Elevator",
      "Parking",
      "Wheelchair Access",
      "Pets Allowed",
      "Fireplace",
      "Balcony",
    ],
  };

  return (
    <main className="min-h-screen">
      <div className="border-b">
        <div className="container py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>{property.name}</span>
          </Link>
        </div>
      </div>

      <div className="container py-4">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment-history">Payment History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PropertyDetailOverview property={property} />
          </TabsContent>

          <TabsContent value="payment-history">
            <PropertyPaymentHistory />
          </TabsContent>

          <TabsContent value="documents">
            <PropertyDocument />
          </TabsContent>

          <TabsContent value="maintenance">
            <PropertyMaintenance />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
