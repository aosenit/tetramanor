import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Plus } from "lucide-react";
import React from "react";
import Image from "next/image";
import two from "@/assets/admin/home/two.webp";
import five from "@/assets/admin/home/five.svg";

export default function OngoingCampaigns() {
  return (
    <div>
      <div className="bg-[#F4F4F4]  rounded-lg  space-y-4">
        <div className="flex flex-row  p-4 items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[#181818] font-medium text-base">
                Ongoing Campaigns
              </p>
              <Image src={two} alt="ongoing campaign" width={35} height={35} />
            </div>
            <p className="text-xs text-[#4C5560] mt-2">
              Add or manage homepage promotions, investment offers, and sales
            </p>
          </div>
          <button className="bg-[#116114] text-white flex items-center gap-1 px-3 py-2 rounded-md font-medium text-sm hover:bg-[#116114]">
            <Plus />
            Add new campaign
          </button>
        </div>
        <div className="flex justify-between items-center bg-[#E5E5E7] text-xs font-medium text-[#181818] px-4 py-4">
          <p>Campaign title</p>
          <p>Type</p>
          <p>Date</p>
          <p>Action</p>
        </div>
        <div className="flex justify-between items-center px-4 py-3 border-b border-[#E5E5E7] text-sm text-[#181818]">
          <p className="">TM HighGardens Promo</p>
          <p className="">Investment</p>
          <p>Apr 20 – May 30, 2025</p>
          <Image
            className="cursor-pointer"
            src={five}
            alt="ongoing campaign"
            width={35}
            height={35}
          />
        </div>
        <div className="flex justify-between items-center px-4 py-3 border-b border-[#E5E5E7] text-sm text-[#181818]">
          <p className="">Queen Mary Summer Sale</p>
          <p className="">Sale</p>
          <p>May 1 – June 15, 2025</p>
          <Image
            className="cursor-pointer"
            src={five}
            alt="ongoing campaign"
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
}
