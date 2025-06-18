"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import FileUpload from "../../properties/components/UploadFile";
import TagInputGroup from "../../properties/components/PropertyFeaturesForm";
import Dropdown from "./components/Dropdown";


export default function AddInvestment() {
    const [propertyName, setPropertyName] = useState("");
    const [rentalFrequency, setRentalFrequency] = useState("");
    const [rent, setRent] = useState("");
    const [agencyFee, setAgencyFee] = useState("");
    const [cautionFee, setCautionFee] = useState("");
    const [status, setStatus] = useState("");

    const propertyOptions = ["Sunset Villa", "Green Estate", "Oceanview"];
    const frequencyOptions = ["Monthly", "Yearly", "Quarterly"];
    const feeOptions = ["₦50,000", "₦100,000", "₦150,000"];
    const statusOptions = ["Not Rented", "Rented"];
    


  return (
    <div className="">
      {/* Breadcrumb */}
      <div className=" border-b border-[#E5E5E7] pb-4">
        <span className="text-[#323539] font-medium">
          Rental Management &gt;&gt;&gt;{" "}
        </span>
        <span className="text-[#858C95] font-medium">Edit</span>
      </div>

      {/* Basic Info */}
      <section className="space-y-6 mt-4 bg-white p-6">
        {/* Title */}
        <h2 className="text-2xl font-medium text-[#116114] mb-4">
          Add / Edit rental
        </h2>
        <p className="text-[#4C5560] font-medium">Property info</p>
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Property name
          </label>
          <Dropdown
            options={propertyOptions}
            value={propertyName}
            onChange={setPropertyName}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Apartment type
          </label>
          <Input
            placeholder=""
            className="bg-[#E5E5E7] border border-[#116114]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Adress
          </label>
          <Input
            placeholder=""
            className="bg-[#E5E5E7] border border-[#116114]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Rental frequency
          </label>
          <Dropdown
            options={frequencyOptions}
            value={rentalFrequency}
            onChange={setRentalFrequency}
          />
        </div>

        <p className="text-[#4C5560] font-medium">Fees</p>
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Rent
          </label>
          <Dropdown options={feeOptions} value={rent} onChange={setRent} />
        </div>

        {/* Currency & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Agency fee
            </label>
            <Dropdown
              options={feeOptions}
              value={agencyFee}
              onChange={setAgencyFee}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Caution fee
            </label>
            <Dropdown
              options={feeOptions}
              value={cautionFee}
              onChange={setCautionFee}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <FileUpload
            label="Upload property images"
            accept="image/*"
            multiple={true}
            id="property-images"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Status
          </label>
          <Dropdown
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        </div>
        <h3 className="text-base  py-4 font-medium text-[#116114]">
          Property features and amenities
        </h3>
        <TagInputGroup label="Features" />
        <TagInputGroup label="Amenities" />

        <div className="flex justify-between items-center py-8">
          <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
            Save
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


