"use client";
import Image from "next/image";
import { ChevronUp, Download, Pencil, ToggleLeft } from "lucide-react";
import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { useSearchParams, useRouter } from "next/navigation";
import placeholder from "@/assets/placeholder.svg";
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
import { useFetchData, useDeleteData, usePutData } from "@/hooks/useApi";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import IconDisplay from "./IconDisplay";

type AvailabilityStatus = "AVAILABLE" | "SOLD_OUT";

interface PropertyUnit {
  id: string;
  unitType: string;
  numberOfUnits: number;
  availableUnits: number;
  unitPrice: number;
  currency: string;
  propertyId: string;
  priceThreshold: number | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FeatureOrAmenity {
  name: string;
  icon: string;
}

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

  const { mutate: updateProperty, isPending: isUpdating } = usePutData(
    propertyId ? `admin/properties/${propertyId}/avaliability` : null
  );

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

  const handleToggleAvailability = (status: AvailabilityStatus) => {
    updateProperty(
      { status },
      {
        onSuccess: () => {
          toast.success("Property availability updated successfully");
          refetch();
        },
        onError: (error: any) => {
          console.log(
            error?.response?.data?.message ||
              "Failed to update property availability"
          );
        },
      }
    );
  };
  if (isLoading) {
    return <Loader />;
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
  console.log(property);

  return (
    <div className="min-h-screen px-4">
      <div className="border-b flex justify-between items-center flex-wrap py-4 gap-2">
        <div className="py-2">
          <nav className="">
            <Link href="/main-admin/properties">
              <span className="text-[#858C95]">Home</span>
            </Link>
            <span className="mx-2 text-lg text-[#116114]">/</span>
            <span className="font-medium  text-[#116114]">
              property overview
            </span>
          </nav>
        </div>
        <div className="flex gap-2">
          {/* <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash className="w-4 h-4" />
            Delete Property
          </Button> */}
          <Button className="bg-[#116114] text-white">
            <Link
              href={`/main-admin/properties/add-properties?id=${propertyId}`}
              className="flex items-center gap-2"
            >
              <Pencil className="w-4 h-4 " />
              Edit Property
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-2">
        <div className="">
          <h2 className="text-sm font-medium text-[#323539] my-4">
            View property listing
          </h2>
        </div>
        <div className="bg-white p-8">
          <div className="flex justify-start lg:justify-end items-center mb-4 gap-4 flex-wrap">
            <Button
              disabled={isUpdating}
              className={`border-[#116114] text-[#116114] hover:opacity-80 ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              } ${property?.status !== "AVAILABLE" && "border-red-500 text-red-500"}`}
              variant="outline"
              onClick={() =>
                handleToggleAvailability(
                  property?.status === "AVAILABLE" ? "SOLD_OUT" : "AVAILABLE"
                )
              }
            >
              <ToggleLeft />
              {isUpdating
                ? "Updating..."
                : property?.status === "AVAILABLE"
                  ? "Available"
                  : "Sold Out"}
            </Button>
            {property?.document?.length > 0 && (
              <a
                href={property?.document[0].imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className=" bg-[#116114] text-white hover:opacity-80">
                  <Download className="w-4 h-4 " />
                  Download brochure
                </Button>
              </a>
            )}
          </div>

          {/* Property Images */}
          {property?.images?.length > 0 ? (
            <div className="flex flex-wrap gap-5 mb-8 pt-4">
              {property?.images?.map((image, index) => (
                <div
                  key={index}
                  className=" relative rounded-lg overflow-hidden border border-gray-200 p-2"
                >
                  <Image
                    src={image?.imageUrl || placeholder}
                    alt="Property exterior view"
                    height={180}
                    width={220}
                    className="object-contain h-[180px] w-[220px] object-center"
                  />
                </div>
              ))}
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
                <label
                  htmlFor="property-name"
                  className="text-xs font-medium text-[#181818] block min-w-[100px]"
                >
                  Property name
                </label>
                <p className="text-[#116114] font-medium text-sm">
                  {property?.name}
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <label
                  htmlFor="property-units"
                  className="text-xs font-medium text-[#181818] min-w-[100px] pt-2"
                >
                  Property units
                </label>
                <Collapsible className="flex-1 mt-1 ">
                  <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                    <span className="text-[#116114] font-medium text-sm">
                      {property?.units?.length || 0} Unit
                      {property?.units?.length !== 1 ? "s" : ""}
                    </span>
                    <ChevronUp className="text-[#4C5560]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-3 text-sm text-gray-600">
                    <div className="text-sm text-[#4C5560] space-y-3">
                      {property?.units && property.units.length > 0 ? (
                        property.units.map((unit: PropertyUnit) => (
                          <div
                            key={unit.id}
                            className="border-l-2 border-[#116114] pl-3 py-1"
                          >
                            <p className="font-medium text-[#181818]">
                              {unit.unitType}
                            </p>
                            <div className="text-xs space-y-1 mt-1">
                              <p>Total Units: {unit.numberOfUnits}</p>
                              <p>Available: {unit.availableUnits}</p>
                              <p>
                                Price:{" "}
                                {new Intl.NumberFormat("en-NG", {
                                  style: "currency",
                                  currency: unit.currency || "NGN",
                                  minimumFractionDigits: 0,
                                }).format(unit.unitPrice)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-[#858C95]">No units available</p>
                      )}
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
        <p className=" text-sm font-medium">
          {property?.whyInvest?.[0]?.title || "N/A"}
        </p>
        <p className="text-sm font-medium text-[#4C5560]">
          {property?.whyInvest?.[0]?.description || "N/A"}
        </p>
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[#116114] mb-4">
          Advantage of investment{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property?.investmentAdvantages?.length > 0 ? (
            property?.investmentAdvantages?.map((adv, idx) => (
              <div key={idx} className="flex items-center gap-4">
                {/* <Image
                  src={
                    defaultAdvantages[idx % defaultAdvantages.length]?.icon || c
                  }
                  alt="Investment advantage icon"
                  width={40}
                  height={40}
                /> */}
                <div>
                  <h4 className=" font-semibold text-sm">
                    {adv.title || "N/A"}
                  </h4>
                  <p className="text-sm font-medium text-[#4C5560]">
                    {adv.description || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#181818]">N/A</p>
          )}
        </div>
      </div>
      <div className="bg-white mt-4 p-8 space-y-6">
        <h2 className="text-sm font-medium text-[#181818] mb-6">Features</h2>

        <div className="flex flex-wrap gap-4">
          {property?.features?.length > 0 ? (
            property?.features?.map((feature: FeatureOrAmenity) => (
              <IconDisplay
                item={{ id: true, name: feature.name, icon: feature.icon }}
                key={`feature-${feature.name}`}
              />
            ))
          ) : (
            <p className="text-sm text-[#181818]">No features available</p>
          )}
        </div>

        <h2 className="text-sm font-medium text-[#181818] mb-6">Amenities </h2>

        <div className="flex flex-wrap gap-4">
          {property?.amenities?.length > 0 ? (
            property?.amenities?.map((amenity: FeatureOrAmenity) => (
              <IconDisplay
                item={{ id: true, name: amenity.name, icon: amenity.icon }}
                key={`amenity-${amenity.name}`}
              />
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
      <div className="flex justify-end px-3 items-center py-12">
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
