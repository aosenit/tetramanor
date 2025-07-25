"use client";
import Image from "next/image";
import { FiShare2 } from "react-icons/fi";
import Header from "@/app/(page)/portfolio/components/header";
import { useParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import type { Rental } from "@/types/property";
import { useState } from "react";
import MapSection from "@/app/(page)/portfolio/view-property/sections/map";
import { FaHome } from "react-icons/fa";
import { PiCarBatteryFill, PiCircleFill } from "react-icons/pi";
import { MdGridOn, MdOutlineSecurity, MdDelete } from "react-icons/md";
import { TbWindow } from "react-icons/tb";
import { GiWaterDrop, GiTreehouse } from "react-icons/gi";
import { FaBath } from "react-icons/fa";
import {
  MdBed,
  MdKitchen,
  MdOutlineAcUnit,
  MdOutlineMicrowave,
  MdMeetingRoom,
  MdWindow,
} from "react-icons/md";
import { PiBedBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import placeholder from "/assets/placeholder.jpg";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";

// Image mapping based on construction status
const constructionImages = {
  ONGOING: [placeholder],
  COMPLETED: [placeholder],
};

// Fallback images for properties without images
const fallbackImages = [placeholder];

// Loading Skeleton Component
function PropertyDetailsSkeleton() {
  return (
    <div className="font-sans">
      <Header />
      <div className="container mx-auto px-4 md:px-6 lg:px-16 py-8 md:py-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-4">
          <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
        </div>

        {/* Image Gallery Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full md:w-2/3 relative">
            <div className="h-[250px] sm:h-[300px] md:h-[400px] bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[100px] sm:h-[120px] bg-gray-300 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col lg:flex-row gap-8 p-4">
          <div className="w-full lg:w-2/3">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
            </div>
            <div className="mb-8 mt-10">
              <div className="h-6 bg-gray-300 rounded w-48 mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-fit lg:w-1/3 bg-gray-50 border border-[#ECECEC] rounded">
            <div className="h-12 bg-gray-300 rounded-t animate-pulse"></div>
            <div className="space-y-4 p-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function PropertyNotFound() {
  return (
    <div className="font-sans">
      <Header />
      <div className="container mx-auto px-4 md:px-6 lg:px-16 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FaHome className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Property not found
          </h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            The property you're looking for doesn't exist or may have been
            removed.
          </p>
          <Link
            href="/rental"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetails() {
  const params = useParams();
  const rentalId = params.id as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const toast = useToast();

  const { data, isLoading, error } = useFetchData(
    `rentals/${rentalId}/details`
  );

  // Format helpers
  const formatCurrency = (value: number) =>
    value ? `₦${value.toLocaleString()}` : "-";
  const formatStatus = (status?: string) =>
    status === "RENTED"
      ? "Rented"
      : status === "AVAILABLE"
        ? "Available"
        : status || "-";
  const formatFurnished = (isFurnished?: boolean) =>
    isFurnished === true ? "Furnished" : "Unfurnished";

  if (isLoading) return <PropertyDetailsSkeleton />;
  if (error || data?.success === false) return <PropertyNotFound />;

  const rental = data?.data;
  const property = rental?.property;
  const images =
    rental?.images && rental.images.length > 0 ? rental.images : [];
  const displayImages = images.map((img: any) => img.imageUrl);

  // Pricing details (directly from data)
  const rent = rental?.rent ?? 0;
  const agencyFee = rental?.agencyFee ?? 0;
  const cautionFee = rental?.cautionFee ?? 0;
  const serviceCharge = rental?.serviceCharge ?? 0;
  const isFurnished = rental?.isFurnished;
  const totalPackage = rent + agencyFee + cautionFee + (serviceCharge || 0);

  // Features and amenities
  const features = property?.features || [];
  const amenities = property?.amenities || [];

  // Icon mapping (fallback to a generic icon if not found)
  const genericIcon = (
    <span className="inline-block w-4 h-4 bg-green-600 rounded mr-2" />
  );
  const featureIcons: Record<string, JSX.Element> = {};
  const amenityIcons: Record<string, JSX.Element> = {};

  return (
    <div className="font-sans">
      <Header />
      <div className="container mx-auto px-4 md:px-6 lg:px-16 py-8 md:py-12">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {/* Main image */}
          <div className="w-full md:w-2/3 relative">
            {/* Furnished/Unfurnished badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-4 py-1 rounded-full bg-gray-800 text-white text-xs font-semibold shadow">
                {formatFurnished(isFurnished).toUpperCase()}
              </span>
            </div>
            <Image
              src={displayImages[0] || placeholder}
              alt={property?.name || "Property main view"}
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded"
              width={800}
              height={600}
            />
          </div>
          {/* Side images */}
          <div className="w-full md:w-1/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-4">
            {Array.from({ length: 3 }).map((_, index) => {
              const img = displayImages[index + 1];
              const isLast = index === 2 && displayImages.length > 4;
              return isLast ? (
                <div
                  className="relative w-full h-[100px] sm:h-[120px]"
                  key={index}
                >
                  <Image
                    src={img || placeholder}
                    alt={`${property?.name || "Property"} view ${index + 2}`}
                    className="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    width={400}
                    height={300}
                    onClick={() => setCurrentImageIndex(index + 1)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                    <p className="text-white font-semibold text-2xl">5+</p>
                    <span className="text-white ml-2 text-base">Photos</span>
                  </div>
                </div>
              ) : (
                <Image
                  key={index}
                  src={img || placeholder}
                  alt={`${property?.name || "Property"} view ${index + 2}`}
                  className="w-full h-[100px] sm:h-[120px] object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  width={400}
                  height={300}
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 p-4">
          {/* Left: Info and Features */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center text-sm font-medium text-[#4D4E53] mb-2">
              <IoLocationOutline className="mr-1" />
              <span>{property?.address}</span>
            </div>
            <h1 className="text-2xl font-semibold mb-2">{property?.name}</h1>
            <p className="text-[#0C0C0C] leading-relaxed text-sm mb-6">
              {property?.about}
            </p>

            {/* Property Features */}
            <div className="mb-8 mt-10">
              <h2 className="text-xl font-semibold text-[#000000] mb-4">
                Property Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 text-sm font-medium text-[#0B0A0A]">
                {[...features, ...amenities].map((feature, idx) => (
                  <div className="flex items-center" key={idx}>
                    {featureIcons[feature] || genericIcon}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pricing Details */}
          <div className="w-full h-fit lg:w-1/3 bg-gray-50 border border-[#ECECEC] rounded">
            <h2 className="text-lg border-b border-[#ECECEC] text-[#151515] py-4 px-6 font-semibold">
              Pricing Details
            </h2>
            <div className="space-y-4 p-6">
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">Rental Price</span>
                <span className="text-[#000000] font-semibold">
                  {formatCurrency(rent)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">Agency Fee</span>
                <span className="text-[#000000] font-semibold">
                  {agencyFee ? `10% (${formatCurrency(agencyFee)})` : "-"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">Caution Fee</span>
                <span className="text-[#000000] font-semibold">
                  {formatCurrency(cautionFee)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">
                  Service Charge
                </span>
                <span className="text-[#000000] font-semibold">
                  {serviceCharge ? formatCurrency(serviceCharge) : "-"}
                </span>
              </div>
              <div className="flex justify-between text-xs border-t pt-2 font-bold">
                <span className="text-[#151515]">Total Package</span>
                <span className="text-[#151515]">
                  {formatCurrency(totalPackage)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <MapSection
        location={rental?.location}
        propertyName={rental?.apartmentType}
      />
    </div>
  );
}
