"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import five from "@/assets/admin/home/five.svg";
import { Input } from "@/components/ui/input";
import { Search, Plus, Loader2, Eye, Trash2, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import Image from "next/image";
import one from "@/assets/admin/customer/one.svg";
import two from "@/assets/admin/customer/two.svg";
import three from "@/assets/admin/customer/three.svg";
import { useState, useEffect } from "react";
import { useFetchData } from "@/hooks/useApi";
import DeleteRentalModal from "./components/DeleteRentalModal";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface Rental {
  id: string;
  propertyId: string;
  apartmentType: string;
  location: string;
  rent: number;
  frequency: string;
  agencyFee: number;
  cautionFee: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    name: string;
    address: string;
    about: string;
    featured: boolean;
    featuredAt: string | null;
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
    brochure: string | null;
    constructionStatus: string;
    accountOfficerId: string | null;
    createdById: string | null;
    status: string;
    unitAmount: number;
    unitTypes: string[];
  };
}

interface RentalStats {
  propertiesForRent: number;
  rentedProperties: number;
  propertiesNotForRent: number;
}

export default function RentalsPage() {
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rentalToDelete, setRentalToDelete] = useState<Rental | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch rentals data
  const {
    data: rentalsResponse,
    isLoading: rentalsLoading,
    refetch: refetchRentals,
  } = useFetchData("rentals");

  // Fetch stats data
  const {
    data: statsResponse,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useFetchData("rentals/stats");

  // Listen for refetch events from other components
  useEffect(() => {
    const handleRefetchEvent = () => {
      console.log("Refetching rentals and stats from event...");
      refetchRentals();
      refetchStats();
    };

    window.addEventListener("refetch-rentals-stats", handleRefetchEvent);

    return () => {
      window.removeEventListener("refetch-rentals-stats", handleRefetchEvent);
    };
  }, [refetchRentals, refetchStats]);

  // Check for refresh parameter and trigger refetch
  useEffect(() => {
    const refresh = searchParams.get("refresh");
    if (refresh === "true") {
      console.log("Refresh parameter detected, refetching data...");
      refetchRentals();
      refetchStats();
      // Remove the refresh parameter from URL
      router.replace("/main-admin/rentals");
    }
  }, [searchParams, refetchRentals, refetchStats, router]);

  const rentals: Rental[] = rentalsResponse?.data?.items || [];
  const stats: RentalStats = statsResponse?.data || {
    total: 0,
    rented: 0,
    available: 0,
  };

  // Open delete confirmation modal
  const openDeleteModal = (rental: Rental) => {
    setRentalToDelete(rental);
    setDeleteModalOpen(true);
  };

  // Handle successful deletion
  const handleDeleteSuccess = () => {
    refetchRentals();
    refetchStats();
  };

  // Filter rentals based on search and filters
  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch =
      rental.property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.apartmentType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      rental.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesProperty =
      propertyFilter === "all" || rental.property.name === propertyFilter;

    return matchesSearch && matchesStatus && matchesProperty;
  });

  // Get unique property names for filter
  const propertyNames = [
    ...new Set(rentals.map((rental) => rental.property.name)),
  ];

  // Format rent amount
  const formatRent = (rent: number, frequency: string) => {
    const formattedRent = rent.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    switch (frequency) {
      case "MONTHLY":
        return `${formattedRent}/Month`;
      case "YEARLY":
        return `${formattedRent}/Year`;
      case "QUARTERLY":
        return `${formattedRent}/Quarter`;
      default:
        return formattedRent;
    }
  };

  // Format apartment type
  const formatApartmentType = (type: string) => {
    if (!type) return "";
    return type?.replace(/_/g, " ")?.replace(/\b\w/g, (l) => l?.toUpperCase());
  };

  const cards = [
    {
      id: 0,
      title: "Total properties for rent",
      count: stats.propertiesForRent,
      subtitle: "For rent",
      image: one,
    },
    {
      id: 1,
      title: "Rented properties",
      count: stats.rentedProperties,
      subtitle: "properties rented",
      image: three,
    },
    {
      id: 2,
      title: "Not rented properties",
      count: stats?.propertiesNotForRent,
      subtitle: "Available for rent",
      image: two,
    },
  ];

  if (rentalsLoading || statsLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Rental Overview
            </span>
          </div>
          <Link href="/main-admin/rentals/edit-rentals">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New rental
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search by property name / location / apartment type"
            className="pl-10 bg-[#E5E5E7] border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className={`font-medium ${
              statusFilter === "all"
                ? "bg-[#116114] text-white"
                : "bg-white text-[#858C95]"
            }`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>

          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95] font-medium">
              <SelectValue placeholder="Property name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {propertyNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95] font-medium">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="not_rented">Not Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} onClick={() => setActiveCard(card.id)}>
              <CardContent
                className={`p-6 rounded-md cursor-pointer ${
                  activeCard === card.id
                    ? "border border-[#116114]"
                    : "border border-transparent"
                }`}
              >
                <div className="space-y-2">
                  {/* Top Section with border-bottom */}
                  <div className="flex items-center gap-2 border-b border-[#E5E5E7] pb-2">
                    <Image src={card.image} alt="logo" className="h-10 w-10" />
                    <p className="text-[#323539] font-medium">{card.title}</p>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center gap-4 pt-2">
                    <h3 className="text-2xl ml-1 font-semibold text-[#116114]">
                      {card.count}
                    </h3>
                    <p className="text-xs text-[#858C95]">{card.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Properties Table */}
        <div>
          <h2 className=" text-[#116114] font-medium mb-4">Properties</h2>
          <div className="bg-white rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="!bg-[#EAEBF0] hover:!bg-[#EAEBF0]">
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Property Name
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Apartment type
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Location
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Rent
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Status
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRentals.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-[#858C95]"
                    >
                      No rentals found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRentals.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell className="text-[#181818] text-xs">
                        {rental.property.name}
                      </TableCell>
                      <TableCell className="text-[#181818] text-xs">
                        {formatApartmentType(rental.apartmentType)}
                      </TableCell>
                      <TableCell className="text-[#181818] text-xs">
                        {rental.location}
                      </TableCell>
                      <TableCell className="text-[#181818] text-xs">
                        {formatRent(rental.rent, rental.frequency)}
                      </TableCell>

                      <TableCell
                        className={`text-xs font-medium ${
                          rental.status === "RENTED"
                            ? "text-[#858C95]"
                            : "text-[#116114]"
                        }`}
                      >
                        {rental.status === "RENTED" ? "Rented" : "Not Rented"}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <Image
                                src={five}
                                alt="Action menu"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            </Button>
                          </DropdownMenu.Trigger>

                          <DropdownMenu.Content
                            sideOffset={4}
                            className="z-50 min-w-[120px] rounded-md border bg-white p-1 shadow-md"
                          >
                            <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                              <button
                                className="w-full m-0 p-0 text-left"
                                onClick={() => {
                                  router.push(
                                    `/main-admin/rentals/edit-rentals?id=${rental.id}`
                                  );
                                }}
                              >
                                Edit
                              </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              onClick={() => openDeleteModal(rental)}
                            >
                              Delete
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                              <button
                                className="w-full m-0 p-0 text-left"
                                onClick={() => {
                                  router.push(
                                    `/main-admin/rentals/rental-details?id=${rental.id}`
                                  );
                                }}
                              >
                                View details
                              </button>
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Delete Rental Modal */}
      <DeleteRentalModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        rental={rentalToDelete}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
