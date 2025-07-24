"use client";

import { Button } from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import six from "@/assets/admin/six.svg";
import { Input } from "@/components/ui/input";
import seven from "@/assets/admin/seven.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TbCurrencyDollar, TbCurrencyNaira } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";

import { useRouter, useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { purchasePropertyData } from "./PropertiesDetails";
import { LoadingState, ErrorState, EmptyState } from "./NoDataStates";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import AddPaymentModal from "./AddPaymentModal";
import { useFetchData } from "@/hooks/useApi";

interface Payment {
  id: string;
  paymentId: string;
  paymentDate: string;
  amountPaid: number;
  balanceRemaining: number;
  paymentMode: string;
  paymentType: string;
  customerId: string;
  propertyId: string;
  purchaseId: string;
  createdAt: string;
  updatedAt: string;
  currency: string;
}

interface PaymentHistoryData {
  remainingAmount: number;
  amountPaid: number;
  payments: Payment[];
  currency: string;
}

export default function PaymentHistory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unitId = searchParams.get("unitId");
  const userId = searchParams.get("userId");
  const propertyData = useAtomValue(purchasePropertyData);

  const [search, setSearch] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // fetch paymentHistory with search
  const {
    data: paymentHistory,
    isPending: isPaymentHistoryPending,
    refetch,
  } = useFetchData(
    unitId
      ? `admin/purchases/${unitId}/payments${search ? `?search=${search}` : ""}`
      : null
  );

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (unitId) {
        refetch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, unitId, refetch]);

  // Extract data from API response
  const paymentHistoryData: PaymentHistoryData = paymentHistory?.data || {
    remainingAmount: 0,
    amountPaid: 0,
    payments: [],
  };

  const { payments, amountPaid, remainingAmount } = paymentHistoryData;

  const currency = payments[0]?.currency;

  // Filter payments based on search (client-side filtering as backup)
  const filteredPayments =
    payments?.filter(
      (payment) =>
        payment.paymentId.toLowerCase().includes(search.toLowerCase()) ||
        payment.paymentMode?.toLowerCase().includes(search.toLowerCase()) ||
        payment.paymentType.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Loading state
  if (isPaymentHistoryPending) {
    return <LoadingState message="Loading payment history..." />;
  }

  // Error state
  if (!paymentHistory?.data && !isPaymentHistoryPending) {
    return (
      <ErrorState
        message="Failed to load payment history"
        description="Unable to fetch payment data. Please try again."
        onAction={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen space-y-8 p-6">
      <div className="border-b flex justify-between items-center flex-wrap py-4 gap-2">
        <div className="py-2">
          <Breadcrumb
            items={[
              { label: "User", href: "/main-admin/customers" },
              {
                label: "View Profile",
                href: `/main-admin/customers/view-profile?id=${userId}`,
              },
              {
                label: "View Property",
                href: `/main-admin/customers/properties-details/?unitId=${unitId}&userId=${userId}`,
              },
              {
                label: `${propertyData?.name || "Property"} Payment History`,
                href: "#",
                isActive: true,
              },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start flex-wrap">
        <h2 className="text-lg font-medium text-gray-800">
          Payments history of {propertyData?.name || "unit"}
        </h2>
        <Button
          onClick={openPaymentModal}
          leftIcon={<FiPlus />}
          variant={"outline"}
          size="sm"
          className="text-white text-sm"
        >
          Add payments
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 w-80 rounded-md space-y-4">
          <div className="flex items-center gap-12">
            <p className="text-sm text-[#181818]">Total amount paid</p>
            <Image src={seven} alt="logo" />
          </div>
          <div className="flex text-[#B3B3B3] items-center gap-1">
            <IoMdArrowDropdown />
            {currency === "NGN" ? (
              <TbCurrencyNaira className="text-2xl mt-1" />
            ) : currency === "USD" ? (
              <TbCurrencyDollar className="text-2xl mt-1" />
            ) : (
              ""
            )}
            <p className="text-[#116114] font-semibold text-2xl">
              {amountPaid.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 w-80 rounded-md space-y-4">
          <div className="flex text-[#181818] items-center gap-12">
            <p className="text-sm text-[#181818]">Total amount outstanding</p>
            <Image src={six} alt="logo" />
          </div>
          <div className="flex text-[#B3B3B3] items-center gap-1">
            <IoMdArrowDropdown />
            {currency === "NGN" ? (
              <TbCurrencyNaira className="text-2xl mt-1" />
            ) : currency === "USD" ? (
              <TbCurrencyDollar className="text-2xl mt-1" />
            ) : (
              ""
            )}
            <p className="text-[#116114] font-semibold text-2xl">
              {remainingAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white space-y-4 p-6 overflow-hidden">
        {/* Table Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-800">
              View payment history
            </div>
            <p className="text-[#4D4E53] text-xs">
              Payment history of customer&apos;s properties.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* <span className="text-sm flex items-center gap-1 text-[#252525]">
              <PiFunnel />
              Filter
            </span> */}
            <Input
              type="search"
              placeholder="Search payments..."
              className="w-48 h-9 rounded-md text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Empty state */}
        {filteredPayments.length === 0 && !isPaymentHistoryPending && (
          <EmptyState
            message="No payment history found"
            description={
              search
                ? "No payments match your search criteria."
                : "No payment history has been recorded yet."
            }
            actionText="Add Payment"
            onAction={openPaymentModal}
            variant="card"
          />
        )}

        {/* Table Body */}
        {filteredPayments.length > 0 && (
          <>
            <div className="grid grid-cols-5 px-4 py-4 font-medium mt-6 text-xs text-[#847A8D] border rounded-md bg-[#F5F5F5]">
              <div>Payment ID</div>
              <div>Payment Date</div>
              <div>Amount Paid</div>
              <div>Payment Mode</div>
              <div>Remaining balance</div>
            </div>

            {filteredPayments.map((payment, index) => (
              <div
                key={payment.id}
                className={`grid grid-cols-5 px-4 py-4 text-xs text-[#2E2E2E] border-b ${
                  index % 2 === 1 ? "bg-[#FAFAFA]" : ""
                }`}
              >
                <div>{payment.paymentId}</div>
                <div>{new Date(payment.paymentDate).toLocaleDateString()}</div>
                <div>
                  {currency} {payment.amountPaid.toLocaleString()}
                </div>
                <div className="text-[#116114]">
                  {payment.paymentMode || "N/A"}
                </div>
                <div>
                  {currency} {payment.balanceRemaining.toLocaleString()}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Back Button */}
      <button
        className="text-[#323539] flex items-center gap-2 hover:text-black text-sm mt-6"
        onClick={() => router.back()}
      >
        <MdArrowBackIosNew />
        Back
      </button>

      {isPaymentModalOpen && (
        <AddPaymentModal
          open={isPaymentModalOpen}
          onClose={closePaymentModal}
          property={propertyData}
          paymentRemaining={remainingAmount}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
}
