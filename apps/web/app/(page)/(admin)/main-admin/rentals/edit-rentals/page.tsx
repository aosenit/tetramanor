"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import TagInputGroup from "../../properties/components/PropertyFeaturesForm";
import Dropdown from "./components/Dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData, useUploadPutData, useUploadData } from "@/hooks/useApi";
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
  cautionFee: z.number().min(0, "Caution fee must be a positive number"),
  // unitAmount: z.number().min(1, "Unit amount must be at least 1"),
  status: z.enum(["RENTED", "NOT_RENTED"]),
  images: z.array(z.string()).optional(),
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
  file: File; // Store the actual file
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
    cautionFee: 0,
    // unitAmount: 1,
    status: "NOT_RENTED",
    images: [],
  });
  const [errors, setErrors] = useState<Partial<RentalFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [features, setFeatures] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  // Fetch rental data if in edit mode
  const { data: rentalData, isLoading: isLoadingRental } = useFetchData(
    rentalId ? `rentals/${rentalId}` : null
  );

  // Fetch properties for dropdown
  const { data: propertiesResponse } = useFetchData("admin/properties");

  // API mutations
  const { mutateAsync: createRental, isPending: isCreating } =
    useUploadData("rentals");

  const { mutateAsync: updateRental, isPending: isUpdating } = useUploadPutData(
    rentalId ? `rentals/${rentalId}` : null
  );

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
        cautionFee: rentalData?.data?.cautionFee || "",
        // unitAmount: rentalData?.data?.unitAmount || 1,
        status: rentalData?.data?.status || "NOT_RENTED",
        images: rentalData?.data?.images || [],
      });

      // Convert API images to UploadedImage format for display
      if (rentalData?.data?.images && rentalData.data.images.length > 0) {
        const existingImages: UploadedImage[] = rentalData.data.images.map(
          (image: any) => ({
            id: image.id,
            imageUrl: image.imageUrl,
            name: image.name,
            file: null, // We don't have the original file for existing images
          })
        );
        setUploadedImages(existingImages);
      } else {
        setUploadedImages([]);
      }

      setFeatures(rentalData?.data?.property?.features || []);
      setAmenities(rentalData?.data?.property?.amenities || []);
    }
  }, [rentalData, isEditMode]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => {
        if (image.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(image.imageUrl);
        }
      });
    };
  }, []);

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
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    console.log("Files selected:", files.length);

    // Convert files to UploadedImage format for display
    const newImages: UploadedImage[] = Array.from(files).map((file, index) => {
      console.log("Processing file:", file.name, file.size, file.type);
      return {
        id: `temp-${Date.now()}-${index}`,
        imageUrl: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
    });

    setUploadedImages((prev) => [...prev, ...newImages]);
    toast.success(`${files.length} image(s) added successfully`);
  };

  // Remove image
  const removeImage = (imageId: string) => {
    setUploadedImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.imageUrl);
      }
      return prev.filter((img) => img.id !== imageId);
    });
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

    // Only validate form when creating new rental, not when editing
    if (!isEditMode && !validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data submission
      const formDataToSubmit = new FormData();

      // Add all form fields as strings
      formDataToSubmit.append("propertyId", formData.propertyId);
      formDataToSubmit.append("apartmentType", formData.apartmentType);
      formDataToSubmit.append("location", formData.location);
      formDataToSubmit.append("rent", formData.rent.toString());
      formDataToSubmit.append("frequency", formData.frequency);
      formDataToSubmit.append("agencyFee", formData.agencyFee.toString());
      formDataToSubmit.append("cautionFee", formData.cautionFee.toString());
      formDataToSubmit.append("status", formData.status);

      // Add images as binary files directly to the array
      console.log("Uploaded images:", uploadedImages);

      // Handle images for edit vs create mode
      if (isEditMode) {
        // In edit mode, we need to handle existing images and new images separately
        uploadedImages.forEach((image) => {
          if (image.file) {
            // New image - send as binary file
            console.log(
              "Adding new image to FormData:",
              image.name,
              image.file
            );
            formDataToSubmit.append("images", image.file);
          } else if (image.id) {
            // Existing image - send the ID to keep it
            console.log("Keeping existing image:", image.id);
            formDataToSubmit.append("existingImageIds", image.id);
          }
        });
      } else {
        // In create mode, all images are new
        uploadedImages.forEach((image) => {
          if (image.file) {
            console.log("Adding image to FormData:", image.name, image.file);
            formDataToSubmit.append("images", image.file);
          }
        });
      }

      // Debug: Log FormData contents
      for (let [key, value] of formDataToSubmit.entries()) {
        console.log(`${key}:`, value);
      }

      if (isEditMode) {
        await updateRental(formDataToSubmit);
        toast.success("Rental updated successfully");
      } else {
        await createRental(formDataToSubmit);
        toast.success("Rental created successfully");
      }

      // Trigger refetch of rentals and stats
      window.dispatchEvent(new CustomEvent("refetch-rentals-stats"));

      // Navigate back with refresh parameter
      router.push("/main-admin/rentals?refresh=true");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Failed to save rental");
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

        {/* <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Unit Amount *
          </label>
          <Input
            type="number"
            value={formData.unitAmount}
            onChange={(e) =>
              handleInputChange("unitAmount", parseInt(e.target.value) || "")
            }
            placeholder="Enter unit amount"
            className={`bg-[#E5E5E7] border ${
              errors.unitAmount ? "border-red-500" : "border-[#116114]"
            }`}
            min="1"
            required
          />
          {errors.unitAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.unitAmount}</p>
          )}
        </div> */}

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
              handleInputChange("rent", parseFloat(e.target.value) || "")
            }
            placeholder="Enter rent"
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
              placeholder="Enter agency fee"
              onChange={(e) =>
                handleInputChange("agencyFee", parseFloat(e.target.value) || "")
              }
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
              Caution fee
            </label>
            <Input
              type="number"
              value={formData.cautionFee}
              onChange={(e) =>
                handleInputChange(
                  "cautionFee",
                  parseFloat(e.target.value) || ""
                )
              }
              placeholder="Enter caution fee"
              className={`bg-[#E5E5E7] border ${
                errors.cautionFee ? "border-red-500" : "border-[#116114]"
              }`}
            />
            {errors.cautionFee && (
              <p className="text-red-500 text-sm mt-1">{errors.cautionFee}</p>
            )}
          </div>
        </div>

        {/* Images Upload */}
        <div>
          <label className="block mb-1 text-sm text-[#323539] font-medium">
            Property Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <button
            type="button"
            onClick={() => document.getElementById("file-upload")?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#116114] transition-colors"
          >
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-600">
                Click to upload images or drag and drop
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG, JPEG up to 10MB each
              </span>
            </div>
          </button>

          {/* Display uploaded images */}
          {uploadedImages.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                {uploadedImages.length} image(s) selected
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.imageUrl}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
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
        <TagInputGroup
          label="Features"
          value={features}
          onChange={setFeatures}
        />
        <TagInputGroup
          label="Amenities"
          value={amenities}
          onChange={setAmenities}
        />

        <div className="flex justify-between items-center py-8">
          <button
            type="submit"
            disabled={isSubmitting || isCreating || isUpdating}
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
