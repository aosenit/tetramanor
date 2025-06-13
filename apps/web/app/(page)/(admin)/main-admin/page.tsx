import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import three from "@/assets/admin/home/three.webp";
import one from "@/assets/admin/dashboard/one.webp";
import two from "@/assets/admin/dashboard/two.webp";
import four from "@/assets/admin/dashboard/four.webp";
import PropertyStatisticsChart from "@/components/Chart";
import PropertyActivity from "@/components/notifications";
import {
  IoMdArrowRoundForward,
  IoMdNotificationsOutline,
} from "react-icons/io";

const properties = [
  {
    name: "TM HighGardens",
    location: "Eko Atlantic",
    status: "Ongoing",
    statusColor: "text-green-600",
    dateAdded: "March 21 2025",
  },
  {
    name: "Queen Mary",
    location: "Maryland",
    status: "Sold out",
    statusColor: "text-red-600",
    dateAdded: "April 19 2025",
  },
  {
    name: "TM HighGardens",
    location: "Eko Atlantic",
    status: "Ongoing",
    statusColor: "text-green-600",
    dateAdded: "March 21 2025",
  },
];
const investments = [
  {
    type: "Fixed ROI",
    projects: "4 projects",
    roi: "60%",
    status: "Active",
    statusColor: "text-green-600",
  },
  {
    type: "Equity share",
    projects: "2 projects",
    roi: "60%",
    status: "Pending",
    statusColor: "text-yellow-600",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="text-lg md:text-xl  font-medium text-[#858C95]">
        Admin /{" "}
        <span className="text-[#116114] text-lg md:text-xl font-medium">
          Dashboard
        </span>
      </div>
      <div className="bg-white p-1"></div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] h-4 w-4" />
        <Input
          placeholder="Search properties, users and transactions"
          className="pl-10 max-w-full bg-[#E5E5E7] rounded-lg py-6"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="h-12 text-sm text-[#858C95] rounded-lg w-fit justify-start"
        >
          Add new property
          <IoMdArrowRoundForward className="h-4 w-4  mr-2" />
        </Button>
        <Button
          variant="outline"
          className="h-12 w-fit text-sm text-[#858C95] rounded-lg justify-start"
        >
          Add new investment
          <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
        </Button>
        <Button
          variant="outline"
          className="h-12 w-fit text-sm text-[#858C95] rounded-lg justify-start"
        >
          Add new rental
          <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
        </Button>
        <Button
          variant="outline"
          className="h-12 text-sm w-fit text-[#858C95] rounded-lg justify-start"
        >
          Add new blog post
          <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ">
        <Card className="w-full max-w-sm ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-[#4C5560] font-medium">
              Total properties listed
            </CardTitle>
            <Image src={three} alt="property" width={35} height={35} />
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-xl text-[#116114] font-bold">400</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-[#116114] font-medium text-sm">(150</span>{" "}
              for rent{" "}
              <span className="text-[#116114] font-medium text-sm ml-5">
                250
              </span>{" "}
              for sale{" "}
              <span className="text-[#116114] font-medium text-sm">)</span>
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-[#4C5560] font-medium">
              Total investments
            </CardTitle>
            <Image src={one} alt="property" width={35} height={35} />
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-xl text-[#116114] font-bold">45</div>
            <p className="text-xs text-[#4C5560] text-muted-foreground">
              3 live campaigns
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-[#4C5560] font-medium">
              Total customers
            </CardTitle>
            <Image src={two} alt="property" width={35} height={35} />
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-xl text-[#116114] font-bold">400</div>
            <p className="text-xs text-muted-foreground">
              Tetramanor customers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
          <div className="flex items-center gap-2">
            <p className=" font-medium text-[#181818]">Properties overview</p>
            <Image src={three} alt="property" width={35} height={35} />
          </div>
          <div className="flex border rounded-lg overflow-hidden">
            <button className="px-4 py-2 text-sm font-semibold bg-white text-[#858C95] border-r">
              All
            </button>
            <button className="px-4 py-2 font-semibold text-sm bg-[#F8F9FB] text-[#323539] border-r">
              Recent
            </button>
            <button className="px-3 py-2 text-sm bg-white text-[#858C95]">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 bg-[#e5e5e7]  p-4 text-sm font-medium text-[#116114]">
            <p>Property</p>
            <p>Location</p>
            <p>Status</p>
            <p>Date Added</p>
          </div>
          {properties.map((property, index) => (
            <div
              key={index}
              className="grid grid-cols-4 text-[#181818] gap-4 p-4 border-t text-xs"
            >
              <p className="font-medium">{property.name}</p>
              <p>{property.location}</p>
              <p className={property.statusColor}>{property.status}</p>
              <p>{property.dateAdded}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className=" w-full flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <p className=" font-medium text-[#181818]">Recent Investments</p>
              <Image src={one} alt="property" width={35} height={35} />
            </div>
            <div className="flex rounded-lg overflow-hidden">
              <button className="px-4 py-2 text-sm font-semibold bg-white text-[#858C95] border-r">
                All
              </button>
              <button className="px-4 py-2 font-semibold text-sm bg-[#F8F9FB] text-[#323539] border-r">
                Recent
              </button>
              <button className="px-3 py-2 text-sm bg-white text-[#858C95]">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="w-full border rounded-lg  bg-white ">
            <div className="grid grid-cols-4 bg-[#e5e5e7]  p-4 text-sm font-medium text-[#116114]">
              <p>Investment type</p>
              <p>No of Project</p>
              <p>Average ROI</p>
              <p>Status</p>
            </div>
            {investments.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 text-[#181818] gap-4 p-4 border-t text-xs"
              >
                <p className="text-xs">{item.type}</p>
                <p className="text-xs">{item.projects}</p>
                <p className="text-xs">{item.roi}</p>
                <p className={item.statusColor}>{item.status}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-medium text-[#181818]">Notifications</h2>
                <div className="bg-blue-500 rounded-md p-1 inline-flex items-center justify-center">
                  <IoMdNotificationsOutline className="text-white text-2xl" />
                </div>
              </div>
              <div className="flex rounded-lg overflow-hidden">
                <button className="px-4 py-2 text-sm font-semibold bg-white text-[#858C95] border-r">
                  All
                </button>
                <button className="px-4 py-2 font-semibold text-sm bg-[#F8F9FB] text-[#323539] border-r">
                  Recent
                </button>
              </div>
            </div>
            <PropertyActivity />
          </div>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={four} alt="property" width={35} height={35} />
                <CardTitle className="text-[#181818] text-base">
                  Inventory breakdown
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <PropertyStatisticsChart
                total={400}
                forSale={60}
                forRent={30}
                rentedOut={10}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
