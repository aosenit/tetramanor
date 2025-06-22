"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@chakra-ui/react";
import nine from "@/assets/admin/nine.png";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import AddUnitModal from "./UnitModal";
const propertyNames = [
  { name: "Comfy burrows", units: 2 },
  { name: "TM high gardens", units: 5 },
  { name: "TM meadows", units: 4 },
  { name: "Queen mary", units: 3 },
  { name: "Queen mary", units: 6 },
  { name: "Queen mary", units: 1 },
];
export default function OwnedProperties() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "owned";

  const title = tab === "rented" ? "Rented properties" : "Owned properties";

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex  pb-4 items-center justify-between">
          <div className="text-[#858C95]  space-y-2">
            <p className="text-xs font-medium">Customer's properties</p>
            <p className="text-[#116114] font-medium">{title}</p>
          </div>
          <Button
            onClick={openModal}
            className="bg-[#858C95] flex items-center gap-2 text-sm hover:bg-[#858C95]"
          >
            <Plus className="" />
            Add property
          </Button>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyNames.map((name, index) => (
            <Card key={index} className="w-full p-4 max-w-2xl ">
              <div className="relative">
                <Link
                  href={{
                    pathname: "/main-admin/customers/properties-details",
                    query: { tab, property: name.name },
                  }}
                >
                  <Image
                    src={nine}
                    alt={`${name.name} apartment complex`}
                    width={500}
                    height={300}
                    className="w-full rounded-lg h-64 object-cover cursor-pointer hover:opacity-90 transition"
                  />
                </Link>

                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-sm font-medium rounded-2xl shadow">
                  {name.units} {name.units === 1 ? "unit" : "units"}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-[#212529]">
                      {name.name}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        Mende, Maryland, Lagos, Nigeria.
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/main-admin/customers/property-dashboard?tab=${tab}`}
                  >
                    <Button
                      variant="outline"
                      className=" bg-white/90 text-xs text-[#2E2E2E] hover:bg-white"
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pt-20  pb-20">
          <Link
            href={`/main-admin/customers/view-profile?tab=${tab}`}>
          <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
            <MdArrowBackIosNew />
            Back
          </button>
          </Link>
        </div>
      </div>
      <AddUnitModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
}
