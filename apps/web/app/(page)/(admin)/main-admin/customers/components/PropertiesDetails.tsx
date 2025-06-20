"use client";

import Image from "next/image";
import nine from "@/assets/admin/nine.png";
import a from "@/assets/admin/a.svg";
import b from "@/assets/admin/b.svg";
import c from "@/assets/admin/c.svg";
import d from "@/assets/admin/d.svg";
import e from "@/assets/admin/e.svg";
import f from "@/assets/admin/f.svg";
import g from "@/assets/admin/g.svg";
import h from "@/assets/admin/h.svg";
import i from "@/assets/admin/i.svg";
import j from "@/assets/admin/j.svg";
import k from "@/assets/admin/k.svg";
import {
  MapPin
} from "lucide-react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentsOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const features = [
  {
    name: "Swimming Pool",
    icon: a,
  },
  {
    name: "Garden",
    icon: b,
  },
  {
    name: "Parking",
    icon: c,
  },
  {
    name: "Fireplace",
    icon: d,
  },
  {
    name: "Study/Office",
    icon: e,
  },
  {
    name: "Security System",
    icon: f,
  },
  {
    name: "Wheelchair Access",
    icon: g,
  },
  {
    name: "Balcony",
    icon: h,
  },
  {
    name: "Air Conditioning",
    icon: i,
  },
  {
    name: "Elevator",
    icon: j,
  },
  {
    name: "Pets Allowed",
    icon: k,
  },
];

export default function PropertyDetails() {
  const searchParams = useSearchParams();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);
  const tab = searchParams.get("tab") || "owned";
  const propertyName = searchParams.get("property") || "Unnamed property";

  const propertyLabel = tab === "rented" ? "Rented property" : "Owned property";
  return (
    <div className="p-6 space-y-8">
      {/* Breadcrumb */}
      <div className="text-xs text-[#4C5560] font-medium">
        Customer’s properties /{" "}
        <span className="text-[#116114] text-sm font-medium">
          {propertyLabel}
        </span>
      </div>

      {/* Header + Tabs */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-sm font-semibold text-[#252525]">
            {propertyName}
          </h2>
          <div className="flex items-center gap-2 font-medium text-[#737687] text-xs mt-1">
            <MapPin className="w-4 h-4" />
            Mende, Maryland, Lagos, Nigeria.
          </div>
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link
            href={{
              pathname: "/main-admin/customers/gallery",
              query: {
                tab,
                property: propertyName,
              },
            }}
          >
            <Button
              variant="outline"
              className="flex items-center text-[#323539] gap-3 hover:text-[#323539]"
            >
              Gallery
              <CiImageOn />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/main-admin/customers/documents",
              query: {
                tab,
                property: propertyName,
              },
            }}
          >
          <Button
            variant={"outline"}
            className="flex items-center text-[#323539] gap-3 hover:text-[#323539]"
          >
            Documents
            <IoDocumentsOutline />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/main-admin/customers/payment-history",
              query: {
                tab,
                property: propertyName,
              },
            }}
          >
          <Button
            variant={"outline"}
            className="flex items-center text-[#323539] gap-1 hover:text-[#323539]"
          >
            View payment history
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:flex gap-6">
        <div className="relative w-full lg:w-3/5 h-[400px]">
          <Image
            src={nine}
            alt="Main property"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute top-4 left-4 bg-white text-xs font-semibold rounded-2xl px-3 py-1 shadow">
            Unit 3A
          </div>
          <div className="absolute bottom-4 left-4 text-sm space-y-1 text-white backdrop-blur-sm p-2 bg-black/30 rounded-lg max-w-[90%]">
            <p>
              Unit type{" "}
              <span className="text-white font-medium">
                2 bedroom condominium
              </span>
            </p>
            <p>
              Amount paid{" "}
              <span className="text-white font-medium">₦1,200,000</span>{" "}
              <span className="text-xs text-gray-200">Mar 15, 2025</span>
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="hidden lg:flex flex-col gap-4 w-2/5 h-[400px]">
          <div className="flex-1 relative">
            <Image
              src={nine}
              alt="Thumbnail 1"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1 relative">
            <Image
              src={nine}
              alt="Thumbnail 2"
              fill
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-[#116114] text-sm font-medium mb-4">
          Unit features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-xs text-[#6B6B6B] gap-2"
            >
              <Image src={item.icon} alt="icon" />
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-20 flex justify-end  pb-4">
        <Link href="/main-admin/customers/view-profile">
        <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
          <MdArrowBackIosNew />
          Back
          </button>
          </Link>
      </div>
    </div>
  );
}
