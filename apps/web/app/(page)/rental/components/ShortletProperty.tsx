"use client";

import {
  FaSearch,
  FaExpand,
  FaDoorOpen,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MdBed } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import placeholder from "@/assets/placeholder.svg";
import { Input } from "@/components/ui/input";

// Image mapping based on construction status
const constructionImages = {
  ONGOING: [placeholder, placeholder, placeholder],
  COMPLETED: [placeholder, placeholder, placeholder],
};

// Fallback images for properties without images
const fallbackImages = [
  placeholder,
  placeholder,
  placeholder,
  placeholder,
  placeholder,
  placeholder,
];

interface Property {
  id: string;
  name: string;
  address: string;
  about: string;
  featured: boolean;
  featuredAt: string;
  inquiryOptions: string[];
  whyInvest: {
    title: string;
    advantages: Array<{
      title: string;
      description: string;
    }>;
    description: string;
  };
  features: string[];
  amenities: string[];
  createdAt: string;
  brochure: string;
  constructionStatus: "ONGOING" | "COMPLETED";
  accountOfficerId: string | null;
  createdById: string;
  status: "AVAILABLE" | "SOLD_OUT";
  unitAmount: number;
  unitTypes: string[];
  images: Array<{ imageUrl: string }>;
  document: string[];
}

// Loading Skeleton Component
function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm animate-pulse">
      <div className="relative">
        <div className="h-64 w-full bg-gray-300"></div>
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-gray-400 px-2 py-1 w-20 h-6"></div>
      </div>
      <div className="p-5 bg-[#f1f4f1]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-6 bg-gray-300 rounded w-28"></div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="h-10 bg-gray-300 rounded w-32"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FaHome className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No properties found
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We couldn't find any properties matching your search criteria. Try
        adjusting your filters or search terms.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}

export default function PropertyListing() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current values from URL params
  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentPropertyStatus = searchParams.get("propertyStatus") || "";
  const currentConstructionStatus =
    searchParams.get("constructionStatus") || "";
  const currentSortBy = searchParams.get("sortBy") || "";
  const currentSortOrder = (searchParams.get("sortOrder") || "desc") as
    | "asc"
    | "desc";

  // Local state for form inputs
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [filters, setFilters] = useState({
    propertyStatus: currentPropertyStatus,
    constructionStatus: currentConstructionStatus,
    sortBy: currentSortBy,
    sortOrder: currentSortOrder,
  });

  const limit = 10;

  // Update local state when URL params change
  useEffect(() => {
    setSearchTerm(currentSearch);
    setFilters({
      propertyStatus: currentPropertyStatus,
      constructionStatus: currentConstructionStatus,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder,
    });
  }, [
    currentSearch,
    currentPropertyStatus,
    currentConstructionStatus,
    currentSortBy,
    currentSortOrder,
  ]);

  // Function to update URL params
  const updateURLParams = (params: Record<string, string | number>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === "" || value === 0) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value.toString());
      }
    });

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Build query parameters for API
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
    ...(currentSearch && { search: currentSearch }),
    ...(currentPropertyStatus && {
      propertyStatus: currentPropertyStatus.toUpperCase(),
    }),
    ...(currentConstructionStatus && {
      constructionStatus: currentConstructionStatus.toUpperCase(),
    }),
    ...(currentSortBy && { sortBy: currentSortBy }),
    ...(currentSortOrder && { sortOrder: currentSortOrder }),
  });

  const { data, isLoading, error } = useFetchData(
    `property?${queryParams.toString()}`
  );

  const properties = data?.data?.items || [];
  const totalPages = data?.data?.total ? Math.ceil(data.data.total / limit) : 0;

  // Get a fallback image for properties without images
  const getFallbackImage = (propertyId: string) => {
    const index = propertyId.charCodeAt(0) % fallbackImages.length;
    return fallbackImages[index];
  };

  // Get construction status image
  const getConstructionImage = (constructionStatus: string) => {
    const images =
      constructionImages[
        constructionStatus as keyof typeof constructionImages
      ] || fallbackImages;
    return images[Math.floor(Math.random() * images.length)];
  };

  const handlePageChange = (page: number) => {
    updateURLParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURLParams({ search: searchTerm, page: 1 });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    updateURLParams({
      [filterType]: value,
      page: 1,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      propertyStatus: "",
      constructionStatus: "",
      sortBy: "",
      sortOrder: "desc",
    });
    updateURLParams({
      search: "",
      propertyStatus: "",
      constructionStatus: "",
      sortBy: "",
      sortOrder: "desc",
      page: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <div className="mb-10 flex flex-col xl:flex-row lg:items-center lg:justify-between gap-6">
          <h4 className="text-2xl sm:text-3xl text-black font-semibold xl:max-w-lg">
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

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="relative w-full md:max-w-md">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border bg-white border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 ">
              <div className="rounded-md border bg-white border-gray-300 px-5">
                <select
                  value={filters.propertyStatus}
                  onChange={(e) =>
                    handleFilterChange("propertyStatus", e.target.value)
                  }
                  className=" px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                >
                  <option value="">All Status</option>
                  <option value="available">Available</option>
                  <option value="sold_out">Sold Out</option>
                </select>
              </div>
              <div className="rounded-md border bg-white border-gray-300 px-5">
                <select
                  value={filters.constructionStatus}
                  onChange={(e) =>
                    handleFilterChange("constructionStatus", e.target.value)
                  }
                  className=" px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                >
                  <option value="">All Construction</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600">
              Error loading properties. Please try again.
            </p>
          </div>
        ) : properties.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  getFallbackImage={getFallbackImage}
                  getConstructionImage={getConstructionImage}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 text-sm border rounded-md ${
                          currentPage === pageNum
                            ? "bg-green-700 text-white border-green-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface PropertyCardProps {
  property: Property;
  getFallbackImage: (id: string) => StaticImageData;
  getConstructionImage: (status: string) => StaticImageData;
}

function PropertyCard({
  property,
  getFallbackImage,
  getConstructionImage,
}: PropertyCardProps) {
  const imageUrl =
    property.images.length > 0
      ? property.images[0]?.imageUrl
      : property.constructionStatus === "COMPLETED" ||
          property.constructionStatus === "ONGOING"
        ? getConstructionImage(property.constructionStatus)
        : getFallbackImage(property.id);

  const getBedroomCount = (unitTypes: string[]) => {
    const type = unitTypes[0] || "";
    if (type.includes("FOUR_BEDROOM")) return 4;
    if (type.includes("THREE_BEDROOM")) return 3;
    if (type.includes("TWO_BEDROOM")) return 2;
    if (type.includes("ONE_BEDROOM")) return 1;
    return 3; // default
  };

  const bedroomCount = getBedroomCount(property.unitTypes);

  return (
    <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-gray-800/80 px-2 py-1 text-xs font-medium text-white">
          {property.constructionStatus}
        </div>
        <div className="absolute right-4 top-4 z-10 rounded-lg bg-green-600/80 px-2 py-1 text-xs font-medium text-white">
          {property.status}
        </div>
        <Image
          src={imageUrl}
          alt={property.name}
          width={600}
          height={400}
          className="h-64 w-full object-cover"
        />
      </div>
      <div className="p-5 bg-[#f1f4f1]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-[#1D1D1D]">
            {property.name}
          </h3>
          <div className="flex items-center text-xs text-[#4D4E53]">
            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
            {property.address}
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {property.about}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex border-r-2 font-medium text-xs text-[#4D4E53] border-[#BBBCCD] items-center gap-2 px-3 py-1">
            <MdBed className="text-[#CD6115] text-lg" />
            <span>{bedroomCount} Beds</span>
          </div>
          <div className="flex border-r-2 border-[#BBBCCD] items-center gap-2 font-medium text-xs text-[#4D4E53] px-3">
            <FaExpand className="text-[#CD6115] text-lg" />
            <span>{property.unitAmount} Units</span>
          </div>
          <div className="flex border-r-2 border-[#BBBCCD] items-center gap-2 font-medium text-xs text-[#4D4E53] px-3">
            <FaDoorOpen className="text-[#CD6115] text-lg" />
            <span>
              {property.unitTypes[0]?.replace(/_/g, " ") || "Apartment"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href={`/rental/${property.id}`}
            className="rounded bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 text-center"
          >
            View property
          </Link>
          <div className="text-right">
            <span className="text-2xl font-semibold text-black">
              {property.unitAmount}
            </span>
            <span className="text-[#2B2D2F] font-medium"> units available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
