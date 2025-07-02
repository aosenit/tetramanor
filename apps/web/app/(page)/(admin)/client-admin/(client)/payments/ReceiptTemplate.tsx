"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import logo from "@/assets/full-logo.png";
import { useGetData, useGetExportData } from "@/hooks/useApi";
import { toast } from "sonner";

interface ReceiptTemplateProps {
  receiptId: string;
}

export function ReceiptTemplate({ receiptId }: ReceiptTemplateProps) {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const {
    mutate: fetchReceiptData,
    data: receiptData,
    isPending: isLoading,
    error,
  } = useGetData(`customer/payments/${receiptId}`);
  const { mutate: downloadPDF, isPending: isDownloading } =
    useGetExportData(downloadUrl);

  useEffect(() => {
    if (receiptId) {
      fetchReceiptData();
    }
  }, [receiptId, fetchReceiptData]);

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
    });
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    setDownloadUrl(`customer/payments/${receiptId}/pdf`);

    downloadPDF(undefined, {
      onSuccess: (data) => {
        // Create blob and download
        const blob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `payment_receipt_${receiptId}.pdf`;
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

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="bg-white shadow-lg overflow-hidden">
          <div className="bg-[#323539] text-white p-4 flex justify-between items-center">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-40 h-10 object-contain"
            />
          </div>
          <div className="p-6 flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading receipt...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !receiptData?.data) {
    return (
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="bg-white shadow-lg overflow-hidden">
          <div className="bg-[#323539] text-white p-4 flex justify-between items-center">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-40 h-10 object-contain"
            />
          </div>
          <div className="p-6 text-center py-12">
            <p className="text-red-600 mb-4">
              {error?.message || "Failed to load receipt data"}
            </p>
            <Button onClick={() => fetchReceiptData()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const paymentData = receiptData.data;

  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      <div className="bg-white shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#323539] text-white p-4 flex justify-between items-center">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-40 h-10 object-contain"
          />
          <div>
            <QRCodeSVG
              value={`receipt-${paymentData.receiptNumber}`}
              size={60}
            />
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-8">
          {/* Receipt Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2 lg:flex-row">
                <div className="font-semibold">Payment Date:</div>
                <div className="">{formatDate(paymentData.paymentDate)}</div>
              </div>
              <div className="flex flex-col gap-2 lg:flex-row">
                <div className="font-semibold">Receipt Number:</div>
                <div className="">{paymentData.receiptNumber}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:flex-row">
              <div className="font-semibold">Property Name:</div>
              <div className="">{paymentData.propertyName}</div>
            </div>
          </div>

          {/* Payment Details Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F5F5F5]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount (₦)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount ($)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Total Amount Due
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(paymentData.totalAmountDue.ngn, "NGN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(paymentData.totalAmountDue.usd, "USD")}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Amount Paid
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right font-medium">
                    {formatCurrency(paymentData.amountPaid.ngn, "NGN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right font-medium">
                    {formatCurrency(paymentData.amountPaid.usd, "USD")}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Balance Due
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 text-right font-medium">
                    {formatCurrency(paymentData.balanceDue.ngn, "NGN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 text-right font-medium">
                    {formatCurrency(paymentData.balanceDue.usd, "USD")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Thank you message */}
          <div className="flex justify-between items-center pt-4">
            <p className="text-lg font-medium text-gray-700">
              Thank you for your payment!
            </p>
            <Button
              className="gap-2 bg-white text-black border"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/client-admin/payments"
          className="text-gray-500 hover:text-gray-700 underline text-sm"
        >
          Back to Payments
        </Link>
      </div>
    </div>
  );
}
