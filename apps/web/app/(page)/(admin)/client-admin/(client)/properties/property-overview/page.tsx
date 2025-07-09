"use client";

import React, { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Filter, MoreHorizontal, Home, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import iconOne from "../../../../../../../assets/customer/propertyOne.png";
import iconTwo from "../../../../../../../assets/customer/propertyTwo.png";
// import iconThree from "../../../../../../../assets/customer/propertyThree.png";
import iconFour from "../../../../../../../assets/customer/propertyFour.png";
import Image from "next/image";
import { useFetchData, usePostData } from "@/hooks/useApi";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const PropertyTableSkeleton = () => (
  <div className="overflow-x-auto bg-white rounded-lg shadow animate-pulse">
    <table className="min-w-[700px] w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          {Array.from({ length: 9 }).map((_, i) => (
            <th key={i} className="px-3 py-2">
              &nbsp;
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, i) => (
          <tr key={i}>
            {Array.from({ length: 9 }).map((_, j) => (
              <td key={j} className="px-3 py-4">
                <div className="h-4 bg-gray-200 rounded w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmptyState = () => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center py-16 px-4 text-center">
      <Image
        src={iconOne.src}
        alt="No properties"
        width={64}
        height={64}
        className="mb-4 opacity-60"
      />
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        No Properties Found
      </h2>
      <p className="text-gray-500 mb-4 max-w-xs mx-auto">
        You currently have no properties in your account. Once you purchase a
        property, it will appear here.
      </p>
      <Button variant="outline" onClick={() => router.back()}>
        Explore Properties
      </Button>
    </div>
  );
};

const FilteredEmptyState = ({
  activeTab,
}: {
  activeTab: "owned" | "rented";
}) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center py-16 px-4 text-center">
      <Image
        src={activeTab === "owned" ? iconOne.src : iconFour.src}
        alt={`No ${activeTab} properties`}
        width={64}
        height={64}
        className="mb-4 opacity-60"
      />
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        No {activeTab === "owned" ? "Owned" : "Rented"} Properties
      </h2>
      <p className="text-gray-500 mb-4 max-w-xs mx-auto">
        {activeTab === "owned"
          ? "You don't have any owned properties yet. Properties you purchase will appear here."
          : "You don't have any rented properties yet. Properties you rent out will appear here."}
      </p>
      <Button variant="outline" onClick={() => router.back()}>
        Explore Properties
      </Button>
    </div>
  );
};

const PropertyOverview = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"owned" | "rented">("owned");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [selectedPropertyForRent, setSelectedPropertyForRent] =
    useState<any>(null);
  const [filters, setFilters] = useState({
    propertyType: "all",
    minPrice: "",
    maxPrice: "",
  });
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  const router = useRouter();

  // Fetch properties using the new endpoint
  const {
    data: propertiesData,
    isLoading: isPropertiesLoading,
    isError: isPropertiesError,
    error: propertiesError,
  } = useFetchData(id ? `/customer/properties/${id}` : "");

  // Fetch stats using the new endpoint
  const {
    data: statsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useFetchData(id ? `/customer/properties/stats/${id}` : "");

  const { mutate: addRental, isPending: isAddingRental } = usePostData(
    "customer/add-rental"
  );

  const properties = Array.isArray(propertiesData?.data)
    ? propertiesData.data
    : [];
  const stats = statsData?.data || {};

  // Use stats from API instead of calculating
  const summary = [
    {
      label: "Total Units Owned",
      value: (stats.totalUnitsOwned || 0).toString().padStart(2, "0"),
      icon: iconOne,
    },
    {
      label: "Total Property Value",
      value: `₦${(stats.totalPropertyValue || 0).toLocaleString()}`,
      icon: iconTwo,
    },
    {
      label: "Outstanding Balance",
      value: `₦${(stats.outstandingPayment || 0).toLocaleString()}`,
      // icon: iconThree,
    },
    {
      label: "Units Rented",
      value: (stats.unitsRented || 0).toString().padStart(2, "0"),
      icon: iconFour,
    },
  ];

  // Helper function to format unit type
  const formatUnitType = (unitType: string) => {
    return unitType
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to check if property matches filters
  const matchesFilters = (property: any) => {
    // Property type filter
    if (
      filters.propertyType &&
      filters.propertyType !== "all" &&
      property.unitType !== filters.propertyType
    ) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && property.price < Number(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) {
      return false;
    }

    return true;
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      propertyType: "all",
      minPrice: "",
      maxPrice: "",
    });
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== "all"
  );

  // Handle put up for rent
  const handlePutUpForRent = (property: any) => {
    setSelectedPropertyForRent(property);
    setIsRentModalOpen(true);
  };

  // Confirm put up for rent
  const confirmPutUpForRent = () => {
    if (!selectedPropertyForRent) return;

    addRental(
      { purchaseId: selectedPropertyForRent.id },
      {
        onSuccess: () => {
          toast.success("Property put up for rent successfully!");
          setIsRentModalOpen(false);
          setSelectedPropertyForRent(null);
          // Refetch data to update the UI
          window.location.reload();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to put property up for rent");
        },
      }
    );
  };

  // Cancel put up for rent
  const cancelPutUpForRent = () => {
    setIsRentModalOpen(false);
    setSelectedPropertyForRent(null);
  };

  // Check if any data is loading
  const isLoading = isPropertiesLoading || isStatsLoading;
  const isError = isPropertiesError || isStatsError;
  const error = propertiesError || statsError;

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="px-2 sm:px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            {name}
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {summary.map((item) => (
            <Card
              key={item.label}
              className="flex flex-row items-center gap-4 p-4 min-w-0 justify-between"
            >
              <div className="truncate">
                <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 truncate">
                  {item.label}
                </CardTitle>
                <div className="text-lg font-bold text-gray-900 truncate">
                  {item.value}
                </div>
              </div>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50">
                <Image
                  src={item?.icon?.src}
                  alt={item?.label}
                  className="h-10 w-10 object-contain"
                  height={20}
                  width={20}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs and Controls */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-2 md:gap-4 mb-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant={activeTab === "owned" ? "outline" : "ghost"}
                size="sm"
                className="gap-2 w-1/2 md:w-auto"
                onClick={() => setActiveTab("owned")}
              >
                Owned
              </Button>
              <Button
                variant={activeTab === "rented" ? "outline" : "ghost"}
                size="sm"
                className="gap-2 w-1/2 md:w-auto"
                onClick={() => setActiveTab("rented")}
              >
                Rented
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full md:w-auto">
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant={hasActiveFilters ? "default" : "outline"}
                    size="sm"
                    className="gap-2 w-full sm:w-auto"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                    {hasActiveFilters && (
                      <span className="ml-1 bg-white text-blue-600 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {Object.values(filters).filter((v) => v !== "").length}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter Properties</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">
                        Property Type
                      </label>
                      <Select
                        value={filters.propertyType}
                        onValueChange={(value) =>
                          setFilters({ ...filters, propertyType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="THREE_BEDROOM_APARTMENT">
                            Three Bedroom Apartment
                          </SelectItem>
                          <SelectItem value="TWO_BEDROOM_APARTMENT">
                            Two Bedroom Apartment
                          </SelectItem>
                          <SelectItem value="ONE_BEDROOM_APARTMENT">
                            One Bedroom Apartment
                          </SelectItem>
                          <SelectItem value="STUDIO_APARTMENT">
                            Studio Apartment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Min Price (₦)
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={filters.minPrice}
                          onChange={(e) =>
                            setFilters({ ...filters, minPrice: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Max Price (₦)
                        </label>
                        <Input
                          type="number"
                          placeholder="Any"
                          value={filters.maxPrice}
                          onChange={(e) =>
                            setFilters({ ...filters, maxPrice: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="flex-1"
                      >
                        Clear All
                      </Button>
                      <Button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          {/* Table states */}
          {isLoading ? (
            <PropertyTableSkeleton />
          ) : isError ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-red-500 font-medium">
              {error?.message || "Failed to load properties."}
            </div>
          ) : properties.length === 0 ? (
            <EmptyState />
          ) : (
            (() => {
              const filteredProperties = properties.filter((p) => {
                // Filter by tab
                if (activeTab === "rented" && !p.isRented) return false;
                if (activeTab === "owned" && p.isRented) return false;

                // Filter by search
                const matchesSearch =
                  p.name?.toLowerCase().includes(search.toLowerCase()) ||
                  p.unitType?.toLowerCase().includes(search.toLowerCase()) ||
                  p.propertyName?.toLowerCase().includes(search.toLowerCase());

                if (!matchesSearch) return false;

                // Apply additional filters
                return matchesFilters(p);
              });

              if (filteredProperties.length === 0) {
                return <FilteredEmptyState activeTab={activeTab} />;
              }

              return (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-[700px] w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          <input type="checkbox" />
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Property
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Bedrooms
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Floor
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Purchase Price
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Account Officer
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-3 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredProperties.map((property: any) => (
                        <tr
                          key={property.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-3 py-2">
                            <input type="checkbox" />
                          </td>
                          <td className="px-3 py-2 flex items-center gap-3 min-w-[150px]">
                            <div className="h-10 w-14 bg-gray-200 rounded-md border flex items-center justify-center">
                              {property.images && property.images.length > 0 ? (
                                <Image
                                  src={property.images[0].imageUrl}
                                  alt={property.name || property.propertyName}
                                  width={56}
                                  height={40}
                                  className="rounded-md object-cover"
                                />
                              ) : (
                                <span className="text-xs text-gray-500">
                                  IMG
                                </span>
                              )}
                            </div>
                            <span className="font-semibold text-gray-900 truncate">
                              {property.name || property.propertyName}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            {formatUnitType(property.unitType)}
                          </td>
                          <td className="px-3 py-2">
                            {property.unitType?.includes("THREE_BEDROOM")
                              ? "3"
                              : property.unitType?.includes("TWO_BEDROOM")
                                ? "2"
                                : property.unitType?.includes("ONE_BEDROOM")
                                  ? "1"
                                  : property.unitType?.includes("STUDIO")
                                    ? "Studio"
                                    : "N/A"}
                          </td>
                          {/* floor can be 0 */}
                          <td className="px-3 py-2">{property.floor}</td>
                          <td className="px-3 py-2">
                            <span className="font-bold">
                              {formatPrice(property.price)}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                  {property.accountOfficerId ? "AO" : "N/A"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-900 truncate">
                                {property.accountOfficerId
                                  ? "Account Officer"
                                  : "Not Assigned"}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`font-medium ${
                                property.isRented
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {property.isRented ? "Rented" : "Owned"}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handlePutUpForRent(property)}
                                  disabled={property.isRented}
                                >
                                  <Home className="mr-2 h-4 w-4" />
                                  {property.isRented
                                    ? "Already Rented"
                                    : "Put Up for Rent"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/client-admin/properties/${property.id}?id=${id}&name=${name}&type=${activeTab}`
                                    )
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()
          )}
        </div>

        {/* Rent Confirmation Modal */}
        <Dialog open={isRentModalOpen} onOpenChange={setIsRentModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Put Property Up for Rent</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to put{" "}
                <span className="font-semibold">
                  {selectedPropertyForRent?.name ||
                    selectedPropertyForRent?.propertyName}
                </span>{" "}
                up for rent? This action cannot be undone.
              </p>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={cancelPutUpForRent}
                  className="flex-1"
                  disabled={isAddingRental}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmPutUpForRent}
                  className="flex-1"
                  disabled={isAddingRental}
                >
                  {isAddingRental ? "Putting Up for Rent..." : "Confirm"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PropertyOverview;
