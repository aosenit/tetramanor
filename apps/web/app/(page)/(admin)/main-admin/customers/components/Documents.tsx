"use client";
import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@chakra-ui/react';
import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdArrowBackIosNew } from 'react-icons/md';
import { PiFunnel } from 'react-icons/pi';
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const documents = [
    {
      id: 1,
    name: "Sole and Purchase Agreement",
    issuedDate: "Jan 15, 2025",
    type: "PDF",
    size: "3MB",
  },
    {
      id: 2,
    name: "Deed of Purchase",
    issuedDate: "Jan 15, 2025",
    type: "PDF",
    size: "3MB",
  },
    {
      id: 3,
    name: "Receipt of Sole",
    issuedDate: "Jan 15, 2025",
    type: "PDF",
    size: "3MB",
  },
];
  
export default function Documents() {
  const [search, setSearch] = useState("");
    const searchParams = useSearchParams();
    const propertyName = searchParams.get("property");
  return (
    <div className="min-h-screen space-y-8 p-6">
      {/* Breadcrumb */}
      <div className="text-xs text-[#4C5560] font-medium">
        Admin /{" "}
        <span className="text-[#116114] text-sm font-medium">{propertyName}</span>
      </div>
      <div className="flex justify-between items-start flex-wrap">
        <h2 className="text-lg font-medium text-gray-800">Documents</h2>
        <Button
          rightIcon={<FaCloudUploadAlt />}
          variant={"outline"}
          size="sm"
          className=" text-white text-sm"
        >
          Upload documents
        </Button>
      </div>
      <div className=" overflow-hidden">
              {/* Table Header */}
              <div className="bg-white space-y-4 p-6">
                  
        <div className="flex justify-between items-center ">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-800">
              View documents
            </div>
            <p className="text-[#4D4E53] text-xs">
              Documents of customer's properties .
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm flex items-center gap-1 text-[#252525]">
              <PiFunnel />
              Filter
            </span>
            <Input
              type="text"
              placeholder="Search..."
              className="w-48 h-9 rounded-md text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="grid grid-cols-4 px-4 py-4 font-medium  mt-6 text-xs text-[#847A8D] border rounded-md bg-[#F5F5F5]">
          <div>Document name</div>
          <div>Issued Date</div>
          <div>Type</div>
          <div>Size</div>
        </div>

        {documents.map((p, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 px-4 py-4 text-xs text-[#2E2E2E] border-b ${
              index % 2 === 1 ? "bg-[#FAFAFA]" : ""
            }`}
          >
            <div>{p.name}</div>
            <div>{p.issuedDate}</div>
            <div>{p.type}</div>
            <div className="text-[#116114]">{p.size}</div>
          </div>
        ))}
      </div>
              </div>

      {/* Back Button */}
      <Link href="/main-admin/customers/properties-details">
      <button className="text-[#323539] flex items-center gap-2 hover:text-black text-sm mt-6">
        <MdArrowBackIosNew />
        Back
        </button>
      </Link>
    </div>
  );
}
