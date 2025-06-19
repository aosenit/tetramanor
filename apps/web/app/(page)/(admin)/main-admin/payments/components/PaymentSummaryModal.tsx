"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, FileText } from "lucide-react";

export default function PaymentSummaryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const paymentItems = [
    { label: "Base Rent:", amount: "₦3,000,000" },
    { label: "Service Charge", amount: "₦300,000" },
    { label: "Caution fee", amount: "₦200,000" },
  ];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-left">
            Payment Summary:
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment breakdown */}
          <div className="space-y-4">
            {paymentItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">{item.label}</span>
                <span className="font-semibold">{item.amount}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-gray-700 font-medium">Total fee</span>
              <span className="font-bold text-lg">₦3,500,000</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-gray-700 font-medium">Attached receipt</span>
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <FileText className="w-4 h-4" />
              <span>Rent_March2025.pdf</span>
            </div>
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
