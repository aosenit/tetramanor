"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  Building2,
  TrendingUp,
  CreditCard,
  Key,
  Filter,
  Search,
  MoreHorizontal,
  Download,
} from "lucide-react";

export default function PropertyDashboard() {
  const [activeTab, setActiveTab] = useState("rented");
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("All");

  const summaryData = {
    totalUnitsOwned: "09",
    totalPropertyValue: "₦155,000,000",
    outstandingBalance: "₦20,000,000",
    unitsRented: "05",
  };

  const rentedProperties = [
    {
      id: "1A",
      name: "Unit 1A",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Apartment",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1B",
      name: "Unit 1B",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Penthouse",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1C",
      name: "Unit 1C",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Apartment",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1D",
      name: "Unit 1D",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Apartment",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1M",
      name: "Unit 1M",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Apartment",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1L",
      name: "Unit 1L",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Apartment",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1S",
      name: "Unit 1S",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Apartment",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1R",
      name: "Unit 1R",
      image: "/placeholder.svg?height=60&width=60",
      location: "Lekki Phase 1",
      type: "Apartment",
      leaseStatus: "Active",
      rentPrice: "₦3.5M",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
  ];

  const ownedProperties = [
    {
      id: "1A",
      name: "Unit 1A",
      image: "/placeholder.svg?height=60&width=60",
      type: "Apartment",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1B",
      name: "Unit 1B",
      image: "/placeholder.svg?height=60&width=60",
      type: "Penthouse",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1C",
      name: "Unit 1C",
      image: "/placeholder.svg?height=60&width=60",
      type: "Apartment",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1D",
      name: "Unit 1D",
      image: "/placeholder.svg?height=60&width=60",
      type: "Penthouse",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1E",
      name: "Unit 1E",
      image: "/placeholder.svg?height=60&width=60",
      type: "Apartment",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1F",
      name: "Unit 1F",
      image: "/placeholder.svg?height=60&width=60",
      type: "Apartment",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1G",
      name: "Unit 1G",
      image: "/placeholder.svg?height=60&width=60",
      type: "Apartment",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1H",
      name: "Unit 1H",
      image: "/placeholder.svg?height=60&width=60",
      type: "Apartment",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
    {
      id: "1K",
      name: "Unit 1K",
      image: "/placeholder.svg?height=60&width=60",
      type: "Apartment",
      bedrooms: 3,
      floor: "1st",
      purchasePrice: "₦3.5M",
      originalPrice: "₦6,500",
      accountOfficer: "John D. Patkins",
      paymentStatus: "Paid",
    },
  ];

  const galleryImages = [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ];

  const SummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Units Owned</p>
              <p className="text-2xl font-bold">
                {summaryData.totalUnitsOwned}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Property Value</p>
              <p className="text-2xl font-bold">
                {summaryData.totalPropertyValue}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Outstanding Balance</p>
              <p className="text-2xl font-bold">
                {summaryData.outstandingBalance}
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Units Rented</p>
              <p className="text-2xl font-bold">{summaryData.unitsRented}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Key className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PropertyTable = ({
    properties,
    type,
  }: {
    properties: any[];
    type: "rented" | "owned";
  }) => (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Property
              </th>
              {type === "rented" ? (
                <>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Location
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Type
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Lease status
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Rent Price
                  </th>
                </>
              ) : (
                <>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Type
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Bedrooms
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Floor
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Purchase Price
                  </th>
                </>
              )}
              <th className="text-left p-4 font-medium text-gray-600">
                Account Officer
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Payment status
              </th>
              <th className="text-left p-4 font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={property.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">{property.name}</span>
                  </div>
                </td>
                {type === "rented" ? (
                  <>
                    <td className="p-4 text-gray-600">{property.location}</td>
                    <td className="p-4 text-gray-600">{property.type}</td>
                    <td className="p-4">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        {property.leaseStatus}
                      </Badge>
                    </td>
                    <td className="p-4 font-medium">{property.rentPrice}</td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-gray-600">{property.type}</td>
                    <td className="p-4 text-gray-600">{property.bedrooms}</td>
                    <td className="p-4 text-gray-600">{property.floor}</td>
                    <td className="p-4">
                      <div>
                        <span className="font-medium">
                          {property.purchasePrice}
                        </span>
                        <span className="text-gray-500 ml-1">
                          ({property.originalPrice})
                        </span>
                      </div>
                    </td>
                  </>
                )}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">
                      {property.accountOfficer}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    {property.paymentStatus}
                  </Badge>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const GalleryView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Gallery</h2>
          <p className="text-gray-600">
            Visual records of your property's progress and features
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        {["All", "Photos", "Videos"].map((filter) => (
          <Button
            key={filter}
            variant={activeGalleryFilter === filter ? "default" : "ghost"}
            onClick={() => setActiveGalleryFilter(filter)}
            className="text-sm"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="aspect-video rounded-lg overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">Queen Mary</h1>
        </div>

        {activeTab !== "gallery" && <SummaryCards />}

        {/* Navigation Tabs */}
        {activeTab !== "gallery" && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("owned")}
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "owned"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Owned
              </button>
              <button
                onClick={() => setActiveTab("rented")}
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === "rented"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Rented
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation for Gallery */}
        {activeTab === "gallery" && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("owned")}
                className="pb-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium"
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("owned")}
                className="pb-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium"
              >
                Payment History
              </button>
              <button
                onClick={() => setActiveTab("owned")}
                className="pb-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium"
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium"
              >
                Gallery
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === "gallery" ? (
          <GalleryView />
        ) : (
          <PropertyTable
            properties={
              activeTab === "rented" ? rentedProperties : ownedProperties
            }
            type={activeTab as "rented" | "owned"}
          />
        )}

        {/* Quick Navigation Buttons */}
        <div className="fixed bottom-6 right-6 flex gap-2">
          <Button
            onClick={() => setActiveTab("owned")}
            variant={activeTab === "owned" ? "default" : "outline"}
            size="sm"
          >
            Owned
          </Button>
          <Button
            onClick={() => setActiveTab("rented")}
            variant={activeTab === "rented" ? "default" : "outline"}
            size="sm"
          >
            Rented
          </Button>
          <Button
            onClick={() => setActiveTab("gallery")}
            variant={activeTab === "gallery" ? "default" : "outline"}
            size="sm"
          >
            Gallery
          </Button>
        </div>
      </div>
    </div>
  );
}
