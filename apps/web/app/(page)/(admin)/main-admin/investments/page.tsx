"use client";
import { Button } from "@/components/ui/button";
import five from "@/assets/admin/home/five.svg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search, Plus, Loader2 } from "lucide-react";
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
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import InvestmentModal from "./add-investment/components/Modal";
import ConfirmationModal from "./components/ConfirmationModal";

import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";
import React, { Suspense, useState, useEffect } from "react";
import Loader from "@/components/Loader";

interface Investment {
  id: string;
  projectName: string;
  investmentType: "FIXED_ROI" | "EQUITY_SHARE";
  estimatedROI: number;
  minAmount: number;
  duration: string;
  status: "PUBLISHED" | "UNPUBLISHED";
  currency: string;
  description: string;
  contractPDF: string;
  brochurePDF: string;
  featuredImage: string;
  offerEndDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Investment[];
  statusCode: number;
}

function InvestmentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    action: "delete" | "unpublish" | "publish";
    investment: Investment | null;
  }>({ open: false, action: "delete", investment: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Get current URL parameters
  const currentSearch = searchParams.get("search") || "";
  const currentPageParam = parseInt(searchParams.get("page") || "1");
  const currentLimit = parseInt(searchParams.get("limit") || "10");
  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const currentInvestmentType = searchParams.get("investmentType") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentRoiRange = searchParams.get("roiRange") || "";

  // Build query string for API
  const buildQueryString = () => {
    const params = new URLSearchParams({
      page: currentPageParam.toString(),
      limit: currentLimit.toString(),
      sortOrder: currentSortOrder,
    });

    if (currentSearch) params.append("search", currentSearch);
    if (currentInvestmentType)
      params.append("type", currentInvestmentType.toUpperCase());
    if (currentStatus) params.append("status", currentStatus.toUpperCase());
    if (currentRoiRange) params.append("roiRange", currentRoiRange);

    return params.toString();
  };

  // Use the useFetchData hook
  const {
    data: investmentResponse,
    isLoading,
    error,
    refetch,
  } = useFetchData(`investments?${buildQueryString()}`);

  // Extract data from response
  const investments = investmentResponse?.data || [];
  const totalItems = investmentResponse?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / currentLimit);
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

  // Handle investment type filter
  const handleInvestmentTypeChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    updateURLParams({ investmentType: filterValue, page: "1" });
  };

  // Handle status filter
  const handleStatusChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    updateURLParams({ status: filterValue, page: "1" });
  };

  // Handle ROI range filter
  const handleRoiRangeChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    updateURLParams({ roiRange: filterValue, page: "1" });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    updateURLParams({ page: page.toString() });
  };

  // Clear all filters
  const clearAllFilters = () => {
    router.replace("/main-admin/investments");
  };

  // Handle confirmation modal actions
  const handleConfirmAction = async () => {
    const { action, investment } = confirmationModal;

    if (!investment) return;

    if (action === "delete") {
      setIsDeleting(true);
      try {
        await axiosInstance.delete(`investments/${investment.id}`);
        toast.success("Investment deleted successfully");
        refetch();
        setConfirmationModal({
          open: false,
          action: "delete",
          investment: null,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsDeleting(false);
      }
    } else if (action === "unpublish" || action === "publish") {
      setIsUpdatingStatus(true);
      try {
        const newStatus =
          investment.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED";
        const updateData = {
          ...investment,
          status: newStatus,
        };

        await axiosInstance.put(`investments/${investment.id}`, updateData);
        const actionText =
          newStatus === "PUBLISHED" ? "published" : "unpublished";
        toast.success(`Investment ${actionText} successfully`);
        refetch();
        setConfirmationModal({
          open: false,
          action: "unpublish",
          investment: null,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdatingStatus(false);
      }
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ open: false, action: "delete", investment: null });
  };

  // Get investment type display name
  const getInvestmentTypeDisplayName = (type: string) => {
    switch (type) {
      case "FIXED_ROI":
        return "Fixed ROI";
      case "EQUITY_SHARE":
        return "Equity Share";
      default:
        return type.replace("_", " ");
    }
  };

  // Get status display name
  const getStatusDisplayName = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PUBLISHED":
        return "Published";
      case "UNPUBLISHED":
        return "Unpublished";
      default:
        return "Draft";
    }
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Refetch data when URL parameters change
  useEffect(() => {
    refetch();
  }, [
    currentPageParam,
    currentLimit,
    currentSortOrder,
    currentSearch,
    currentInvestmentType,
    currentStatus,
    currentRoiRange,
    refetch,
  ]);

  // Loading skeleton
  if (isLoading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading investments</p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1 text-[#858C95]">
              <span>Admin</span>
              <span className="text-xl text-[#858C95]">/</span>
              <span className="font-medium text-xl text-[#116114]">
                Investment
              </span>
            </div>
            <p className="text-[#454D56] text-sm mt-1">
              Manage all investment opportunities{" "}
            </p>
          </div>
          <Link href="/main-admin/investments/add-investment">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New investment
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search investments"
            className="pl-10 bg-[#E5E5E7] border-0"
            value={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="bg-white text-[#858C95]"
            onClick={clearAllFilters}
          >
            All
          </Button>

          <Select
            value={currentInvestmentType || "all"}
            onValueChange={handleInvestmentTypeChange}
          >
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Investment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="FIXED_ROI">Fixed ROI</SelectItem>
              <SelectItem value="EQUITY_SHARE">Equity Share</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={currentStatus || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="UNPUBLISHED">Unpublished</SelectItem>
            </SelectContent>
          </Select>

          {/* <Select
            value={currentRoiRange || "all"}
            onValueChange={handleRoiRangeChange}
          >
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="ROI range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ROI</SelectItem>
              <SelectItem value="0-20">0-20%</SelectItem>
              <SelectItem value="21-40">21-40%</SelectItem>
              <SelectItem value="41-60">41-60%</SelectItem>
              <SelectItem value="61-100">61-100%</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {/* Investments Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#116114] font-medium">
              Investments opportunities overview ({totalItems})
            </h2>
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-[#858C95]">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </div>
            )}
          </div>

          {investments.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-500 mb-4">
                <p className="text-lg font-medium">No investments found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
              <Button onClick={clearAllFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-white overflow-hidden">
                <Table>
                  <TableHeader className="border bg-[#E5E5E7] border-[#E5E5E7]">
                    <TableRow>
                      <TableHead className="text-[#181818] text-sm">
                        Project Name
                      </TableHead>
                      <TableHead className="text-[#181818] text-sm">
                        Investment Type
                      </TableHead>
                      <TableHead className="text-[#181818] text-sm">
                        Est ROI
                      </TableHead>
                      <TableHead className="text-[#181818] text-sm">
                        Min amount
                      </TableHead>
                      <TableHead className="text-[#181818] text-sm">
                        Duration
                      </TableHead>
                      <TableHead className="text-[#181818] text-sm">
                        Status
                      </TableHead>
                      <TableHead className="text-[#181818] text-sm">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {investments.map((investment) => {
                      const isUnpublished = investment.status === "UNPUBLISHED";
                      const isPublished = investment.status === "PUBLISHED";

                      const cellTextColor = isUnpublished
                        ? "#858C95"
                        : "#292D32";
                      const statusColor = isPublished ? "#116114" : "#858C95";

                      return (
                        <TableRow key={investment.id}>
                          <TableCell
                            className="font-medium"
                            style={{ color: cellTextColor }}
                          >
                            {investment.projectName}
                          </TableCell>
                          <TableCell style={{ color: cellTextColor }}>
                            {getInvestmentTypeDisplayName(
                              investment.investmentType
                            )}
                          </TableCell>
                          <TableCell style={{ color: cellTextColor }}>
                            {investment.estimatedROI}%
                          </TableCell>
                          <TableCell style={{ color: cellTextColor }}>
                            {formatCurrency(
                              investment.minAmount,
                              investment.currency
                            )}
                          </TableCell>
                          <TableCell style={{ color: cellTextColor }}>
                            {investment.duration}
                          </TableCell>
                          <TableCell style={{ color: statusColor }}>
                            {getStatusDisplayName(investment.status)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu.Root>
                              <DropdownMenu.Trigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Image
                                    src={five}
                                    alt="action"
                                    className="h-6 w-6 object-contain"
                                  />
                                </Button>
                              </DropdownMenu.Trigger>

                              <DropdownMenu.Content
                                side="bottom"
                                align="end"
                                className="min-w-[150px] bg-white border rounded-md shadow-md p-1 z-50"
                              >
                                <DropdownMenu.Item
                                  className="px-3 py-2 hover:bg-gray-100 text-sm text-[#292D32] cursor-pointer"
                                  onSelect={() =>
                                    router.push(
                                      `/main-admin/investments/add-investment?id=${investment.id}`
                                    )
                                  }
                                >
                                  Edit
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                  onSelect={() => {
                                    setSelectedInvestment(investment);
                                    setIsModalOpen(true);
                                  }}
                                  className="px-3 py-2 hover:bg-gray-100 text-sm text-[#292D32] cursor-pointer"
                                >
                                  View
                                </DropdownMenu.Item>
                                {/* <DropdownMenu.Item
                                  className="px-3 py-2 hover:bg-gray-100 text-sm text-[#292D32] cursor-pointer"
                                  onSelect={() => {
                                    setConfirmationModal({
                                      open: true,
                                      action:
                                        investment.status === "PUBLISHED"
                                          ? "unpublish"
                                          : "publish",
                                      investment: investment,
                                    });
                                  }}
                                >
                                  {investment.status === "PUBLISHED"
                                    ? "Unpublish"
                                    : "Publish"}
                                </DropdownMenu.Item> */}
                                <DropdownMenu.Item
                                  className="px-3 py-2 hover:bg-gray-100 text-sm text-red-600 cursor-pointer"
                                  onSelect={() => {
                                    setConfirmationModal({
                                      open: true,
                                      action: "delete",
                                      investment: investment,
                                    });
                                  }}
                                >
                                  Delete
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu.Root>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
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
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={
                          currentPage === pageNum
                            ? "bg-[#116114] text-white"
                            : ""
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

      <InvestmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
        post={selectedInvestment}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmAction}
        action={confirmationModal.action}
        investmentName={confirmationModal.investment?.projectName}
        isLoading={isDeleting || isUpdatingStatus}
      />
    </div>
  );
}

export default function InvestmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      }
    >
      <InvestmentsPageContent />
    </Suspense>
  );
}
