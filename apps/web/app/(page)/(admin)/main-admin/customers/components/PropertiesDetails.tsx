"use client";

import Image from "next/image";
import nine from "@/assets/admin/nine.png";

import { MapPin } from "lucide-react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentsOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { useFetchData } from "@/hooks/useApi";
import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { ErrorState, LoadingState } from "./NoDataStates";

// Simple localStorage persistence
const getStoredPropertyData = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("purchasePropertyData");
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn("Failed to get property data from localStorage:", error);
      return {};
    }
  }
  return {};
};

export const purchasePropertyData = atom(getStoredPropertyData());

// Utility function to clear stored property data
export const clearStoredPropertyData = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("purchasePropertyData");
    } catch (error) {
      console.warn("Failed to clear property data from localStorage:", error);
    }
  }
};

export default function PropertyDetails() {
  const searchParams = useSearchParams();
  const setPurchasePropertyData = useSetAtom(purchasePropertyData);
  const tab = searchParams.get("tab") || "owned";
  const propertyName = searchParams.get("property") || "Unnamed property";
  const unitId = searchParams.get("unitId");
  const userId = searchParams.get("userId");
  const router = useRouter();
  // Fetch property details
  const {
    data: propertyData,
    isLoading,
    error,
  } = useFetchData(
    unitId && userId
      ? `admin/purchases/property-detail/${unitId}/user/${userId}`
      : null
  );

  useEffect(() => {
    if (propertyData) {
      setPurchasePropertyData(propertyData.data);

      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "purchasePropertyData",
            JSON.stringify(propertyData.data)
          );
        } catch (error) {
          console.log("Failed to save property data to localStorage:", error);
        }
      }
    }
  }, [propertyData, setPurchasePropertyData]);

  const propertyLabel = tab === "rented" ? "Rented property" : "Owned property";

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !propertyData?.data) {
    return <ErrorState />;
  }

  // Extract property data
  const property = propertyData.data;
  const unit = property?.[0]; // Get the first unit for display
  const images = unit?.images || [];

  return (
    <div className="p-6 space-y-8">
      {/* Breadcrumb */}
      <div className="text-xs text-[#4C5560] font-medium">
        <button
          onClick={() =>
            router.push(
              `/main-admin/customers/property-dashboard/?tab=owned&propertyId=${propertyData?.data?.property?.id}&userId=${userId}&name=${propertyData?.data?.property?.name}`
            )
          }
          className="text-sm"
        >
          Customer's properties
        </button>{" "}
        <span className="text-xl text-[#858C95]">/ </span>
        <span className="text-[#116114] text-sm font-medium">
          {propertyLabel}
        </span>
      </div>

      {/* Header + Tabs */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-sm font-semibold text-[#252525]">
            {propertyData?.data?.property?.name || propertyName}
          </h2>
          <div className="flex items-center gap-2 font-medium text-[#737687] text-xs mt-1">
            <MapPin className="w-4 h-4" />
            {propertyData?.data?.property?.address || "Address not available"}
          </div>
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link
            href={{
              pathname: "/main-admin/customers/gallery",
              query: {
                tab,
                propertyId: propertyData?.data?.property?.id,
                unitId,
                userId,
              },
            }}
          >
            <Button
              variant="outline"
              className="flex items-center text-[#323539] gap-3 hover:text-[#323539] text-xs"
              size={"sm"}
            >
              Gallery
              <CiImageOn />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/main-admin/customers/documents",
              query: {
                tab,
                propertyId: propertyData?.data?.property?.id,
                unitId,
                userId,
              },
            }}
          >
            <Button
              variant={"outline"}
              className="flex items-center text-[#323539] gap-3 hover:text-[#323539] text-xs"
              size={"sm"}
            >
              Documents
              <IoDocumentsOutline />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/main-admin/customers/payment-history",
              query: {
                tab,
                propertyId: propertyData?.data?.property?.id,
                unitId,
                userId,
              },
            }}
          >
            <Button
              variant={"outline"}
              className="flex items-center text-[#323539] gap-1 hover:text-[#323539] text-xs"
              size={"sm"}
            >
              View payment history
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:flex gap-6">
        <div className="relative w-full lg:w-3/5 h-[400px] ">
          {propertyData?.data?.property?.images?.map((image: any) => (
            <Image
              src={image.imageUrl || nine}
              alt="Main property"
              fill
              key={image.id}
              className="object-cover rounded-lg "
            />
          ))}
          <div className="absolute top-4 left-4 bg-white text-xs font-semibold rounded-2xl px-3 py-1 shadow">
            {propertyData?.data?.property?.name || "Unit"}
          </div>
          <div className="absolute bottom-4 left-4 text-sm space-y-1 text-white backdrop-blur-sm p-2 bg-black/30 rounded-lg max-w-[90%]">
            <p>
              Unit type{" "}
              <span className="text-white font-medium">
                {propertyData?.data?.property?.unitTypes?.map(
                  (unit: any, index) => <li key={index}>{unit} </li>
                ) || "N/A"}
              </span>
            </p>
            <p>
              Amount paid{" "}
              <span className="text-white font-medium">
                ₦{propertyData?.data?.price?.toLocaleString() || "N/A"}
              </span>{" "}
              <span className="text-xs text-gray-200">
                {propertyData?.data?.property?.createdAt
                  ? new Date(
                      propertyData?.data?.property?.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="hidden lg:flex flex-col gap-4 w-2/5 h-[400px]">
          {propertyData?.data?.property?.images
            ?.slice(1, 3)
            .map((image: any, index: number) => (
              <div key={index} className="flex-1 relative">
                <Image
                  src={image.imageUrl || nine}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          {images.length < 3 && (
            <div className="flex-1 relative bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400 text-sm">No more images</span>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-[#116114] text-sm font-medium mb-4">
          Unit features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
          {/* Show property features from API */}
          {propertyData?.data?.property?.features?.length > 0 &&
            propertyData?.data?.property?.features?.map(
              (feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center text-xs text-[#6B6B6B] gap-2"
                >
                  <div className="w-4 h-4 bg-[#116114] rounded-full"></div>
                  {feature}
                </div>
              )
            )}
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-[#116114] text-sm font-medium mb-4">
          Unit amenities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
          {/* Show property features from API */}
          {propertyData?.data?.property?.amenities?.length > 0 &&
            propertyData?.data?.property?.amenities?.map(
              (amenity: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center text-xs text-[#6B6B6B] gap-2"
                >
                  <div className="w-4 h-4 bg-[#116114] rounded-full"></div>
                  {amenity}
                </div>
              )
            )}
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-20 flex justify-end  pb-4">
        <Button
          onClick={() => router.back()}
          size={"sm"}
          className="text-sm !text-white !bg-[#115314] hover:bg-[#116114]/80"
        >
          <MdArrowBackIosNew className="w-4 h-4" />
          Go back
        </Button>
      </div>
    </div>
  );
}
