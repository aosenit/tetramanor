"use client";

import { useState, useEffect, Suspense } from "react";
import {
  PiCurrencyNgn,
  PiCurrencyCircleDollar,
  PiCurrencyEur,
} from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@chakra-ui/react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  whyInvest: {
    title: string;
    description: string;
    advantages: Array<{
      title: string;
      description: string;
    }>;
  };
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
  whyInvest: {
    title: "",
    description: "",
    advantages: [
      {
        title: "",
        description: "",
      },
    ],
  },
};

function AddInvestmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const investmentId = searchParams.get("id");
  const isEditing = !!investmentId;

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [imageName, setImageName] = useState("Featured Image");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Why Invest dialog state
  const [advantageDialogOpen, setAdvantageDialogOpen] = useState(false);
  const [editingAdvantageIndex, setEditingAdvantageIndex] = useState<
    number | null
  >(null);
  const [advantageDraft, setAdvantageDraft] = useState({
    title: "",
    description: "",
  });

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
        whyInvest: investment.whyInvest || {
          title: "",
          description: "",
          advantages: [{ title: "", description: "" }],
        },
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

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: undefined,
    }));
    setImagePreview(null);
    setImageName("Featured Image");
  };

  // Why Invest dialog handlers
  const openAddAdvantageDialog = () => {
    setEditingAdvantageIndex(null);
    setAdvantageDraft({ title: "", description: "" });
    setAdvantageDialogOpen(true);
  };

  const openEditAdvantageDialog = (index: number) => {
    setEditingAdvantageIndex(index);
    setAdvantageDraft({
      title: formData.whyInvest.advantages[index].title,
      description: formData.whyInvest.advantages[index].description,
    });
    setAdvantageDialogOpen(true);
  };

  const handleAdvantageDialogSave = () => {
    if (!advantageDraft.title.trim() || !advantageDraft.description.trim())
      return;
    let newAdvantages = [...formData.whyInvest.advantages];
    if (editingAdvantageIndex !== null) {
      newAdvantages[editingAdvantageIndex] = { ...advantageDraft };
    } else {
      newAdvantages.push({ ...advantageDraft });
    }
    setFormData((prev) => ({
      ...prev,
      whyInvest: { ...prev.whyInvest, advantages: newAdvantages },
    }));
    setAdvantageDialogOpen(false);
  };

  const handleAdvantageDialogCancel = () => {
    setAdvantageDialogOpen(false);
  };

  const handleRemoveAdvantage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whyInvest: {
        ...prev.whyInvest,
        advantages: prev.whyInvest.advantages.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent, action: "publish" | "draft") => {
    e.preventDefault();

    // Filter out empty advantages
    const cleanedFormData = {
      ...formData,
      whyInvest: formData.whyInvest.advantages.filter(
        (adv) => adv.title.trim() !== "" && adv.description.trim() !== ""
      ),
    };

    const submitData = {
      ...cleanedFormData,
      status: action === "publish" ? "PUBLISHED" : "DRAFT",
    };

    // Create FormData for both create and update operations
    const formDataToSend = new FormData();

    // Add all text fields
    Object.entries(submitData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "object" && value instanceof File) {
          formDataToSend.append(key, value);
        } else if (key === "whyInvest") {
          // Handle whyInvest as JSON string
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

        {/* Why Invest Section */}
        <div>
          <h4 className="font-medium text-[#4C5560] mb-4">Why Invest? </h4>
          <div className="flex flex-col gap-4">
            {formData.whyInvest.advantages
              .filter(
                (advantage) =>
                  advantage.title.trim() !== "" &&
                  advantage.description.trim() !== ""
              )
              .map((advantage, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-[#181818]">
                      {advantage.title}
                    </p>
                    <p className="text-[#4C5560] text-sm">
                      {advantage.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditAdvantageDialog(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAdvantage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            <Button
              type="button"
              variant="outline"
              onClick={openAddAdvantageDialog}
              className="text-[#116114] hover:text-[#116114] text-sm"
            >
              Add Why Invest Advantage
            </Button>
          </div>
        </div>

        {/* Upload Buttons - Show for both new and editing */}
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
                <img
                  src={imagePreview}
                  alt="Featured Image Preview"
                  className="w-48 h-32 object-cover rounded-md border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* <h4 className="font-medium text-[#4C5560] mb-4">
            Visibility and status{" "}
          </h4>
         
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
          </div> */}
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

      {/* Why Invest Dialog */}
      <AdvantageDialog
        isOpen={advantageDialogOpen}
        onClose={handleAdvantageDialogCancel}
        onSave={handleAdvantageDialogSave}
        advantageDraft={advantageDraft}
        setAdvantageDraft={setAdvantageDraft}
        editingAdvantageIndex={editingAdvantageIndex}
      />
    </div>
  );
}

export default function AddInvestment() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      }
    >
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

function AdvantageDialog({
  isOpen,
  onClose,
  onSave,
  advantageDraft,
  setAdvantageDraft,
  editingAdvantageIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  advantageDraft: { title: string; description: string };
  setAdvantageDraft: (draft: { title: string; description: string }) => void;
  editingAdvantageIndex: number | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingAdvantageIndex !== null
              ? "Edit Why Invest Advantage"
              : "Add Why Invest Advantage"}
          </DialogTitle>
          <DialogDescription>
            {editingAdvantageIndex !== null
              ? "Edit the details of the advantage."
              : "Add a new advantage to why investors should invest in this offering."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={advantageDraft.title}
              onChange={(e) =>
                setAdvantageDraft({ ...advantageDraft, title: e.target.value })
              }
              placeholder="e.g., High Returns"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={advantageDraft.description}
              onChange={(e) =>
                setAdvantageDraft({
                  ...advantageDraft,
                  description: e.target.value,
                })
              }
              placeholder="e.g., Our investment offers a guaranteed return of 15% per annum."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave}>
            {editingAdvantageIndex !== null
              ? "Update Advantage"
              : "Add Advantage"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
