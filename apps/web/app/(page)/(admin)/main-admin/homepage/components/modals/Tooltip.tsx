"use client";
import React from "react";
import CampaignModal from "./Campain";
import CampaignPreview from "./CampaignPreview";
import DeleteCampaignModal from "./DeleteCampaignModal";

function Tooltip({
  campaign,
  closeTooltip,
  refetch,
}: {
  campaign: any;
  closeTooltip: () => void;
  refetch: () => void;
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  return (
    <div className="bg-[#EAEBF0] p-8 max-w-[200px] rounded-lg  cursor-pointer space-y-4 flex flex-col gap-2 justify-start text-sm">
      <button
        onClick={() => setShowModal(true)}
        className="text-[#116114] font-medium"
      >
        Edit
      </button>

      <button
        onClick={() => setShowPreview(true)}
        className="text-[#116114] font-medium"
      >
        Preview
      </button>

      <button
        onClick={() => setShowDeleteModal(true)}
        className="text-[#E33B32] font-medium"
      >
        Delete
      </button>

      <CampaignModal
        open={showModal}
        onClose={() => setShowModal(false)}
        refetch={refetch}
        campaignId={campaign.id}
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
          closeTooltip();
        }}
      />
    </div>
  );
}

export default Tooltip;
