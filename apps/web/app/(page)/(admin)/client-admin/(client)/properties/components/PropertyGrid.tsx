import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const properties = [
  {
    id: "queen-mary",
    name: "Queen Mary",
    location: "Mende, Maryland, Lagos, Nigeria.",
    units: 3,
    image: "/images/queen-mary.jpg",
  },
  {
    id: "kings-landing",
    name: "King's Landing",
    location: "Mende, Maryland, Lagos, Nigeria.",
    units: 3,
    image: "/images/kings-landing.jpg",
  },
  {
    id: "tm-meadows",
    name: "TM Meadows",
    location: "Mende, Maryland, Lagos, Nigeria.",
    units: 3,
    image: "/images/tm-meadows.jpg",
  },
  {
    id: "tm-highgardens",
    name: "TM HighGardens",
    location: "Mende, Maryland, Lagos, Nigeria.",
    units: 3,
    image: "/images/tm-highgardens.jpg",
  },
  {
    id: "comfy-burrows",
    name: "Comfy Burrows",
    location: "Mende, Maryland, Lagos, Nigeria.",
    units: 3,
    image: "/images/comfy-burrows.jpg",
  },
  {
    id: "tm-gardens",
    name: "TM Gardens",
    location: "Mende, Maryland, Lagos, Nigeria.",
    units: 3,
    image: "/images/tm-gardens.jpg",
  },
];

export function PropertyGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {properties.map((property) => (
        <div key={property.id} className="border rounded-lg overflow-hidden">
          <div className="relative">
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.name}
              width={400}
              height={250}
              className="w-full h-[160px] object-cover"
            />
            <Badge className="absolute top-3 left-3 bg-white text-black font-medium">
              {property.units} units
            </Badge>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{property.name}</h3>
            <div className="flex items-center mt-2 text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{property.location}</span>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href={`/client-admin/properties/${property.id}`}>
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
