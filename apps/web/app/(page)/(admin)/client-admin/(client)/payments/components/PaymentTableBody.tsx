"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "../types";
import { PaymentTableRow } from "./PaymentTableRow";

interface PaymentTableBodyProps {
  payments: Payment[];
  onViewDetails: (payment: Payment) => void;
  onDownloadPDF: (paymentId: string) => void;
  isDownloading: boolean;
}

export function PaymentTableBody({
  payments,
  onViewDetails,
  onDownloadPDF,
  isDownloading,
}: PaymentTableBodyProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference ID</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Amount Paid</TableHead>
            <TableHead>Payment Mode</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Remaining Balance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <PaymentTableRow
              key={payment.id}
              payment={payment}
              onViewDetails={onViewDetails}
              onDownloadPDF={onDownloadPDF}
              isDownloading={isDownloading}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
