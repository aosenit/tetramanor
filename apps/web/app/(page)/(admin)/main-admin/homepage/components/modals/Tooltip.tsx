"use client";
import React from "react";
import CampaignModal from "./Campain";
import CampaignPreview from "./CampaignPreview";
import DeleteCampaignModal from "./DeleteCampaignModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

function CampaignActionsDropdown({
  campaign,
  refetch,
}: {
  campaign: any;
  refetch: () => void;
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowModal(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowPreview(true)}>
            Preview
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CampaignModal
        open={showModal}
        onClose={() => setShowModal(false)}
        refetch={refetch}
        campaignId={campaign.id}
        campaignData={campaign}
      />

      <CampaignPreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
        campaignData={campaign}
        onEdit={() => {
          setShowPreview(false);
          setShowModal(true);
        }}
      />

      <DeleteCampaignModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        campaignId={campaign.id}
        campaignTitle={campaign.title}
        onSuccess={() => {
          refetch();
        }}
      />
    </>
  );
}

export default CampaignActionsDropdown;
