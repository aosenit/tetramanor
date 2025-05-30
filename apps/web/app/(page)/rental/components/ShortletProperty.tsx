"use client";

import {
  FaSearch,
  FaChevronDown,
  FaExpand,
  FaDoorOpen,
  FaShieldAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { MdBed } from "react-icons/md";

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
  {
    id: "4",
    title: "Green Estate",
    location: "Ajah, Lagos",
    price: "₦2.8m",
    period: "year",
    beds: 2,
    features: ["Garden", "Walk-In Closets", "Security"],
    imageUrl: "/rental/four.png",
  },
  {
    id: "5",
    title: "Hilltop Villas",
    location: "Magodo, Lagos",
    price: "₦4.2m",
    period: "year",
    beds: 3,
    features: ["Garage", "Balcony", "CCTV"],
    imageUrl: "/rental/five.png",
  },
  {
    id: "6",
    title: "Sunset Apartments",
    location: "Ikoyi, Lagos",
    price: "₦6m",
    period: "year",
    beds: 4,
    features: ["Gym", "Smart Home", "24/7 Security"],
    imageUrl: "/rental/six.png",
  },
];

export default function PropertyListing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <div className="mb-10 flex flex-col xl:flex-row lg:items-center lg:justify-between gap-6">
          <h4 className="text-2xl sm:text-3xl  text-black font-semibold xl:max-w-lg">
            Looking for a Premium Rental or Short-let Property in Lagos?
          </h4>
          <p className="text-[#202020] xl:max-w-xl text-sm sm:text-base leading-relaxed text-justify">
            Tetramanor offers a curated selection of luxury apartments and
            homes, perfect for short-term stays or long-term rentals. Whether
            you need a fully serviced apartment for a getaway or a stylish home
            for an extended stay – enjoy comfort, security, and convenience in
            prime locations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border bg-white border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium">
            Filter by
            <FaChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
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
      <div className="p-5 bg-[#f1f4f1]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-[#1D1D1D]">{title}</h3>
          <div className="flex items-center text-xs text-[#4D4E53]">
            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
            {location}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex border-r-2 font-medium text-xs text-[#4D4E53] border-[#BBBCCD] items-center gap-2 px-3 py-1">
            <MdBed className="text-[#CD6115] text-lg" />
            <span>{beds} Beds</span>
          </div>
          {features.map((feature, index) => {
            let Icon = FaShieldAlt;
            if (index === 0) Icon = FaExpand;
            else if (index === 1) Icon = FaDoorOpen;

            return (
              <div
                key={index}
                className="flex border-r-2 border-[#BBBCCD] items-center gap-2 font-medium text-xs text-[#4D4E53] px-3"
              >
                <Icon className="text-[#CD6115] text-lg" />
                <span>{feature}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href={`/rental/${id}`}
            className="rounded bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 text-center"
          >
            View property
          </Link>
          <div className="text-right">
            <span className="text-2xl font-semibold text-black">{price}</span>
            <span className="text-[#2B2D2F] font-medium">/{period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
