import Image from "next/image";
import React, { useState } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from "@chakra-ui/react";
import { useFetchData } from "@/hooks/useApi";

type CampaignImage = {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
  propertyid: string | null;
  campaignId: string | null;
  investmentId: string | null;
  rentId: string | null;
  productType: string | null;
  blogId: string | null;
  imageType: string | null;
};

type Campaign = {
  id: string;
  title: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images: CampaignImage[];
};

type CampaignsResponse = {
  data: Campaign[];
};

export default function OngoingCampaigns() {
  const { data, isLoading, error } = useFetchData("/campaigns");
  const campaigns = (data as CampaignsResponse | undefined)?.data || [];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleOpen = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    onOpen();
  };

  if (isLoading) {
    return <div className="text-center py-20 text-lg">Loading campaigns...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-lg text-red-500">Failed to load campaigns.</div>;
  }

  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
          Ongoing Campaigns
        </h2>
        <div className="text-gray-700 text-base mb-10 text-center">
          Stay informed with our latest updates, announcements, and
          opportunities.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {campaigns.map((c, i) => (
            <div
              key={c.id}
              className="relative w-full aspect-[3/4] cursor-pointer"
              onClick={() => handleOpen(c)}
              tabIndex={0}
            >
              {c.images && c.images[0]?.imageUrl ? (
                <Image
                  src={c.images[0].imageUrl}
                  alt={c.title}
                  className="rounded-lg object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="text-gray-700 text-base">
              {selectedCampaign?.description}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
