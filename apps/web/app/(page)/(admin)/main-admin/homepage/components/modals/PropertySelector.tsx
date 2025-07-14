"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import tmlogo from "@/assets/tmlogo.png";
import PropertyCard from "../cards/Property";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { usePostData } from "@/hooks/useApi";
import { toast } from "sonner";

export default function PropertySelector({
  open,
  onClose,
  type = "property",
  onPropertySelect,
}: {
  open: boolean;
  onClose: () => void;
  type?: "property" | "rental" | "investment";
  onPropertySelect?: (property: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const {
    mutateAsync: updateFeaturedProperty,
    isPending: isUpdatingFeaturedProperty,
  } = usePostData(
    type === "property" ? "admin/properties/featured" : "rentals/highlight"
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch properties using infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["properties", type, searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `${type === "property" ? "admin/properties" : "rentals"}?page=${pageParam}&limit=10${searchTerm ? `&search=${searchTerm}` : ""}`
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages) => {
      // Get total items from all pages so far
      const totalItemsSoFar = allPages.reduce((total, page) => {
        if (type === "property") {
          return total + (page.data.items?.length || 0);
        } else {
          return total + (page.data?.length || 0);
        }
      }, 0);

      // If we have less than 5 items total, don't load more
      if (totalItemsSoFar < 5) {
        return undefined;
      }

      // If we got less than 10 items in the last page, we've reached the end
      if (
        type === "property"
          ? lastPage.data.items.length < 10
          : lastPage.data.length < 10
      )
        return undefined;

      return allPages.length + 1;
    },
    enabled: open,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // Reset selection when modal opens
  useEffect(() => {
    if (open) {
      setSelectedProperty(null);
    }
  }, [open]);

  // Flatten all pages into a single array
  const allProperties = data?.pages.flatMap((page) => page.data.items) || [];

  // Intersection Observer for infinite scrolling
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: "0px",
          threshold: 0.1,
        }
      );

      if (node) observer.observe(node);

      return () => observer.disconnect();
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const handlePropertySelect = async (property: any) => {
    // Prevent duplicate calls for the same property
    const propertyId = property?.id;
    if (
      selectedProperty &&
      (type === "property"
        ? selectedProperty.id === propertyId
        : selectedProperty.propertyId === propertyId)
    ) {
      return;
    }

    try {
      const response = await updateFeaturedProperty(
        type === "property"
          ? {
              id: propertyId,
              featured: true,
            }
          : {
              rentalId: propertyId,
            }
      );

      if (response) {
        toast.success(response.message || "Property updated successfully");
        setSelectedProperty(property);
        onPropertySelect?.(property);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div
        className="w-full max-w-4xl bg-white overflow-hidden"
        style={{ height: "95vh" }}
      >
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4 flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <Image src={tmlogo} alt="Logo" width={40} height={40} />
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white hover:text-red-300" />
          </button>
        </header>

        {/* Main Content */}
        <div className="px-4 pt-5 pb-[60px] h-full flex flex-col">
          <div className="text-sm font-medium text-[#116114] mb-4">
            Select for featured property
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search Properties"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-gray-200 border-0 text-gray-600 placeholder:text-gray-500"
            />
          </div>

          {/* Properties List - Scrollable Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto space-y-4 pr-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#CBD5E0 #F7FAFC",
            }}
          >
            {/* Loading State for initial load */}
            {isLoading && (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Failed to load properties</p>
                <button
                  onClick={() => refetch()}
                  className="bg-[#116114] text-white px-4 py-2 rounded text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Properties List */}
            {!isLoading && !error && (
              <>
                {allProperties.length > 0 ? (
                  allProperties.map((property, index) => {
                    const isLast = index === allProperties.length - 1;
                    return (
                      <div
                        key={
                          type === "property"
                            ? property.id
                            : property.propertyId
                        }
                        ref={isLast ? lastElementRef : null}
                      >
                        <PropertyCard
                          property={{
                            id:
                              type === "property"
                                ? property.id
                                : property.propertyId,
                            name:
                              type === "property"
                                ? property.name
                                : property.property.name,
                            location:
                              type === "property"
                                ? property.address
                                : property.property.address,
                            rooms:
                              type === "property"
                                ? property.unitTypes.join(", ") || "N/A"
                                : property.property.unitTypes.join(", ") ||
                                  "N/A",
                            status:
                              type === "property"
                                ? property.status
                                : property.status,
                            furnished:
                              type === "property"
                                ? property.features.includes("FURNISHED")
                                : property.property.features.includes(
                                    "FURNISHED"
                                  ),
                            image:
                              type === "property"
                                ? property.images[0]?.imageUrl
                                : property.property.images[0]?.imageUrl,
                          }}
                          isSelected={
                            type === "property"
                              ? selectedProperty?.id === property.id
                              : selectedProperty?.propertyId ===
                                property.propertyId
                          }
                          onSelect={() => handlePropertySelect(property)}
                          type={type}
                          isLoading={
                            type === "property" &&
                            isUpdatingFeaturedProperty &&
                            selectedProperty?.id === property.id
                          }
                        />
                      </div>
                    );
                  })
                ) : searchTerm ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-2">
                      No properties found matching "{searchTerm}"
                    </p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-2">
                      No properties available
                    </p>
                    <p className="text-sm text-gray-400">
                      Add some properties to get started
                    </p>
                  </div>
                )}

                {/* Loading indicator for pagination */}
                {isFetchingNextPage && (
                  <div className="flex justify-center items-center py-6 space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#116114]" />
                    <span className="text-sm text-gray-600">
                      Loading more properties...
                    </span>
                  </div>
                )}

                {/* End of list indicator */}
                {!hasNextPage && allProperties.length > 0 && (
                  <div className="text-center py-6 text-gray-500 text-sm border-t border-gray-200 mt-4">
                    <p>You've reached the end of the list</p>
                    <p className="text-xs mt-1">No more properties to load</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
