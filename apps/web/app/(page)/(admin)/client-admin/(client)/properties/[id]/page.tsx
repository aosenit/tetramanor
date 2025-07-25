"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchData } from "@/hooks/useApi";
// import { toast } from "sonner";

import PropertyMaintenance from "../components/PropertyMaintenance";
import PropertyDocument from "../components/PropertyDocument";
import PropertyPaymentHistory from "../components/PropertyPaymentHistory";
import PropertyDetailOverview from "../components/PropertyDetailOverview";
// import { useSearchParams } from "next/navigation";
import { PropertyGallery } from "../components/PropertyGallery";
import PropertyUnitGallery from "../components/PropertyUnitGallery";

export default function PropertyPage({ params }: { params: { id: string } }) {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  // const name = searchParams.get("name");
  // const type = searchParams.get("type");
  const purchaseId = params.id;

  // Fetch property details using the new endpoint
  const { data, isLoading, isError, error } = useFetchData(
    purchaseId ? `/customer/properties/purchase/${purchaseId}` : ""
  );

  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    if (data?.data) {
      const propertyData = data.data;

      // Transform the API data to match the expected structure
      const transformedProperty = {
        id: purchaseId,
        name: propertyData.name || propertyData.property?.name || "Property",
        location: propertyData.property?.address || "Location not available",
        description: propertyData.property?.about || "No description available",
        status: propertyData.property?.status || "Status not available",
        contactPerson: {
          name: "Account Officer",
          role: "Account Officer",
          phone: "+234 812 345 67",
          email: "accountofficer@tetramanor.com",
        },
        features: propertyData.property?.features || [],
        amenities: propertyData.property?.amenities || [],
        price: propertyData.price,
        floor: propertyData.floor,
        payments: propertyData.payments || [],
        gallery: propertyData.property?.images || [],
        documents: propertyData.documents || [],
        property: propertyData.property,
        // Additional data from API
        unitType: propertyData.unitType,
        paymentStatus: propertyData.paymentStatus,
        isRented: propertyData.isRented,
        accountOfficerId: propertyData.accountOfficerId,
      };

      setProperty(transformedProperty);
    }
  }, [data, purchaseId]);

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div className="border-b">
          <div className="container py-4">
            <div className="inline-flex items-center text-gray-600">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Loading...</span>
            </div>
          </div>
        </div>
        <div className="container py-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !property) {
    return (
      <main className="min-h-screen">
        <div className="border-b">
          <div className="container py-4">
            <Link
              href="/client-admin/properties"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back to Properties</span>
            </Link>
          </div>
        </div>
        <div className="container py-4">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Failed to Load Property
            </h2>
            <p className="text-gray-500 mb-4">
              {error?.message ||
                "Unable to load property details. Please try again."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="border-b">
        <div className="container py-4">
          <Link
            href="/client-admin/properties"
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
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PropertyDetailOverview property={property} />
          </TabsContent>

          <TabsContent value="payment-history">
            <PropertyPaymentHistory
              payments={data?.data?.payments}
              purchaseId={purchaseId}
            />
          </TabsContent>

          <TabsContent value="documents">
            <PropertyDocument documents={data?.data?.documents} />
          </TabsContent>

          <TabsContent value="gallery">
            <PropertyUnitGallery gallery={data?.data?.gallery} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
