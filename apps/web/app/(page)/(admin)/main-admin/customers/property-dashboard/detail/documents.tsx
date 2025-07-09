"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";

const mockDocuments = [
  {
    name: "Sale & Purchase Agreement",
    issuedDate: "Jan 15, 2025",
    type: "PDF",
    size: "3MB",
  },
  {
    name: "Deed of purchase",
    issuedDate: "Jan 15, 2025",
    type: "PDF",
    size: "3MB",
  },
  {
    name: "Receipt of sale",
    issuedDate: "Jan 15, 2025",
    type: "PDF",
    size: "3MB",
  },
];

export default function PropertyDocuments() {
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
  const documents = mockDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading documents.
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
        <h2 className="text-xl font-semibold">Documents</h2>
        <Button variant="outline" className="text-[#181818]">
          Upload document ⬆️
        </Button>
      </div>
      <div className="bg-white rounded-xl p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-lg">View Documents</div>
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
          Documents of customer's properties.
        </div>
        <table className="w-full text-left mt-2">
          <thead>
            <tr className="bg-[#F5F5F5] text-[#181818] text-sm">
              <th className="py-3 px-4 font-semibold">Document Name</th>
              <th className="py-3 px-4 font-semibold">Issued Date</th>
              <th className="py-3 px-4 font-semibold">Type</th>
              <th className="py-3 px-4 font-semibold">Size</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? "bg-[#F5F5F5]" : ""}>
                <td className="py-3 px-4">{doc.name}</td>
                <td className="py-3 px-4">{doc.issuedDate}</td>
                <td className="py-3 px-4">{doc.type}</td>
                <td className="py-3 px-4">{doc.size}</td>
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
