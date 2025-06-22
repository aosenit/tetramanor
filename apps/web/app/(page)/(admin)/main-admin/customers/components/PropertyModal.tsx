"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "@/assets/home/logo.webp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsCloudArrowUp } from "react-icons/bs";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddPropertyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;
  const apartmentTypes = [
    { id: "studio", label: "Studio apartment", defaultQuantity: "2" },
    { id: "4bedroom", label: "4 bedroom duplex", defaultQuantity: "" },
    { id: "3br", label: "3BR apartment", defaultQuantity: "" },
    { id: "3br-bq", label: "3BR +BQ", defaultQuantity: "" },
    { id: "2br", label: "2BR apartment", defaultQuantity: "" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full bg-white max-w-3xl overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="px-6 py-4 border-b ">
          <div className="">
            <p className="text-[#116114]  text-sm font-medium">
              Add / Edit rental portfolio
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 space-y-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Property name
              </Label>
              <Select defaultValue="tm-meadows">
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tm-meadows">TM meadows</SelectItem>
                  <SelectItem value="queen-mary">Queen mary</SelectItem>
                  <SelectItem value="queen-mary">TM highgardens</SelectItem>
                  <SelectItem value="queen-mary">Kings landing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="max-w-md space-y-6 p-6">
              {/* Unit Type Dropdown */}
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  Unit type
                </Label>
                <Select defaultValue="investment">
                  <SelectTrigger className="bg-[#E5E5E7] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Instructions */}
              <div className="text-sm text-gray-600">
                Check the type and no of units acquired
              </div>

              {/* Apartment Types List */}
              <div className="space-y-4">
                {apartmentTypes.map((apartment) => (
                  <div
                    key={apartment.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={apartment.id}
                        className="h-5 w-5 border-2 border-gray-300"
                      />
                      <Label
                        htmlFor={apartment.id}
                        className="text-gray-700 font-medium cursor-pointer"
                      >
                        {apartment.label}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        defaultValue={apartment.defaultQuantity}
                        className="w-12 h-8 text-center text-sm border border-gray-300"
                        min="0"
                      />
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  Term
                </Label>
                <Select defaultValue="yearly">
                  <SelectTrigger className="bg-[#E5E5E7] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  Status
                </Label>
                <Select defaultValue="active">
                  <SelectTrigger className="bg-[#E5E5E7] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  Rent amount
                </Label>
                <Input
                  type="text"
                  placeholder="₦"
                  className="bg-[#E5E5E7] text-xs"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  start date
                </Label>
                <Input
                  type="text"
                  className="bg-[#E5E5E7] text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  End date
                </Label>
                <Input
                  type="text"
                  className="bg-[#E5E5E7] text-xs"
                />
              </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="border  border-gray-300 rounded-lg p-8 text-center bg-white transition-colors cursor-pointer">
                <p className="text-sm text-[#292D32]">Upload property docs</p>
                <BsCloudArrowUp className="mx-auto h-8 w-8 text-[#798088] mt-2" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between pt-4">
              <Button
                type="submit"
                className="bg-[#116114] font-medium text-sm hover:bg-[#116114] text-white"
              >
                Save 
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-[#323539]"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
