import Image from "next/image";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadDocument } from "@/lib/utils";

export default function Component() {
  // TODO: Replace with actual property data from props or fetch
  const property = {
    brochure: [{ id: "brochure-id", name: "brochure.pdf" }],
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <span className="text-blue-600">Home</span>
            <span className="mx-2">/</span>
            <span className="font-medium">property overview</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* View Property Listing Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            View property listing
          </h2>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Header with Download Button */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">
                View property details
              </h3>
              ,
              {property?.brochure?.length > 0 && (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    downloadDocument(
                      property.brochure[0].id,
                      property.brochure[0].name || "brochure.pdf",
                      {
                        name: "John Doe",
                        email: "john.doe@example.com",
                        phone: "1234567890",
                      }
                    )
                  }
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download brochure
                </Button>
              )}
            </div>

            {/* Property Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="aspect-[4/3] relative rounded-lg overflow-hidden"
                >
                  <Image
                    src="/images/property-building.png"
                    alt={`Property view ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Property name</span>
                  <span className="font-medium">Tm meadows</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Property units</span>
                  <div className="flex items-center">
                    <span className="font-medium">8 units</span>
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
                  </div>
                </div>

                {/* Unit Types */}
                <div className="pl-4 space-y-2 text-sm">
                  <div className="text-gray-600">2 bedroom condo</div>
                  <div className="text-gray-600">Studio apartment (4)</div>
                  <div className="text-gray-600">4 Bedroom Maisonettes (2)</div>
                  <div className="text-gray-600">3 bedroom Apartment</div>
                  <div className="text-gray-600">
                    4 Bedroom + BQ Semi-Detached Duplexes
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">📍 Ebute meta lagos</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ongoing</span>
                </div>
              </div>
            </div>

            {/* Property Description */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-800 mb-3">
                Property description
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                TM Meadows is a premium residential development located in the
                heart of Lekki Phase 1. This beautifully designed 3-bedroom
                apartment comes with a BQ and is crafted for modern urban
                living. The property features spacious interiors, high ceilings,
                large windows for natural lighting, and a private balcony.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                Residents enjoy access to top-class amenities including 24/7
                power supply, water treatment plant, secure gated entry, ample
                parking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
