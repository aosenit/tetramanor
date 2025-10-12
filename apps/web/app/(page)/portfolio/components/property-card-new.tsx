"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import placeholder from "@/assets/placeholder.jpg";
import { Property } from "../types";

interface PropertyCardNewProps {
  property: Property;
  className?: string;
  size?: "large" | "small";
}

export default function PropertyCardNew({
  property,
  className = "",
  size = "small",
}: PropertyCardNewProps) {
  const getStatusTag = () => {
    if (property.constructionStatus === "ONGOING") {
      return { text: "ONGOING", bgColor: "bg-white/10 backdrop-blur-md" };
    } else if (property.constructionStatus === "COMPLETED") {
      return { text: "COMPLETED", bgColor: "bg-white/10 backdrop-blur-md" };
    }
    return { text: "AVAILABLE", bgColor: "bg-white/10 backdrop-blur-md" };
  };

  const displayImage =
    property.coverImage?.imageUrl ||
    property.images?.[0]?.imageUrl ||
    placeholder;

  const statusTag = getStatusTag();

  return (
    <Link href={`/portfolio/view-property/${property.id}`}>
      <div
        className={`relative rounded-lg overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
      >
        {/* Property Image */}
        <div
          className={`relative w-full ${size === "large" ? "h-full min-h-[500px]" : "h-64"}`}
        >
            <Image
              src={displayImage}
              alt={property.name}
              fill
              className="object-cover"
            />

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Status Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`${statusTag.bgColor} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase`}
            >
              {statusTag.text}
            </span>
          </div>

          {/* Property Name */}
          <div className="absolute bottom-4 left-4 z-10">
            <h3 className="text-white text-xl font-bold mb-1">
              {property.name}
              </h3>

              {/* Location */}
            <div className="flex items-center text-white/90 mb-3">
              <FiMapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.address}</span>
          </div>
        </div>

          {/* View Property Button */}
          <div className="absolute bottom-4 right-4 z-10">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
              View property
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
