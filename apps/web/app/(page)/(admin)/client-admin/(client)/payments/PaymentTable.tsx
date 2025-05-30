"use client";

import { useState } from "react";
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
import { Check, Download, Filter, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";

type Payment = {
  id: string;
  referenceId: string;
  property: string;
  date: string;
  amountPaid: string;
  paymentMode: string;
  status: "Completed" | "Pending" | "Failed";
  remainingBalance: string;
};

export function PaymentsTable() {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for the payments table
  const payments: Payment[] = [
    {
      id: "1",
      referenceId: "TTV-123-CMB",
      property: "TM HighGardens",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "2",
      referenceId: "TTV-123-CMB",
      property: "TM Meadows",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "3",
      referenceId: "TTV-123-CMB",
      property: "TM HighGardens",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "4",
      referenceId: "TTV-123-CMB",
      property: "TM HighGardens",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "5",
      referenceId: "TTV-123-CMB",
      property: "Comfy Burrows",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "6",
      referenceId: "TTV-123-CMB",
      property: "TM HighGardens",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "7",
      referenceId: "TTV-123-CMB",
      property: "King's Landing",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "8",
      referenceId: "TTV-123-CMB",
      property: "TM HighGardens",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "9",
      referenceId: "TTV-123-CMB",
      property: "Queen Mary",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
    {
      id: "10",
      referenceId: "TTV-123-CMB",
      property: "TM HighGardens",
      date: "Jan 15, 2025",
      amountPaid: "₦300,000",
      paymentMode: "Bank Transfer",
      status: "Completed",
      remainingBalance: "₦4,700,000",
    },
  ];

  const filteredPayments = payments.filter((payment) =>
    payment.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <DropdownMenuItem>By Status</DropdownMenuItem>
              <DropdownMenuItem>By Property</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="gap-1">
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
                <TableHead className="font-medium">Remaining Balance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.referenceId}
                  </TableCell>
                  <TableCell>{payment.property}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amountPaid}</TableCell>
                  <TableCell>{payment.paymentMode}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <Check className="mr-1 h-3 w-3" />
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.remainingBalance}</TableCell>
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
                        <DropdownMenuItem>
                          <Link
                            href={`/client-admin/payments/receipts/${payment.referenceId}`}
                            className="w-full"
                          >
                            View Receipt
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem>Payment Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
