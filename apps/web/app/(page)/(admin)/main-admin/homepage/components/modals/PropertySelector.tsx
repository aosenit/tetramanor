"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/home/logo.webp";
import PropertyCard from "../cards/Property";
import four from "@/assets/admin/home/four.webp";

const properties = [
  {
    id: 1,
    name: "TM Meadows",
    location: "Ebute meta",
    rooms: "3BR+BQ",
    status: "Available",
    furnished: true,
    image: four,
  },
  {
    id: 2,
    name: "TM Highgarden",
    location: "Ebute meta",
    rooms: "3BR+BQ",
    status: "Available",
    furnished: true,
    image: four,
  },
  {
    id: 3,
    name: "Queen mary",
    location: "Ebute meta",
    rooms: "3BR+BQ",
    status: "Sold",
    furnished: true,
    image: four,
  },
  {
    id: 4,
    name: "Comfy burrows",
    location: "Ebute meta",
    rooms: "3BR+BQ",
    status: "Rented",
    furnished: false,
    image: four,
  },
  {
    id: 5,
    name: "Comfy burrows",
    location: "Ebute meta",
    rooms: "3BR+BQ",
    status: "Rented",
    furnished: false,
    image: four,
  },
  {
    id: 6,
    name: "Comfy burrows",
    location: "Ebute meta",
    rooms: "3BR+BQ",
    status: "Rented",
    furnished: false,
    image: four,
  },
];

export default function PropertySelector({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;

  // Filter properties
  const filtered = properties.filter((p) =>
    `${p.name} ${p.location} ${p.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-4xl bg-white overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4 flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white hover:text-red-300" />
          </button>
        </header>

        {/* Main Content */}
        <div className="px-4 py-8">
          <div className="text-sm font-medium text-[#116114] mb-4">
            Select for featured property
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search Properties"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-200 border-0 text-gray-600 placeholder:text-gray-500"
            />
          </div>

          {/* Properties List */}
          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                No properties found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
