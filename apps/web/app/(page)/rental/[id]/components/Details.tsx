"use client";
import Image from "next/image";
import two from "@/assets/rental/two.webp";
import three from "@/assets/rental/three.webp";
import four from "@/assets/rental/four.webp";
import five from "@/assets/rental/five.webp";
import six from "@/assets/rental/six.webp";
import seven from "@/assets/rental/seven.webp";
import eleven from "@/assets/rental/eleven.jpg";
import twelve from "@/assets/rental/twelve.jpg";
import thirteen from "@/assets/rental/thirteen.jpg";
import fourteen from "@/assets/rental/fourteen.jpg";
import fifteen from "@/assets/rental/fifteen.jpg";
import sixteen from "@/assets/rental/sixteen.jpg";
// import {
//   FaDog,
//   FaParking,
//   FaWindowMaximize,
//   FaShieldAlt,
//   FaWater,
//   FaWind,
//   FaUtensils,
//   FaToilet,
//   FaDoorOpen,
//   FaLeaf,
//   FaTrash,
//   FaHome,
//   FaSpinner,
// } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import Header from "@/app/(page)/portfolio/components/header";
import { useParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { useState } from "react";
import MapSection from "@/app/(page)/portfolio/view-property/sections/map";
import { FaHome } from "react-icons/fa";

// Image mapping based on construction status
const constructionImages = {
  ONGOING: [two, three, four],
  COMPLETED: [eleven, twelve, thirteen],
};

// Fallback images for properties without images
const fallbackImages = [five, six, seven, fourteen, fifteen, sixteen];

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
          <a
            href="/rental"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
          >
            Back to Properties
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = params.id as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isLoading, error } = useFetchData(
    `property/detail/${propertyId}`
  );

  // Get fallback images based on construction status
  const getFallbackImages = (constructionStatus: string) => {
    const images =
      constructionImages[
        constructionStatus as keyof typeof constructionImages
      ] || fallbackImages;
    return images;
  };

  // Get a fallback image for properties without images
  const getFallbackImage = (propertyId: string) => {
    const index = propertyId.charCodeAt(0) % fallbackImages.length;
    return fallbackImages[index];
  };

  // Get bedroom count from unit types
  const getBedroomCount = (unitTypes: string[]) => {
    const type = unitTypes[0] || "";
    if (type.includes("FOUR_BEDROOM")) return 4;
    if (type.includes("THREE_BEDROOM")) return 3;
    if (type.includes("TWO_BEDROOM")) return 2;
    if (type.includes("ONE_BEDROOM")) return 1;
    if (type.includes("STUDIO")) return 1;
    return 3; // default
  };

  // Loading state
  if (isLoading) {
    return <PropertyDetailsSkeleton />;
  }

  // Error state
  if (error || !data?.data) {
    return <PropertyNotFound />;
  }

  const property = data.data;
  const bedroomCount = getBedroomCount(property.unitTypes);

  // Get images for display
  const displayImages =
    property.images.length > 0
      ? property.images
      : property.constructionStatus === "COMPLETED" ||
          property.constructionStatus === "ONGOING"
        ? getFallbackImages(property.constructionStatus)
        : [getFallbackImage(property.id), ...fallbackImages.slice(1, 3)];

  return (
    <div className="font-sans">
      <Header />
      <div className="container mx-auto px-4 md:px-6 lg:px-16 py-8 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-2 p-4">
          <div className="flex items-center text-xs text-[#646464] font-medium space-x-2">
            <a href="/rental" className="hover:text-gray-700">
              Rentals
            </a>
            <span>/</span>
            <span className="text-[#0C0C0C] font-semibold">
              {property.name}
            </span>
          </div>
          <button className="flex items-center text-[#151515] font-medium text-sm hover:text-gray-900">
            <FiShare2 className="mr-1" />
            <span>Share</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full md:w-2/3 relative">
            <div className="absolute top-4 left-4 bg-gray-700 bg-opacity-70 text-white px-3 py-1 rounded-lg text-xs">
              {property.constructionStatus}
            </div>
            <Image
              src={displayImages[currentImageIndex] || displayImages[0]}
              alt={`${property.name} main view`}
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded"
              width={800}
              height={600}
            />
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-4">
            {displayImages.slice(1, 3).map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${property.name} view ${index + 1}`}
                className="w-full h-[100px] sm:h-[120px] object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                width={400}
                height={300}
                onClick={() => setCurrentImageIndex(index + 1)}
              />
            ))}
            {displayImages.length > 3 && (
              <div className="relative w-full h-[100px] sm:h-[120px]">
                <Image
                  src={displayImages[3]}
                  alt={`${property.name} view 4`}
                  className="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  width={400}
                  height={300}
                  onClick={() => setCurrentImageIndex(3)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                  <p className="text-white font-semibold text-sm">
                    +{displayImages.length - 3} More
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 p-4">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center text-sm font-medium text-[#4D4E53] mb-2">
              <MdLocationOn className="mr-1" />
              <span>{property.address}</span>
            </div>
            <h1 className="text-2xl font-semibold mb-4">{property.name}</h1>
            <p className="text-[#0C0C0C] leading-relaxed text-sm mb-6">
              {property.about}
            </p>

            {/* Why Invest Section */}
            {property.whyInvest && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#000000] mb-4">
                  {property.whyInvest.title}
                </h2>
                <p className="text-[#0C0C0C] leading-relaxed text-sm mb-4">
                  {property.whyInvest.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.whyInvest.advantages.map((advantage, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded">
                      <h3 className="font-semibold text-sm mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {advantage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Features */}
            <div className="mb-8 mt-10">
              <h2 className="text-xl font-semibold text-[#000000] mb-4">
                Property Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-[#0B0A0A]">
                {property.features.map((feature, index) => (
                  <div className="flex items-center" key={index}>
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#000000] mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-[#0B0A0A]">
                  {property.amenities.map((amenity, index) => (
                    <div className="flex items-center" key={index}>
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full h-fit lg:w-1/3 bg-gray-50 border border-[#ECECEC] rounded">
            <h2 className="text-lg border-b border-[#ECECEC] text-[#151515] py-4 px-6 font-semibold">
              Property Details
            </h2>
            <div className="space-y-4 p-6">
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">Bedrooms</span>
                <span className="text-[#000000] font-semibold">
                  {bedroomCount}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">
                  Units Available
                </span>
                <span className="text-[#000000] font-semibold">
                  {property.unitAmount}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">Unit Types</span>
                <span className="text-[#000000] font-semibold">
                  {property.unitTypes.length}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C5C5C] font-medium">Status</span>
                <span className="text-[#000000] font-semibold">
                  {property.constructionStatus}
                </span>
              </div>
            </div>

            {/* Account Officer */}
            {property.accountOfficer && (
              <>
                <h2 className="text-lg border-b border-[#ECECEC] text-[#151515] py-4 px-6 font-semibold">
                  Contact Officer
                </h2>
                <div className="space-y-4 p-6">
                  <div className="text-xs">
                    <div className="text-[#5C5C5C] font-medium mb-1">Name</div>
                    <div className="text-[#000000] font-semibold">
                      {property.accountOfficer.fullName}
                    </div>
                  </div>
                  <div className="text-xs">
                    <div className="text-[#5C5C5C] font-medium mb-1">Email</div>
                    <div className="text-[#000000] font-semibold">
                      {property.accountOfficer.email}
                    </div>
                  </div>
                  <div className="text-xs">
                    <div className="text-[#5C5C5C] font-medium mb-1">Phone</div>
                    <div className="text-[#000000] font-semibold">
                      {property.accountOfficer.phone}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <MapSection location={property.address} propertyName={property.name} />
    </div>
  );
}
