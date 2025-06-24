"use client";

import { useState, useEffect } from "react";
import {
  PiCurrencyNgn,
  PiCurrencyCircleDollar,
  PiCurrencyEur,
} from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@chakra-ui/react";
import { FaRegFileLines } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { IoImageOutline } from "react-icons/io5";
import { MdArrowBackIosNew } from "react-icons/md";
import { Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useUploadData,
  useFetchData,
  useUploadPatchData,
} from "@/hooks/useApi";
import { CustomDropdown } from "./components/CustomDropdown";

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
};

export default function AddInvestment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const investmentId = searchParams.get("id");
  const isEditing = !!investmentId;

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [contractName, setContractName] = useState("Contract (PDF)");
  const [brochureName, setBrochureName] = useState("Upload Brochure");
  const [imageName, setImageName] = useState("Featured Image");

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
  } = useUploadPatchData(`investments/${investmentId}`);

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
      });

      // Set current file names if they exist
      if (investment.contractPDF) {
        setContractName("Current Contract (PDF)");
      }
      if (investment.brochurePDF) {
        setBrochureName("Current Brochure (PDF)");
      }
      if (investment.featuredImage) {
        setImageName("Current Featured Image");
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
    }
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

  const handleCancel = () => {
    router.push("/main-admin/investments");
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
        <span className="text-[#323539] font-medium">Investments &gt; </span>
        <span className="text-[#858C95] font-medium">
          {isEditing ? "Edit investment" : "Add new investments"}
        </span>
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
                  parseFloat(e.target.value) || 0
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
                handleInputChange("minAmount", parseFloat(e.target.value) || 0)
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
              { label: "EUR", icon: <PiCurrencyEur /> },
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

        {/* Offer End Date */}
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Offer End Date
          </label>
          <Input
            type="date"
            className="bg-[#E5E5E7] border-none"
            value={formData.offerEndDate}
            onChange={(e) => handleInputChange("offerEndDate", e.target.value)}
          />
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

        {/* Upload Buttons - Show for both new and editing */}
        <div className="flex flex-wrap items-center gap-10">
          <FileUpload
            label={contractName}
            icon={<FaRegFileLines />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setContractName(file.name);
                handleFileChange("contractPDF", file);
              }
            }}
            accept=".pdf"
          />

          <FileUpload
            label={brochureName}
            icon={<CiFileOn />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setBrochureName(file.name);
                handleFileChange("brochurePDF", file);
              }
            }}
            accept=".pdf"
          />

          <FileUpload
            label={imageName}
            icon={<IoImageOutline />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageName(file.name);
                handleFileChange("featuredImage", file);
              }
            }}
            accept="image/*"
          />
        </div>

        <div>
          <h4 className="font-medium text-[#4C5560] mb-4">
            Visibility and status{" "}
          </h4>
          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CustomDropdown
              label="Status *"
              options={[
                { label: "DRAFT" },
                { label: "PUBLISHED" },
                { label: "UNPUBLISHED" },
              ]}
              selected={formData.status}
              onSelect={(value) => handleInputChange("status", value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6">
          <div className="flex justify-center gap-6 items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="ghost"
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
          </div>
        </div>

        <div className="flex justify-between items-center py-8">
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
