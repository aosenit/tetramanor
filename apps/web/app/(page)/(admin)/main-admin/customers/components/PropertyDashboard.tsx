"use client";

import { useState } from "react";
// import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
// import dp from "@/assets/admin/customer/dp.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import {
  Loader2,
  AlertCircle,
  Home,
  Building2,
  Users,
  CreditCard,
  Link,
} from "lucide-react";
import { Button } from "@chakra-ui/react";
import Image from "next/image";

interface Unit {
  id: string;
  userId: string;
  propertyId: string;
  unitTypeId: string;
  price: number;
  currency: string;
  unitCount: number;
  isRented: boolean;
  unitType: string;
  accountOfficer:
    | string
    | {
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: string;
        updatedAt: string;
      }
    | null;
  paymentStatus: string;
  images: {
    imageUrl: string;
  }[];
}

export default function PropertyDashboard() {
  const [tab, setTab] = useState("owned");
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");

  // Fetch units data
  const {
    data: unitsData,
    isLoading: unitsLoading,
    isError: unitsError,
  } = useFetchData(
    propertyId && userId
      ? `admin/purchases/property/${propertyId}/user/${userId}`
      : null
  );

  const units: Unit[] = unitsData?.data || [];

  // Filter units based on tab
  const rentedUnits = units.filter((unit) => unit.isRented);
  const ownedUnits = units.filter((unit) => !unit.isRented);
  const currentUnits = tab === "rented" ? rentedUnits : ownedUnits;

  // Loading state
  if (unitsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-gray-500">Admin</span>
            <span className="text-gray-400">/</span>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#116114]" />
              <p className="text-sm text-gray-600">Loading property units...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (unitsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-gray-500">Admin</span>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-[#116114] text-xl">
              {unitsData?.data?.property?.name}
            </span>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="text-sm text-gray-600">
                Failed to load property units
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#116114] text-white hover:bg-[#116114]/90"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (units.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-gray-500">Admin</span>
            <span className="text-gray-400">/</span>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Home className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                No units found for this property
              </p>
              <Link href="/main-admin/customers">
                <Button className="bg-[#116114] text-white hover:bg-[#116114]/90">
                  Back to customers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span
            className="text-gray-500 cursor-pointer"
            onClick={() => router.back()}
          >
            Properties
          </span>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-[#116114] text-xl">{name}</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Total Units
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {units.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Rented Units
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {rentedUnits.length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Owned Units
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {ownedUnits.length}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-fit grid-cols-2 mb-6">
            <TabsTrigger value="owned">Not Rented</TabsTrigger>
            <TabsTrigger value="rented">Rented</TabsTrigger>
          </TabsList>

          <TabsContent value={tab}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer">
              {/* Table Header */}
              <div className="grid grid-cols-8 gap-4 p-4 bg-[#F5F5F5] border-b text-sm font-medium text-gray-600">
                <div className="flex items-center">
                  <Checkbox className="mr-3" />
                </div>
                <div className="text-[#252525] text-xs font-medium">
                  Unit ID
                </div>
                <div className="text-[#252525] text-xs font-medium">Type</div>
                <div className="text-[#252525] text-xs font-medium">
                  Unit Count
                </div>
                <div className="text-[#252525] text-xs font-medium">Status</div>
                <div className="text-[#252525] text-xs font-medium">
                  Purchase Price
                </div>
                <div className="text-[#252525] text-xs font-medium">
                  Account Officer
                </div>
                <div className="text-[#252525] text-xs font-medium">
                  Payment status
                </div>
              </div>

              {/* Table Rows */}
              {currentUnits?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Home className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    No {tab === "rented" ? "rented" : "owned"} units found
                  </p>
                </div>
              ) : (
                currentUnits?.map((unit, index) => (
                  <div
                    key={unit?.id}
                    className="grid grid-cols-8 gap-4 p-4 border-b hover:bg-gray-50 items-center transition-colors"
                    onClick={() =>
                      router.push(
                        `/main-admin/customers/properties-details?unitId=${unit?.id}&userId=${userId}`
                      )
                    }
                  >
                    <div className="flex items-center">
                      <Checkbox className="mr-3" />
                      {unit?.images[0]?.imageUrl && (
                        <Image
                          src={unit?.images[0]?.imageUrl}
                          alt={`Unit ${unit.id}`}
                          width={28}
                          height={28}
                          className="rounded-sm object-cover"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">{unit?.id}</span>
                    </div>

                    <div className="text-gray-600 text-sm">
                      {unit?.unitType || "N/A"}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {unit?.unitCount}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {unit?.isRented ? "Rented" : "Owned"}
                    </div>

                    <div className="flex gap-2 items-center">
                      <div className="font-medium text-sm">
                        {unit?.currency} {unit?.price?.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* <Image
                        src={dp}
                        alt="Account Officer"
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      /> */}
                      <span className="text-sm text-gray-600">
                        {unit?.accountOfficer &&
                        typeof unit.accountOfficer === "object" &&
                        "name" in unit.accountOfficer
                          ? unit.accountOfficer.name
                          : typeof unit?.accountOfficer === "string"
                            ? unit.accountOfficer
                            : "N/A"}
                      </span>
                    </div>

                    <div>
                      <p className="text-[#2EBF43] text-sm">
                        {unit?.paymentStatus || "N/A"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
