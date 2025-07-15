import Image from "next/image";
import React, { useRef } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { useFetchData } from "@/hooks/useApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const showArrows = campaigns.length > 3;

  const handleOpen = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    onOpen();
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
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
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] sm:min-w-[250px] md:min-w-[260px] lg:min-w-[280px] aspect-[3/4] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return null;
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
        <div className="relative">
          {showArrows && (
            <button
              aria-label="Scroll left"
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 disabled:opacity-50"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaChevronLeft />
            </button>
          )}
          <div
            className="flex overflow-x-auto gap-4 md:gap-6 pb-2 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
            ref={scrollRef}
          >
            {campaigns.map((c, i) => (
              <div
                key={c.id}
                className="relative min-w-[220px] sm:min-w-[250px] md:min-w-[260px] lg:min-w-[280px] aspect-[3/4] cursor-pointer"
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
          {showArrows && (
            <button
              aria-label="Scroll right"
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 disabled:opacity-50"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="text-gray-700 space-y-4 text-base">
              <p>{selectedCampaign?.title}</p>
              <p>{selectedCampaign?.description}</p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
