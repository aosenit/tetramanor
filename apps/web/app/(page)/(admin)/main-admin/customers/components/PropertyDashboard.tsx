"use client";

import { useState } from "react";
import Image from "next/image";
import ive from "@/assets/admin/four.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import four from "@/assets/admin/home/four.webp";
import one from "@/assets/admin/customer/one.svg";
import nine from "@/assets/admin/nine.png";
import dp from "@/assets/admin/customer/dp.png";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "lucide-react";

const rentedProperties = [
  {
    id: "1A",
    image: four,
    type: "Apartment",
    bedrooms: 3,
    floor: "1st",
    price: "₦6.5M",
    priceSubtext: "(₦6,500)",
    officer: "John D. Potkins",
    status: "Paid",
  },
  {
    id: "1A",
    image: nine,
    type: "Duplex",
    bedrooms: 4,
    floor: "1st",
    price: "₦3.5M",
    priceSubtext: "(₦6,500)",
    officer: "John D. Potkins",
    status: "Paid",
  },
  {
    id: "1A",
    image: four,
    type: "Studio Apartment",
    bedrooms: 1,
    floor: "2nd",
    price: "₦3.5M",
    priceSubtext: "(₦6,500)",
    officer: "John D. Potkins",
    status: "Paid",
  },
  {
    id: "1A",
    image: nine,
    type: "Apartment",
    bedrooms: 3,
    floor: "1st",
    price: "₦3.5M",
    priceSubtext: "(₦6,500)",
    officer: "John D. Potkins",
    status: "Paid",
  },
];

const ownedProperties = [
  {
    id: "2B",
    image: nine,
    type: "Apartment",
    bedrooms: 2,
    floor: "1st",
    price: "₦5.5M",
    priceSubtext: "(₦5,500)",
    officer: "Jane E. Smith",
    status: "Paid",
  },
  {
    id: "4D",
    image: four,
    type: "Duplex",
    bedrooms: 5,
    floor: "2nd",
    price: "₦12.3M",
    priceSubtext: "(₦12,300)",
    officer: "Samuel D. Kings",
    status: "Paid",
  },
  {
    id: "3A",
    image: four,
    type: "Studio Apartment",
    bedrooms: 1,
    floor: "1st",
    price: "₦2.1M",
    priceSubtext: "(₦2,100)",
    officer: "Mary J. West",
    status: "Paid",
  },
  {
    id: "5C",
    image: nine,
    type: "Flat",
    bedrooms: 3,
    floor: "2nd",
    price: "₦6.8M",
    priceSubtext: "(₦6,800)",
    officer: "Ayo B. Johnson",
    status: "Paid",
  },
  {
    id: "1D",
    image: four,
    type: "Penthouse",
    bedrooms: 6,
    floor: "1st",
    price: "₦15.0M",
    priceSubtext: "(₦15,000)",
    officer: "Lara C. Grey",
    status: "Paid",
  },
  {
    id: "6E",
    image: nine,
    type: "Maisonette",
    bedrooms: 4,
    floor: "2nd",
    price: "₦9.9M",
    priceSubtext: "(₦9,900)",
    officer: "David B. Cole",
    status: "Paid",
  },
  {
    id: "7F",
    image: four,
    type: "Bungalow",
    bedrooms: 3,
    floor: "3rd",
    price: "₦4.2M",
    priceSubtext: "(₦4,200)",
    officer: "Doris N. Grant",
    status: "Paid",
  },
  {
    id: "8G",
    image: nine,
    type: "Loft",
    bedrooms: 2,
    floor: "3rd",
    price: "₦3.7M",
    priceSubtext: "(₦3,700)",
    officer: "Femi T. Wale",
    status: "Paid",
  },
];

export default function PropertyDashboard() {
  const [tab, setTab] = useState("rented");

  const currentProperties =
    tab === "rented" ? rentedProperties : ownedProperties;

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#858C95]">Admin</span>
          <span className="text-gray-500">/</span>
          <span className="font-medium text-[#116114] text-xl">TM meadows</span>
        </div>
        <div className="bg-white rounded-lg p-4 mb-6 w-80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#000000] font-medium text-sm mb-1">
                {tab === "rented" ? "Total units rented" : "Total units owned"}
              </p>
              <p className="text-[#116114] font-semibold">
                {currentProperties.length} units
              </p>
            </div>
            <div>
              <Image src={tab === "rented" ? ive : one} alt="property" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-fit grid-cols-2 mb-6">
            <TabsTrigger value="owned">Owned</TabsTrigger>
            <TabsTrigger value="rented">Rented</TabsTrigger>
          </TabsList>

          <TabsContent value={tab}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-8 gap-4 p-4 bg-[#F5F5F5] border-b text-sm font-medium text-gray-600">
                <div className="flex items-center">
                  <Checkbox className="mr-3" />
                </div>
                <div className="text-[#252525] text-xs font-medium">
                  Property
                </div>
                <div className="text-[#252525] text-xs font-medium">Type</div>
                <div className="text-[#252525] text-xs font-medium">
                  Bedrooms
                </div>
                <div className="text-[#252525] text-xs font-medium">Floor</div>
                <div className="text-[#252525] text-xs font-medium">
                  Purchase Price
                </div>
                <div className="text-[#252525] text-xs font-medium">
                  Account Officer
                </div>
                <div className="text-[#252525] text-xs font-medium">
                  {tab === "rented" ? "Payment status" : "Payment status"}
                </div>
              </div>

              {/* Table Rows */}
              {currentProperties.map((property, index) => (
                <div
                  key={index}
                  className="grid grid-cols-8 gap-4 p-4 border-b hover:bg-gray-50 items-center"
                >
                  <div className="flex items-center">
                    <Checkbox className="mr-3" />
                  </div>

                  <div className="flex items-center gap-3">
                    <Image
                      src={property.image}
                      alt={`Unit ${property.id}`}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <span className="font-medium">Unit {property.id}</span>
                  </div>

                  <div className="text-gray-600">{property.type}</div>
                  <div className="text-gray-600">{property.bedrooms}</div>
                  <div className="text-gray-600">{property.floor}</div>

                  <div className="flex gap-2 items-center">
                    <div className="font-medium">{property.price}</div>
                    <div className="text-sm text-gray-500">
                      {property.priceSubtext}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src={dp}
                      alt="Account Officer"
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">
                      {property.officer}
                    </span>
                  </div>

                  <div>
                    <p className="text-[#2EBF43]">{property.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="pt-20 pb-20">
        <Link href="/main-admin/customers/owned-properties">
        <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
          <MdArrowBackIosNew /> Back
          </button>
        </Link>
      </div>
    </div>
  );
}
