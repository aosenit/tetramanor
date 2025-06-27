"use client";
import { useState, useEffect } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import four from "@/assets/admin/home/four.webp";
import { CiLocationOn } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";

export default function PropertyManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current URL parameters
  const currentSearch = searchParams.get("search") || "";
  const currentPageParam = parseInt(searchParams.get("page") || "1");
  const currentLimit = parseInt(searchParams.get("limit") || "10");
  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const currentPropertyStatus = searchParams.get("propertyStatus") || "";
  const currentConstructionStatus =
    searchParams.get("constructionStatus") || "";

  // Build query string for API
  const buildQueryString = () => {
    const params = new URLSearchParams({
      page: currentPageParam.toString(),
      limit: currentLimit.toString(),
      sortOrder: currentSortOrder,
    });

    if (currentSearch) params.append("search", currentSearch);
    if (currentPropertyStatus)
      params.append("propertyStatus", currentPropertyStatus.toUpperCase());
    if (currentConstructionStatus)
      params.append(
        "constructionStatus",
        currentConstructionStatus.toUpperCase()
      );

    return params.toString();
  };

  // Use the useFetchData hook
  const {
    data: propertyResponse,
    isLoading,
    error,
    refetch,
  } = useFetchData(`admin/properties?${buildQueryString()}`);

  // Refetch data when URL parameters change
  useEffect(() => {
    refetch();
  }, [
    currentPageParam,
    currentLimit,
    currentSortOrder,
    currentSearch,
    currentPropertyStatus,
    currentConstructionStatus,
    refetch,
  ]);

  // Extract data from response
  const properties = propertyResponse?.data?.items || [];
  const totalItems = propertyResponse?.data?.total || 0;
  const totalPages = propertyResponse?.data?.total
    ? Math.ceil(propertyResponse.data.total / currentLimit)
    : 1;
  const currentPage = currentPageParam;

  // Update URL parameters
  const updateURLParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.replace(`?${newSearchParams.toString()}`);
  };

  // Handle search
  const handleSearch = (value: string) => {
    updateURLParams({ search: value, page: "1" });
  };

  // Handle property status filter
  const handlePropertyStatusChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    updateURLParams({ propertyStatus: filterValue, page: "1" });
  };

  // Handle construction status filter
  const handleConstructionStatusChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    updateURLParams({ constructionStatus: filterValue, page: "1" });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    updateURLParams({ page: page.toString() });
  };

  // Clear all filters
  const clearAllFilters = () => {
    router.replace("/main-admin/properties");
  };

  // Get status display name
  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "Available";
      case "SOLD_OUT":
        return "Sold Out";
      case "RESERVED":
        return "Reserved";
      default:
        return status.replace("_", " ");
    }
  };

  // Get construction status display name
  const getConstructionStatusDisplayName = (status: string) => {
    switch (status) {
      case "ONGOING":
        return "Ongoing";
      case "COMPLETED":
        return "Completed";
      case "PLANNED":
        return "Planned";
      default:
        return status.replace("_", " ");
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen space-y-6">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-[#858C95]">
              <span>Admin</span>
              <span className="text-xl text-[#858C95]">/</span>
              <span className="font-medium text-xl text-[#116114]">
                Property management
              </span>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="pb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="flex justify-between pt-2">
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen space-y-6">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-[#858C95]">
              <span>Admin</span>
              <span className="text-xl text-[#858C95]">/</span>
              <span className="font-medium text-xl text-[#116114]">
                Property management
              </span>
            </div>
            <Link href="/main-admin/properties/add-properties">
              <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
                <Plus className="" />
                Add New property
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              {error?.message || "An error occurred"}
            </p>
            <Button
              onClick={() => refetch()}
              className="bg-[#116114] hover:bg-green-800"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Admin</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Property management
            </span>
          </div>
          <Link href="/main-admin/properties/add-properties">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New property
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search: Properties"
            className="pl-10 bg-[#E5E5E7] border-0"
            value={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-[#323539]"
              onClick={clearAllFilters}
            >
              All
            </Button>
            <Select
              value={currentPropertyStatus || "all"}
              onValueChange={handlePropertyStatusChange}
            >
              <SelectTrigger className="w-32 bg-white text-[#323539]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="SOLD_OUT">Sold Out</SelectItem>
                <SelectItem value="RESERVED">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={currentConstructionStatus || "all"}
              onValueChange={handleConstructionStatusChange}
            >
              <SelectTrigger className="w-40 bg-white text-[#323539]">
                <SelectValue placeholder="Construction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Construction</SelectItem>
                <SelectItem value="ONGOING">Ongoing</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PLANNED">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="link"
            className="text-[#858C95] text-sm p-0"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      </div>

      <div className="pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-[#116114]">
            All properties ({totalItems})
          </h2>
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-[#858C95]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          )}
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 mb-4">
              <p className="text-lg font-medium">No properties found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
            <Button onClick={clearAllFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative bg-[#F4F4F4]">
                    <Image
                      src={
                        property.images && property.images.length > 0
                          ? property.images[0]?.imageUrl
                          : four
                      }
                      alt={property.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className={`absolute top-0 left-0 text-xs ${
                        property.status === "AVAILABLE"
                          ? "bg-[#C5FDC7] text-[#323539]"
                          : property.status === "SOLD_OUT"
                            ? "bg-red-100 text-red-800"
                            : "bg-[#E2E3F2] text-[#323539]"
                      }`}
                    >
                      {getStatusDisplayName(property.status)}
                    </Badge>
                    {property.featured && (
                      <Badge className="absolute top-0 right-0 text-xs bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm text-[#181818]">
                          {property.name}
                        </h3>
                        <span className="text-xs text-[#323539]">Status</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#4C5560] font-medium">
                          {property.unitAmount} units
                        </span>
                        <span className="text-xs text-[#116114] font-medium">
                          {getConstructionStatusDisplayName(
                            property.constructionStatus
                          )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center text-[#323539] space-x-1">
                          <CiLocationOn />
                          <span className="text-[#323539]">
                            {property.address}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-[#323539]"
                          onClick={() =>
                            router.push(
                              `/main-admin/properties/property-details?id=${property.id}&edit=true`
                            )
                          }
                        >
                          Edit
                          <FiEdit3 className="text-[#116114]" />
                        </Button>
                        <Link
                          href={`/main-admin/properties/property-details?id=${property.id}`}
                        >
                          <Button
                            size="sm"
                            className="bg-[#116114] text-s text-white"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

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
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={
                        currentPage === pageNum ? "bg-[#116114] text-white" : ""
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
