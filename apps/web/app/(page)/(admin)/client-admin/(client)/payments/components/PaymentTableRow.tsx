"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Check, MoreHorizontal, Eye, FileText } from "lucide-react";
import Link from "next/link";
import { Payment } from "../types";
import { formatCurrency, formatDate } from "../utils";

interface PaymentTableRowProps {
  payment: Payment;
  onViewDetails: (payment: Payment) => void;
  onDownloadPDF: (paymentId: string) => void;
  isDownloading: boolean;
}

export function PaymentTableRow({
  payment,
  onViewDetails,
  onDownloadPDF,
  isDownloading,
}: PaymentTableRowProps) {
  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">{payment.paymentId}</TableCell>
      <TableCell>{payment.property.name}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <span>{formatDate(payment.paymentDate)}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium text-green-600">
        {formatCurrency(payment.amountPaid)}
      </TableCell>
      <TableCell>{payment.paymentMode || "Not specified"}</TableCell>
      <TableCell>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <Check className="mr-1 h-3 w-3" />
          {Number(payment.balanceRemaining) > 0 ? "Pending" : "Completed"}
        </Badge>
      </TableCell>
      <TableCell className="text-gray-600">
        {formatCurrency(payment.balanceRemaining)}
      </TableCell>
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
            <DropdownMenuItem onClick={() => onViewDetails(payment)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownloadPDF(payment.id)}>
              <FileText className="mr-2 h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download PDF"}
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
      </TableCell>
    </TableRow>
  );
}
