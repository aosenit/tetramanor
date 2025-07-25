"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";
import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import Loader from "@/components/Loader";

// Default features and amenities arrays (will be overridden by API data)
const defaultFeatures = [
  "High-Quality Kitchen Cabinets & Wardrobes",
  "Walk-in Closets",
  "POP Ceilings",
  "Premium Sanitary Fittings",
  "Vintage PVC French Windows",
  "Uninterrupted Power Supply",
  "Efficient Waste Disposal & Central Sewage Management",
  "Vitrified & Granite Tiles",
  "Backup Power Supply",
  "24/7 Concierge Services",
];

const defaultAmenities = [
  "Fiber Optic Connectivity",
  "Fully Equipped Gym",
  "Stunning Sea View",
  "Uninterrupted Power Supply",
  "Stunning Sea View",
  "Lounge/Bar",
  "Fiber Optic Connectivity",
  "24/7 Concierge Services",
  "State of the art interior decor",
];

interface DetailsProps {
  refetch?: () => void;
}

function Details({ refetch }: DetailsProps) {
  const searchParams = useSearchParams();
  const rentalId = searchParams.get("id");
  const router = useRouter();
  // Fetch rental data
  const {
    data: rentalData,
    isLoading,
    error,
    refetch: refetchRental,
  } = useFetchData(rentalId ? `rentals/${rentalId}` : null);

  const [rental, setRental] = useState<any>(null);
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    if (rentalData?.data) {
      setRental(rentalData.data);
      setProperty(rentalData.data.property);
    }
  }, [rentalData]);

  // Handle refetch
  const handleRefetch = () => {
    refetchRental();
    if (refetch) {
      refetch();
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format frequency
  const formatFrequency = (frequency: string) => {
    switch (frequency) {
      case "MONTHLY":
        return "/ month";
      case "YEARLY":
        return "/ year";
      case "WEEKLY":
        return "/ week";
      default:
        return "";
    }
  };

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Rental
          </h2>
          <p className="text-gray-600">
            Failed to load rental details. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // No rental data
  if (!rental) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No Rental Found
          </h2>
          <p className="text-gray-500">
            The requested rental could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <button onClick={() => router.back()}>Home</button>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Rental Overview
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/main-admin/rentals/edit-rentals?id=${rentalId}`}>
              <Button className="" variant="outline">
                <Pencil className="" />
                Edit rental
              </Button>
            </Link>
            <Link href="/main-admin/rentals/edit-rentals">
              <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
                <Plus className="" />
                Add New rental
              </Button>
            </Link>
          </div>
        </div>
        <h3 className="text-[#4C5560] font-medium text-lg">
          Property overview
        </h3>
        <div className="bg-white mt-4 space-y-4 p-6">
          <p className="text-xl font-medium text-[#181818]">Rental detail</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rental.images ? (
              rental.images.map((image: any) => (
                <Image
                  key={image.id}
                  src={image.imageUrl || placeholder}
                  alt="property"
                  className=" h-[200px] object-cover rounded-lg "
                  width={300}
                  height={250}
                />
              ))
            ) : (
              <Image
                src={placeholder}
                alt="property"
                className="w-[200px] h-[200px] object-cover"
              />
            )}
          </div>
          <div className=" space-y-4 max-w-6xl pt-4">
            <div className="flex items-center justify-between">
              <p className="text-[#181818]">Apartment type </p>
              <p className="text-[#181818]">{rental.apartmentType || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#181818]">Location </p>
              <p className="text-[#181818]">{rental.location || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#181818]">Property name</p>
              <p className="text-[#181818]">{property?.name || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#181818]">Property furnished</p>
              <p className="text-[#181818]">
                {rentalData.data?.isFurnished ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#000000]">Status</p>
              <p
                className={`${
                  rental.status === "RENTED"
                    ? "text-[#13A017]"
                    : rental.status === "AVAILABLE"
                      ? "text-[#116114]"
                      : "text-[#FF6B35]"
                }`}
              >
                {rental.status || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 space-y-4 p-6">
          <p className="text-[#116114] font-medium">Financial breakdown </p>
          <div className=" space-y-4 max-w-6xl">
            <div className="flex items-center text-[#181818] justify-between">
              <p>Rental price </p>
              <p>
                {formatCurrency(rental.rent || 0)}
                {formatFrequency(rental.frequency || "MONTHLY")}
              </p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Agency fee</p>
              <p>{formatCurrency(rental.agencyFee || 0)}</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Caution fee</p>
              <p>{formatCurrency(rental.cautionFee || 0)}</p>
            </div>
            <div className="flex items-center font-medium text-lg text-[#181818] justify-between">
              <p>Total package</p>
              <p>
                {formatCurrency(
                  (rental.rent || 0) +
                    (rental.agencyFee || 0) +
                    (rental.cautionFee || 0)
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 space-y-4 p-6">
          <p className="text-[#116114] font-medium">Property details </p>
          <div className=" space-y-4 max-w-6xl text-[#181818]">
            <div className="flex items-center text-[#181818] justify-between">
              <p>Address </p>
              <p>{property?.address || "N/A"}</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>About</p>
              <p>{property?.about || "N/A"}</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Construction status</p>
              <p>{property?.constructionStatus || "N/A"}</p>
            </div>
            <div className="flex items-center text-[#181818] justify-between">
              <p>Unit amount</p>
              <p>{property?.unitAmount || "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 p-8 space-y-6">
          <h2 className="text-sm font-medium text-[#181818]  mb-6">Features</h2>

          <div className="flex flex-wrap gap-4">
            {(property?.features || defaultFeatures).map(
              (feature: string, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg px-4 py-2 w-fit  flex items-center h-auto"
                >
                  <div className="w-2 h-2 bg-[#323539] rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden  w-full">
                    {feature}
                  </span>
                </div>
              )
            )}
          </div>
          <h2 className="text-sm font-medium text-[#181818] mb-6">
            Amenities{" "}
          </h2>

          <div className="flex  gap-4">
            {(property?.amenities || defaultAmenities).map(
              (amenity: string, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg px-4 py-2 w-fit flex items-center h-auto"
                >
                  <div className="w-2 h-2 bg-[#323539] rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden  w-full">
                    {amenity}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="bg-white mt-4 space-y-4 p-6">
          {/* <h1 className="text-[#116114] font-medium text-sm">Attachments</h1>
          <div className="flex items-center text-sm text-[#323539] gap-4 mt-4">
            <Button variant="outline">Contract pdf</Button>
            <Button variant="outline">Reciept pdf</Button>
          </div> */}
          <Link href="/main-admin/rentals">
            <button className="text-[#323539] flex items-center gap-2 py-8 hover:text-[#323539] text-sm">
              <MdArrowBackIosNew />
              Back to page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Details;
