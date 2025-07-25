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
  features = [],
  images = [],
  rental = {},
}: any) {
  const imageUrl = images?.[0]?.imageUrl || placeholder;
  return (
    <div className="overflow-hidden h-full rounded-sm border border-gray-200 bg-white min-w-[320px] max-w-sm flex-shrink-0">
      <div className="relative">
        {/* Furnished/Unfurnished badge */}
        <div className="absolute left-4 top-4 z-10">
          <span className="px-4 py-1 rounded-full bg-gray-800 text-white text-xs font-semibold shadow">
            {rental.isFurnished ? "FURNISHED" : "UNFURNISHED"}
          </span>
        </div>
        <Image
          src={imageUrl}
          alt={name || "Property"}
          width={600}
          height={400}
          className="h-64 w-full object-cover"
        />
      </div>
      <div className="p-6 bg-[#f1f4f1]">
        <div className="flex items-center justify-between">
          <h3 className="xl:text-xl  truncate text-[#1D1D1D] font-semibold">
            {name}
          </h3>
          <div className="flex truncate items-center text-xs font-medium text-[#4D4E53]">
            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
            {address}
          </div>
        </div>
        <div className="mt-6  flex flex-wrap gap-3">
          <div className="flex border-r-2 font-medium text-xs text-[#4D4E53] border-[#BBBCCD] items-center gap-2  px-3 py-1">
            <MdBed className=" text-[#CD6115] text-lg" />
            <span>{unitAmount || 0} Beds</span>
          </div>
          {features.slice(0, 2).map((feature: string, index: number) => {
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
            href={`/rental/${rental.id}`}
            className="rounded bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            View property
          </Link>
        </div>
      </div>
    </div>
  );
}

function ExploreMore() {
  const { data, isLoading, error } = useFetchData("rentals", {
    page: 1,
    limit: 10,
  });
  const items = data?.data?.items || [];
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 ">
      <h1 className="text-2xl text-black font-semibold text-center">
        Explore More Properties
      </h1>
      {isLoading ? (
        <div className="flex overflow-x-auto gap-4 mt-10 pb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="min-w-[320px] max-w-sm h-[400px] bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      ) : error ? null : (
        <div className="flex overflow-x-auto gap-4 mt-10 scrollbar-hide pb-4">
          {items.map((item: any) => (
            <PropertyCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreMore;
