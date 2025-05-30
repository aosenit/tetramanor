import React from "react";
import Image from "next/image";
import {
  FaDoorOpen,
  FaExpand,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { MdBed } from "react-icons/md";
import Link from "next/link";

const properties = [
  {
    id: "1",
    title: "TM Meadows",
    location: "Lekki, Lagos, Nigeria",
    price: "₦3.5m",
    period: "year",
    beds: 3,
    features: ["Balcony", "Walk-In Closets", "CCTV"],
    imageUrl: "/rental/one.jpg",
  },
  {
    id: "2",
    title: "TM Meadows",
    location: "Lekki, Lagos, Nigeria",
    price: "₦3.5m",
    period: "year",
    beds: 3,
    features: ["Balcony", "Walk-In Closets", "CCTV"],
    imageUrl: "/rental/two.jpg",
  },
  {
    id: "3",
    title: "Oceanview Homes",
    location: "Victoria Island, Lagos",
    price: "₦5m",
    period: "year",
    beds: 4,
    features: ["Sea View", "Smart Home", "Security"],
    imageUrl: "/rental/three.png",
  },
];

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  period: string;
  beds: number;
  features: string[];
  imageUrl: string;
}

function PropertyCard({
  id,
  title,
  location,
  price,
  period,
  beds,
  features,
  imageUrl,
}: PropertyCardProps) {
  return (
    <div className="overflow-hidden h-fit rounded-sm border border-gray-200 bg-white">
      <div className="relative">
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-gray-800/80 px-2 py-1 text-xs font-medium text-white">
          UNFURNISHED
        </div>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-64 w-full object-cover"
        />
      </div>
      <div className="p-6 bg-[#f1f4f1]">
        <div className="flex items-center justify-between">
          <h3 className="xl:text-xl  text-[#1D1D1D] font-semibold">{title}</h3>
          <div className="flex items-center text-xs font-medium text-[#4D4E53]">
            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
            {location}
          </div>
        </div>
        <div className="mt-6  flex flex-wrap gap-3">
          <div className="flex border-r-2 font-medium text-xs text-[#4D4E53] border-[#BBBCCD] items-center gap-2  px-3 py-1">
            <MdBed className=" text-[#CD6115] text-lg" />
            <span>{beds} Beds</span>
          </div>
          {features.map((feature, index) => {
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
          <div className="text-right">
            <span className=" text-2xl text-black font-semibold">{price}</span>
            <span className=" text-[#2B2D2F] font-medium">/{period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function ExploreMore() {
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 ">
      <h1 className="text-2xl text-black font-semibold text-center">
        Explore More Properties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 xl:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}

export default ExploreMore;
