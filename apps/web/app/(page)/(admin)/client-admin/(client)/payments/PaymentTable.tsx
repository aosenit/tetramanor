"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  AlertCircle,
  CreditCard,
  Loader2,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useFetchData, useGetExportData } from "@/hooks/useApi";
import { toast } from "sonner";
import PaymentDetailsDrawer from "./PaymentDetailsDrawer";

type Payment = {
  id: string;
  property: {
    name: string;
  };
  paymentId: string;
  balanceRemaining: number;
  amountPaid: number;
  paymentDate: string;
  createdAt: string;
  paymentMode: string | null;
};

type PaginationData = {
  page: number;
  total: number;
  limit: number;
};

export function PaymentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    total: 0,
    limit: 10,
  });

  // Query parameters for the API
  const queryParams = {
    page: currentPage,
    limit: 10,
    sortOrder: "desc",
    ...(searchQuery.trim() && { search: searchQuery.trim() }),
  };

  const { data, isLoading, error, refetch } = useFetchData(
    "customer/payments",
    queryParams
  );
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const { mutate: downloadPDF, isPending: isDownloading } =
    useGetExportData(downloadUrl);

  const payments = data?.data?.items || [];

  // Update pagination data when API response changes
  useEffect(() => {
    if (data?.data) {
      setPaginationData({
        page: data.data.page,
        total: data.data.total,
        limit: data.data.limit,
      });
    }
  }, [data]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle PDF download
  const handleDownloadPDF = (paymentId: string) => {
    setDownloadUrl(`customer/payments/${paymentId}/pdf`);

    downloadPDF(undefined, {
      onSuccess: (data) => {
        // Create blob and download
        const blob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `payment_receipt_${paymentId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("PDF downloaded successfully");
      },
      onError: () => {
        toast.error("Failed to download PDF");
      },
    });
  };

  // Handle view payment details
  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDrawerOpen(true);
  };

  // Handle drawer close
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedPayment(null);
  };

  // Calculate pagination info
  const totalPages = Math.ceil(paginationData.total / paginationData.limit);
  const startItem = (paginationData.page - 1) * paginationData.limit + 1;
  const endItem = Math.min(
    paginationData.page * paginationData.limit,
    paginationData.total
  );

  // Loading state
  if (isLoading && payments.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
            <p className="text-sm text-gray-500">
              View detailed records of payments made across your properties.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                disabled
              />
            </div>
            <Button variant="outline" className="gap-1" disabled>
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-1" disabled>
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="rounded-md border bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-medium">Reference ID</TableHead>
                  <TableHead className="font-medium">Property</TableHead>
                  <TableHead className="font-medium">Payment Date</TableHead>
                  <TableHead className="font-medium">Amount Paid</TableHead>
                  <TableHead className="font-medium">Payment Mode</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">
                    Remaining Balance
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && payments.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
            <p className="text-sm text-gray-500">
              View detailed records of payments made across your properties.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to load payments
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            There was an error loading your payment history. Please try again
            later.
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Loader2 className="w-4 h-4" />
            <span>Retry</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
            <p className="text-sm text-gray-500">
              View detailed records of payments made across your properties.
              {paginationData.total > 0 && (
                <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                  {paginationData.total} payment
                  {paginationData.total !== 1 ? "s" : ""}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by property or payment ID..."
                className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>By Date</DropdownMenuItem>
                <DropdownMenuItem>By Amount</DropdownMenuItem>
                <DropdownMenuItem>By Property</DropdownMenuItem>
                <DropdownMenuItem>By Payment Mode</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Empty state */}
        {payments.length === 0 && !isLoading && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No payments found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              {searchQuery
                ? `No payments found matching "${searchQuery}". Try adjusting your search terms.`
                : "You haven't made any payments yet. Your payment history will appear here once you start investing in properties."}
            </p>
            {searchQuery ? (
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear Search
              </Button>
            ) : (
              <Link href="/investment">
                <Button className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Start Investing</span>
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Payments table */}
        {payments.length > 0 && (
          <>
            <div className="rounded-md border bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-medium">
                        Reference ID
                      </TableHead>
                      <TableHead className="font-medium">Property</TableHead>
                      <TableHead className="font-medium">
                        Payment Date
                      </TableHead>
                      <TableHead className="font-medium">Amount Paid</TableHead>
                      <TableHead className="font-medium">
                        Payment Mode
                      </TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium">
                        Remaining Balance
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment: Payment) => (
                      <TableRow key={payment.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {payment.paymentId}
                        </TableCell>
                        <TableCell>{payment.property.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span>{formatDate(payment.paymentDate)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(payment.amountPaid)}
                        </TableCell>
                        <TableCell>
                          {payment.paymentMode || "Not specified"}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <Check className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatCurrency(payment.balanceRemaining)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                aria-label="Open menu"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewDetails(payment)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDownloadPDF(payment.id)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                {isDownloading
                                  ? "Downloading..."
                                  : "Download PDF"}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link
                                  href={`/client-admin/payments/receipts/${payment.id}`}
                                  className="w-full flex items-center"
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Receipt
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-2">
                <div className="flex-1 text-sm text-muted-foreground">
                  Showing {startItem} to {endItem} of {paginationData.total}{" "}
                  results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* Page numbers */}
                  <div className="flex items-center space-x-1">
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
                          disabled={isLoading}
                          className="w-8 h-8 p-0"
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
                    disabled={currentPage === totalPages || isLoading}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Details Drawer */}
      <PaymentDetailsDrawer
        payment={selectedPayment}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </>
  );
}
