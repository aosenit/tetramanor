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
import { Textarea } from "@chakra-ui/react";
import { Upload, ChevronLeft } from "lucide-react";
import { BsCloudArrowUp } from "react-icons/bs";

export default function CampaignModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-3xl overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-2 ">
            <span className="text-[#4C5560] text-sm">Admin</span>
            <span className="text-[#116114]  text-sm font-medium">
              / Add New Campaign
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 space-y-6 bg-white">
          <p className="text-[#4C5560] text-xs">
            Create a new promotional campaign to feature on the homepage.
          </p>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Campaign Title
              </Label>
              <Select defaultValue="tm-highstandard-promo">
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tm-highstandard-promo">
                    TM HighStandard Promo
                  </SelectItem>
                  <SelectItem value="other-campaign">Other Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Campaign Type
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  Start date
                </Label>
                <Input type="date" className="bg-[#E5E5E7] text-xs" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  End date
                </Label>
                <Input type="date" className="bg-[#E5E5E7] text-xs" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="border  border-gray-300 rounded-lg p-8 text-center bg-white transition-colors cursor-pointer">
                <p className="text-sm text-[#292D32]">Upload banner images</p>
                <BsCloudArrowUp className="mx-auto h-8 w-8 text-[#798088] mt-2" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Description
              </Label>
              <Input
                className="bg-[#E5E5E7] text-xs text-[#323539] placeholder:text-xs"
                placeholder="Get 10% ROI with TM HighStandards Investment offer"
                type="text"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between pt-4">
              <Button
                type="submit"
                className="bg-[#116114] font-medium text-sm hover:bg-[#116114] text-white"
              >
                Save campaign
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-[#323539]"
              >
                Back to homepage
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
