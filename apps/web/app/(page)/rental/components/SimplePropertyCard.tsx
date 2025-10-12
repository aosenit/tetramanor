"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RentalListingItem } from "@/types/property";
import placeholder from "@/assets/placeholder.svg";

interface SimplePropertyCardProps {
  rental: RentalListingItem;
}

export default function SimplePropertyCard({ rental }: SimplePropertyCardProps) {
  // Get the main image - prefer coverImage, then first image, then placeholder
  const mainImage =
    rental.coverImage?.imageUrl || rental.images[0]?.imageUrl || placeholder;

  return (
    <Link href={`/rental/${rental.id}`}>
      <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
        {/* Image Section */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={rental.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Property Name Section */}
        <div className="p-5 bg-white">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#116114] transition-colors line-clamp-2 min-h-[56px]">
            {rental.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

