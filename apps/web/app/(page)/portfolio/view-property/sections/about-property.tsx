"use client";
import React from "react";
import Image from "next/image";
import {
  FaCheck
} from "react-icons/fa";
import { Property } from "../../types";
import placeholder from "@/assets/placeholder.jpg";


interface AboutPropertyProps {
  property: Property;
}

export default function AboutProperty({ property }: AboutPropertyProps) {
  // Helper to render icon (from backend or fallback to check icon)
  const renderIcon = (
    iconUrl: string | undefined,
    colorClass: string = "text-[#116114]"
  ) => {
    if (iconUrl && iconUrl.trim() !== "") {
      return (
        <Image
          src={iconUrl}
          alt=""
          width={20}
          height={20}
          className="mr-3 mt-1 flex-shrink-0 object-contain"
        />
      );
    }
    return (
      <FaCheck className={`h-5 w-5 ${colorClass} mr-3 mt-1 flex-shrink-0`} />
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-[#0b0a0a]">
            About {property.name}
          </h1>
          <p className="text-[#0c0c0c] mb-6">{property.about}</p>
          {property.unitTypes?.length > 0 && (
            <>
              <p className="text-[#0c0c0c] mb-4">
                This property offers the following unit types:
              </p>
              <ul className="space-y-3 mb-6">
                {property.unitTypes.map((type, idx) => (
                  <li className="flex items-center" key={idx}>
                    <FaCheck className="h-5 w-5 text-[#116114] mr-2 flex-shrink-0" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="relative h-[400px] lg:h-full rounded-lg overflow-hidden">
          <Image
            src={
              property.images?.find((img) => img.isPrimary)?.imageUrl ||
              property.images?.[0]?.imageUrl ||
              placeholder
            }
            alt={`${property.name} luxury residential building`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4 text-[#0b0a0a]">Key Features</h2>
        <p className="text-[#0c0c0c] mb-6">
          {property.name} blends sophisticated aesthetics with superior
          craftsmanship, featuring:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property.features?.map((feature, idx) => (
            <div className="flex items-start" key={feature.id || idx}>
              {renderIcon(feature.icon)}
              <span>{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0b0a0a]">
          World-Class Amenities
        </h2>
        <p className="text-[#0c0c0c] mb-6">
          Residents of {property.name} enjoy exclusive access to
          state-of-the-art facilities, including
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property.amenities?.map((amenity, idx) => (
            <div className="flex items-start" key={amenity.id || idx}>
              {renderIcon(amenity.icon)}
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
