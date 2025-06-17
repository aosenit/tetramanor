"use client";
import React from 'react'
import CampaignModal from './Campain';
import CampaignPreview from './CampaignPreview';

function Tooltip() {
  const [showModal, setShowModal] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  return (
    <div className="bg-[#EAEBF0] p-8 max-w-[200px] rounded-lg  cursor-pointer space-y-4">
      <>
        <p
          onClick={() => setShowModal(true)}
          className="text-[#454D56] font-medium"
        >
          Edit
        </p>
        <CampaignModal open={showModal} onClose={() => setShowModal(false)} />
      </>
      <>
        <p
          onClick={() => setShowPreview(true)}
          className="text-[#454D56] font-medium"
        >
          View Details
        </p>
        <CampaignPreview open={showPreview} onClose={() => setShowPreview(false)} />
      </>
      <p className="text-[#E33B32] font-medium">Delete</p>
    </div>
  );
}

export default Tooltip