"use client";

import { useState, useEffect } from "react";
import { useFetchData, useGetExportData } from "@/hooks/useApi";
import { toast } from "sonner";
import PaymentDetailsDrawer from "./PaymentDetailsDrawer";
import Loader from "@/components/Loader";
import { Payment, PaginationData } from "./types";
import { PaymentTableHeader } from "./components/PaymentTableHeader";
import { PaymentTableBody } from "./components/PaymentTableBody";
import { PaymentTablePagination } from "./components/PaymentTablePagination";
import { PaymentTableEmpty } from "./components/PaymentTableEmpty";
import { PaymentTableError } from "./components/PaymentTableError";

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

  useEffect(() => {
    if (data?.data) {
      setPaginationData({
        page: data.data.page,
        total: data.data.total,
        limit: data.data.limit,
      });
    }
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownloadPDF = (paymentId: string) => {
    setDownloadUrl(`customer/payments/download/${paymentId}`);
    downloadPDF(undefined, {
      onSuccess: (data) => {
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

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedPayment(null);
  };

  const handleExportCSV = () => {
    if (payments.length === 0) {
      toast.error("No data to export");
      return;
    }

    try {
      const headers = [
        "Reference ID",
        "Property",
        "Payment Date",
        "Amount Paid",
        "Payment Mode",
        "Status",
        "Remaining Balance",
        "Created Date",
      ];

      const csvRows = payments.map((payment) => [
        payment.paymentId,
        payment.property.name,
        new Date(payment.paymentDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(payment.amountPaid),
        payment.paymentMode || "Not specified",
        "Completed",
        new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(payment.balanceRemaining),
        new Date(payment.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      ]);

      const csvContent = [headers, ...csvRows]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `payments_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("CSV exported successfully");
    } catch (error) {
      toast.error("Failed to export CSV");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PaymentTableError
        error={error?.message || "An error occurred"}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PaymentTableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExportCSV={handleExportCSV}
        paymentsCount={payments.length}
        isLoading={isLoading}
      />

      {payments.length === 0 ? (
        <PaymentTableEmpty
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />
      ) : (
        <>
          <PaymentTableBody
            payments={payments}
            onViewDetails={handleViewDetails}
            onDownloadPDF={handleDownloadPDF}
            isDownloading={isDownloading}
          />
          <PaymentTablePagination
            paginationData={paginationData}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </>
      )}

      <PaymentDetailsDrawer
        payment={selectedPayment}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </div>
  );
}
