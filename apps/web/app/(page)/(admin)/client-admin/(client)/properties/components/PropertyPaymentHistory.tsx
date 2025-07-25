import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData, useGetExportData } from "@/hooks/useApi";
import React, { useState } from "react";
import { toast } from "sonner";
import PaymentDetailsDrawer from "../../payments/PaymentDetailsDrawer";
import { Payment } from "../../payments/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText } from "lucide-react";
import Link from "next/link";

interface PropertyPaymentHistoryProps {
  purchaseId: string;
}

const PropertyPaymentHistory: React.FC<PropertyPaymentHistoryProps> = ({
  purchaseId,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: paymentsData, isLoading } = useFetchData(
    purchaseId ? `/purchases/${purchaseId}/payments` : ""
  );

  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const { mutate: downloadPDF, isPending: isDownloading } =
    useGetExportData(downloadUrl);

  const payments = paymentsData?.data;

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
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedPayment(null);
  };

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4 bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Payment History</h2>
          <p className="text-gray-500 text-sm">
            View detailed records of payments made across your properties.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 border rounded-md text-sm w-[240px]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div> */}
          {/* <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button> */}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Skeleton className="h-[400px] w-full " />
        </div>
      ) : payments?.payments?.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p>No payments found</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Reference ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount Paid
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Mode
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Remaining Balance
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            {
              <tbody className="bg-white divide-y divide-gray-200">
                {payments?.payments?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No payment history available
                    </td>
                  </tr>
                ) : (
                  payments?.payments?.map((payment, index) => (
                    <tr
                      key={payment.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.paymentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.paymentDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.currency} {payment.amountPaid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.paymentMode || "Not specified"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-green-500 text-sm font-medium">
                          {Number(payment?.balanceRemaining) > 0
                            ? "Pending"
                            : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.currency}{" "}
                        {payment.balanceRemaining?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            }
          </table>
        </div>
      )}

      <PaymentDetailsDrawer
        payment={selectedPayment}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </div>
  );
};

export default PropertyPaymentHistory;
