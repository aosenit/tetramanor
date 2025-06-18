"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import five from "@/assets/admin/home/five.svg"
import { Input } from "@/components/ui/input"
import { Search, Plus, Building2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import Image from "next/image"
import one from "@/assets/admin/customer/one.svg"
import two from "@/assets/admin/customer/two.svg"
import three from "@/assets/admin/customer/three.svg"
import { useState } from "react"

const rentalProperties = [
  {
    id: 1,
    name: "TM meadows",
    type: "3BR + BQ",
    location: "Ebute metta",
    rent: "₦3.5m/Year",
    status: "Not rented",
  },
  {
    id: 2,
    name: "Queen mary",
    type: "2BR",
    location: "Maryland",
    rent: "₦2M/year",
    status: "Not rented",
  },
  {
    id: 3,
    name: "Comfy burrows",
    type: "Studio apartment",
    location: "Akoka yaba",
    rent: "₦140,500/Mth",
    status: "Rented",
  },
  {
    id: 4,
    name: "TM meadows",
    type: "3BR + BQ",
    location: "Ebute metta",
    rent: "₦3.5m/Year",
    status: "Not rented",
  },
  {
    id: 5,
    name: "Queen mary",
    type: "2BR",
    location: "Maryland",
    rent: "₦2M/year",
    status: "Not rented",
  },
  {
    id: 6,
    name: "Comfy burrows",
    type: "Studio apartment",
    location: "Akoka yaba",
    rent: "₦140,500/Mth",
    status: "Rented",
  },
]

export default function RentalsPage() {
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const cards = [
    {
      id: 0,
      title: "Total properties for rent",
      count: 150,
      subtitle: "For rent",
      image: one,
    },
    {
      id: 1,
      title: "Rented properties",
      count: 100,
      subtitle: "properties rented",
      image: three,
    },
    {
      id: 2,
      title: "Not rented properties",
      count: 100,
      subtitle: "Available for rent",
      image: two,
    },
  ];
  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Rental Overview
            </span>
          </div>
          <Link href="/main-admin/rentals/edit-rentals">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New rental
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search  by name / email / ID "
            className="pl-10 bg-[#E5E5E7] border-0"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="bg-white text-[#858C95] font-medium"
          >
            All
          </Button>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95] font-medium">
              <SelectValue placeholder="Property name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tm-meadows">TM Meadows</SelectItem>
              <SelectItem value="tm-high-gardens">TM High gardens</SelectItem>
              <SelectItem value="queen-mary">Queen Mary</SelectItem>
              <SelectItem value="kings-landing">Kings Landing</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95] font-medium">
              <SelectValue placeholder="Apartment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3br">3BR + BQ</SelectItem>
              <SelectItem value="bungalow">Bungalow</SelectItem>
              <SelectItem value="duplex">Duplex</SelectItem>
              <SelectItem value="bq">BQ</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95] font-medium">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="not-rented">Not rented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} onClick={() => setActiveCard(card.id)}>
              <CardContent
                className={`p-6 rounded-md cursor-pointer ${
                  activeCard === card.id
                    ? "border border-[#116114]"
                    : "border border-transparent"
                }`}
              >
                <div className="space-y-2">
                  {/* Top Section with border-bottom */}
                  <div className="flex items-center gap-2 border-b border-[#E5E5E7] pb-2">
                    <Image src={card.image} alt="logo" className="h-10 w-10" />
                    <p className="text-[#323539] font-medium">{card.title}</p>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center gap-4 pt-2">
                    <h3 className="text-2xl ml-1 font-semibold text-[#116114]">
                      {card.count}
                    </h3>
                    <p className="text-xs text-[#858C95]">{card.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Properties Table */}
        <div>
          <h2 className=" text-[#116114] font-medium mb-4">Properties</h2>
          <div className="bg-white rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="!bg-[#EAEBF0] hover:!bg-[#EAEBF0]">
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Property Name
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Apartment type
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Location
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Rent
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Status
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="text-[#181818] text-xs">
                      {property.name}
                    </TableCell>
                    <TableCell className="text-[#181818] text-xs">
                      {property.type}
                    </TableCell>
                    <TableCell className="text-[#181818] text-xs">
                      {property.location}
                    </TableCell>
                    <TableCell className="text-[#181818] text-xs">
                      {property.rent}
                    </TableCell>

                    <TableCell
                      className={`text-xs font-medium ${
                        property.status === "Rented"
                          ? "text-[#858C95]"
                          : "text-[#116114]"
                      }`}
                    >
                      {property.status}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <Image
                              src={five}
                              alt="Action menu"
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                          </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content
                          sideOffset={4}
                          className="z-50 min-w-[120px] rounded-md border bg-white p-1 shadow-md"
                        >
                          <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                            Edit
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer">
                            Delete
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                            View details
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
