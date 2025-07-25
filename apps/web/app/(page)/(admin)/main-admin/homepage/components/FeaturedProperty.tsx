"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import one from "@/assets/admin/home/one.webp";
import OngoingCampaigns from "./OngoingCampaigns";
import PropertySelector from "./modals/PropertySelector";
import { useFetchData, usePostData } from "@/hooks/useApi";
import { toast } from "sonner";
import { Loader2, AlertCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import placeholder from "@/assets/placeholder.svg";

// Confirmation Modal Component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  title,
  message,
  confirmText = "Remove",
  cancelText = "Cancel",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}) => {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="min-w-[80px]"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="min-w-[80px]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Detail Modal Component
const DetailModal = ({
  isOpen,
  onClose,
  data,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: "property" | "rental";
}) => {
  if (!isOpen || !data) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  console.log(data);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
        {/* Header with Image */}
        <div className="relative h-48 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="absolute inset-0 bg-black/30 rounded-t-xl"></div>
          <Image
            src={
              type === "property"
                ? data.images[0]?.imageUrl || placeholder
                : data.property.images[0]?.imageUrl || placeholder
            }
            alt={type === "property" ? data.name : data.property.name}
            fill
            className="object-cover rounded-t-xl"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/95 backdrop-blur-sm text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              {data?.status && type === "property" ? "Featured" : "Highlighted"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and Basic Info */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold ">
                  Name:
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {type === "property" ? data.name : data.property.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold ">
                  Location:
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {type === "property" ? data.address : data.property.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold ">
                  About:
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {type === "property" ? data.about : data.property.about}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold ">
                  Unit Amount:
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {type === "property"
                    ? data.unitAmount
                    : data.property.unitAmount}
                </p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
                <p className="text-xs text-green-600 uppercase tracking-wide font-semibold mb-1">
                  Type
                </p>
                <p className="text-sm font-bold text-green-700">
                  {type === "property"
                    ? data?.unitTypes?.map((apartment: any) => (
                        <li key={apartment}>{apartment.replace(/_/g, " ")}</li>
                      ))
                    : data?.property?.unitTypes?.map((apartment: any) => (
                        <li key={apartment}>{apartment.replace(/_/g, " ")}</li>
                      ))}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
                <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-1">
                  Status
                </p>
                <p className="text-sm font-bold text-blue-700">
                  {type === "property" ? data?.status : data?.property?.status}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
                <p className="text-xs text-purple-600 uppercase tracking-wide font-semibold mb-1">
                  Features
                </p>
                <p className="text-sm font-bold text-purple-700">
                  {type !== "property"
                    ? data?.property?.features?.map((feature: any) => (
                        <li key={feature}>{feature}</li>
                      ))
                    : data?.features?.map((feature: any) => (
                        <li key={feature}>{feature}</li>
                      ))}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
                <p className="text-xs text-orange-600 uppercase tracking-wide font-semibold mb-1">
                  Amenities
                </p>
                <p className="text-sm font-bold text-orange-700">
                  {type !== "property"
                    ? data?.property?.amenities?.map((amenity: any) => (
                        <li key={amenity}>{amenity}</li>
                      ))
                    : data?.amenities?.map((amenity: any) => (
                        <li key={amenity}>{amenity}</li>
                      ))}
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3">
                <p className="text-xs text-pink-600 uppercase tracking-wide font-semibold mb-1">
                  Why Invest
                </p>
                <p className="text-sm font-bold text-pink-700">
                  {type !== "property"
                    ? data?.property?.whyInvest?.map((val: any) => (
                        <li key={val} className="flex flex-col list-decimal">
                          <span className="text-xs text-pink--600 uppercase tracking-wide font-semibold mb-1">
                            title: {val.title}
                          </span>
                          <span className="text-xs text-pink--600 uppercase tracking-wide font-semibold mb-1">
                            description: {val.description}
                          </span>
                        </li>
                      ))
                    : data?.whyInvest?.map((val: any) => (
                        <li key={val} className="flex flex-col list-decimal">
                          <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                            title: {val.title}
                          </span>
                          <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                            description: {val.description}
                          </span>
                        </li>
                      ))}
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3">
                <p className="text-xs text-slate-600 uppercase tracking-wide font-semibold mb-1">
                  Investment Advantages
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {type !== "property"
                    ? data?.property?.investmentAdvantages?.map((val: any) => (
                        <li key={val} className="flex flex-col list-decimal">
                          <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                            title: {val.title}
                          </span>
                          <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                            description: {val.description}
                          </span>
                        </li>
                      ))
                    : data?.investmentAdvantages?.map((val: any) => (
                        <li key={val} className="flex flex-col list-decimal">
                          <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                            title: {val.title}
                          </span>
                          <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                            description: {val.description}
                          </span>
                        </li>
                      ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedProperty() {
  const [showModal, setShowModal] = React.useState(false);
  const [showRentalModal, setShowRentalModal] = React.useState(false);
  const [showFeaturedConfirm, setShowFeaturedConfirm] = React.useState(false);
  const [showRentalConfirm, setShowRentalConfirm] = React.useState(false);
  const [showFeaturedDetail, setShowFeaturedDetail] = React.useState(false);
  const [showRentalDetail, setShowRentalDetail] = React.useState(false);

  const {
    data,
    isLoading,
    error,
    refetch: refetchFeatured,
  } = useFetchData("admin/properties/featured/property");
  const {
    data: rentalData,
    isLoading: rentalLoading,
    error: rentalError,
    refetch: refetchRentals,
  } = useFetchData("rentals/all/?highlighted=true");

  const { mutateAsync: removeFeaturedProperty, isPending: isRemovingFeatured } =
    usePostData("admin/properties/featured");
  const { mutateAsync: removeHighlightedRental, isPending: isRemovingRental } =
    usePostData("rentals/remove-highlighted");

  // Extract featured property data
  const featuredProperty = data?.data;

  // Extract highlighted rental data (first item from the array)
  const highlightedRental = rentalData?.data?.items?.[0];

  const handleRemoveFeaturedProperty = async () => {
    if (!featuredProperty) return;

    try {
      await removeFeaturedProperty({
        id: featuredProperty.id,
        featured: false,
      });
      toast.success("Featured property removed successfully");
      refetchFeatured();
      setShowFeaturedConfirm(false);
    } catch (error) {
      console.error("Error removing featured property:", error);
      toast.error("Failed to remove featured property");
    }
  };

  const handleRemoveHighlightedRental = async () => {
    if (!highlightedRental) return;

    try {
      await removeHighlightedRental({
        rentalId: highlightedRental.id,
      });
      toast.success("Highlighted rental removed successfully");
      refetchRentals();
      setShowRentalConfirm(false);
    } catch (error) {
      console.error("Error removing highlighted rental:", error);
      toast.error("Failed to remove highlighted rental");
    }
  };

  // Error state component
  const ErrorState = ({
    error,
    onRetry,
    title,
  }: {
    error: any;
    onRetry: () => void;
    title: string;
  }) => (
    <div className="text-center py-8">
      <div className="flex flex-col items-center gap-3">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            Failed to load {title}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {error?.message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 bg-[#116114] text-white px-3 py-1.5 rounded text-xs hover:bg-[#116114]/90"
          >
            <RefreshCw className="w-3 h-3" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div className="text-center py-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Image
            src={placeholder}
            alt="Empty"
            width={24}
            height={24}
            className="opacity-50"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white space-y-10 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Property Section */}
          <div className="w-full rounded-lg p-4 bg-[#F4F4F4] shadow-sm space-y-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-[#181818] font-medium text-base">
                  Featured property
                </p>
                <Image
                  src={placeholder}
                  alt="Featured property"
                  width={35}
                  height={35}
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4C5560]">
                Set the featured property that appears at the top of the
                homepage
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#116114]" />
              </div>
            ) : error ? (
              <ErrorState
                error={error}
                onRetry={refetchFeatured}
                title="featured property"
              />
            ) : featuredProperty ? (
              <div className="space-y-2">
                <p className="text-sm text-[#000000] font-medium">
                  Current -{" "}
                  <span className="text-[#116114] text-sm">
                    {featuredProperty.name}
                  </span>
                </p>

                <div className="flex gap-4 items-center">
                  <Image
                    src={featuredProperty.images[0]?.imageUrl}
                    alt="Featured property"
                    width={80}
                    height={80}
                    className="rounded-lg object-cover size-[80px]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowFeaturedDetail(true)}
                      className="border bg-white font-medium rounded-md px-3 py-1 text-sm hover:bg-gray-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setShowFeaturedConfirm(true)}
                      disabled={isRemovingFeatured}
                      className="border bg-white rounded-md font-medium px-3 py-1 text-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No featured property set"
                description="Select a property to feature on the homepage"
              />
            )}

            <div>
              <button
                onClick={() => setShowModal(true)}
                disabled={isLoading}
                className="flex items-center gap-1 bg-[#116114] hover:bg-[#116114] text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select new featured property
                <MdOutlineKeyboardArrowDown />
              </button>
              <PropertySelector
                open={showModal}
                onClose={() => setShowModal(false)}
                type="property"
                onPropertySelect={() => {
                  setShowModal(false);
                  refetchFeatured();
                }}
              />
            </div>
          </div>

          {/* Rental Highlight Section */}
          <div className="w-full rounded-lg p-4 bg-[#F4F4F4] shadow-sm space-y-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-[#181818] font-medium text-base">
                  Rental Highlight
                </p>
                <Image
                  src={one}
                  alt="Featured property"
                  width={35}
                  height={35}
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4C5560]">
                Set the highlighted rental that appears at the top of the
                homepage
              </p>
            </div>

            {rentalLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#116114]" />
              </div>
            ) : rentalError ? (
              <ErrorState
                error={rentalError}
                onRetry={refetchRentals}
                title="highlighted rental"
              />
            ) : highlightedRental ? (
              <div className="space-y-2">
                <p className="text-sm text-[#000000] font-medium">
                  Current -{" "}
                  <span className="text-[#116114] text-sm">
                    {highlightedRental?.property?.name}
                  </span>{" "}
                  -{" "}
                  <span className="text-[#116114] text-sm">
                    {highlightedRental?.apartmentType?.replace(/_/g, " ")}
                  </span>
                </p>

                <div className="flex gap-4 items-center">
                  <Image
                    src={highlightedRental?.property?.images?.[0]?.imageUrl}
                    alt="Featured property"
                    width={80}
                    height={80}
                    className="rounded-lg object-cover size-[80px]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowRentalDetail(true)}
                      className="border bg-white font-medium rounded-md px-3 py-1 text-sm hover:bg-gray-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setShowRentalConfirm(true)}
                      disabled={isRemovingRental}
                      className="border bg-white rounded-md font-medium px-3 py-1 text-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No highlighted rental set"
                description="Select a rental to highlight on the homepage"
              />
            )}

            <div>
              <button
                onClick={() => setShowRentalModal(true)}
                disabled={rentalLoading}
                className="flex items-center gap-1 bg-[#116114] hover:bg-[#116114] text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select new rental highlight
                <MdOutlineKeyboardArrowDown />
              </button>
              <PropertySelector
                open={showRentalModal}
                onClose={() => setShowRentalModal(false)}
                type="rental"
                onPropertySelect={() => {
                  setShowRentalModal(false);
                  refetchRentals();
                }}
              />
            </div>
          </div>
        </div>
        <OngoingCampaigns />
      </div>

      {/* Featured Property Confirmation Modal */}
      <ConfirmationModal
        isOpen={showFeaturedConfirm}
        onClose={() => setShowFeaturedConfirm(false)}
        onConfirm={handleRemoveFeaturedProperty}
        isPending={isRemovingFeatured}
        title="Remove Featured Property"
        message={`Are you sure you want to remove "${featuredProperty?.name}" as the featured property? This will no longer appear at the top of the homepage.`}
        confirmText="Remove"
        cancelText="Cancel"
      />

      {/* Rental Highlight Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRentalConfirm}
        onClose={() => setShowRentalConfirm(false)}
        onConfirm={handleRemoveHighlightedRental}
        isPending={isRemovingRental}
        title="Remove Highlighted Rental"
        message={`Are you sure you want to remove "${highlightedRental?.property?.name}" as the highlighted rental? This will no longer appear at the top of the homepage.`}
        confirmText="Remove"
        cancelText="Cancel"
      />

      {/* Featured Property Detail Modal */}
      <DetailModal
        isOpen={showFeaturedDetail}
        onClose={() => setShowFeaturedDetail(false)}
        data={featuredProperty}
        type="property"
      />

      {/* Rental Detail Modal */}
      <DetailModal
        isOpen={showRentalDetail}
        onClose={() => setShowRentalDetail(false)}
        data={highlightedRental}
        type="rental"
      />
    </>
  );
}
