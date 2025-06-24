import { Search, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import four from "@/assets/admin/home/four.webp";
import { CiLocationOn } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";

const properties = [
  {
    id: 1,
    name: "TM Meadows",
    units: 6,
    status: "Furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
  {
    id: 2,
    name: "Comfy burrows",
    units: 8,
    status: "Furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
  {
    id: 3,
    name: "TM high gardens",
    units: 9,
    status: "Furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
  {
    id: 4,
    name: "TM Meadows",
    units: 6,
    status: "Furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
  {
    id: 5,
    name: "TM Meadows",
    units: 6,
    status: "Furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
  {
    id: 6,
    name: "Comfy burrows",
    units: 8,
    status: "Not furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
  {
    id: 7,
    name: "Queen Mary",
    units: 12,
    status: "Furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
  {
    id: 8,
    name: "TM Meadows",
    units: 6,
    status: "Furnished",
    propertyStatus: "Ongoing",
    image: four,
  },
];

export default function PropertyManagement() {
  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Admin</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Property management
            </span>
          </div>
          <Link href="/main-admin/properties/add-properties">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New property
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search: Properties"
            className="pl-10 bg-[#E5E5E7] border-0"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-[#323539]"
            >
              All
            </Button>
            <Select>
              <SelectTrigger className="w-32 bg-white text-[]#323539]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sold out</SelectItem>
                <SelectItem value="furnished">Available</SelectItem>
                <SelectItem value="not-furnished">Ongoing</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-white text-[#323539]">
                <SelectValue placeholder="Property name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">TM HighGardens</SelectItem>
                <SelectItem value="tm-meadows">TM Meadows</SelectItem>
                <SelectItem value="comfy-burrows">Comfy Burrows</SelectItem>
                <SelectItem value="queen-mary">Queen Mary</SelectItem>
                <SelectItem value="kings-landing">Kings Landing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="link" className="text-[#858C95] text-sm p-0">
            Clear all
          </Button>
        </div>
      </div>
      <div className="pb-6">
        <h2 className=" font-medium text-[#116114] mb-4">All properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="relative bg-[#F4F4F4]">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-0 left-0 text-xs ${
                    property.status === "Furnished"
                      ? "bg-[#C5FDC7] text-[#323539]"
                      : "bg-[#E2E3F2] text-[#323539]"
                  }`}
                >
                  {property.status}
                </Badge>
              </div>
              <CardContent className="p-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm text-[#181818]">
                      {property.name}
                    </h3>
                    <span className="text-xs text-[#323539]">Status</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4C5560] font-medium">
                      {property.units} units
                    </span>
                    <span className="text-xs text-[#116114] font-medium">
                      {property.propertyStatus}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center text-[#323539] space-x-1">
                      <CiLocationOn />
                      <span className="text-[#323539]">Ebutte metta</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-[#323539]"
                    >
                      Edit
                      <FiEdit3 className="text-[#116114]" />
                    </Button>
                    <Link href={"/main-admin/properties/property-details"}>
                      <Button
                        size="sm"
                        className="bg-[#116114] text-s text-white"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
