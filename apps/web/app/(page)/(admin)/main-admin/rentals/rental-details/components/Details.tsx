import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import four from "@/assets/admin/home/four.webp";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
const features = [
  "High-Quality Kitchen Cabinets & Wardrobes",
  "Walk-in Closets",
  "POP Ceilings",
  "Premium Sanitary Fittings",
  "Vintage PVC French Windows",
  "Uninterrupted Power Supply",
  "Efficient Waste Disposal & Central Sewage Management",
  "Vitrified & Granite Tiles",
  "Backup Power Supply",
  "24/7 Concierge Services",
];
const amenities = [
  "Fiber Optic Connectivity",
  "Fully Equipped Gym",
  "Stunning Sea View",
  "Uninterrupted Power Supply",
  "Stunning Sea View",
  "Lounge/Bar",
  "Fiber Optic Connectivity",
  "24/7 Concierge Services",
  "State of the art interior decor",
];
function Details() {
  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Rental Overview
            </span>
          </div>
          <Link href="/main-admin/rentals/edit-rentals">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New rental
            </Button>
          </Link>
        </div>
        <h3 className="text-[#4C5560] font-medium text-lg">
          Property overview
        </h3>
        <div className="bg-white mt-4 space-y-4 p-6">
          <p className="text-xl font-medium text-[#181818]">Rental detail</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Image src={four} alt="property" className="w-[350px]" />
            <Image src={four} alt="property" className="w-[350px]" />
            <Image src={four} alt="property" className="w-[350px]" />
          </div>
          <div className=" space-y-4 max-w-6xl">
            <div className="flex items-center justify-between">
              <p className="text-[#181818]">Apartment type </p>
              <p className="text-[#181818]">3bedroom + BQ </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#181818]">Location </p>
              <p className="text-[#181818]">Ebutemetta</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#181818]">Property name</p>
              <p className="text-[#181818]">Comfy burrows</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#000000]">Status</p>
              <p className="text-[#13A017]">Rented </p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 space-y-4 p-6">
          <p className="text-[#116114] font-medium">Financial breakdown </p>
          <div className=" space-y-4 max-w-6xl">
            <div className="flex items-center text-[#181818] justify-between">
              <p>Rental price </p>
              <p>#3,500,000 / year</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Agency fee</p>
              <p>#350,000</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Service charge</p>
              <p>#1,000,000</p>
            </div>
            <div className="flex items-center font-medium text-lg text-[#181818] justify-between">
              <p>Total package</p>
              <p>#5, 150,000</p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 space-y-4 p-6">
          <p className="text-[#116114] font-medium">Tenant info </p>
          <div className=" space-y-4 max-w-6xl text-[#181818]">
            <div className="flex items-center text-[#181818] justify-between">
              <p>Full name </p>
              <p>Subomi Abiola</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Contact details</p>
              <p>+234 8124590464</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Payment date - Rent due</p>
              <p>20/04/2025- 20/04/2026</p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 p-8 space-y-6">
          <h2 className="text-sm font-medium text-[#181818]  mb-6">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
              >
                <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden  w-full">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <h2 className="text-sm font-medium text-[#181818] mb-6">
            Amenities{" "}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
              >
                <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden  w-full">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white mt-4 space-y-4 p-6">
          <h1 className="text-[#116114] font-medium text-sm">Attachments</h1>
          <div className="flex items-center text-sm text-[#323539] gap-4 mt-4">
            <Button variant="outline">Contract pdf</Button>
            <Button variant="outline">Reciept pdf</Button>
          </div>
          <button className="text-[#323539] flex items-center gap-2 py-8 hover:text-[#323539] text-sm">
            <MdArrowBackIosNew />
            Back to page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
