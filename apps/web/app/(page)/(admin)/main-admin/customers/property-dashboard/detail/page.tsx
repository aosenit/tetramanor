"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

export default function PropertyDashboardDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("unitId");
  const userId = searchParams.get("userId");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchDoc, setSearchDoc] = useState("");
  const [searchPay, setSearchPay] = useState("");

  // Fetch property/unit data
  const { data, isLoading, error } = useFetchData(
    purchaseId && userId
      ? `admin/purchases/property-detail/${purchaseId}/user/${userId}`
      : null
  );

  // For demo, just use the first unit (could be extended to select specific unit)
  const unit = data?.data;
  const images = unit?.images || [];
  const maxImages = 6;
  const emptySlots = Math.max(0, maxImages - images.length);

  useEffect(() => {
    if (!purchaseId || !userId) {
      router.replace("/main-admin/customers");
    }
  }, [purchaseId, userId, router]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error || !unit) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading property details.
      </div>
    );
  }

  console.log(data);

  // Filtered docs/payments
  const documents = mockDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchDoc.toLowerCase())
  );
  const payments = mockPayments.filter((p) =>
    p.id.toLowerCase().includes(searchPay.toLowerCase())
  );
  const totalPaid = 2000000;
  const totalOutstanding = 10000000;

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-[#858C95] flex items-center gap-2">
        <span className="font-medium">Admin</span>
        <span>/</span>
        <span className="text-[#116114] font-semibold">
          {unit.propertyName || unit.name}
        </span>
      </div>

      {/* Tabs/Navigation */}
      <div className="flex gap-6 mb-8 border-b border-[#E5E5E7]">
        {[
          { key: "overview", label: "Overview" },
          { key: "gallery", label: "Gallery" },
          { key: "documents", label: "Documents" },
          { key: "payments", label: "Payments" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 font-medium border-b-2 transition-colors duration-150 ${
              activeTab === tab.key
                ? "border-[#116114] text-[#116114] bg-white"
                : "border-transparent text-[#181818] bg-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <>
          {/* Property Card */}
          <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row gap-8">
            {/* Main Image */}
            <div className="flex-1 min-w-[300px] max-w-[400px] flex flex-col gap-4">
              <Image
                src={unit.images?.[0]?.imageUrl || "/placeholder.png"}
                alt={unit.name}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
              <div className="flex gap-2">
                {unit.images
                  ?.slice(1, 3)
                  .map((img: any) => (
                    <Image
                      key={img.id}
                      src={img.imageUrl}
                      alt={unit.name}
                      width={120}
                      height={80}
                      className="rounded-md object-cover w-28 h-20"
                    />
                  ))}
              </div>
            </div>
            {/* Details */}
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-[#116114]">{unit.name}</h2>
              <div className="text-[#4C5560] text-sm mb-2">
                {unit.unitType?.replace(/_/g, " ")}
              </div>
              <div className="text-[#858C95] text-sm">
                Unit ID: {purchaseId}
              </div>
              <div className="text-[#858C95] text-sm">Floor: {unit.floor}</div>
              <div className="text-[#858C95] text-sm">
                Status: {unit.paymentStatus}
              </div>
              <div className="text-[#858C95] text-sm">
                Price: ₦{unit.price?.toLocaleString()}
              </div>
              <div className="text-[#858C95] text-sm">
                Account Officer: {unit.accountOfficer?.name || "N/A"}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow p-8 mt-8">
            <h3 className="text-lg font-semibold text-[#116114] mb-4">
              Unit features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Example features, replace with real data if available */}
              <div className="text-[#181818]">Swimming Pool</div>
              <div className="text-[#181818]">Garden</div>
              <div className="text-[#181818]">Parking</div>
              <div className="text-[#181818]">Fireplace</div>
              <div className="text-[#181818]">Study/Office</div>
              <div className="text-[#181818]">Security System</div>
              <div className="text-[#181818]">Wheelchair Access</div>
              <div className="text-[#181818]">Balcony</div>
              <div className="text-[#181818]">Air Conditioning</div>
              <div className="text-[#181818]">Elevator</div>
              <div className="text-[#181818]">Pets Allowed</div>
            </div>
          </div>
        </>
      )}

      {activeTab === "gallery" && (
        <div className="">
          <h2 className="text-xl font-semibold mb-6">
            Gallery - {unit.propertyName} - Unit {unit.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white p-8 rounded-xl">
            {images.map((img: any, idx: number) => (
              <div key={img.id} className="flex flex-col items-center gap-2">
                <Image
                  src={img.imageUrl}
                  alt={img.name || `Image ${idx + 1}`}
                  width={220}
                  height={160}
                  className="rounded-lg object-cover w-full h-40"
                />
                <div className="flex gap-4 mt-2">
                  <Button
                    variant="ghost"
                    className="text-[#116114] flex items-center gap-1"
                  >
                    Replace{" "}
                    <span role="img" aria-label="replace">
                      📤
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-500 flex items-center gap-1"
                  >
                    Remove{" "}
                    <span role="img" aria-label="remove">
                      🗑️
                    </span>
                  </Button>
                </div>
              </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E5E5E7] rounded-lg w-full h-40 bg-[#fafafa]"
              >
                <Button
                  variant="ghost"
                  className="text-[#858C95] flex flex-col items-center"
                >
                  <span className="text-2xl">⬆️</span>
                  Upload
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="">
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
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
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
        </div>
      )}

      {activeTab === "payments" && (
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Payments history of unit 3a
            </h2>
            <Button variant="outline" className="text-[#181818]">
              Add payments
            </Button>
          </div>
          <div className="flex gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 flex-1 flex flex-col items-center">
              <div className="text-[#858C95] text-sm mb-2">
                Total amount paid
              </div>
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
                  value={searchPay}
                  onChange={(e) => setSearchPay(e.target.value)}
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
        </div>
      )}

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
