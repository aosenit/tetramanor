import { Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyFeatures } from "./PropertyFeature";
import { PropertyLocation } from "./PropertyLocation";
import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePostData } from "@/hooks/useApi";
import { toast } from "sonner";

const PropertyDetailOverview = ({ property }: { property: any }) => {
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  const { mutate: addRental, isPending: isAddingRental } = usePostData(
    "customer/add-rental"
  );

  const handlePutUpForRent = () => {
    setIsRentDialogOpen(true);
  };

  const confirmPutUpForRent = () => {
    addRental(
      { purchaseId: property.id },
      {
        onSuccess: () => {
          toast.success("Property put up for rent successfully!");
          setIsRentDialogOpen(false);
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to put property up for rent");
        },
      }
    );
  };

  const cancelPutUpForRent = () => {
    setIsRentDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex justify-end w-full">
        <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[var(--primary-green)] text-white"
              onClick={handlePutUpForRent}
            >
              Put up for rent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Put Property Up for Rent</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to put{" "}
                <span className="font-semibold">{property.name}</span> up for
                rent? This action cannot be undone.
              </p>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={cancelPutUpForRent}
                  className="flex-1"
                  disabled={isAddingRental}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmPutUpForRent}
                  className="flex-1"
                  disabled={isAddingRental}
                >
                  {isAddingRental ? "Putting Up for Rent..." : "Confirm"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-4 space-y-3">
          <PropertyGallery
            gallery={property?.property?.images}
            coverImage={property?.property?.coverImage}
          />

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{property.name}</h1>
            <span className="text-primary font-medium">{property.status}</span>
          </div>

          <div className="flex items-center text-gray-500 text-sm">
            <span>{property.location}</span>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-col lg:flex-row gap-4 ">
            <div className="lg:w-2/3 bg-white rounded-lg border p-4 space-y-3">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="bg-white  border  space-y-3 p-4 rounded-lg  lg:w-1/3  divide-y">
              <div className="flex items-center gap-3 mb-4 py-3">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src={placeholder}
                    alt={property.contactPerson.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {property.contactPerson.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {property.contactPerson.role}
                  </p>
                </div>
              </div>
              <div className="space-y-3 py-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{property.contactPerson.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{property.contactPerson.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 space-y-3 mt-5">
            <h2 className="text-xl font-semibold mt-6 mb-3">Features</h2>
            <PropertyFeatures features={property.features} />
          </div>

          <div className="bg-white rounded-lg border p-4 space-y-3 mt-5">
            <h2 className="text-xl font-semibold mt-6 mb-3">Location</h2>
            <PropertyLocation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailOverview;
