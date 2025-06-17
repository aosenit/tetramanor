"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, Plus } from "lucide-react";
import Image from "next/image";
import five from "@/assets/admin/home/five.svg";
import { Input } from "@chakra-ui/react";
import { Label } from "@radix-ui/react-label";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

const officers = [
  {
    id: 1,
    name: "Femi Adewale",
    email: "femi@tmgroup.com",
    phone: "08012346578",
    assignedProperties: 4,
    image: five,
  },
  {
    id: 2,
    name: "Femi Adewale",
    email: "femi@tmgroup.com",
    phone: "08012346578",
    assignedProperties: 4,
    image: five,
  },
  {
    id: 3,
    name: "Femi Adewale",
    email: "femi@tmgroup.com",
    phone: "08012346578",
    assignedProperties: 4,
    image: five,
  },
  {
    id: 4,
    name: "Femi Adewale",
    email: "femi@tmgroup.com",
    phone: "08012346578",
    assignedProperties: 4,
    image: five,
  },
];

export default function AccountOfficer() {
    const [activeTab, setActiveTab] = useState("contact");
    const router = useRouter();

    const handleClick = (tab) => {
      setActiveTab(tab);
      if (tab === "contact") {
        router.push("/main-admin/contact-inquiries");
      }
    };
  const [showAddAgent, setShowAddAgent] = useState(false);

  if (showAddAgent) {
    return <AddAgent onBack={() => setShowAddAgent(false)} />;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <span>Admin</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Contact Page
            </span>
          </div>
          <Button
            onClick={() => setShowAddAgent(true)}
            className="bg-[#F5F5F5] hover:bg-[#F5F5F5]  text-[#4C5560] text-sm "
          >
            Add agent
          </Button>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="grid w-fit text-sm grid-cols-2 gap-2">
            <p
              onClick={() => handleClick("contact")}
              className={`px-6 py-2 rounded text-center text-[#4C5560] cursor-pointer font-medium ${
                activeTab === "contact" ? "bg-white" : ""
              }`}
            >
              Contact
            </p>
            <p
              onClick={() => handleClick("account-officers")}
              className={`px-6 py-2 rounded text-center text-[#4C5560] cursor-pointer font-medium ${
                activeTab === "account-officers" ? "bg-white" : ""
              }`}
            >
              Account officers
            </p>
          </div>
        </div>

        <div className="mt-6 rounded bg-white p-6 ">
          <table className="w-full text-left">
            <thead className="bg-[#F5F5F5] text-xs text-[#2E2E2E]">
              <tr className="">
                <th className="px-4 py-4 font-medium text-muted-foreground">
                  Officers name
                </th>
                <th className="px-4 py-4 font-medium text-muted-foreground">
                  Email
                </th>
                <th className="px-4 py-4 font-medium text-muted-foreground">
                  Phone number
                </th>
                <th className="px-4 py-4 font-medium text-muted-foreground">
                  Assigned properties
                </th>
                <th className="px-4 py-4 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {officers.map((officer, index) => (
                <tr
                  key={officer.id}
                  className={`text-xs text-[#2E2E2E] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                  }`}
                >
                  <td className="px-4 py-2 font-medium">{officer.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {officer.email}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {officer.phone}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {officer.assignedProperties}
                  </td>
                  <td className="px-4 py-4">
                    <Image
                      src={officer.image}
                      alt="Officer"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back to page link */}
        <div className="mt-8">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to page
          </Button>
        </div>
      </div>
    </div>
  );
}

function AddAgent({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-1 text-[#858C95]">
          <span>Admin</span>
          <span className="text-xl text-[#858C95]">/</span>
          <span className="font-medium text-xl text-[#116114]">
            Contact Page
          </span>
        </div>
      </div>
      <div className="p-6 bg-white space-y-8">
        <div className="">
          <h2 className="text-sm font-medium text-[#181818] mb-4">
            Agent Inquiry management
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <Label htmlFor="name">Agents full name</Label>
              <Input id="name" className="bg-[#D9D9D9]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email </Label>
              <Input id="email" className="bg-[#D9D9D9]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" className="bg-[#D9D9D9]" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
            Save changes
          </button>
          <button
            onClick={onBack}
            className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
          >
            <MdArrowBackIosNew />
            Back to page
          </button>
        </div>
      </div>
    </div>
  );
}
