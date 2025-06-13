"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import placeholder from "@/assets/placeholder.svg";
import { useFetchData } from "@/hooks/useApi";
import Loading from "../../component/Loading";

export function PropertyGrid() {
  const { data, isLoading } = useFetchData("customer/properties");

  const properties = data?.data;
  console.log(properties);

  // if data is loading, show a loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {/* if properties is empty, show a message */}
      {properties?.length === 0 && (
        <div className="col-span-full text-center py-10">
          No properties found
        </div>
      )}
      {properties?.length > 0 &&
        properties?.map((property) => (
          <div
            key={property?.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm p-4"
          >
            <div className="relative">
              <Image
                src={property?.image || placeholder}
                alt={property?.name}
                width={400}
                height={250}
                className="w-full h-[160px] object-cover rounded-md"
              />
              <Badge className="absolute top-3 left-3 bg-white text-black font-medium">
                {property?.unitAmount} units
              </Badge>
            </div>
            <div className="flex justify-between items-center py-4">
              <div className="">
                <h3 className="text-lg font-semibold">{property?.name}</h3>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{property?.location}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link href={`/client-admin/properties/${property?.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
