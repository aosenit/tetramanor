// apps/web/components/home/HomeFeaturedProperty.tsx
"use client";
import Modal from "@/app/(page)/portfolio/view-property/sections/modal";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";

type FeaturedPropertyImage = {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
  propertyid: string;
  campaignId: string | null;
  investmentId: string | null;
  rentId: string | null;
  productType: string | null;
  blogId: string | null;
  imageType: string | null;
};

type FeaturedProperty = {
  id: string;
  name: string;
  address: string;
  about: string;
  featured: boolean;
  featuredAt: string;
  inquiryOptions: string[];
  whyInvest: {
    title: string;
    advantages: { title: string; description: string }[];
    description: string;
  };
  features: string[];
  amenities: string[];
  createdAt: string;
  brochure: string | null;
  constructionStatus: string;
  createdById: string | null;
  status: string;
  unitAmount: number;
  unitTypes: string[];
  accountOfficerId: string | null;
  images: FeaturedPropertyImage[];
  document: { id: string; name: string }[];
};

type FeaturedPropertyResponse = {
  success: boolean;
  message: string;
  data: FeaturedProperty;
  statusCode: number;
};

export default function  HomeFeaturedProperty() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<{
    id: string;
    name: string;
    imageUrl: string | null;
  } | null>(null);
  const router = useRouter();

  const { data, isLoading, error } = useFetchData("/property/featured");
  const featured = (data as FeaturedPropertyResponse | undefined)?.data;
  const imageUrl = featured?.images?.[0]?.imageUrl;

  if (isLoading) {
    return (
      <section className="w-full container mx-auto px-4 lg:px-16 py-12">
        <div className="text-center py-20 text-lg">
          Loading featured property...
        </div>
      </section>
    );
  }

  if (error || !featured) {
    return (
      <section className="w-full container mx-auto px-4 lg:px-16 py-12">
        <div className="text-center py-20 text-lg text-red-500">
          Failed to load featured property.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full container mx-auto px-4 lg:px-16 py-12">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: Image with Overlay */}
        <div className="relative w-full lg:w-[55%] h-[400px] sm:h-[500px] lg:h-[610px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={featured.name}
              className="rounded-xl object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
          {/* Overlay Card */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[95%] sm:w-[90%] bg-black/50 rounded-xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="text-white text-sm flex items-center gap-2">
                  {featured.address}
                </div>
                <div className="text-white text-2xl font-bold">
                  {featured.name}
                </div>
              </div>
              {/* Only show Download Brochure button if document exists */}
              {featured.document && featured.document.length > 0 && (
                <Button
                  onClick={() => {
                    const doc = featured.document[0];
                    setModalProps({
                      id: doc.id,
                      name: doc.name || `${featured.name}-brochure.pdf`,
                      imageUrl: featured.images?.[0]?.imageUrl || null,
                    });
                  }}
                  size="sm"
                  className="bg-white text-[#202020] font-semibold rounded px-6 py-2 shadow-none text-base w-full md:w-auto"
                >
                  Download brochure
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-white text-center">
              {[
                { label: "Square metres", value: "10 million" },
                { label: "Floors", value: "30" },
                { label: "Amenities", value: "10+" },
                { label: "Parking levels", value: "6" },
                { label: "Floors", value: "30" },
              ].map((item, index) => (
                <div key={index}>
                  <div className="font-bold">{item.value}</div>
                  <div className="text-xs font-normal">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#CD6115] leading-tight">
            Own the View Others Can Only Dream Of
          </h2>
          <div className="text-gray-700 text-base space-y-6">
            <p>{featured.about}</p>
          </div>
          <Button
            colorScheme="green"
            className="bg-primary text-white font-semibold rounded px-8 py-3 shadow-none text-base w-fit"
            onClick={() => router.push("/portfolio")}
          >
            View more
          </Button>
        </div>
      </div>
      {modalProps && (
        <Modal
          onClose={() => setModalProps(null)}
          brochureId={modalProps.id}
          brochureName={modalProps.name}
          imageUrl={modalProps.imageUrl}
        />
      )}
    </section>
  );
}
