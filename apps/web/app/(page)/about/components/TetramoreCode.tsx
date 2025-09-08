import React from "react";
import Image from "next/image";
import eight from "@/assets/about/icons/eight.webp";
import nine from "@/assets/about/icons/nine.webp";
import ten from "@/assets/about/icons/ten.webp";
import eleven from "@/assets/about/icons/eleven.webp";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const features = [
  {
    icon: eight,
    label: "Reasonable prices",
  },
  {
    icon: nine,
    label: "Flexible payment",
  },
  {
    icon: ten,
    label: "Verified listings",
  },
  {
    icon: eleven,
    label: "24/7 support",
  },
  {
    icon: ten,
    label: "Seamless onboarding",
  },
];

function TetramoreCode() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <div className="text-center">
        <h1 className="text-3xl text-[#CD6115] font-semibold">
          The Tetramanor Code
        </h1>
        <p className="mt-4 text-gray-700 text-sm">
          This is the promise we make to our clients:
        </p>
      </div>
      <div className="mt-6 relative max-w-xs  mx-auto">
        {/* Opening quote */}
        <FaQuoteLeft className="absolute -top-4 -left-4 text-2xl text-[#202020]" />

        <blockquote className="text-center italic text-sm text-[#202020] space-y-2">
          <p>We will not compromise our standards for any reason whatsoever.</p>
          <p>We will not extort our clients to make a profit.</p>
          <p>
            We will not sell to our clients spaces we are not willing to live in
            ourselves.
          </p>
        </blockquote>

        {/* Closing quote */}
        <FaQuoteRight className="absolute -bottom-4 -right-4 text-2xl text-[#202020]" />
      </div>

      <div className="grid  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
        {features.map((item, index) => (
          <button
            key={index}
            className="flex text-sm font-medium items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-sm"
          >
            <Image src={item.icon} alt="icon" width={30} height={30} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TetramoreCode;
