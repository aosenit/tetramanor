"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  slug: string;
  image: string;
  title: string;
  location: string;
  status: string;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  slug,
  image,
  title,
  location,
  status,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <Link href={`/portfolio/view-property?slug=${slug}`}>
        <div className="relative h-64">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            width={800}
            height={600}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2">{location}</p>
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            {status}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
