"use client";
import { Button } from "@/components/ui/button"
import five from "@/assets/admin/home/five.svg";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import InvestmentModal from "./add-investment/components/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";


const investments = [
  {
    id: 1,
    projectName: "Queen mary",
    investmentType: "Fixed ROI",
    estRoi: "18%",
    minAmount: "₦10M",
    duration: "12 months",
    status: "Published",
  },
  {
    id: 2,
    projectName: "TM highgardens",
    investmentType: "Equity share",
    estRoi: "60%",
    minAmount: "₦10M",
    duration: "Flexible Exit",
    status: "Published",
  },
  {
    id: 3,
    projectName: "TM meadows",
    investmentType: "Fixed ROI",
    estRoi: "20%",
    minAmount: "₦10M",
    duration: "8 months",
    status: "Published",
  },
  {
    id: 4,
    projectName: "Kings landing",
    investmentType: "Fixed ROI",
    estRoi: "22%",
    minAmount: "₦15M",
    duration: "10 months",
    status: "Unpublished",
  },
  {
    id: 5,
    projectName: "Kings landing",
    investmentType: "Fixed ROI",
    estRoi: "22%",
    minAmount: "₦15M",
    duration: "10 months",
    status: "Unpublished",
  },
  {
    id: 6,
    projectName: "TM highgardens",
    investmentType: "Equity share",
    estRoi: "60%",
    minAmount: "₦10M",
    duration: "Flexible Exit",
    status: "Published",
  },
  {
    id: 7,
    projectName: "Queen mary",
    investmentType: "Fixed ROI",
    estRoi: "18%",
    minAmount: "₦10M",
    duration: "12 months",
    status: "Published",
  },
  {
    id: 8,
    projectName: "TM highgardens",
    investmentType: "Equity share",
    estRoi: "60%",
    minAmount: "₦10M",
    duration: "Flexible Exit",
    status: "Published",
  },
  {
    id: 9,
    projectName: "TM meadows",
    investmentType: "Fixed ROI",
    estRoi: "20%",
    minAmount: "₦10M",
    duration: "8 months",
    status: "Published",
  },
]

export default function InvestmentsPage() {
  
const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1  text-[#858C95]">
              <span>Admin</span>
              <span className="text-xl text-[#858C95]">/</span>
              <span className="font-medium text-xl text-[#116114]">
                Investment
              </span>
            </div>
            <p className="text-[#454D56] text-sm mt-1">
              Manage all investment opportunities{" "}
            </p>
          </div>
          <Link href="/main-admin/investments/add-investment">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New investment
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search investments"
            className="pl-10 bg-[#E5E5E7] border-0"
          />
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="bg-white text-[#858C95]">
            All
          </Button>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Investment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed-roi">Fixed ROI</SelectItem>
              <SelectItem value="equity-share">Equity share</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="ROI range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-20">0-20%</SelectItem>
              <SelectItem value="21-40">21-40%</SelectItem>
              <SelectItem value="41-60">41-60%</SelectItem>
              <SelectItem value="61-100">61-100%</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This month</SelectItem>
              <SelectItem value="last-month">Last month</SelectItem>
              <SelectItem value="this-year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Investments Table */}
        <div>
          <h2 className="text-[#116114] font-medium mb-4">
            Investments opportunities overview
          </h2>
          <div className="bg-white  overflow-hidden">
            <Table>
              <TableHeader className="border bg-[#E5E5E7] border-[#E5E5E7]">
                <TableRow>
                  <TableHead className="text-[#181818] text-sm">
                    Project Name
                  </TableHead>
                  <TableHead className="text-[#181818] text-sm">
                    Investment Type
                  </TableHead>
                  <TableHead className="text-[#181818] text-sm">
                    Est ROI
                  </TableHead>
                  <TableHead className="text-[#181818] text-sm">
                    Min amount
                  </TableHead>
                  <TableHead className="text-[#181818] text-sm">
                    Duration
                  </TableHead>
                  <TableHead className="text-[#181818] text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-[#181818] text-sm">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {investments.map((investment) => {
                  const isUnpublished =
                    investment.status.toLowerCase() === "unpublished";
                  const isPublished =
                    investment.status.toLowerCase() === "published";

                  const cellTextColor = isUnpublished ? "#858C95" : "#292D32";
                  const statusColor = isPublished ? "#116114" : "#858C95";

                  return (
                    <TableRow key={investment.id}>
                      <TableCell
                        className="font-medium"
                        style={{ color: cellTextColor }}
                      >
                        {investment.projectName}
                      </TableCell>
                      <TableCell style={{ color: cellTextColor }}>
                        {investment.investmentType}
                      </TableCell>
                      <TableCell style={{ color: cellTextColor }}>
                        {investment.estRoi}
                      </TableCell>
                      <TableCell style={{ color: cellTextColor }}>
                        {investment.minAmount}
                      </TableCell>
                      <TableCell style={{ color: cellTextColor }}>
                        {investment.duration}
                      </TableCell>
                      <TableCell style={{ color: statusColor }}>
                        {investment.status}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Image
                                src={five}
                                alt="action"
                                className="h-6 w-6 object-contain"
                              />
                            </Button>
                          </DropdownMenu.Trigger>

                          <DropdownMenu.Content
                            side="bottom"
                            align="end"
                            className="min-w-[150px] bg-white border rounded-md shadow-md p-1 z-50"
                          >
                            <DropdownMenu.Item
                              className="px-3 py-2 hover:bg-gray-100 text-sm text-[#292D32] cursor-pointer"
                              onSelect={() =>
                                router.push(
                                  "/main-admin/investments/add-investment"
                                )
                              }
                            >
                              Edit
                            </DropdownMenu.Item>
                            <>
                              <DropdownMenu.Item
                                onSelect={() => setIsModalOpen(true)}
                                className="px-3 py-2 hover:bg-gray-100 text-sm text-[#292D32] cursor-pointer"
                              >
                                View
                              </DropdownMenu.Item>
                            </>
                            <DropdownMenu.Item
                              className="px-3 py-2 hover:bg-gray-100 text-sm text-[#292D32] cursor-pointer"
                              onSelect={() => console.log("Unpublish")}
                            >
                              Unpublish
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="px-3 py-2 hover:bg-gray-100 text-sm text-red-600 cursor-pointer"
                              onSelect={() => console.log("Delete")}
                            >
                              Delete
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <InvestmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
