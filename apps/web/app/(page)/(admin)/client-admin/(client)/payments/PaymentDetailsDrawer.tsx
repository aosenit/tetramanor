"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Building,
  Receipt,
  DollarSign,
  Download,
  FileText,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { useGetData, useGetExportData } from "@/hooks/useApi";
import { toast } from "sonner";

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

interface PaymentDetailsDrawerProps {
  payment: Payment | null;
  open: boolean;
  onClose: () => void;
}

export default function PaymentDetailsDrawer({
  payment,
  open,
  onClose,
}: PaymentDetailsDrawerProps) {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const {
    mutate: fetchPaymentDetails,
    data: paymentDetails,
    isPending: isLoading,
    error,
  } = useGetData(payment ? `customer/payments/${payment.id}` : "");
  const { mutate: downloadPDF, isPending: isDownloading } =
    useGetExportData(downloadUrl);

  // Fetch payment details when drawer opens
  useEffect(() => {
    if (open && payment) {
      fetchPaymentDetails();
    } else if (!open) {
      // Reset state when drawer closes
      setDownloadUrl("");
    }
  }, [open, payment, fetchPaymentDetails]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      setDownloadUrl("");
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  // Format currency
  const formatCurrency = (amount: number, currency: "NGN" | "USD" = "NGN") => {
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (!payment) return;

    setDownloadUrl(`customer/payments/download/${payment.id}`);

    downloadPDF(undefined, {
      onSuccess: (data) => {
        // Create blob and download
        const blob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `payment_receipt_${payment.paymentId}.pdf`;
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

  // Don't render anything if not open
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <p className="text-sm text-gray-500 mt-1">
              Detailed information about this payment transaction
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading payment details...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">
                {error.message || "Failed to fetch payment details"}
              </p>
              <Button onClick={() => fetchPaymentDetails()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : paymentDetails?.data ? (
            <>
              {/* Payment Status */}
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Check className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              </div>

              <Separator />

              {/* Receipt Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Receipt className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold">Receipt Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Receipt Number</p>
                    <p className="font-medium">
                      {paymentDetails.data.receiptNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Date</p>
                    <p className="font-medium">
                      {formatDate(paymentDetails.data.paymentDate)}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Property Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold">Property Information</h3>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Property Name</p>
                  <p className="font-medium">
                    {paymentDetails.data.propertyName}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Financial Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold">Financial Details</h3>
                </div>

                <div className="space-y-4">
                  {/* Total Amount Due */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm mb-2">
                      Total Amount Due
                    </p>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(
                          paymentDetails.data.totalAmountDue.ngn,
                          "NGN"
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(
                          paymentDetails.data.totalAmountDue.usd,
                          "USD"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Amount Paid */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm mb-2">Amount Paid</p>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-green-600">
                        {formatCurrency(
                          paymentDetails.data.amountPaid.ngn,
                          "NGN"
                        )}
                      </p>
                      <p className="text-sm text-green-600">
                        {formatCurrency(
                          paymentDetails.data.amountPaid.usd,
                          "USD"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Balance Due */}
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm mb-2">Balance Due</p>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-orange-600">
                        {formatCurrency(
                          paymentDetails.data.balanceDue.ngn,
                          "NGN"
                        )}
                      </p>
                      <p className="text-sm text-orange-600">
                        {formatCurrency(
                          paymentDetails.data.balanceDue.usd,
                          "USD"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {isDownloading ? "Downloading..." : "Download Receipt"}
                </Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Close
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No payment details available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
