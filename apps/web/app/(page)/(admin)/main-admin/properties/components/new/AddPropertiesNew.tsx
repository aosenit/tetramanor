"use client";
import { useState, useEffect, SetStateAction } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import {
  usePostData,
  usePutData,
  useFetchData,
  useUploadData,
  useDeleteData,
} from "@/hooks/useApi";

import Loader from "@/components/Loader";
import { ChevronRight, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdvantagesOfInvestmentSection from "../AdvantagesOfInvestmentSection";
import FeaturesAmenitiesSection from "../FeaturesAmenitiesSection";
import PropertyInfoSection from "../PropertyInfoSection";
import PropertyMediaSection from "../PropertyMediaSection";
import UnitDescriptionSection from "./UnitDescriptionSectionNew";
import WhyInvestSection from "../WhyInvestSection";
import { propertySchema, unitSchema } from "@/lib/schema";

// Validation schema

type PropertyFormData = z.infer<typeof propertySchema>;
type UnitsFormProp = z.infer<typeof unitSchema>;
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

  const { data: specs } = useFetchData("/admin/property-specs");
  const { features, amenities } = specs?.data || {};
  console.log(specs);

  const defaultFormData: PropertyFormData = {
    name: "",
    address: "",
    about: "",
    units: [],
    inquiryOptions: ["INQUIRY_FORM"],
    whyInvest: [],
    investmentAdvantages: [],
    features: [],
    amenities: [],
    images: [],
    documentId: "",
    constructionStatus: "ONGOING",
    accountOfficerId: "",
    paymentThreshold: 0,
  };

  const [formData, setFormData] = useState<PropertyFormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<PropertyFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);

  const [bannerIdToDelete, setBannerIdToDelete] = useState<string | null>(null);
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
  const [unitsForm, setUnitsForm] = useState<UnitsFormProp[] | []>([
    {
      description: "",
      unitType: "",
      numberOfUnits: 0,
      currency: "USD",
      unitPrice: 0,
    },
  ]);
  const initialFeatures = features?.filter((item: any) => item.icon !== "");
  const initialAmenities = amenities?.filter((item: any) => item.icon !== "");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedAmenities, setSelectedAmenites] = useState([]);

  // console.log(initialFeatures);
  useEffect(() => {
    if (!isEditMode && (initialFeatures || initialAmenities)) {
      setSelectedFeatures(initialFeatures);
      setSelectedAmenites(initialAmenities);
    }
  }, [features, amenities, isEditMode]);

  useEffect(() => {
    const featureName = selectedFeatures.map((f: any) =>
      typeof f === "string" ? f : f.name
    );
    const amenityName = selectedAmenities.map((a: any) =>
      typeof a === "string" ? a : a.name
    );

    handleInputChange("features", featureName);
    handleInputChange("amenities", amenityName);

    console.log("Selected feature IDs:", featureName);
    console.log("Selected amenity IDs:", amenityName);
  }, [selectedFeatures, selectedAmenities]);

  const handleAddUnitsForm = () => {
    setUnitsForm((prev) => [
      ...prev,
      {
        description: "",
        unitType: "",
        numberOfUnits: 0,
        currency: "USD",
        price: 0,
      },
    ]);
  };

  // Remove a specific unit form by index
  const handleRemoveUnitsForm = (index: number) => {
    setUnitsForm((prev) => prev.filter((_, i) => i !== index));
  };

  // Optional: handle changes in a specific field of a unit
  const handleUnitChange = (
    index: number,
    field: keyof UnitsFormProp,
    value: any
  ) => {
    setUnitsForm((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Fetch property data if in edit mode
  const { data: propertyData, isLoading: isLoadingProperty } = useFetchData(
    propertyId ? `admin/properties/${propertyId}` : null
  );
  console.log(propertyData?.data);
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

  const { mutateAsync: deletePropertyImage, isPending: isDeletingImage } =
    useDeleteData(
      propertyId
        ? imageIdToDelete
          ? `upload/images/${imageIdToDelete}`
          : `upload/images/${bannerIdToDelete}`
        : null
    );

  // Load property data when editing
  console.log(formData);
  useEffect(() => {
    if (propertyData && isEditMode) {
      setFormData({
        name: propertyData?.data?.name || "",
        address: propertyData?.data?.address || "",
        about: propertyData?.data?.about || "",
        // unitAmount: propertyData?.data?.unitAmount || 1,
        // unitTypes: propertyData?.data?.unitTypes || [],
        units: propertyData?.data?.units || [],
        inquiryOptions: propertyData?.data?.inquiryOptions || ["INQUIRY_FORM"],
        whyInvest: propertyData?.data?.whyInvest || [],
        investmentAdvantages: propertyData?.data?.investmentAdvantages || [],
        features: propertyData?.data?.features || [], // No default features when editing
        amenities: propertyData?.data?.amenities || [], // No default amenities when editing
        images: propertyData?.data?.images || [],
        documentId: propertyData?.data?.document[0]?.id || "",
        constructionStatus: propertyData?.data?.constructionStatus || "ONGOING",
        accountOfficerId: propertyData?.data?.accountOfficerId || "",
        paymentThreshold: propertyData?.data?.paymentThreshold || 0,
      });

      // Load existing images if any
      if (propertyData?.data?.images) {
        setUploadedImages(propertyData.data.images);
      }

      // Load existing document if any
      if (propertyData?.data?.document) {
        setUploadedDocument(propertyData.data.document[0]);
      }

      // Load existing banner/cover image if any
      if (propertyData?.data?.coverImage) {
        setUploadedBanner(propertyData.data.coverImage);
      }

      // Load existing units into unitsForm
      if (propertyData?.data?.units && propertyData.data.units.length > 0) {
        setUnitsForm(propertyData.data.units);
      }

      // Load existing features and amenities into selected states
      if (
        propertyData?.data?.features &&
        propertyData.data.features.length > 0
      ) {
        console.log(
          "Loading features in edit mode:",
          propertyData.data.features
        );
        setSelectedFeatures(propertyData.data.features);
      }
      if (
        propertyData?.data?.amenities &&
        propertyData.data.amenities.length > 0
      ) {
        console.log(
          "Loading amenities in edit mode:",
          propertyData.data.amenities
        );
        setSelectedAmenites(propertyData.data.amenities);
      }
    }
  }, [propertyData, isEditMode, propertyId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const unitFields = [
        "unitPrice",
        "currency",
        "numberOfUnits",
        "unitType",
        "description",
      ];
      if (unitFields.includes(field)) {
        const updatedUnits = [...(prev.units || [])];
        if (updatedUnits.length === 0) {
          updatedUnits.push({
            unitType: "",
            numberOfUnits: 0,
            unitPrice: 0,
            description: "",
            currency: "USD",
          });
        }

        updatedUnits[0] = { ...updatedUnits[0], [field]: value };
        return {
          ...prev,
          units: updatedUnits,
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
    if (errors[field as keyof typeof errors]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
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
  const removeImage = async (imageId: string) => {
    // update when isedit
    if (isEditMode) {
      try {
        setImageIdToDelete(imageId);
        await deletePropertyImage();
        setImageIdToDelete(null);
        setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
        setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((id) => id !== imageId),
        }));
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    } else {
      setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((id) => id !== imageId),
      }));
    }
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
  const removeBanner = async (id: string) => {
    // use the deleteimage endpoint for banners too
    if (id) {
      setBannerIdToDelete(id);
      await deletePropertyImage();
      setBannerIdToDelete(null);
      setUploadedBanner(null);
    } else {
      setUploadedBanner(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return; // Validation errors are already shown in validateFor
    // }

    setIsSubmitting(true);

    // Filter out empty features and amenities
    const cleanedFormData = {
      ...formData,

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

    payload.units = cleanedFormData.units;

    payload.inquiryOptions = cleanedFormData.inquiryOptions;
    payload.whyInvest = cleanedFormData.whyInvest;
    payload.investmentAdvantages = cleanedFormData.investmentAdvantages;
    payload.constructionStatus = cleanedFormData.constructionStatus;
    payload.features = formData.features;
    payload.amenities = formData.amenities;

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

    // Payment threshold (optional)
    if (
      cleanedFormData.paymentThreshold &&
      cleanedFormData.paymentThreshold > 0
    ) {
      payload.paymentThreshold = cleanedFormData.paymentThreshold;
    }

    try {
      if (isEditMode) {
        await updateProperty(payload);
        toast.success("Property updated successfully");
      } else {
        await createProperty(payload);
        // console.log(payload);
        toast.success("Property created successfully");
      }

      router.push("/main-admin/properties");
    } catch (error: any) {
      console.log("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCustomUnitType = () => {
    const trimmed = customUnitType.trim();
    if (!trimmed) return;
    const existing = formData.unitTypes || [];
    if (!existing.includes(trimmed)) {
      handleInputChange("unitTypes", [...existing, trimmed]);
      setCustomUnitType("");
    }
  };

  const handleRemoveUnitType = (type: string) => {
    handleInputChange(
      "unitTypes",
      (formData.unitTypes || []).filter((t: string) => t !== type)
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
    setAdvantageDraft({
      title: formData.whyInvest[index]?.title || "",
      description: formData.whyInvest[index]?.description || "",
    });
    setAdvantageDialogOpen(true);
  };
  const handleAdvantageDialogSave = () => {
    if (!advantageDraft.title.trim() || !advantageDraft.description.trim())
      return;
    let newAdvantages = [...(formData.whyInvest || [])];
    if (editingAdvantageIndex !== null) {
      newAdvantages[editingAdvantageIndex] = { ...advantageDraft };
    } else {
      newAdvantages.push({ ...advantageDraft });
    }
    setFormData((prev) => ({
      ...prev,
      whyInvest: newAdvantages,
    }));
    setAdvantageDialogOpen(false);
  };
  const handleAdvantageDialogCancel = () => {
    setAdvantageDialogOpen(false);
  };
  const handleRemoveAdvantage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whyInvest: (prev.whyInvest || []).filter((_, i) => i !== index),
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

  if (isUploadingImages || isUploadingDocument) {
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

          <div className="bg-white mt-4 p-6 space-y-4">
            {unitsForm.map((item: UnitsFormProp, index: number) => (
              <UnitDescriptionSection
                key={index}
                unitIndex={index}
                setFormData={setFormData}
                formData={formData}
                errors={errors}
                customUnitType={customUnitType}
                setCustomUnitType={setCustomUnitType}
                handleInputChange={handleInputChange}
                handleAddCustomUnitType={handleAddCustomUnitType}
                handleRemoveUnitType={handleRemoveUnitType}
                unitTypeOptions={unitTypeOptions}
                handleRemoveUnitsForm={handleRemoveUnitsForm}
              />
            ))}
            {/* ADD THIS BUTTON */}
            <button
              type="button"
              onClick={handleAddUnitsForm}
              className="w-full bg-white border-2 border-dashed border-[#116114] text-[#116114] hover:bg-green-50 py-3 rounded-lg font-medium transition-colors"
            >
              + Add Another Unit
            </button>
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
              selectedFeatures={selectedFeatures}
              selectedAmenities={selectedAmenities}
              setSelectedFeatures={setSelectedFeatures}
              setSelectedAmenities={setSelectedAmenites}
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
              isDeletingImage={isDeletingImage}
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
