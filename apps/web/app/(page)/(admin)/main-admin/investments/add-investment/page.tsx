"use client";

import { useState } from "react";
import {
  PiCurrencyNgn,
  PiCurrencyCircleDollar,
  PiCurrencyEur,
} from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@chakra-ui/react";
import { FaRegFileLines } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { IoImageOutline } from "react-icons/io5";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import { CustomDropdown } from "./components/CustomDropdown";

export default function AddInvestment() {
  const [currency, setCurrency] = useState("");
  const [selectedType, setSelectedType] = useState("Fixed ROI");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [contractName, setContractName] = useState("Contract (PDF)");
  const [brochureName, setBrochureName] = useState("Upload Brochure");
  const [imageName, setImageName] = useState("Featured Image");
  const types = ["Fixed ROI", "Equity share"];


  return (
    <div className="">
      {/* Breadcrumb */}
      <div className=" border-b border-[#E5E5E7] pb-4">
        <span className="text-[#323539] font-medium">
          Investments &gt;&gt;&gt;{" "}
        </span>
        <span className="text-[#858C95] font-medium">Add new investments</span>
      </div>

      {/* Basic Info */}
      <section className="space-y-6 mt-4 bg-white p-6">
        {/* Title */}
        <h2 className="text-2xl font-medium text-[#116114] mb-4">
          Add new investment offering
        </h2>
        <p className="text-[#4C5560] font-medium">Basic information</p>
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Investment name
          </label>
          <Input
            placeholder=""
            className="bg-[#E5E5E7] border border-[#116114]"
          />
        </div>

        {/* Radio buttons */}
        <div className="flex items-center gap-8">
          {types.map((type) => (
            <div
              key={type}
              onClick={() => setSelectedType(type)}
              className="flex items-center cursor-pointer gap-2"
            >
              {/* Custom radio-like circle */}
              <div
                className={`w-4 h-4 rounded-full  ${
                  selectedType === type ? "bg-[#E5E5E7] " : "bg-gray-400"
                }`}
              ></div>
              <span className="text-sm text-[#181818]">{type}</span>
            </div>
          ))}
        </div>

        {/* Currency & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomDropdown
            label="Currency"
            options={[
              { label: "NGN", icon: <PiCurrencyNgn /> },
              { label: "USD", icon: <PiCurrencyCircleDollar /> },
              { label: "EUR", icon: <PiCurrencyEur /> },
            ]}
            selected={currency}
            onSelect={setCurrency}
          />

          <CustomDropdown
            label="Duration"
            options={[
              { label: "6 months" },
              { label: "1 year" },
              { label: "2 years" },
            ]}
            selected={duration}
            onSelect={setDuration}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm text-[#181818] font-medium">
            Description and documents
          </label>
          <Textarea className="!border-none !bg-[#E5E5E7]" />
        </div>

        {/* Upload Buttons */}
        <div className="flex flex-wrap items-center gap-10">
          <FileUpload
            label={contractName}
            icon={<FaRegFileLines />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setContractName(file.name);
            }}
          />

          <FileUpload
            label={brochureName}
            icon={<CiFileOn />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setBrochureName(file.name);
            }}
          />

          <FileUpload
            label={imageName}
            icon={<IoImageOutline />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageName(file.name);
            }}
          />
        </div>

        <div>
          
        <h4 className="font-medium text-[#4C5560] mb-4">Visibility and status </h4>
        {/* Status & Launch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomDropdown
            label="Status"
            options={[
              { label: "Published" },
              { label: "Draft" },
              { label: "Hidden" },
            ]}
            selected={status}
            onSelect={setStatus}
          />

          <div className="">
            <label className="block text-sm font-medium mb-1">
              Schedule launch
            </label>
            <Input type="text" className="bg-[#E5E5E5]" />
          </div>
        </div>
        </div>

        {/* Buttons */}
        <div className="pt-6">
          <div className="flex justify-center gap-6 items-center">
            <Button variant="ghost">Cancel</Button>
            <Button variant="ghost">Save as draft</Button>
          </div>
        </div>

        <div className="flex justify-between items-center py-8">
          <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
            Publish
          </button>
          <Link href="/main-admin/investments">
            <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
              <MdArrowBackIosNew /> Back to homepage
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FileUpload({
  label,
  icon,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="w-72 flex rounded-md overflow-hidden cursor-pointer">
      <div className="flex items-center w-full bg-[#E5E5E5] px-3 py-2">
        <span className="text-[#858C95] flex items-center gap-2 text-sm truncate">
          {label} {icon}
        </span>
      </div>
      <div className="bg-white text-[#323539] px-3 flex items-center justify-center border-l border-gray-300 text-sm">
        Upload
      </div>
      <input type="file" className="hidden" onChange={onChange} />
    </label>
  );
}
