import { Mail, Phone } from "lucide-react";
import React from "react";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyFeatures } from "./PropertyFeature";
import { PropertyLocation } from "./PropertyLocation";
import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";

const PropertyDetailOverview = ({ property }: { property: any }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-4 space-y-3">
          <PropertyGallery />

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{property.name}</h1>
            <span className="text-primary font-medium">{property.status}</span>
          </div>

          <div className="flex items-center text-gray-500 text-sm">
            <span>{property.location}</span>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-col lg:flex-row gap-4 ">
            <div className="lg:w-2/3 bg-white rounded-lg border p-4 space-y-3">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="bg-white  border  space-y-3 p-4 rounded-lg  lg:w-1/3  divide-y">
              <div className="flex items-center gap-3 mb-4 py-3">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src={placeholder}
                    alt={property.contactPerson.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {property.contactPerson.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {property.contactPerson.role}
                  </p>
                </div>
              </div>
              <div className="space-y-3 py-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{property.contactPerson.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{property.contactPerson.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 space-y-3 mt-5">
            <h2 className="text-xl font-semibold mt-6 mb-3">Features</h2>
            <PropertyFeatures features={property.features} />
          </div>

          <div className="bg-white rounded-lg border p-4 space-y-3 mt-5">
            <h2 className="text-xl font-semibold mt-6 mb-3">Location</h2>
            <PropertyLocation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailOverview;
