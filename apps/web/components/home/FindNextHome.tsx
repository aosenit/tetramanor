import { Button } from "@chakra-ui/react";
import Image from "next/image";
import tmHighGardens from "@/assets/home/three.webp";
import { useRouter } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";


type PropertyImage = {
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

type Property = {
  id: string;
  name: string;
  address: string;
  about: string;
  featured: boolean;
  featuredAt: string | null;
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
  accountOfficer: any | null;
  images: PropertyImage[];
  document: any[];
};

type Rental = {
  id: string;
  propertyId: string;
  property: Property;
  agencyFee?: number;
  cautionFee?: number;
  serviceCharge?: number;
  totalPackage?: number;
  price: number;
  frequency: string;
  status: string;
  highlight: boolean;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
};

type RentalsResponse = {
  data: {
    items: Rental[];
    limit: number;
    page: number;
    total: number;
  };
  message: string;
  statusCode: number;
  success: boolean;
};

export default function FindNextHome() {
  const router = useRouter();
  const { data, isLoading, error } = useFetchData("/rentals?highlighted=true");
  const rental = (data as RentalsResponse | undefined)?.data.items?.[0];
  const property = rental?.property;
  return (
    <section className=" w-full container mx-auto px-4 lg:px-16 py-12">
      <div className="flex flex-col gap-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2 leading-tight">
              Find Your Next Home & Move In
            </h2>
            <div className="text-gray-700 text-base">
              Browse available listings, choose your ideal space —seamlessly and
              stress-free.
            </div>
          </div>
          <Button
            colorScheme="green"
            rounded="0"
            className="bg-primary text-white font-semibold rounded px-8 py-3 shadow-none text-base  md:w-auto mt-2 md:mt-0"
            onClick={() => router.push("/rental")}
          >
            View more properties
          </Button>
        </div>
        {/* Image with Overlay Card */}
        {isLoading ? (
          <div className="text-center py-20 text-lg">Loading rental...</div>
        ) : error || !rental || !property ? (
          <div className="text-center py-20 text-lg text-red-500">Failed to load rental.</div>
        ) : (
        <div className="relative w-full max-w-full h-[500px] lg:h-[600px] rounded-[5px] overflow-hidden">
          {property.images && property.images[0]?.imageUrl ? (
            <Image
              src={property.images[0].imageUrl}
              alt={property.name}
              className="object-cover rounded-xl"
              fill
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
          {/* Badge */}
          <div className="absolute top-6 left-2 lg:left-6 bg-[#8B8B8B] bg-opacity-80 text-white text-sm px-5 py-2 rounded-full">
            {property.name}
          </div>
          {/* Overlay Card */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-6  lg:-translate-x-0  bottom-6 w-[95%]  bg-white p-4  lg:p-8 flex flex-col gap-4 shadow-lg">
            <div className="text-2xl md:text-3xl font-bold text-black mb-2">
              {property.name}, {property.address}
            </div>
            <div className="text-gray-700 text-base mb-4">
              {property.about}
            </div>
            <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-4">
              <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-8 text-black text-base font-medium w-full justify-between">
                <div>
                  <div className="font-bold">Rental Price</div>
                  <div className="text-lg font-extrabold">{rental.price ? `${rental.price.toLocaleString()}` : "N/A"}</div>
                </div>
                {rental.agencyFee !== undefined && (
                  <div>
                    <div className="font-bold">Agency Fee</div>
                    <div className="text-lg font-extrabold">{rental.agencyFee.toLocaleString()}</div>
                  </div>
                )}
                {rental.cautionFee !== undefined && (
                  <div>
                    <div className="font-bold">Caution Fee</div>
                    <div className="text-lg font-extrabold">{rental.cautionFee.toLocaleString()}</div>
                  </div>
                )}
                {rental.serviceCharge !== undefined && (
                  <div>
                    <div className="font-bold">Service Charge</div>
                    <div className="text-lg font-extrabold">{rental.serviceCharge.toLocaleString()}</div>
                  </div>
                )}
                {rental.totalPackage !== undefined && (
                  <div>
                    <div className="font-bold">Total Package</div>
                    <div className="text-lg font-extrabold">{rental.totalPackage.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
