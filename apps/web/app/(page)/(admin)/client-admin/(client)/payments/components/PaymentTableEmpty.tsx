"use client";

import { AlertCircle, CreditCard } from "lucide-react";

interface PaymentTableEmptyProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export function PaymentTableEmpty({
  searchQuery,
  onClearSearch,
}: PaymentTableEmptyProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
        <CreditCard className="h-12 w-12" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        {searchQuery ? "No payments found" : "No payments yet"}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {searchQuery
          ? `No payments match your search for "${searchQuery}". Try adjusting your search terms.`
          : "You haven't made any payments yet. Payments will appear here once you start making them."}
      </p>
      {searchQuery && (
        <button
          onClick={onClearSearch}
          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
