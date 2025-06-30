"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  FileText,
  User,
  Building,
  Calendar,
  CreditCard,
} from "lucide-react";

interface Payment {
  paymentDate: string;
  amountPaid: number;
  paymentType: string;
  paymentMode: string | null;
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

export default function PaymentSummaryModal({
  open,
  onClose,
  payment,
}: {
  open: boolean;
  onClose: () => void;
  payment?: Payment | null;
}) {
  if (!payment) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const outstandingBalance = payment.purchase.price - payment.amountPaid;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-left">
            Payment Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Information */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span className="font-medium">Customer Details</span>
            </div>
            <div className="space-y-1">
              <p className="font-medium">{payment.customer.name}</p>
              <p className="text-sm text-gray-600">{payment.customer.email}</p>
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="w-4 h-4" />
              <span className="font-medium">Property Details</span>
            </div>
            <div className="space-y-1">
              <p className="font-medium">{payment.property.name}</p>
              <p className="text-sm text-gray-600 capitalize">
                {payment.paymentType.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="w-4 h-4" />
              <span className="font-medium">Payment Details</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Property Price:</span>
                <span className="font-medium">
                  {formatCurrency(payment.purchase.price)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Amount Paid:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(payment.amountPaid)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Outstanding:</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(outstandingBalance)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Mode:</span>
                <span className="font-medium">
                  {payment.paymentMode || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Payment Date</span>
            </div>
            <p className="font-medium">{formatDate(payment.paymentDate)}</p>
          </div>

          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0 h-auto font-normal"
            onClick={onClose}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
