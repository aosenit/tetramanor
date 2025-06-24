"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Save, Loader2 } from "lucide-react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { usePostData } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  name: string;
  address: string;
  about: string;
  unitAmount: number;
  inquiryOptions: string[];
  unitTypes: string[];
  whyInvest: {
    title: string;
    description: string;
    advantages: Array<{
      title: string;
      description: string;
    }>;
  };
  features: string[];
  amenities: string[];
  images: string[];
  documentId: string;
  constructionStatus: string;
}

const defaultFormData: FormData = {
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
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [activeTab, setActiveTab] = useState("personal");

  // Create property mutation
  const {
    mutate: createProperty,
    isPending: isCreating,
    error: createError,
  } = usePostData("admin/properties");

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    createProperty(cleanedFormData, {
      onSuccess: () => {
        router.push("/main-admin/properties");
      },
    });
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-1">
            <Link href="/main-admin/properties">Properties</Link>
            <span className="flex items-center text-[#858C95] space-x-[2px]">
              <ChevronRight className="" />
            </span>
            <span className="text-[#858C95]">Add Property</span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-semibold text-[#116114]">Add New Property</h1>
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

        {createError && (
          <div className="mx-6 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error creating property: {createError?.message || "Unknown error"}
          </div>
        )}

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
                  Property Name
                </Label>
                <Input
                  id="property-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full border border-[#116114] bg-[#E5E5E7] py-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#323539]">
                  Inquiry Options
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
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-[#323539]"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full border-none bg-[#E5E5E7] py-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="about-property"
                  className="text-sm font-medium text-[#323539]"
                >
                  About Property
                </Label>
                <Textarea
                  id="about-property"
                  value={formData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  className="min-h-[80px] !bg-[#E5E5E7] !border-none"
                  required
                />
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
                  <SelectTrigger className="w-full bg-[#E5E5E7] border-none">
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
                  Number of Units
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
                  className="w-full bg-[#e5e5e7] border-none"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#323539]">
                  Unit Types
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
                    Investment Title
                  </Label>
                  <Input
                    value={formData.whyInvest.title}
                    onChange={(e) =>
                      handleWhyInvestChange("title", e.target.value)
                    }
                    className="w-full bg-[#E5E5E7] border-none py-4"
                    placeholder="Enter investment title"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#323539]">
                    Investment Description
                  </Label>
                  <Textarea
                    value={formData.whyInvest.description}
                    onChange={(e) =>
                      handleWhyInvestChange("description", e.target.value)
                    }
                    className="min-h-[80px] !bg-[#E5E5E7] !border-none"
                    placeholder="Enter investment description"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-[#323539]">
                      Investment Advantages
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
                          className="bg-[#E5E5E7] border-none"
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
                          className="min-h-[60px] !bg-[#E5E5E7] !border-none"
                        />
                      </div>
                    </div>
                  ))}
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
                        className="flex-1 bg-[#E5E5E7] border-none"
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
                        className="flex-1 bg-[#E5E5E7] border-none"
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

            {/* File Upload Placeholder */}
            <div className="mt-8 space-y-4">
              <h3 className="text-base font-medium text-[#116114]">
                Property Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <p className="text-sm text-gray-600">
                    Property Images Upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (To be implemented)
                  </p>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <p className="text-sm text-gray-600">
                    Property Brochure Upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (To be implemented)
                  </p>
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
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Property
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
