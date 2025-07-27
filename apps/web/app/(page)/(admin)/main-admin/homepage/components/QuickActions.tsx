"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import CampaignModal from "./modals/Campain";
import { useFetchData } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { refetch } = useFetchData("campaigns");
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="h-12 text-sm text-[#858C95] rounded-lg w-fit justify-start"
        onClick={() => router.push("/main-admin/properties/add-properties/")}
      >
        Add new property
        <IoMdArrowRoundForward className="h-4 w-4  mr-2" />
      </Button>
      <Button
        variant="outline"
        className="h-12 w-fit text-sm text-[#858C95] rounded-lg justify-start"
        onClick={() => router.push("/main-admin/investments/add-investment/")}
      >
        Add new investment
        <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
      </Button>
      <Button
        variant="outline"
        className="h-12 w-fit text-sm text-[#858C95] rounded-lg justify-start"
        onClick={() => router.push("/main-admin/rentals/edit-rentals")}
      >
        Add new rental
        <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
      </Button>

      <CampaignModal
        open={showModal}
        onClose={() => setShowModal(false)}
        refetch={refetch}
      />
    </div>
  );
}
