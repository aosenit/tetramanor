"use client";

import { useState, useEffect, Suspense } from "react";
import { PiCurrencyNgn, PiCurrencyCircleDollar } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@chakra-ui/react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

import { IoImageOutline } from "react-icons/io5";
import { MdArrowBackIosNew } from "react-icons/md";
import { Save, Loader2, X, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useUploadData,
  useFetchData,
  useUploadPutData,
  useDeleteData,
} from "@/hooks/useApi";
import { CustomDropdown } from "./components/CustomDropdown";
import Image from "next/image";
import Loader from "@/components/Loader";

interface FormData {
  projectName: string;
  investmentType: string;
  estimatedROI: number;
  minAmount: number;
  duration: string;
  status: string;
  currency: string;
  description: string;
  contractPDF?: File;
  brochurePDF?: File;
  featuredImage?: File;
  offerEndDate: string;
  projectSize?: string;
  benefits: string[];
}

const defaultFormData: FormData = {
  projectName: "",
  investmentType: "FIXED_ROI",
  estimatedROI: 0,
  minAmount: 0,
  duration: "",
  status: "DRAFT",
  currency: "NGN",
  description: "",
  offerEndDate: "",
  projectSize: "",
  benefits: [],
};

function AddInvestmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const investmentId = searchParams.get("id");
  const isEditing = !!investmentId;

  const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [imageName, setImageName] = useState("Featured Image");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Benefits state
  const [newBenefit, setNewBenefit] = useState("");

  // Fetch investment data for editing
  const {
    data: investmentResponse,
    isLoading: isLoadingInvestment,
    error: investmentError,
  } = useFetchData(investmentId ? `investments/${investmentId}` : "");

  // Create investment mutation
  const {
    mutate: createInvestment,
    isPending: isCreating,
    error: createError,
  } = useUploadData("investments");

  // Update investment mutation with file upload support
  const {
    mutate: updateInvestment,
    isPending: isUpdating,
    error: updateError,
  } = useUploadPutData(`investments/${investmentId}`);

  const { mutateAsync: deleteInvestmentImage, isPending: isDeletingImage } =
    useDeleteData(
      investmentId && imageIdToDelete
        ? `upload/images/${imageIdToDelete}`
        : null
    );

  // Load investment data into form when editing
  useEffect(() => {
    if (investmentResponse?.data && isEditing) {
      const investment = investmentResponse.data;
      setFormData({
        projectName: investment.projectName || "",
        investmentType: investment.investmentType || "FIXED_ROI",
        estimatedROI: investment.estimatedROI || 0,
        minAmount: investment.minAmount || 0,
        duration: investment.duration || "",
        status: investment.status || "DRAFT",
        currency: investment.currency || "NGN",
        description: investment.description || "",
        offerEndDate: investment.offerEndDate
          ? new Date(investment.offerEndDate).toISOString().split("T")[0]
          : "",
        projectSize: investment.projectSize || 0,
        benefits: investment.benefits || [],
      });

      if (investment?.image[0]) {
        setImageName("Current Featured Image");
        setImagePreview(investment?.image[0]?.imageUrl);
      }
    }
  }, [investmentResponse, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));

      // Create preview for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setImageName(file.name);
      }
    }
  };

  const handleRemoveImage = async (imageId?: string) => {
    if (isEditing) {
      // If imageId is provided, use it; otherwise use the current image from investment data
      const idToDelete = imageId || investmentResponse?.data?.image[0]?.id;

      if (idToDelete) {
        try {
          setImageIdToDelete(idToDelete);
          await deleteInvestmentImage();
          setImagePreview(null);
          setImageName("Featured Image");
          setImageIdToDelete(null);

          // Remove the featuredImage from form data if it exists
          setFormData((prev) => ({
            ...prev,
            featuredImage: undefined,
          }));
        } catch (error) {
          console.error("Error deleting image:", error);
          setImageIdToDelete(null);
        }
      } else {
        // If no server image to delete, just clear the preview (newly uploaded image)
        setImagePreview(null);
        setImageName("Featured Image");
        setFormData((prev) => ({
          ...prev,
          featuredImage: undefined,
        }));
      }
    } else {
      // For new investments, just clear the preview and form data
      setImagePreview(null);
      setImageName("Featured Image");
      setFormData((prev) => ({
        ...prev,
        featuredImage: undefined,
      }));
    }
  };

  // Benefits handlers
  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent, action: "publish" | "draft") => {
    e.preventDefault();

    const submitData = {
      ...formData,
      status: action === "publish" ? "PUBLISHED" : "DRAFT",
    };

    // Create FormData for both create and update operations
    const formDataToSend = new FormData();

    // Add all text fields
    Object.entries(submitData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "object" && value instanceof File) {
          formDataToSend.append(key, value);
        } else if (key === "benefits") {
          // Handle benefits as JSON string
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      }
    });

    if (isEditing) {
      // For editing, use PATCH request with multipart form data
      updateInvestment(formDataToSend, {
        onSuccess: () => {
          router.push("/main-admin/investments");
        },
      });
    } else {
      // For creating, use POST request with multipart form data
      createInvestment(formDataToSend, {
        onSuccess: () => {
          router.push("/main-admin/investments");
        },
      });
    }
  };

  if (isLoadingInvestment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading investment details...</p>
        </div>
      </div>
    );
  }

  if (investmentError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading investment details</p>
          <Button
            onClick={() => router.push("/main-admin/investments")}
            variant="outline"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = isCreating || isUpdating;
  const error = createError || updateError;

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E5E7] pb-4">
        <Breadcrumb
          items={[
            { label: "Investments", href: "/main-admin/investments" },
            {
              label: isEditing ? "Edit investment" : "Add new investments",
              href: "#",
              isActive: true,
            },
          ]}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error?.message || "An error occurred"}
        </div>
      )}

      {/* Basic Info */}
      <form
        onSubmit={(e) => handleSubmit(e, "publish")}
        className="space-y-6 mt-4 bg-white p-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-medium text-[#116114] mb-4">
          {isEditing
            ? "Edit investment offering"
            : "Add new investment offering"}
        </h2>
        <p className="text-[#4C5560] font-medium">Basic information</p>

        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Investment name *
          </label>
          <Input
            placeholder="Enter investment name"
            className="bg-[#E5E5E7] border border-[#116114]"
            value={formData.projectName}
            onChange={(e) => handleInputChange("projectName", e.target.value)}
            required
          />
        </div>

        {/* Investment Type */}
        <div className="flex items-center gap-8">
          <div
            onClick={() => handleInputChange("investmentType", "FIXED_ROI")}
            className="flex items-center cursor-pointer gap-2"
          >
            <div
              className={`w-4 h-4 rounded-full ${
                formData.investmentType === "FIXED_ROI"
                  ? "bg-[#116114]"
                  : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-[#181818]">Fixed ROI</span>
          </div>
          <div
            onClick={() => handleInputChange("investmentType", "EQUITY_SHARE")}
            className="flex items-center cursor-pointer gap-2"
          >
            <div
              className={`w-4 h-4 rounded-full ${
                formData.investmentType === "EQUITY_SHARE"
                  ? "bg-[#116114]"
                  : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-[#181818]">Equity Share</span>
          </div>
        </div>

        {/* ROI and Min Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Estimated ROI (%) *
            </label>
            <Input
              type="number"
              placeholder="Enter ROI percentage"
              className="bg-[#E5E5E7] border-none"
              value={formData.estimatedROI}
              onChange={(e) =>
                handleInputChange(
                  "estimatedROI",
                  parseFloat(e.target.value) || ""
                )
              }
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Minimum Amount *
            </label>
            <Input
              type="number"
              placeholder="Enter minimum amount"
              className="bg-[#E5E5E7] border-none"
              value={formData.minAmount}
              onChange={(e) =>
                handleInputChange("minAmount", parseFloat(e.target.value) || "")
              }
              required
            />
          </div>
        </div>

        {/* Currency & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomDropdown
            label="Currency *"
            options={[
              { label: "NGN", icon: <PiCurrencyNgn /> },
              { label: "USD", icon: <PiCurrencyCircleDollar /> },
              // { label: "EUR", icon: <PiCurrencyEur /> },
            ]}
            selected={formData.currency}
            onSelect={(value) => handleInputChange("currency", value)}
          />

          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Duration *
            </label>
            <Input
              placeholder="e.g., 12 months"
              className="bg-[#E5E5E7] border-none"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Project Size & Number of Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Offer End Date */}
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Offer End Date
            </label>
            <Input
              type="date"
              className="bg-[#E5E5E7] border-none"
              value={formData.offerEndDate}
              onChange={(e) =>
                handleInputChange("offerEndDate", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Project Size
            </label>
            <Input
              type="number"
              placeholder="Enter project size"
              className="bg-[#E5E5E7] border-none"
              value={formData.projectSize}
              onChange={(e) =>
                handleInputChange(
                  "projectSize",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm text-[#181818] font-medium">
            Description *
          </label>
          <Textarea
            className="!border-none !bg-[#E5E5E7]"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter investment description"
            required
          />
        </div>

        {/* Benefits Section */}
        <div>
          <h4 className="font-medium text-[#4C5560] mb-4">Benefits</h4>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {formData.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md flex justify-between items-center w-fit"
                >
                  <p className="font-medium text-[#181818]">{benefit}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBenefit(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Enter a benefit"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBenefit();
                  }
                }}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addBenefit}
                className="text-[#116114] hover:text-[#116114] text-sm"
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Buttons - Show for both new and editing */}
        <div className="">
          <h4 className="font-medium text-[#4C5560] mb-4">Featured Image</h4>
          <div className="flex flex-wrap items-center gap-10">
            <div className="space-y-4">
              <FileUpload
                label={imageName}
                icon={<IoImageOutline />}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange("featuredImage", file);
                  }
                }}
                accept="image/*"
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative inline-block">
                  <Image
                    src={imagePreview}
                    width={192}
                    height={128}
                    alt="Featured Image Preview"
                    className="w-48 h-32 object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleRemoveImage(investmentResponse?.data?.image[0]?.id)
                    }
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                    disabled={isDeletingImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-8">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save as draft
                </>
              )}
            </Button>
            <Button
              type="submit"
              className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? "Update Investment" : "Publish Investment"}
                </>
              )}
            </Button>
          </div>
          <Link href="/main-admin/investments">
            <Button
              variant="ghost"
              type="button"
              className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
            >
              <MdArrowBackIosNew /> Back to homepage
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function AddInvestment() {
  return (
    <Suspense fallback={<Loader />}>
      <AddInvestmentContent />
    </Suspense>
  );
}

function FileUpload({
  label,
  icon,
  onChange,
  accept,
}: {
  label: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}) {
  return (
    <label className="w-72 flex rounded-md overflow-hidden cursor-pointer">
      <div className="flex items-center w-full bg-[#E5E5E5] px-3 py-2">
        <span className="text-[#858C95] flex items-center gap-2 text-sm truncate">
          {label} {icon}
        </span>
      </div>
      <div className="bg-white text-[#323539] px-3 flex items-center justify-center border-l border-gray-300 text-sm">
        Upload
      </div>
      <input
        type="file"
        className="hidden"
        onChange={onChange}
        accept={accept}
      />
    </label>
  );
}
