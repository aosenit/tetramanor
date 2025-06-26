"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Save, Loader2, Upload, X } from "lucide-react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import {
  usePostData,
  usePutData,
  useFetchData,
  useUploadData,
} from "@/hooks/useApi";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";

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
  whyInvest: z.object({
    title: z.string().min(1, "Investment title is required"),
    description: z.string().min(1, "Investment description is required"),
    advantages: z
      .array(
        z.object({
          title: z.string().min(1, "Advantage title is required"),
          description: z.string().min(1, "Advantage description is required"),
        })
      )
      .min(1, "At least one advantage is required"),
  }),
  features: z.array(z.string()),
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  documentId: z.string().optional(),
  constructionStatus: z.enum(["ONGOING", "COMPLETED", "PLANNED"]),
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
  unitAmount: 0,
  inquiryOptions: ["INQUIRY_FORM"],
  unitTypes: [],
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
  features: [],
  amenities: [],
  images: [],
  documentId: "",
  constructionStatus: "ONGOING",
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
  const [activeTab, setActiveTab] = useState("personal");
  const [errors, setErrors] = useState<Partial<PropertyFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadedDocument, setUploadedDocument] =
    useState<UploadedDocument | null>(null);

  // Fetch property data if in edit mode
  const { data: propertyData, isLoading: isLoadingProperty } = useFetchData(
    propertyId ? `admin/properties/${propertyId}` : null
  );

  // API mutations
  const { mutateAsync: createProperty, isPending: isCreating } =
    usePostData("admin/properties");
  const { mutateAsync: updateProperty, isPending: isUpdating } = usePutData(
    propertyId ? `admin/properties/${propertyId}` : null
  );

  // File upload mutations
  const { mutateAsync: uploadImages, isPending: isUploadingImages } =
    useUploadData("upload/images");
  const { mutateAsync: uploadDocument, isPending: isUploadingDocument } =
    useUploadData("upload/document");

  // Load property data when editing
  useEffect(() => {
    if (propertyData && isEditMode) {
      console.log("Property data:", propertyData);
      setFormData({
        name: propertyData?.data?.name || "",
        address: propertyData?.data?.address || "",
        about: propertyData?.data?.about || "",
        unitAmount: propertyData?.data?.unitAmount || 0,
        inquiryOptions: propertyData?.data?.inquiryOptions || ["INQUIRY_FORM"],
        unitTypes: propertyData?.data?.unitTypes || [],
        whyInvest: propertyData?.data?.whyInvest || {
          title: "",
          description: "",
          advantages: [{ title: "", description: "" }],
        },
        features: propertyData?.data?.features || [],
        amenities: propertyData?.data?.amenities || [],
        images: propertyData?.data?.images || [],
        documentId: propertyData?.data?.documentId || "",
        constructionStatus: propertyData?.data?.constructionStatus || "ONGOING",
      });

      // Load existing images if any
      if (propertyData?.data?.images) {
        setUploadedImages(propertyData.data.images);
      }

      // Load existing document if any
      if (propertyData?.data?.document) {
        setUploadedDocument(propertyData.data.document);
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

  const handleWhyInvestChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      whyInvest: {
        ...prev.whyInvest,
        [field]: value,
      },
    }));
  };

  const handleAdvantageChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      whyInvest: {
        ...prev.whyInvest,
        advantages: prev.whyInvest.advantages.map((adv, i) =>
          i === index ? { ...adv, [field]: value } : adv
        ),
      },
    }));
  };

  const addAdvantage = () => {
    setFormData((prev) => ({
      ...prev,
      whyInvest: {
        ...prev.whyInvest,
        advantages: [
          ...prev.whyInvest.advantages,
          { title: "", description: "" },
        ],
      },
    }));
  };

  const removeAdvantage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whyInvest: {
        ...prev.whyInvest,
        advantages: prev.whyInvest.advantages.filter((_, i) => i !== index),
      },
    }));
  };

  const handleInquiryOptionChange = (option: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      inquiryOptions: checked
        ? [...prev.inquiryOptions, option]
        : prev.inquiryOptions.filter((opt) => opt !== option),
    }));
  };

  const handleUnitTypeChange = (type: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      unitTypes: checked
        ? [...prev.unitTypes, type]
        : prev.unitTypes.filter((t) => t !== type),
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const addAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }));
  };

  const removeAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleAmenityChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.map((amenity, i) =>
        i === index ? value : amenity
      ),
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

    if (!validateForm()) {
      return; // Validation errors are already shown in validateForm
    }

    setIsSubmitting(true);

    // Filter out empty features and amenities
    const cleanedFormData = {
      ...formData,
      features: formData.features.filter((f) => f.trim() !== ""),
      amenities: formData.amenities.filter((a) => a.trim() !== ""),
      whyInvest: {
        ...formData.whyInvest,
        advantages: formData.whyInvest.advantages.filter(
          (adv) => adv.title.trim() !== "" && adv.description.trim() !== ""
        ),
      },
    };

    try {
      if (isEditMode) {
        await updateProperty(cleanedFormData);
        toast.success("Property updated successfully");
      } else {
        await createProperty(cleanedFormData);
        toast.success("Property created successfully");
      }

      router.push("/main-admin/properties");
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        (isEditMode
          ? "Failed to update property"
          : "Failed to create property");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state for edit mode
  if (isEditMode && isLoadingProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading property data...</span>
        </div>
      </div>
    );
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
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-auto"
            >
              <TabsList className="inline-flex w-full bg-[#E5E5E7] rounded-md overflow-hidden p-1">
                <TabsTrigger
                  value="company"
                  className="rounded-sm px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#323539]"
                >
                  Company
                </TabsTrigger>
                <TabsTrigger
                  value="personal"
                  className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#323539]"
                >
                  Personal
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 bg-white">
            <div className="space-y-6">
              <h2 className="text-base font-medium text-[#116114]">
                Property Info
              </h2>
              <div className="space-y-2">
                <Label
                  htmlFor="property-name"
                  className="text-sm font-medium text-[#323539]"
                >
                  Property Name *
                </Label>
                <Input
                  id="property-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full border bg-[#E5E5E7] py-4 ${
                    errors.name ? "border-red-500" : "border-[#116114]"
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#323539]">
                  Inquiry Options *
                </Label>
                <div className="space-y-3">
                  {inquiryOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={option.value}
                        checked={formData.inquiryOptions.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleInquiryOptionChange(
                            option.value,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={option.value}
                        className="text-sm text-[#181818]"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.inquiryOptions && (
                  <p className="text-red-500 text-sm">
                    {errors.inquiryOptions}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-[#323539]"
                >
                  Address *
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full border bg-[#E5E5E7] py-4 ${
                    errors.address ? "border-red-500" : "border-[#116114]"
                  }`}
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="about-property"
                  className="text-sm font-medium text-[#323539]"
                >
                  About Property *
                </Label>
                <Textarea
                  id="about-property"
                  value={formData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  className={`min-h-[80px] bg-[#E5E5E7] border ${
                    errors.about ? "border-red-500" : "border-[#116114]"
                  }`}
                  required
                />
                {errors.about && (
                  <p className="text-red-500 text-sm">{errors.about}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="construction-status"
                  className="text-sm font-medium text-[#323539]"
                >
                  Construction Status
                </Label>
                <Select
                  value={formData.constructionStatus}
                  onValueChange={(value) =>
                    handleInputChange("constructionStatus", value)
                  }
                >
                  <SelectTrigger className="w-full bg-[#E5E5E7] border border-[#116114]">
                    <SelectValue placeholder="Select construction status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONGOING">Ongoing</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="PLANNED">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white mt-4 p-6">
            <div className="space-y-6">
              <h2 className="text-base font-medium text-[#116114]">
                Unit Description
              </h2>

              <div className="space-y-2">
                <Label
                  htmlFor="no-of-units"
                  className="text-sm font-medium text-[#323539]"
                >
                  Number of Units *
                </Label>
                <Input
                  id="no-of-units"
                  type="number"
                  value={formData.unitAmount}
                  onChange={(e) =>
                    handleInputChange(
                      "unitAmount",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className={`w-full bg-[#e5e5e7] border ${
                    errors.unitAmount ? "border-red-500" : "border-[#116114]"
                  }`}
                  min="0"
                  required
                />
                {errors.unitAmount && (
                  <p className="text-red-500 text-sm">{errors.unitAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#323539]">
                  Unit Types *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {unitTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.unitTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleUnitTypeChange(type, checked as boolean)
                        }
                      />
                      <Label htmlFor={type} className="text-sm text-[#181818]">
                        {type.replace(/_/g, " ")}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.unitTypes && (
                  <p className="text-red-500 text-sm">{errors.unitTypes}</p>
                )}
              </div>
            </div>

            {/* Why Invest Section */}
            <div className="mt-8 space-y-6">
              <h3 className="text-base font-medium text-[#116114]">
                Why Invest
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#323539]">
                    Investment Title *
                  </Label>
                  <Input
                    value={formData.whyInvest.title}
                    onChange={(e) =>
                      handleWhyInvestChange("title", e.target.value)
                    }
                    className={`w-full bg-[#E5E5E7] border py-4 ${
                      errors.whyInvest?.title
                        ? "border-red-500"
                        : "border-[#116114]"
                    }`}
                    placeholder="Enter investment title"
                  />
                  {errors.whyInvest?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.whyInvest.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#323539]">
                    Investment Description *
                  </Label>
                  <Textarea
                    value={formData.whyInvest.description}
                    onChange={(e) =>
                      handleWhyInvestChange("description", e.target.value)
                    }
                    className={`min-h-[80px] bg-[#E5E5E7] border ${
                      errors.whyInvest?.description
                        ? "border-red-500"
                        : "border-[#116114]"
                    }`}
                    placeholder="Enter investment description"
                  />
                  {errors.whyInvest?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.whyInvest.description}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-[#323539]">
                      Investment Advantages *
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAdvantage}
                    >
                      Add Advantage
                    </Button>
                  </div>

                  {formData.whyInvest.advantages.map((advantage, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#323539]">
                          Advantage {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAdvantage(index)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Input
                          value={advantage.title}
                          onChange={(e) =>
                            handleAdvantageChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Advantage title"
                          className="bg-[#E5E5E7] border border-[#116114]"
                        />
                        <Textarea
                          value={advantage.description}
                          onChange={(e) =>
                            handleAdvantageChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Advantage description"
                          className="min-h-[60px] bg-[#E5E5E7] border border-[#116114]"
                        />
                      </div>
                    </div>
                  ))}
                  {errors.whyInvest?.advantages && (
                    <p className="text-red-500 text-sm">
                      Please fill in all advantage fields
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Features and Amenities */}
            <div className="mt-8 space-y-6">
              <h3 className="text-base font-medium text-[#116114]">
                Property Features and Amenities
              </h3>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-[#323539]">
                    Features
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                  >
                    Add Feature
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        placeholder="Enter feature"
                        className="flex-1 bg-[#E5E5E7] border border-[#116114]"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-[#323539]">
                    Amenities
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAmenity}
                  >
                    Add Amenity
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={amenity}
                        onChange={(e) =>
                          handleAmenityChange(index, e.target.value)
                        }
                        placeholder="Enter amenity"
                        className="flex-1 bg-[#E5E5E7] border border-[#116114]"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAmenity(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="mt-8 space-y-4">
              <h3 className="text-base font-medium text-[#116114]">
                Property Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Images Upload */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-[#323539]">
                    Property Images
                  </Label>
                  <div className="border-2 border-dashed border-[#116114] rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                      disabled={isUploadingImages}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-[#116114]" />
                      <span className="text-[#116114] font-medium">
                        {isUploadingImages
                          ? "Uploading..."
                          : "Click to upload images"}
                      </span>
                      <span className="text-sm text-[#858C95]">
                        PNG, JPG, WEBP up to 10MB each
                      </span>
                    </label>
                  </div>

                  {/* Display uploaded images */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.imageUrl}
                            alt={image.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Document Upload */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-[#323539]">
                    Property Brochure
                  </Label>
                  <div className="border-2 border-dashed border-[#116114] rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleDocumentUpload(e.target.files)}
                      className="hidden"
                      id="document-upload"
                      disabled={isUploadingDocument}
                    />
                    <label
                      htmlFor="document-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-[#116114]" />
                      <span className="text-[#116114] font-medium">
                        {isUploadingDocument
                          ? "Uploading..."
                          : "Click to upload document"}
                      </span>
                      <span className="text-sm text-[#858C95]">
                        PDF, DOC, DOCX up to 10MB
                      </span>
                    </label>
                  </div>

                  {/* Display uploaded document */}
                  {uploadedDocument && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <a
                            href={uploadedDocument.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-green-700 font-medium hover:text-green-900 underline"
                          >
                            {uploadedDocument.name}
                          </a>
                          <p className="text-xs text-green-600 mt-1">
                            {uploadedDocument.docType}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeDocument}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
