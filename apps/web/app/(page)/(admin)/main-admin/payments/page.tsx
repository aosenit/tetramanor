"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HiArrowTurnDownLeft } from "react-icons/hi2";
import { TbCurrencyNaira } from "react-icons/tb";
import { Search, Download, DollarSign, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Image from "next/image"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import four from "@/assets/admin/customer/four.png"
import icon from "@/assets/admin/home/five.svg"
import five from "@/assets/admin/customer/five.svg"
import Link from "next/link"
import { FaAngleDown } from "react-icons/fa6";
import { PiArrowArcLeftThin } from "react-icons/pi";
import PaymentModal from "./components/RecieptModal";
import PaymentSummaryModal from "./components/PaymentSummaryModal";
const cards = [
  {
    id: 0,
    title: "Total amount paid",
    icon:<PiArrowArcLeftThin />,
    count:400000,
    subtitle: "April",
    image: four,
  },
  {
    id: 1,
    title: "Total amount outstanding",
    count: 150000,
    icon:<HiArrowTurnDownLeft />,
    subtitle: "April",
    image: five,
  },
];

const payments = [
  {
    id: 1,
    details: "Adebayo seun",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 21, 2025",
  },
  {
    id: 2,
    details: "Ajao Thomas",
    paymentType: "Investment",
    projectUnit: "TM meadows",
    amount: "₦3.5M",
    datePaid: "April 23 2025",
  },
  {
    id: 3,
    details: "Gloria Houve",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 20, 2025",
  },
  {
    id: 4,
    details: "Toby paul",
    paymentType: "Investment",
    projectUnit: "TM highGardens",
    amount: "₦50M",
    datePaid: "April 20, 2025",
  },
  {
    id: 5,
    details: "Adebayo seun",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 21, 2025",
  },
  {
    id: 6,
    details: "Ajao Thomas",
    paymentType: "Investment",
    projectUnit: "TM meadows",
    amount: "₦3.5M",
    datePaid: "April 23 2025",
  },
  {
    id: 7,
    details: "Gloria Houve",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 20, 2025",
  },
]

export default function PaymentsPage() {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

    const [activeCard, setActiveCard] = useState<number | null>(0);
  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Payment Overview
            </span>
          </div>
          <Link href="/main-admin/rentals/edit-rentals">
            <Button
              variant="outline"
              className="bg-white flex items-center gap-2 text-sm hover:bg-green-800"
            >
              <Plus className="" />
              Export CSV
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search  by name / payment reference/Project"
            className="pl-10 bg-[#E5E5E7] border-0"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="property">
          <TabsList>
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="rental">Rental</TabsTrigger>
          </TabsList>
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
                      ${card.count}
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
              <TbCurrencyNaira className="w-5 h-5 text-[#116114]" />
              <DollarSign className="w-5 h-5 text-[#116114]" />
            </div>
          </div>

          <div className="bg-white rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Details</TableHead>
                  <TableHead>Payment type</TableHead>
                  <TableHead>Project unit</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date paid</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.details}
                    </TableCell>
                    <TableCell>{payment.paymentType}</TableCell>
                    <TableCell>{payment.projectUnit}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.datePaid}</TableCell>
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
                            onClick={() => setShowReceiptModal(true)}
                          >
                            View receipt
                          </DropdownMenu.Item>

                          <DropdownMenu.Item
                            className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => setShowSummary(true)}
                          >
                            Payment details
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <PaymentModal
        open={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
      />
      {showSummary && (
       <PaymentSummaryModal open={showSummary} onClose={() => setShowSummary(false)} />
      )}
    </div>
  );
}
