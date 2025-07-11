"use client";
import Image from "next/image";
import { ChevronUp, Download } from "lucide-react";
import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { useSearchParams, useRouter } from "next/navigation";
import placeholder from "@/assets/placeholder.svg";
import c from "@/assets/investment/icons/c.webp";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import { toast } from "sonner";
import { downloadDocument } from "@/lib/utils";

const defaultAdvantages = [
  {
    icon: c,
    title: "High Returns",
    description: "Earn up to 50% ROI over a short duration (~18 months)",
  },
  {
    icon: c,
    title: "Minimal Risk",
    description:
      "Tetramanor handles the entire process, from land acquisition to sales",
  },
  {
    icon: c,
    title: "Flexible Investment Options",
    description: "Choose between Fixed ROI or Equity-Based Profit Sharing",
  },
];

export default function PropertyDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const propertyId = searchParams.get("id");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch property data
  const {
    data: propertyResponse,
    isLoading,
    error,
    refetch,
  } = useFetchData(propertyId ? `admin/properties/${propertyId}` : "");

  // Delete property mutation
  const { mutateAsync: deleteProperty, isPending: isDeleting } = useDeleteData(
    propertyId ? `admin/properties/${propertyId}` : null
  );

  const handleDeleteProperty = async () => {
    try {
      await deleteProperty();
      toast.success("Property deleted successfully");
      router.push("/main-admin/properties");
    } catch (error: any) {
      console.error("Failed to delete property:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to delete property";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-4">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading property details</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const property = propertyResponse?.data;

  return (
    <div className="min-h-screen px-4">
      <div className="border-b">
        <div className="py-2">
          <nav className="">
            <Link href="/main-admin/properties">
              <span className="text-[#858C95]">Home</span>
            </Link>
            <span className="mx-2 text-xl text-[#116114]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              property overview
            </span>
          </nav>
        </div>
      </div>

      <div className="mt-2">
        <div className="">
          <h2 className="text-sm font-medium text-[#323539] mb-4">
            View property listing
          </h2>
        </div>
        <div className="bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-medium text-[#116114]">
              View property details
            </h2>
            {property?.brochure?.length > 0 && (
              <Button
                className="bg-[#116114] text-white"
                onClick={() => downloadDocument(property.brochure[0].id, property.brochure[0].name || "brochure.pdf")}
              >
                <Download className="w-4 h-4 mr-2" />
                Download brochure
              </Button>
            )}
          </div>

          {/* Property Images */}
          {property?.images?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={property?.images[0]?.imageUrl || placeholder}
                  alt="Property exterior view"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={property?.images[1]?.imageUrl || placeholder}
                  alt="Property exterior view"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={property?.images[2]?.imageUrl || placeholder}
                  alt="Property exterior view"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-start items-start h-full py-10">
              <p className="text-[#858C95]">No images available</p>
            </div>
          )}

          {/* Property Details */}
          <div className="grid grid-cols-1 md:flex md:justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-12">
                <label className="text-xs font-medium text-[#181818] block min-w-[100px]">
                  Property name
                </label>
                <p className="text-[#116114] font-medium text-sm">
                  {property?.name}
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <label className="text-xs font-medium text-[#181818] min-w-[100px] pt-2">
                  Property units
                </label>
                <Collapsible className="flex-1 mt-1 ">
                  <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                    <span className="text-[#116114] font-medium text-sm">
                      {property?.unitTypes?.length} Units
                    </span>
                    <ChevronUp className="text-[#4C5560]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="text-sm text-[#4C5560] space-y-1">
                      {property?.unitTypes?.map((type, index) => (
                        <p key={index}>{type}</p>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#116114] flex gap-2 items-center">
                  <GrLocation />
                  {property?.address}
                </p>
                <p className="text-sm text-[#4C5560]">
                  {property?.constructionStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[var(--primary-green)] mb-4">
          Property description
        </h2>
        <p className=" text-sm font-medium">{property?.about}</p>
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[var(--primary-green)] mb-4">
          Why invest
        </h2>
        <p className="text-[#116114] text-sm font-medium">
          {property?.whyInvest?.[0]?.title || "N/A"}
        </p>
        <p className="text-sm font-medium">
          {property?.whyInvest?.[0]?.description || "N/A"}
        </p>
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[#181818] mb-4">
          Advantage of investment{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property?.whyInvest?.advantages?.length > 0 ? (
            property?.whyInvest?.advantages?.map((adv, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Image
                  src={
                    defaultAdvantages[idx % defaultAdvantages.length]?.icon || c
                  }
                  alt="Investment advantage icon"
                  width={40}
                  height={40}
                />
                <div>
                  <h4 className="text-[#116114] font-semibold">
                    {adv.title || "N/A"}
                  </h4>
                  <p className="text-sm text-[#202020]">
                    {adv.description || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#181818]">No advantages available</p>
          )}
        </div>
      </div>
      <div className="bg-white mt-4 p-8 space-y-6">
        <h2 className="text-sm font-medium text-[#181818] mb-6">Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {property?.features?.length > 0 ? (
            property?.features?.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
              >
                <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden w-full">
                  {feature || "N/A"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#181818]">No features available</p>
          )}
        </div>

        <h2 className="text-sm font-medium text-[#181818] mb-6">Amenities </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {property?.amenities?.length > 0 ? (
            property?.amenities?.map((amenity, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
              >
                <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden w-full">
                  {amenity || "N/A"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#181818]">No amenities available</p>
          )}
        </div>
      </div>
      {/* Contact options */}
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[var(--primary-green)] mb-4">
          Contact options enabled
        </h2>
        {/* add address and also account office */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-[#181818]">Address</h3>
            <p className="text-sm text-[#181818]">{property?.address}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-[#181818]">
              Account officer
            </h3>
            <p className="text-sm text-[#181818]">
              {property?.accountOfficer &&
              typeof property.accountOfficer === "object" &&
              "name" in property.accountOfficer
                ? property.accountOfficer.name
                : typeof property?.accountOfficer === "string"
                  ? property.accountOfficer
                  : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-3 items-center py-12">
        <div className="flex gap-2">
          <Button className="bg-[#116114] text-white">
            <Link
              href={`/main-admin/properties/add-properties?id=${propertyId}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </Button>
        </div>
        <Link href="/main-admin/properties">
          <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
            <MdArrowBackIosNew /> Back
          </button>
        </Link>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{property?.name}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 md:flex-row">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteProperty}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
