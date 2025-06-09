"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import logo from "@/assets/full-logo.png";

interface ReceiptTemplateProps {
  receiptId: string;
}

export function ReceiptTemplate({ receiptId }: ReceiptTemplateProps) {
  const receiptData = {
    paymentDate: "April 29, 2025",
    receiptNumber: "#CB-0425-001",
    propertyName: "Comfy Burrows",
    totalAmountDue: {
      naira: "₦3,000,000",
      dollar: "$900",
    },
    amountPaid: {
      naira: "₦300,000",
      dollar: "$150",
    },
    balanceDue: {
      naira: "₦2,700,000",
      dollar: "$750",
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      <div className="bg-white  shadow-lg overflow-hidden">
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
            <QRCodeSVG value={`receipt-${receiptId}`} size={60} />
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-8">
          {/* Receipt Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-1  gap-4">
              <div className="flex flex-col gap-2 lg:flex-row">
                <div className="font-semibold">Payment Date:</div>
                <div className="">{receiptData.paymentDate}</div>
              </div>
              <div className="flex flex-col gap-2 lg:flex-row">
                <div className="font-semibold">Receipt Number:</div>
                <div className="">{receiptData.receiptNumber}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:flex-row">
              <div className="font-semibold">Property Name:</div>
              <div className="">{receiptData.propertyName}</div>
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
                    {receiptData.totalAmountDue.naira}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {receiptData.totalAmountDue.dollar}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Amount Paid
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {receiptData.amountPaid.naira}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {receiptData.amountPaid.dollar}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Balance Due
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {receiptData.balanceDue.naira}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {receiptData.balanceDue.dollar}
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
            <Button className="gap-2 bg-white text-black border">
              <Download className="h-4 w-4" />
              Download
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
