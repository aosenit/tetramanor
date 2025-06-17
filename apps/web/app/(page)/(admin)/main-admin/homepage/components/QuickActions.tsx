"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import CampaignModal from "./modals/Campain";

export default function QuickActions() {
  const [showModal, setShowModal] = useState(false);
  return (
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
      <>
        <Button
          onClick={() => setShowModal(true)}
          variant="outline"
          className="h-12 text-sm w-fit text-[#858C95] rounded-lg justify-start"
        >
          Add new Campaign
          <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
        </Button>

        <CampaignModal open={showModal} onClose={() => setShowModal(false)} />
      </>
    </div>
  );
}
