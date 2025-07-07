"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";

interface PaymentTableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onExportCSV: () => void;
  paymentsCount: number;
  isLoading: boolean;
}

export function PaymentTableHeader({
  searchQuery,
  onSearchChange,
  onExportCSV,
  paymentsCount,
  isLoading,
}: PaymentTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-500">
          View detailed records of payments made across your properties.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by property or payment ID..."
            className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="gap-1"
          onClick={onExportCSV}
          disabled={paymentsCount === 0 || isLoading}
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
