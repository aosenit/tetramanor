"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import FileUpload from "../../properties/components/UploadFile";
import TagInputGroup from "../../properties/components/PropertyFeaturesForm";
import Dropdown from "./components/Dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import {
  usePostData,
  usePutData,
  useFetchData,
  useUploadData,
} from "@/hooks/useApi";
import { toast } from "sonner";
import { z } from "zod";

// Validation schema
const rentalSchema = z.object({
  propertyId: z.string().min(1, "Property is required"),
  apartmentType: z.string().min(1, "Apartment type is required"),
  location: z.string().min(1, "Location is required"),
  rent: z.number().min(0, "Rent must be a positive number"),
  frequency: z.enum(["MONTHLY", "YEARLY", "QUARTERLY"]),
  agencyFee: z.number().min(0, "Agency fee must be a positive number"),
  countryFee: z.number().min(0, "Country fee must be a positive number"),
  status: z.enum(["RENTED", "NOT_RENTED"]),
});

type RentalFormData = z.infer<typeof rentalSchema>;

interface Property {
  id: string;
  name: string;
  address: string;
  unitTypes: string[];
  amenities: string[];
  features: string[];
  about: string;
  status: string;
  constructionStatus: string;
}

interface UploadedImage {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
}

export default function EditRental() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rentalId = searchParams.get("id");
  const isEditMode = !!rentalId;

  const [formData, setFormData] = useState<RentalFormData>({
    propertyId: "",
    apartmentType: "",
    location: "",
    rent: 0,
    frequency: "MONTHLY",
    agencyFee: 0,
    countryFee: 0,
    status: "NOT_RENTED",
  });
  const [errors, setErrors] = useState<Partial<RentalFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  // Fetch rental data if in edit mode
  const { data: rentalData, isLoading: isLoadingRental } = useFetchData(
    rentalId ? `rentals/${rentalId}` : null
  );

  // Fetch properties for dropdown
  const { data: propertiesResponse } = useFetchData("admin/properties");

  // API mutations
  const { mutateAsync: createRental, isPending: isCreating } =
    usePostData("rentals");
  const { mutateAsync: updateRental, isPending: isUpdating } = usePutData(
    rentalId ? `rentals/${rentalId}` : null
  );

  // File upload mutation
  const { mutateAsync: uploadImages, isPending: isUploading } =
    useUploadData("upload/images");

  // Extract properties from response
  const properties: Property[] = propertiesResponse?.data?.items || [];

  // Load rental data when editing
  useEffect(() => {
    if (rentalData && isEditMode) {
      console.log("Rental data:", rentalData);
      setFormData({
        propertyId: rentalData?.data?.propertyId || "",
        apartmentType: rentalData?.data?.apartmentType || "",
        location: rentalData?.data?.location || "",
        rent: rentalData?.data?.rent || 0,
        frequency: rentalData?.data?.frequency || "MONTHLY",
        agencyFee: rentalData?.data?.agencyFee || 0,
        countryFee: rentalData?.data?.countryFee || 0,
        status: rentalData?.data?.status || "NOT_RENTED",
      });

      // Load existing images if any
      if (rentalData?.data?.images) {
        setUploadedImages(rentalData.data.images);
      }
    }
  }, [rentalData, isEditMode]);

  // Handle form input changes
  const handleInputChange = (field: keyof RentalFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle property selection
  const handlePropertyChange = (propertyName: string) => {
    const property = properties.find((p) => p.name === propertyName);
    if (property) {
      setSelectedProperty(property);
      // Update property ID
      handleInputChange("propertyId", property.id);

      // Prefill form fields with property data
      setFormData((prev) => ({
        ...prev,
        propertyId: property.id,
        apartmentType: property.unitTypes?.[0] || "",
        location: property.address || "",
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await uploadImages(formData);

      if (response.success) {
        setUploadedImages((prev) => [...prev, ...response.data]);
        toast.success("Images uploaded successfully");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    try {
      rentalSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<RentalFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            const fieldName = err.path[0] as string;
            if (fieldName in formData) {
              (newErrors as any)[fieldName] = err.message;
            }
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        ...(isEditMode && { id: rentalId }),
      };

      if (isEditMode) {
        await updateRental(submitData);
        toast.success("Rental updated successfully");
      } else {
        await createRental(submitData);
        toast.success("Rental created successfully");
      }

      router.push("/main-admin/rentals");
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        (isEditMode ? "Failed to update rental" : "Failed to create rental");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state for edit mode
  if (isEditMode && isLoadingRental) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading rental data...</span>
        </div>
      </div>
    );
  }

  // Convert properties to dropdown options
  const propertyOptions = properties.map((property) => property.name);
  const apartmentTypeOptions = selectedProperty?.unitTypes || [];
  const frequencyOptions = ["Monthly", "Yearly", "Quarterly"];
  const feeOptions = ["₦50,000", "₦100,000", "₦150,000"];
  const statusOptions = ["Not Rented", "Rented"];

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E5E7] pb-4">
        <span className="text-[#323539] font-medium">
          Rental Management &gt;&gt;&gt;{" "}
        </span>
        <span className="text-[#858C95] font-medium">
          {isEditMode ? "Edit" : "Add"}
        </span>
      </div>

      {/* Basic Info */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-4 bg-white p-6">
        {/* Title */}
        <h2 className="text-2xl font-medium text-[#116114] mb-4">
          {isEditMode ? "Edit rental" : "Add / Edit rental"}
        </h2>

        <p className="text-[#4C5560] font-medium">Property info</p>

        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Property name
          </label>
          <Dropdown
            options={propertyOptions}
            value={
              properties.find((p) => p.id === formData.propertyId)?.name || ""
            }
            onChange={handlePropertyChange}
          />
          {errors.propertyId && (
            <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Apartment type
          </label>
          <Dropdown
            options={apartmentTypeOptions}
            value={formData.apartmentType}
            onChange={(value) => handleInputChange("apartmentType", value)}
          />
          {errors.apartmentType && (
            <p className="text-red-500 text-sm mt-1">{errors.apartmentType}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Address
          </label>
          <Input
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder=""
            className={`bg-[#E5E5E7] border ${
              errors.location ? "border-red-500" : "border-[#116114]"
            }`}
            readOnly
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Rental frequency
          </label>
          <Dropdown
            options={frequencyOptions}
            value={
              frequencyOptions.find(
                (f) => f.toUpperCase() === formData.frequency
              ) || ""
            }
            onChange={(value) => {
              const frequency = value.toUpperCase() as
                | "MONTHLY"
                | "YEARLY"
                | "QUARTERLY";
              handleInputChange("frequency", frequency);
            }}
          />
        </div>

        <p className="text-[#4C5560] font-medium">Fees</p>

        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Rent
          </label>
          <Input
            type="number"
            value={formData.rent}
            onChange={(e) =>
              handleInputChange("rent", parseFloat(e.target.value) || 0)
            }
            placeholder=""
            className={`bg-[#E5E5E7] border ${
              errors.rent ? "border-red-500" : "border-[#116114]"
            }`}
          />
          {errors.rent && (
            <p className="text-red-500 text-sm mt-1">{errors.rent}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Agency fee
            </label>
            <Input
              type="number"
              value={formData.agencyFee}
              onChange={(e) =>
                handleInputChange("agencyFee", parseFloat(e.target.value) || 0)
              }
              placeholder=""
              className={`bg-[#E5E5E7] border ${
                errors.agencyFee ? "border-red-500" : "border-[#116114]"
              }`}
            />
            {errors.agencyFee && (
              <p className="text-red-500 text-sm mt-1">{errors.agencyFee}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#323539] font-medium">
              Country fee
            </label>
            <Input
              type="number"
              value={formData.countryFee}
              onChange={(e) =>
                handleInputChange("countryFee", parseFloat(e.target.value) || 0)
              }
              placeholder=""
              className={`bg-[#E5E5E7] border ${
                errors.countryFee ? "border-red-500" : "border-[#116114]"
              }`}
            />
            {errors.countryFee && (
              <p className="text-red-500 text-sm mt-1">{errors.countryFee}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <FileUpload
            label="Upload property images"
            accept="image/*"
            multiple={true}
            id="property-images"
          />
          {/* Custom file input for handling uploads */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="hidden-file-upload"
          />
          <button
            type="button"
            onClick={() =>
              document.getElementById("hidden-file-upload")?.click()
            }
            className="mt-2 text-sm text-[#116114] hover:underline"
          >
            {isUploading ? "Uploading..." : "Click here to upload images"}
          </button>

          {/* Display uploaded images */}
          {uploadedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.imageUrl}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setUploadedImages((prev) =>
                        prev.filter((img) => img.id !== image.id)
                      )
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Status
          </label>
          <Dropdown
            options={statusOptions}
            value={
              statusOptions.find(
                (s) => s.toUpperCase().replace(" ", "_") === formData.status
              ) || ""
            }
            onChange={(value) => {
              const status = value.toUpperCase().replace(" ", "_") as
                | "RENTED"
                | "NOT_RENTED";
              handleInputChange("status", status);
            }}
          />
        </div>

        <h3 className="text-base py-4 font-medium text-[#116114]">
          Property features and amenities
        </h3>
        <TagInputGroup label="Features" />
        <TagInputGroup label="Amenities" />

        <div className="flex justify-between items-center py-8">
          <button
            type="submit"
            disabled={isSubmitting || isCreating || isUpdating || isUploading}
            className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
          >
            {isSubmitting || isCreating || isUpdating ? "Saving..." : "Save"}
          </button>

          <Link href="/main-admin/rentals">
            <button
              type="button"
              className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
            >
              <MdArrowBackIosNew /> Back to rentals
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
