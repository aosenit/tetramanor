"use client";

import Image from "next/image";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";
import { Button } from "@chakra-ui/react";
import { useFetchData } from "@/hooks/useApi";
import { Loader2, AlertCircle, CreditCard, RefreshCw } from "lucide-react";

type PendingPayment = {
  purchaseId: string;
  unitNumber: string;
  unitName: string;
  createdAt: string;
  paymentDate: string;
  property: {
    name: string;
    image: Array<{
      id: string;
      imageUrl: string;
    }>;
  };
  remainingPayment: number;
  totalPrice: number;
};

export function PendingPayments() {
  // Fetch pending payments from API
  const {
    data: pendingPaymentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData("customer/pending-payment");

  const pendingPayments: PendingPayment[] = pendingPaymentsData?.data || [];

  console.log(pendingPaymentsData?.data);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4 bg-white rounded-lg border">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-xl font-semibold">Pending Payments</h2>
          <Button size="sm" variant="outline" disabled>
            View all
          </Button>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#116114]" />
            <p className="text-sm text-gray-600">Loading pending payments...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-4 bg-white rounded-lg border">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-xl font-semibold">Pending Payments</h2>
          <Button size="sm" variant="outline" disabled>
            View all
          </Button>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Failed to load pending payments
              </p>
              <p className="text-xs text-gray-500 mb-4">
                {error?.message || "An error occurred while fetching data"}
              </p>
              <Button
                size="sm"
                onClick={() => refetch()}
                className="bg-[#116114] text-white hover:bg-[#116114]/90"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!pendingPayments || pendingPayments.length === 0) {
    return (
      <div className="space-y-4 bg-white rounded-lg border">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-xl font-semibold">Pending Payments</h2>
          <Link href="/client-admin/dashboard/pending-payments">
            <Button size="sm" variant="outline">
              View all
            </Button>
          </Link>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <CreditCard className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">No pending payments</p>
              <p className="text-xs text-gray-500">
                You're all caught up with your payments
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white rounded-lg border divide-y">
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-xl font-semibold">Pending Payments</h2>
        <Link href="/client-admin/payments">
          <Button size="sm" variant="outline">
            View all
          </Button>
        </Link>
      </div>
      <div className="overflow-hidden">
        <div className="divide-y">
          {pendingPayments?.slice(0, 4)?.map((payment) => (
            <div
              key={payment.purchaseId}
              className="p-4 flex items-center gap-4"
            >
              <div className="h-12 w-16 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={payment.property?.image?.[0]?.imageUrl || placeholder}
                  alt={payment.property?.name || "Property"}
                  className="h-12 w-16 object-cover"
                  priority
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">
                  {payment.property?.name || "Unknown Property"}
                </h3>
                <p className="text-sm text-gray-500">
                  Unit {payment.unitNumber} • {formatDate(payment.paymentDate)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Balance Due</div>
                <div className="font-medium text-red-600">
                  {formatCurrency(payment.remainingPayment)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
