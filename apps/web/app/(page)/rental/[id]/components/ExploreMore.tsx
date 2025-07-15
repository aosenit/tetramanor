"use client";
import React from "react";
import Image from "next/image";
import { FaDoorOpen, FaExpand, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { MdBed } from "react-icons/md";
import Link from "next/link";
import { useFetchData } from "@/hooks/useApi";
import placeholder from "@/assets/placeholder.jpg";

function PropertyCard({
  id,
  name,
  address,
  unitAmount,
  unitTypes,
  features,
  images,
}: any) {
  const imageUrl = images?.find((img: any) => img.isPrimary)?.imageUrl || images?.[0]?.imageUrl || placeholder;
  return (
    <div className="overflow-hidden h-full rounded-sm border border-gray-200 bg-white min-w-[320px] max-w-sm flex-shrink-0">
      <div className="relative">
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-gray-800/80 px-2 py-1 text-xs font-medium text-white">
          UNFURNISHED
        </div>
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={400}
          className="h-64 w-full object-cover"
        />
      </div>
      <div className="p-6 bg-[#f1f4f1]">
        <div className="flex items-center justify-between">
          <h3 className="xl:text-xl  truncate text-[#1D1D1D] font-semibold">{name}</h3>
          <div className="flex truncate items-center text-xs font-medium text-[#4D4E53]">
            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
            {address}
          </div>
        </div>
        <div className="mt-6  flex flex-wrap gap-3">
          <div className="flex border-r-2 font-medium text-xs text-[#4D4E53] border-[#BBBCCD] items-center gap-2  px-3 py-1">
            <MdBed className=" text-[#CD6115] text-lg" />
            <span>{unitAmount} Beds</span>
          </div>
          {features?.slice(0, 2).map((feature: string, index: number) => {
            let Icon = FaShieldAlt;
            if (index === 0) Icon = FaExpand;
            else if (index === 1) Icon = FaDoorOpen;
            return (
              <div
                key={index}
                className="flex border-r-2 border-[#BBBCCD] items-center gap-2  font-medium text-xs text-[#4D4E53] px-3"
              >
                <Icon className="text-[#CD6115] text-lg" />
                <span>{feature}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/rental/${id}`}
            className="rounded bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            View property
          </Link>
          {/* Price/period can be added here if available in backend */}
        </div>
      </div>
    </div>
  );
}

function ExploreMore() {
  const { data, isLoading, error } = useFetchData("property", { page: 1, limit: 10 });
  const properties = data?.data?.items || [];
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 ">
      <h1 className="text-2xl text-black font-semibold text-center">
        Explore More Properties
      </h1>
      {isLoading ? (
        <div className="flex overflow-x-auto gap-4 mt-10 pb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[320px] max-w-sm h-[400px] bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      ) : error ? null : (
        <div className="flex overflow-x-auto gap-4 mt-10 scrollbar-hide pb-4">
          {properties.map((property: any) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreMore;
