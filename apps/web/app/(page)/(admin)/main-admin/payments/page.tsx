"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiArrowTurnDownLeft } from "react-icons/hi2";
import { TbCurrencyNaira } from "react-icons/tb";
import { Search, Download, DollarSign, Plus, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import four from "@/assets/admin/customer/four.png";
import icon from "@/assets/admin/home/five.svg";
import five from "@/assets/admin/customer/five.svg";

import { FaAngleDown } from "react-icons/fa6";
import { PiArrowArcLeftThin } from "react-icons/pi";
import PaymentModal from "./components/RecieptModal";
import PaymentSummaryModal from "./components/PaymentSummaryModal";
import { useFetchData } from "@/hooks/useApi";

import Loader from "@/components/Loader";
import { Breadcrumb } from "../customers/components/Breadcrumb";

interface Payment {
  paymentDate: string;
  amountPaid: number;
  paymentType: string;
  paymentMode: string | null;
  currency: string;
  customer: {
    name: string;
    email: string;
  };
  property: {
    name: string;
  };
  purchase: {
    name: string;
    price: number;
  };
}

// Skeleton loader component
function PaymentsSkeleton() {
  return (
    <div className="min-h-screen space-y-6">
      {/* Header skeleton */}
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Search skeleton */}
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>

        {/* Tabs skeleton */}
        <div className="flex space-x-2">
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Stats Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-2">
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table skeleton */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>

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
        </div>
      </div>
    </div>
  );
}

function PaymentsPageContent() {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Build API URL with filters
  const buildApiUrl = () => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedCurrency) params.append("currency", "USD");
    return `admin/payments${params.toString() ? `?${params.toString()}` : ""}`;
  };

  // Fetch payments data
  const {
    data: paymentsResponse,
    isLoading,
    error,
    refetch,
  } = useFetchData(buildApiUrl());

  const payments: Payment[] = paymentsResponse?.data?.payment || [];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Refetch data when filters change
  useEffect(() => {
    refetch();
  }, [debouncedSearch, selectedCurrency, refetch]);

  // Calculate totals
  const totalAmountPaid = paymentsResponse?.data?.amountPaid;
  const totalOutstanding = paymentsResponse?.data?.remainingAmount;

  const cards = [
    {
      id: 0,
      title: "Total amount paid",
      icon: <PiArrowArcLeftThin />,
      count: totalAmountPaid,
      subtitle: "All time",
      image: four,
    },
    {
      id: 1,
      title: "Total amount outstanding",
      count: totalOutstanding,
      icon: <HiArrowTurnDownLeft />,
      subtitle: "All time",
      image: five,
    },
  ];

  // Use payments directly since filtering is now done on the server
  const filteredPayments = payments;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowSummary(true);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load payments</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <PaymentsSkeleton />;
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <Breadcrumb
              items={[
                { label: "Home", href: "/main-admin" },
                { label: "Payment Overview", href: "#" },
              ]}
            />
          </div>
          {/* <Button
            variant="outline"
            className="bg-white flex items-center gap-2 text-sm hover:bg-green-800"
            onClick={() => toast.info("Export feature coming soon")}
          >
            <Plus className="" />
            Export CSV
          </Button> */}
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
            <Input
              placeholder="Search by name / payment type / property"
              className="pl-10 bg-[#E5E5E7] border-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {(search || selectedCurrency) && (
            <div className="">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedCurrency(false);
                }}
                className="text-xs hover:bg-gray-100"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="property">
          {/* <TabsList>
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="rental">Rental</TabsTrigger>
          </TabsList> */}
        </Tabs>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} onClick={() => setActiveCard(card.id)}>
              <CardContent
                className={`p-6 rounded-md cursor-pointer ${
                  activeCard === card.id
                    ? "border border-[#116114]"
                    : "border border-transparent"
                }`}
              >
                <div className="space-y-2">
                  {/* Top Section with border-bottom */}
                  <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={card.image}
                        alt="logo"
                        className="h-10 w-10"
                      />
                      <p className="text-[#323539] font-medium">{card.title}</p>
                    </div>
                    <span>{card.icon}</span>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between mt-4 pt-2">
                    <h3 className="text-2xl ml-1 font-semibold text-[#116114]">
                      {selectedCurrency} {card.count?.toLocaleString()}
                    </h3>
                    <p className="text-xs flex gap-2 items-center text-[#858C95]">
                      {card.subtitle}
                      <FaAngleDown />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payments Breakdown */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-medium">Payments breakdown</h2>
            <div className="flex items-center gap-2 rounded-full border border-gray-300 p-2 w-fit">
              <button
                onClick={() => setSelectedCurrency(true)}
                className={`p-1 rounded transition-colors ${
                  selectedCurrency
                    ? "bg-[#116114] text-white"
                    : "hover:bg-gray-100"
                }`}
                title="Filter by USD"
              >
                <DollarSign className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedCurrency(false)}
                className={`p-1 rounded transition-colors ${
                  !selectedCurrency
                    ? "bg-[#116114] text-white"
                    : "hover:bg-gray-100"
                }`}
                title="Filter by USD"
              >
                <TbCurrencyNaira className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-md shadow overflow-hidden w-[350px] mx-auto md:w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Payment type</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Amount paid</TableHead>
                  <TableHead>Total price</TableHead>
                  <TableHead>Date paid</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      {search
                        ? "No payments found matching your search"
                        : "No payments found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">
                            {payment.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.customer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {payment.paymentType.toLowerCase()}
                      </TableCell>
                      <TableCell>{payment.property.name}</TableCell>
                      <TableCell className="font-medium text-green-600">
                        {payment?.currency}{" "}
                        {payment.amountPaid?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {payment?.currency}{" "}
                        {payment.purchase.price?.toLocaleString()}
                      </TableCell>
                      <TableCell>{formatDate(payment.paymentDate)}</TableCell>
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
                                src={icon}
                                alt="Action menu"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            </Button>
                          </DropdownMenu.Trigger>

                          <DropdownMenu.Content
                            sideOffset={4}
                            className="z-50 min-w-[120px] rounded-md border bg-white p-1 shadow-md"
                          >
                            <DropdownMenu.Item
                              className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => handleViewReceipt(payment)}
                            >
                              View receipt
                            </DropdownMenu.Item>

                            <DropdownMenu.Item
                              className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => handleViewDetails(payment)}
                            >
                              Payment details
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <PaymentModal
        open={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        payment={selectedPayment}
      />
      {showSummary && (
        <PaymentSummaryModal
          open={showSummary}
          onClose={() => setShowSummary(false)}
          payment={selectedPayment}
        />
      )}
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentsPageContent />
    </Suspense>
  );
}
