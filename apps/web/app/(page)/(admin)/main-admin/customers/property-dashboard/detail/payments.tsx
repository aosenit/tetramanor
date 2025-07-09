"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";

const mockPayments = [
  {
    id: "PAY-01123",
    date: "Feb 20, 2025",
    amount: 600000,
    status: "Completed",
    balance: 8000000,
  },
  {
    id: "PAY-01123",
    date: "Feb 20, 2025",
    amount: 600000,
    status: "Completed",
    balance: 8000000,
  },
  {
    id: "PAY-01123",
    date: "Feb 20, 2025",
    amount: 600000,
    status: "Completed",
    balance: 8000000,
  },
  {
    id: "PAY-01123",
    date: "Feb 20, 2025",
    amount: 600000,
    status: "Completed",
    balance: 8000000,
  },
];

export default function PropertyPayments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const userId = searchParams.get("userId");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useFetchData(
    propertyId && userId
      ? `admin/purchases/property/${propertyId}/user/${userId}`
      : null
  );

  // Use mock data for now
  const payments = mockPayments.filter((p) =>
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  // Mock summary
  const totalPaid = 2000000;
  const totalOutstanding = 10000000;

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading payments.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-[#858C95] flex items-center gap-2">
        <span className="font-medium">Admin</span>
        <span>/</span>
        <span className="text-[#116114] font-semibold">TM meadows</span>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Payments history of unit 3a</h2>
        <Button variant="outline" className="text-[#181818]">
          Add payments
        </Button>
      </div>
      <div className="flex gap-8 mb-8">
        <div className="bg-white rounded-xl p-6 flex-1 flex flex-col items-center">
          <div className="text-[#858C95] text-sm mb-2">Total amount paid</div>
          <div className="text-2xl font-bold text-[#116114]">
            ₦ {totalPaid.toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 flex-1 flex flex-col items-center">
          <div className="text-[#858C95] text-sm mb-2">
            Total amount outstanding
          </div>
          <div className="text-2xl font-bold text-[#116114]">
            ₦ {totalOutstanding.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-lg">View payment History</div>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" className="text-[#858C95]">
              Filter ▼
            </Button>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-1 text-sm bg-[#f7f7f7]"
            />
          </div>
        </div>
        <div className="text-[#858C95] text-sm mb-2">
          Payment history of customer's properties.
        </div>
        <table className="w-full text-left mt-2">
          <thead>
            <tr className="bg-[#F5F5F5] text-[#181818] text-sm">
              <th className="py-3 px-4 font-semibold">Payment ID</th>
              <th className="py-3 px-4 font-semibold">Payment Date</th>
              <th className="py-3 px-4 font-semibold">Amount Paid</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Remaining balance</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? "bg-[#F5F5F5]" : ""}>
                <td className="py-3 px-4">{p.id}</td>
                <td className="py-3 px-4">{p.date}</td>
                <td className="py-3 px-4">₦{p.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{p.status}</td>
                <td className="py-3 px-4">{p.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-[#858C95]"
        >
          &lt; Back
        </Button>
      </div>
    </div>
  );
}
