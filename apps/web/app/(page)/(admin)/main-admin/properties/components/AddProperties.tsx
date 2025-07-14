"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import {
  usePostData,
  usePutData,
  useFetchData,
  useUploadData,
} from "@/hooks/useApi";
import PropertyInfoSection from "./PropertyInfoSection";
import UnitDescriptionSection from "./UnitDescriptionSection";
import WhyInvestSection from "./WhyInvestSection";
import AdvantagesOfInvestmentSection from "./AdvantagesOfInvestmentSection";
import FeaturesAmenitiesSection from "./FeaturesAmenitiesSection";
import PropertyMediaSection from "./PropertyMediaSection";
import Loader from "@/components/Loader";
import { ChevronRight, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

// Validation schema
const propertySchema = z.object({
  name: z.string().min(1, "Property name is required"),
  address: z.string().min(1, "Address is required"),
  about: z.string().min(1, "About property is required"),
  unitAmount: z.number().min(1, "Number of units must be at least 1"),
  inquiryOptions: z
    .array(z.string())
    .min(1, "At least one inquiry option is required"),
  unitTypes: z.array(z.string()).min(1, "At least one unit type is required"),
  whyInvest: z
    .array(
      z.object({
        title: z.string().min(1, "Investment title is required"),
        description: z.string().min(1, "Investment description is required"),
      })
    )
    .optional(),
  investmentAdvantages: z
    .array(
      z.object({
        title: z.string().min(1, "Advantage title is required"),
        description: z.string().min(1, "Advantage description is required"),
      })
    )
    .optional(),
  features: z.array(z.string()),
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  documentId: z.string().optional(),
  constructionStatus: z.enum(["ONGOING", "COMPLETED", "PLANNED"]),
  accountOfficerId: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface UploadedImage {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
}

interface UploadedDocument {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  docType: string;
}

const defaultFormData: PropertyFormData = {
  name: "",
  address: "",
  about: "",
  unitAmount: 1,
  inquiryOptions: ["INQUIRY_FORM"],
  unitTypes: [],
  whyInvest: [],
  investmentAdvantages: [],
  features: [],
  amenities: [],
  images: [],
  documentId: "",
  constructionStatus: "ONGOING",
  accountOfficerId: "",
};

const unitTypeOptions = [
  "THREE_BEDROOM_APARTMENT",
  "TWO_BEDROOM_APARTMENT",
  "ONE_BEDROOM_APARTMENT",
  "STUDIO_APARTMENT",
  "FOUR_BEDROOM_MAISONETTE",
  "SEMI_DETACHED_DUPLEX",
];

const inquiryOptions = [
  { value: "INQUIRY_FORM", label: "Inquiry form" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "BOOK_INSPECTION", label: "Book inspection" },
];

export default function AddProperties() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id");
  const isEditMode = !!propertyId;

  const [formData, setFormData] = useState<PropertyFormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<PropertyFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadedDocument, setUploadedDocument] =
    useState<UploadedDocument | null>(null);
  const [customUnitType, setCustomUnitType] = useState("");
  const [advantageDialogOpen, setAdvantageDialogOpen] = useState(false);
  const [editingAdvantageIndex, setEditingAdvantageIndex] = useState<
    number | null
  >(null);
  const [advantageDraft, setAdvantageDraft] = useState({
    title: "",
    description: "",
  });
  const [advantageInvestmentDialogOpen, setAdvantageInvestmentDialogOpen] =
    useState(false);
  const [editingAdvantageInvestmentIndex, setEditingAdvantageInvestmentIndex] =
    useState<number | null>(null);
  const [advantageInvestmentDraft, setAdvantageInvestmentDraft] = useState({
    title: "",
    description: "",
  });
  const [uploadedBanner, setUploadedBanner] = useState<UploadedImage | null>(
    null
  );

  // Fetch property data if in edit mode
  const { data: propertyData, isLoading: isLoadingProperty } = useFetchData(
    propertyId ? `admin/properties/${propertyId}` : null
  );

  // Fetch account officers
  const { data: accountOfficersData, isLoading: isLoadingAccountOfficers } =
    useFetchData("account-officers");

  // API mutations
  const { mutateAsync: createProperty, isPending: isCreating } =
    usePostData("admin/properties");
  const { mutateAsync: updateProperty, isPending: isUpdating } = usePutData(
    propertyId ? `admin/properties/edit/${propertyId}` : null
  );

  // File upload mutations
  const { mutateAsync: uploadImages, isPending: isUploadingImages } =
    useUploadData("upload/images");
  const { mutateAsync: uploadDocument, isPending: isUploadingDocument } =
    useUploadData("upload/document");

  // Load property data when editing
  useEffect(() => {
    if (propertyData && isEditMode) {
      setFormData({
        name: propertyData?.data?.name || "",
        address: propertyData?.data?.address || "",
        about: propertyData?.data?.about || "",
        unitAmount: propertyData?.data?.unitAmount || 1,
        inquiryOptions: propertyData?.data?.inquiryOptions || ["INQUIRY_FORM"],
        unitTypes: propertyData?.data?.unitTypes || [],
        whyInvest: propertyData?.data?.whyInvest || [],
        investmentAdvantages: propertyData?.data?.investmentAdvantages || [],
        features: propertyData?.data?.features || [],
        amenities: propertyData?.data?.amenities || [],
        images: propertyData?.data?.images || [],
        documentId: propertyData?.data?.document[0]?.id || "",
        constructionStatus: propertyData?.data?.constructionStatus || "ONGOING",
        accountOfficerId: propertyData?.data?.accountOfficerId || "",
      });

      // Load existing images if any
      if (propertyData?.data?.images) {
        setUploadedImages(propertyData.data.images);
      }

      // Load existing document if any
      if (propertyData?.data?.document) {
        setUploadedDocument(propertyData.data.document[0]);
      }
    }
  }, [propertyData, isEditMode]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field as keyof PropertyFormData]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInquiryOptionChange = (option: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      inquiryOptions: checked
        ? [...prev.inquiryOptions, option]
        : prev.inquiryOptions.filter((opt) => opt !== option),
    }));
  };

  // Handle image upload
  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await uploadImages(formData);

      if (response.success) {
        setUploadedImages((prev) => [...prev, ...response.data]);
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            ...response.data.map((img: UploadedImage) => img.id),
          ],
        }));
        toast.success("Images uploaded successfully");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    }
  };

  // Handle document upload
  const handleDocumentUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("document", files[0]);

    try {
      const response = await uploadDocument(formData);

      if (response.success) {
        setUploadedDocument(response?.data);
        setFormData((prev) => ({
          ...prev,
          documentId: response?.data?.id,
        }));
        toast.success("Document uploaded successfully");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
    }
  };

  // Remove uploaded image
  const removeImage = (imageId: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((id) => id !== imageId),
    }));
  };

  // Remove uploaded document
  const removeDocument = () => {
    setUploadedDocument(null);
    setFormData((prev) => ({
      ...prev,
      documentId: "",
    }));
  };

  // Add handler for banner upload
  const handleBannerUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const formData = new FormData();
    formData.append("images", files[0]);
    try {
      const response = await uploadImages(formData);
      if (response.success && response.data.length > 0) {
        setUploadedBanner(response.data[0]);
        toast.success("Banner uploaded successfully");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload banner");
    }
  };
  const removeBanner = () => setUploadedBanner(null);

  // Validate form data
  const validateForm = (): boolean => {
    try {
      propertySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<PropertyFormData> = {};
        const errorMessages: string[] = [];

        error.errors.forEach((err) => {
          if (err.path[0]) {
            const fieldName = err.path[0] as string;
            if (fieldName in formData) {
              (newErrors as any)[fieldName] = err.message;
              errorMessages.push(err.message);
            }
          }
        });

        setErrors(newErrors);

        // Show the first validation error in toast
        if (errorMessages.length > 0) {
          toast.error(errorMessages[0]);
        }
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return; // Validation errors are already shown in validateForm
    // }

    setIsSubmitting(true);

    // Filter out empty features and amenities
    const cleanedFormData = {
      ...formData,
      features: formData?.features?.filter((f) => f.trim() !== ""),
      amenities: formData?.amenities?.filter((a) => a.trim() !== ""),
      whyInvest: formData?.whyInvest?.filter(
        (adv) => adv?.title?.trim() !== "" && adv?.description?.trim() !== ""
      ),
      investmentAdvantages: formData?.investmentAdvantages?.filter(
        (adv) => adv?.title?.trim() !== "" && adv?.description?.trim() !== ""
      ),
    };

    // Create payload with only filled fields
    const payload: any = {};

    // Required fields
    payload.name = cleanedFormData.name;
    payload.address = cleanedFormData.address;
    payload.about = cleanedFormData.about;
    payload.unitAmount = cleanedFormData.unitAmount;
    payload.inquiryOptions = cleanedFormData.inquiryOptions;
    payload.unitTypes = cleanedFormData.unitTypes;
    payload.whyInvest = cleanedFormData.whyInvest;
    payload.investmentAdvantages = cleanedFormData.investmentAdvantages;
    payload.constructionStatus = cleanedFormData.constructionStatus;
    payload.features = cleanedFormData.features;
    payload.amenities = cleanedFormData.amenities;

    // Images as array of strings of ids
    if (uploadedImages.length > 0) {
      payload.images = uploadedImages.map((image) => image.id);
    }

    // Banner image as string of id
    if (uploadedBanner) {
      payload.banner = uploadedBanner.id;
    }

    // Document as string of id
    if (uploadedDocument) {
      payload.documentId = uploadedDocument.id;
    }

    if (
      cleanedFormData.accountOfficerId &&
      cleanedFormData.accountOfficerId.trim() !== ""
    ) {
      payload.accountOfficerId = cleanedFormData.accountOfficerId;
    }

    try {
      if (isEditMode) {
        await updateProperty(payload);
        toast.success("Property updated successfully");
      } else {
        await createProperty(payload);
        toast.success("Property created successfully");
      }

      router.push("/main-admin/properties");
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add handler to add custom unit type
  const handleAddCustomUnitType = () => {
    const trimmed = customUnitType.trim();
    if (trimmed && !formData.unitTypes.includes(trimmed)) {
      handleInputChange("unitTypes", [...formData.unitTypes, trimmed]);
      setCustomUnitType("");
    }
  };

  const handleRemoveUnitType = (type: string) => {
    handleInputChange(
      "unitTypes",
      formData.unitTypes.filter((t) => t !== type)
    );
  };

  // Handlers for dialog
  const openAddAdvantageDialog = () => {
    setEditingAdvantageIndex(null);
    setAdvantageDraft({ title: "", description: "" });
    setAdvantageDialogOpen(true);
  };
  const openEditAdvantageDialog = (index: number) => {
    setEditingAdvantageIndex(index);
    const advantages = formData.whyInvest.advantages || [];
    setAdvantageDraft({
      title: advantages[index]?.title || "",
      description: advantages[index]?.description || "",
    });
    setAdvantageDialogOpen(true);
  };
  const handleAdvantageDialogSave = () => {
    if (!advantageDraft.title.trim() || !advantageDraft.description.trim())
      return;
    let newAdvantages = [...(formData.whyInvest.advantages || [])];
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
        advantages: (prev.whyInvest.advantages || []).filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Handlers for dialog
  const openAddAdvantageInvestmentDialog = () => {
    setEditingAdvantageInvestmentIndex(null);
    setAdvantageInvestmentDraft({ title: "", description: "" });
    setAdvantageInvestmentDialogOpen(true);
  };
  const openEditAdvantageInvestmentDialog = (index: number) => {
    setEditingAdvantageInvestmentIndex(index);
    const advantages = formData.investmentAdvantages || [];
    setAdvantageInvestmentDraft({
      title: advantages[index]?.title || "",
      description: advantages[index]?.description || "",
    });
    setAdvantageInvestmentDialogOpen(true);
  };
  const handleAdvantageInvestmentDialogSave = () => {
    if (
      !advantageInvestmentDraft.title.trim() ||
      !advantageInvestmentDraft.description.trim()
    )
      return;
    let newAdvantages = [...(formData.investmentAdvantages || [])];
    if (editingAdvantageInvestmentIndex !== null) {
      newAdvantages[editingAdvantageInvestmentIndex] = {
        ...advantageInvestmentDraft,
      };
    } else {
      newAdvantages.push({ ...advantageInvestmentDraft });
    }
    setFormData((prev) => ({
      ...prev,
      investmentAdvantages: newAdvantages,
    }));
    setAdvantageInvestmentDialogOpen(false);
  };
  const handleAdvantageInvestmentDialogCancel = () => {
    setAdvantageInvestmentDialogOpen(false);
  };
  const handleRemoveAdvantageInvestment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      investmentAdvantages: (prev.investmentAdvantages || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Loading state for edit mode
  if (isEditMode && isLoadingProperty) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-1">
            <Link href="/main-admin/properties">Properties</Link>
            <span className="flex items-center text-[#858C95] space-x-[2px]">
              <ChevronRight className="" />
            </span>
            <span className="text-[#858C95]">
              {isEditMode ? "Edit Property" : "Add Property"}
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-semibold text-[#116114]">
              {isEditMode ? "Edit Property" : "Add New Property"}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 bg-white">
            <PropertyInfoSection
              formData={formData}
              errors={errors}
              accountOfficersData={accountOfficersData}
              isLoadingAccountOfficers={isLoadingAccountOfficers}
              handleInputChange={handleInputChange}
              handleInquiryOptionChange={handleInquiryOptionChange}
              inquiryOptions={inquiryOptions}
            />
          </div>

          <div className="bg-white mt-4 p-6">
            <UnitDescriptionSection
              formData={formData}
              errors={errors}
              customUnitType={customUnitType}
              setCustomUnitType={setCustomUnitType}
              handleInputChange={handleInputChange}
              handleAddCustomUnitType={handleAddCustomUnitType}
              handleRemoveUnitType={handleRemoveUnitType}
              unitTypeOptions={unitTypeOptions}
            />
          </div>

          <div className="bg-white mt-4 p-6">
            <WhyInvestSection
              formData={formData}
              advantageDialogOpen={advantageDialogOpen}
              editingAdvantageIndex={editingAdvantageIndex}
              advantageDraft={advantageDraft}
              setAdvantageDialogOpen={setAdvantageDialogOpen}
              setAdvantageDraft={setAdvantageDraft}
              openAddAdvantageDialog={openAddAdvantageDialog}
              openEditAdvantageDialog={openEditAdvantageDialog}
              handleAdvantageDialogSave={handleAdvantageDialogSave}
              handleAdvantageDialogCancel={handleAdvantageDialogCancel}
              handleRemoveAdvantage={handleRemoveAdvantage}
              errors={errors}
            />
          </div>

          <div className="bg-white mt-4 p-6">
            <AdvantagesOfInvestmentSection
              formData={formData}
              advantageInvestmentDialogOpen={advantageInvestmentDialogOpen}
              editingAdvantageInvestmentIndex={editingAdvantageInvestmentIndex}
              advantageInvestmentDraft={advantageInvestmentDraft}
              setAdvantageInvestmentDialogOpen={
                setAdvantageInvestmentDialogOpen
              }
              setAdvantageInvestmentDraft={setAdvantageInvestmentDraft}
              openAddAdvantageInvestmentDialog={
                openAddAdvantageInvestmentDialog
              }
              openEditAdvantageInvestmentDialog={
                openEditAdvantageInvestmentDialog
              }
              handleAdvantageInvestmentDialogSave={
                handleAdvantageInvestmentDialogSave
              }
              handleAdvantageInvestmentDialogCancel={
                handleAdvantageInvestmentDialogCancel
              }
              handleRemoveAdvantageInvestment={handleRemoveAdvantageInvestment}
              errors={errors}
            />
          </div>

          <div className="bg-white mt-4 p-6">
            <FeaturesAmenitiesSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </div>

          <div className="bg-white mt-4 p-6">
            <PropertyMediaSection
              uploadedImages={uploadedImages}
              uploadedBanner={uploadedBanner}
              uploadedDocument={uploadedDocument}
              isUploadingImages={isUploadingImages}
              isUploadingDocument={isUploadingDocument}
              handleImageUpload={handleImageUpload}
              handleDocumentUpload={handleDocumentUpload}
              handleBannerUpload={handleBannerUpload}
              removeImage={removeImage}
              removeBanner={removeBanner}
              removeDocument={removeDocument}
            />
          </div>

          {/* Submit Section */}
          <div className="bg-white mt-4 p-6">
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
                disabled={
                  isSubmitting ||
                  isCreating ||
                  isUpdating ||
                  isUploadingImages ||
                  isUploadingDocument
                }
              >
                {isSubmitting || isCreating || isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditMode ? "Update Property" : "Create Property"}
                  </>
                )}
              </Button>
              <Link href="/main-admin/properties">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
