"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import five from "@/assets/admin/home/five.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import three from "@/assets/admin/three.svg";
import Image from "next/image";
import two from "@/assets/admin/two.svg";
import one from "@/assets/admin/one.svg";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
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
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  kycStatusVerified: boolean;
  engagement: string | null;
  createdAt: string;
  updatedAt: string;
  purchases: any[];
  role: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    items: User[];
    page: number;
    total: number;
    limit: number;
  };
  statusCode: number;
}

// Loading Skeleton Component
function CustomersTableSkeleton() {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200"></div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 bg-gray-100 border-b border-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}

// Stats Cards Skeleton
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="border-none">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="flex items-center gap-10">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded w-16 mt-2"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const stats = [
  {
    title: "Total Customers",
    value: 0,
    icon: one,
  },
  {
    title: "Verified Customers",
    value: 0,
    icon: two,
  },
  {
    title: "Unverified customers",
    value: 0,
    icon: three,
  },
];

export default function CustomersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current values from URL params
  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentRole = searchParams.get("role") || "";
  const currentKycStatus = searchParams.get("kycStatus") || "";
  const currentSortOrder = (searchParams.get("sortOrder") || "desc") as
    | "asc"
    | "desc";

  // Local state for form inputs
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const limit = 10;

  // Update local state when URL params change
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

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
    sortOrder: currentSortOrder,
    ...(currentSearch && { search: currentSearch }),
    ...(currentRole && { role: currentRole }),
    ...(currentKycStatus && { kycStatus: currentKycStatus }),
  });

  const { data, isLoading, error } = useFetchData(
    `users?${queryParams.toString()}`
  );

  const users = data?.data?.items || [];
  const totalPages = data?.data?.total ? Math.ceil(data.data.total / limit) : 0;
  const totalUsers = data?.data?.total || 0;

  // Calculate stats from API data
  const verifiedUsers = users.filter((user) => user.kycStatusVerified).length;
  const unverifiedUsers = users.filter(
    (user) => !user.kycStatusVerified
  ).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURLParams({ search: searchTerm, page: 1 });
  };

  const handleRoleFilter = (role: string) => {
    updateURLParams({ role: role === "all" ? "" : role, page: 1 });
  };

  const handleKycStatusFilter = (status: string) => {
    updateURLParams({ kycStatus: status === "all" ? "" : status, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateURLParams({ page });
  };

  const clearFilters = () => {
    setSearchTerm("");
    updateURLParams({
      search: "",
      role: "",
      kycStatus: "",
      page: 1,
    });
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "Super Admin";
      case "ADMIN":
        return "Admin";
      case "INVESTOR":
        return "Investor";
      case "TENANT":
        return "Tenant";
      case "BUYER":
        return "Buyer";
      default:
        return role.replace("_", " ");
    }
  };

  const getEngagementDisplay = (engagement: string | null, role: string) => {
    if (engagement) return engagement;
    if (role === "SUPER_ADMIN" || role === "ADMIN") return "Internal user";
    return "No activity";
  };

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Customer management
            </span>
          </div>
          <Link href="/main-admin/customers/add-customers">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New Customer
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search by name / email / ID"
              className="pl-10 bg-[#E5E5E7] border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className={`bg-white text-[#858C95] ${!currentRole ? "border-[#116114] text-[#116114]" : ""}`}
            onClick={() => handleRoleFilter("all")}
          >
            All
          </Button>

          <Select value={currentRole} onValueChange={handleRoleFilter}>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="INVESTOR">Investor</SelectItem>
              <SelectItem value="TENANT">Tenant</SelectItem>
              <SelectItem value="BUYER">Buyer</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={currentKycStatus}
            onValueChange={handleKycStatusFilter}
          >
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="KYC Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Verified</SelectItem>
              <SelectItem value="false">Unverified</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={clearFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            Clear Filters
          </Button>
        </div>

        {/* Stats Cards */}
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { ...stats[0], value: totalUsers },
              { ...stats[1], value: verifiedUsers },
              { ...stats[2], value: unverifiedUsers },
            ].map((stat, index) => (
              <Card
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer ${
                  activeIndex === index
                    ? "border border-[#116114]"
                    : "border-none"
                }`}
              >
                <CardContent className="p-6">
                  <div>
                    <div className="flex items-center gap-10">
                      <p className="text-sm font-medium text-[#323539]">
                        {stat.title}
                      </p>
                      <Image src={stat.icon} alt={stat.title} />
                    </div>
                    <p className="font-medium text-xl text-[#116114]">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Customers Table */}
        {isLoading ? (
          <CustomersTableSkeleton />
        ) : error ? (
          <div className="bg-white rounded-md shadow p-8 text-center">
            <p className="text-red-600">
              Error loading customers. Please try again.
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-md shadow p-8 text-center">
            <p className="text-gray-600">
              No customers found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-md shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>KYC Status</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-[#181818]">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-[#181818]">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-[#181818]">
                        {user.phone}
                      </TableCell>
                      <TableCell className="text-[#181818]">
                        {getRoleDisplayName(user.role)}
                      </TableCell>
                      <TableCell
                        className={`font-medium ${user.kycStatusVerified ? "text-[#116114]" : "text-orange-600"}`}
                      >
                        {user.kycStatusVerified ? "Verified" : "Unverified"}
                      </TableCell>
                      <TableCell className="text-[#181818]">
                        {getEngagementDisplay(user.engagement, user.role)}
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
                            className="z-50 min-w-[120px] rounded-md border bg-white p-1 shadow-md flex flex-col gap-2"
                          >
                            {/* change to click */}
                            <button
                              className=""
                              onClick={() =>
                                router.push(
                                  `/main-admin/customers/view-profile?id=${user.id}`
                                )
                              }
                            >
                              <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                                View Profile
                              </DropdownMenu.Item>
                            </button>

                            <button
                              className=""
                              onClick={() =>
                                router.push(
                                  `/main-admin/customers/add-customers?id=${user.id}`
                                )
                              }
                            >
                              <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                                Edit Profile
                              </DropdownMenu.Item>
                            </button>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
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
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className={
                            currentPage === pageNum ? "bg-[#116114]" : ""
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
