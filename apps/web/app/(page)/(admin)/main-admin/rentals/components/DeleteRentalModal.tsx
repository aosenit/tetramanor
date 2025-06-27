"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteData } from "@/hooks/useApi";

interface Rental {
  id: string;
  propertyId: string;
  apartmentType: string;
  location: string;
  rent: number;
  frequency: string;
  agencyFee: number;
  cautionFee: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    name: string;
    address: string;
    about: string;
    featured: boolean;
    featuredAt: string | null;
    inquiryOptions: string[];
    whyInvest: {
      title: string;
      advantages: Array<{
        title: string;
        description: string;
      }>;
      description: string;
    };
    features: string[];
    amenities: string[];
    createdAt: string;
    brochure: string | null;
    constructionStatus: string;
    accountOfficerId: string | null;
    createdById: string | null;
    status: string;
    unitAmount: number;
    unitTypes: string[];
  };
}

interface DeleteRentalModalProps {
  open: boolean;
  onClose: () => void;
  rental?: Rental | null;
  onSuccess: () => void;
}

export default function DeleteRentalModal({
  open,
  onClose,
  rental,
  onSuccess,
}: DeleteRentalModalProps) {
  const { mutateAsync: deleteRental, isPending: isDeleting } = useDeleteData(
    rental ? `rentals/${rental.id}` : null
  );

  const handleDelete = async () => {
    if (!rental) return;

    try {
      await deleteRental();
      toast.success("Rental deleted successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error deleting rental:", error);
    }
  };

  // Format rent amount
  const formatRent = (rent: number, frequency: string) => {
    const formattedRent = rent.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    switch (frequency) {
      case "MONTHLY":
        return `${formattedRent}/Month`;
      case "YEARLY":
        return `${formattedRent}/Year`;
      case "QUARTERLY":
        return `${formattedRent}/Quarter`;
      default:
        return formattedRent;
    }
  };

  // Format apartment type
  const formatApartmentType = (type: string) => {
    return type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Rental
              </h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete this rental?
            </p>
            {rental && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-900">
                  {rental.property.name}
                </p>
                <p className="text-sm text-gray-600">
                  {formatApartmentType(rental.apartmentType)} •{" "}
                  {rental.location}
                </p>
                <p className="text-sm text-gray-600">
                  {formatRent(rental.rent, rental.frequency)}
                </p>
              </div>
            )}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">Warning</p>
                <p className="text-sm text-red-700">
                  This will permanently delete the rental and all associated
                  data. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Rental
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
