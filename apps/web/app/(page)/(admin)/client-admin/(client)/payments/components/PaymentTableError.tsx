"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface PaymentTableErrorProps {
  error: string;
  onRetry: () => void;
}

export function PaymentTableError({ error, onRetry }: PaymentTableErrorProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-red-400 mb-4">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        Failed to load payments
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {error ||
          "Something went wrong while loading your payments. Please try again."}
      </p>
      <Button onClick={onRetry} variant="outline">
        Try again
      </Button>
    </div>
  );
}
