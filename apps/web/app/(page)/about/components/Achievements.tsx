"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import one from "@/assets/about/icons/one.webp";
import two from "@/assets/about/icons/two.webp";
import three from "@/assets/about/icons/three.webp";
import placeholder from "@/assets/placeholder.jpg";
import { useFetchData } from "@/hooks/useApi";

interface Achievement {
  image: StaticImageData;
  title: string;
  description: string;
}

interface Property {
  id: string;
  name: string;
  unitType: string;
  launchValue: string;
  currentValue: string;
  image: string;
}

const achievements: Achievement[] = [
  {
    image: one,
    title: "Rental Disbursements",
    description:
      "In 2024, we disbursed over ₦22m in rental payments to homeowners who subscribed to our property management services.",
  },
  {
    image: three,
    title: "100+ Families Housed",
    description:
      "We&apos;ve helped over 100 families find modern, high-value homes that offer both comfort and long-term potential.",
  },
  {
    image: two,
    title: "TM Gardens: 120% growth in 2 years.",
    description:
      "TM Gardens, initially priced at ₦55M, is now valued at ₦120M in two years. Every home we build is crafted to offer both comfort and tangible returns.",
  },
];

export default function Achievements() {
  // Fetch capital appreciation data
  const { data, isLoading } = useFetchData("miscs/capital-appreciation");
  const properties: Property[] = data?.data || [];
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">
      <div className="max-w-2xl text-center mx-auto">
        <h2 className="text-2xl md:text-3xl text-black font-semibold">
          Our Achievements to Date
        </h2>
        <p className="mt-3 md:mt-4 text-gray-700 text-sm md:text-base">
          We don&apos;t just build homes — we create long-term value. From
          strong capital growth to rental returns, our milestones reflect our
          commitment to building wealth for our clients.
        </p>
      </div>
      <div className="grid mt-6 md:mt-8 gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="p-4 md:p-6 bg-[#f5f5f5] rounded-lg hover:shadow-md transition-shadow"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={40}
              height={40}
              className="object-contain"
            />
            <h4 className="mt-4 text-black text-base md:text-lg font-semibold">
              {item.title}
            </h4>
            <p className="mt-2 text-sm md:text-base text-gray-700">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 md:mt-12 p-4 md:p-6 lg:p-8 bg-[#f5f5f5] rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl text-black font-semibold">
              Proven Capital Appreciation
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-700">
              We&apos;ve also seen impressive capital growth across our
              projects.
            </p>
          </div>
          <Image
            src={one}
            alt="icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="grid gap-4 md:gap-6 mt-8 md:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? // Loading skeleton
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden aspect-[4/5] bg-gray-200 animate-pulse"
                />
              ))
            : properties.length === 0
              ? // Show placeholder when no data
                [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden aspect-[4/5] group"
                  >
                    <Image
                      src={placeholder}
                      alt="Property placeholder"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 md:p-4 flex flex-col justify-end">
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-slate-700/60 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        Property Type
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-white">
                        Property Name
                      </h2>
                      <ul className="text-xs md:text-sm space-y-0.5 md:space-y-1 text-white/90">
                        <li>
                          • Launch Value:{" "}
                          <span className="font-semibold text-white">N/A</span>
                        </li>
                        <li>
                          • Current Value:{" "}
                          <span className="font-semibold text-white">N/A</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              : properties.map((property) => (
                  <div
                    key={property.id}
                    className="relative rounded-xl overflow-hidden aspect-[4/5] group"
                  >
                    <Image
                      src={property.image || placeholder}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 md:p-4 flex flex-col justify-end">
                      {/* <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-slate-700/60 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        {property.unitType}
                      </div> */}
                      <h2 className="text-lg md:text-xl font-semibold text-white">
                        {property.name}
                      </h2>
                      <ul className="text-xs md:text-sm space-y-0.5 md:space-y-1 text-white/90">
                        <li>
                          • Launch Value:{" "}
                          <span className="font-semibold text-white">
                            {property.launchValue}
                          </span>
                        </li>
                        <li>
                          • Current Value:{" "}
                          <span className="font-semibold text-white">
                            {property.currentValue}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
}
