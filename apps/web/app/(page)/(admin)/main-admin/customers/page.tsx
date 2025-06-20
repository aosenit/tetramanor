"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import five from "@/assets/admin/home/five.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import three from "@/assets/admin/three.svg"
import Image from "next/image"
import two from "@/assets/admin/two.svg"
import one from "@/assets/admin/one.svg"
import { Input } from "@/components/ui/input"
import { Search, Plus} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useState } from "react"

const customers = [
  {
    id: 1,
    name: "Seun adebayo",
    email: "Seun@email.com",
    role: "Investor",
    kycStatus: "Verified",
    engagement: "#50m in queen mary",
  },
  {
    id: 2,
    name: "Grace Olabayo",
    email: "Grace@gmail.com",
    role: "Tenant",
    kycStatus: "Verified",
    engagement: "Lease Tm meadows 3BR",
  },
  {
    id: 3,
    name: "Isaac olawande",
    email: "Olawande@gmail.com",
    role: "Admin",
    kycStatus: "Verified",
    engagement: "Internal user",
  },
  {
    id: 4,
    name: "Tina madu",
    email: "Tinam@gmil.com",
    role: "Buyer",
    kycStatus: "Unverified",
    engagement: "Browsed 2 listings",
  },
  {
    id: 5,
    name: "Seun adebayo",
    email: "Seun@email.com",
    role: "Investor",
    kycStatus: "Verified",
    engagement: "#50m in queen mary",
  },
  {
    id: 6,
    name: "Grace Olabayo",
    email: "Grace@gmail.com",
    role: "Tenant",
    kycStatus: "Verified",
    engagement: "Lease Tm meadows 3BR",
  },
  {
    id: 7,
    name: "Tina madu",
    email: "Tinam@gmil.com",
    role: "Buyer",
    kycStatus: "Unverified",
    engagement: "Browsed 2 listings",
  },
  {
    id: 8,
    name: "Grace Olabayo",
    email: "Grace@gmail.com",
    role: "Tenant",
    kycStatus: "Verified",
    engagement: "Lease Tm meadows 3BR",
  },
]
const stats = [
  {
    title: "Total Customers",
    value: 300,
 icon:one,
  },
  {
    title: "Verified Customers",
    value: 250,
  icon:two,
  },
  {
    title: "Unverified customers",
    value: 50,
 icon:three,
  },
];


export default function CustomersPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Customer management
            </span>
          </div>
          <Link href="/main-admin/customers/add-customers">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New Customer
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
          <Button variant="outline" className="bg-white text-[#858C95]">
            All
          </Button>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="investor">Investor</SelectItem>
              <SelectItem value="tenant">Tenant</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="buyer">Buyer</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] bg-white text-[#858C95]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer ${
                activeIndex === index
                  ? "border border-[#116114]"
                  : "border-none"
              }`}
            >
              <CardContent className="p-6">
                <div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm font-medium text-[#323539]">
                      {stat.title}
                    </p>
                    <Image src={stat.icon} alt={stat.title} />
                  </div>
                  <p className="font-medium text-xl text-[#116114]">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Customers Table */}
        <div className="bg-white rounded-md shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Kyc status</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="text-[#181818]">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-[#181818]">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-[#181818]">
                    {customer.role}
                  </TableCell>
                  <TableCell className="text-[#116114] font-medium">
                    {customer.kycStatus}
                  </TableCell>
                  <TableCell className="text-[#181818]">
                    {customer.engagement}
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
                        <Link href="/main-admin/customers/view-profile">
                          <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                            View Profile
                          </DropdownMenu.Item>
                        </Link>
                        <Link href="/main-admin/customers/add-customers">
                          <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                            Edit Profile
                          </DropdownMenu.Item>
                        </Link>
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
  );
}
