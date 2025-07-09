"use client";
import Image from "next/image";
import { ChevronUp, Download, Save, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import { useSearchParams } from "next/navigation";
import placeholder from "@/assets/placeholder.svg";
import c from "@/assets/investment/icons/c.webp";
import h from "@/assets/investment/icons/h.svg";
import g from "@/assets/investment/icons/g.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@chakra-ui/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchData, usePutData } from "@/hooks/useApi";

import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";

const defaultFeatures = [
  "High-Quality Kitchen Cabinets & Wardrobes",
  "Walk-in Closets",
  "POP Ceilings",
  "Premium Sanitary Fittings",
  "Vintage PVC French Windows",
  "Uninterrupted Power Supply",
  "Efficient Waste Disposal & Central Sewage Management",
  "Vitrified & Granite Tiles",
  "Backup Power Supply",
  "24/7 Concierge Services",
];

const defaultAmenities = [
  "Fiber Optic Connectivity",
  "Fully Equipped Gym",
  "Stunning Sea View",
  "Uninterrupted Power Supply",
  "Stunning Sea View",
  "Lounge/Bar",
  "Fiber Optic Connectivity",
  "24/7 Concierge Services",
  "State of the art interior decor",
];

const defaultAdvantages = [
  {
    icon: c,
    title: "High Returns",
    description: "Earn up to 50% ROI over a short duration (~18 months)",
  },
  {
    icon: g,
    title: "Minimal Risk",
    description:
      "Tetramanor handles the entire process, from land acquisition to sales",
  },
  {
    icon: h,
    title: "Flexible Investment Options",
    description: "Choose between Fixed ROI or Equity-Based Profit Sharing",
  },
  {
    icon: h,
    title: "Flexible Investment Options",
    description: "Choose between Fixed ROI or Equity-Based Profit Sharing",
  },
];

export default function PropertyDetails() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id");
  const edit = searchParams.get("edit");

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    about: "",
    unitAmount: 0,
    inquiryOptions: ["INQUIRY_FORM"],
    unitTypes: ["THREE_BEDROOM_APARTMENT"],
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
    features: defaultFeatures,
    amenities: defaultAmenities,
    images: [] as string[],
    documentId: "",
    constructionStatus: "ONGOING",
    accountOfficer: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  // Fetch property data
  const {
    data: propertyResponse,
    isLoading,
    error,
    refetch,
  } = useFetchData(propertyId ? `admin/properties/${propertyId}` : "");

  // Update property mutation
  const {
    mutate: updateProperty,
    isPending: isUpdating,
    error: updateError,
  } = usePutData(`admin/properties/${propertyId}`);

  // Load property data into form
  useEffect(() => {
    if (propertyResponse?.data) {
      const property = propertyResponse.data;
      setFormData({
        name: property.name || "",
        address: property.address || "",
        about: property.about || "",
        unitAmount: property.unitAmount || 0,
        inquiryOptions: property.inquiryOptions || ["INQUIRY_FORM"],
        unitTypes: property.unitTypes || ["THREE_BEDROOM_APARTMENT"],
        whyInvest: {
          title: property.whyInvest?.title || "",
          description: property.whyInvest?.description || "",
          advantages: property.whyInvest?.advantages || [
            {
              title: "",
              description: "",
            },
          ],
        },
        features: property.features || defaultFeatures,
        amenities: property.amenities || defaultAmenities,
        images: property.images || [],
        documentId: property.document?.[0] || "",
        constructionStatus: property.constructionStatus || "ONGOING",
        accountOfficer: {
          fullName: "",
          email: "",
          phone: "",
        },
      });
    }
  }, [propertyResponse]);

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

  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
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

  const handleAmenityChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.map((amenity, i) =>
        i === index ? value : amenity
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

  const handleSave = () => {
    updateProperty(formData, {
      onSuccess: () => {
        setIsEditing(false);
        refetch();
      },
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    if (propertyResponse?.data) {
      const property = propertyResponse.data;
      setFormData({
        name: property.name || "",
        address: property.address || "",
        about: property.about || "",
        unitAmount: property.unitAmount || 0,
        inquiryOptions: property.inquiryOptions || ["INQUIRY_FORM"],
        unitTypes: property.unitTypes || ["THREE_BEDROOM_APARTMENT"],
        whyInvest: {
          title: property.whyInvest?.title || "",
          description: property.whyInvest?.description || "",
          advantages: property.whyInvest?.advantages || [
            {
              title: "",
              description: "",
            },
          ],
        },
        features: property.features || defaultFeatures,
        amenities: property.amenities || defaultAmenities,
        images: property.images || [],
        documentId: property.document?.[0] || "",
        constructionStatus: property.constructionStatus || "ONGOING",
        accountOfficer: {
          fullName: "",
          email: "",
          phone: "",
        },
      });
    }
  };

  useEffect(() => {
    if (edit) {
      setIsEditing(true);
    }
  }, [edit]);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading property details</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const property = propertyResponse?.data;

  return (
    <div className="min-h-screen px-4">
      <div className="border-b">
        <div className="py-2">
          <nav className="">
            <Link href="/main-admin/properties">
              <span className="text-[#858C95]">Home</span>
            </Link>
            <span className="mx-2 text-xl text-[#116114]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              property overview
            </span>
          </nav>
        </div>
      </div>

      <div className="mt-2">
        <div className="">
          <h2 className="text-sm font-medium text-[#323539] mb-4">
            View property listing
          </h2>
        </div>
        <div className="bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-medium text-[#116114]">
              View property details
            </h2>
            {property?.brochure?.length > 0 && (
              <a
                className="flex items-center gap-2"
                download={property?.brochure[0]?.name}
                href={property?.brochure[0]?.imageUrl}
              >
                <Button className="bg-[#116114] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download brochure
                </Button>
              </a>
            )}
          </div>

          {updateError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Error updating property: {updateError?.message || "Unknown error"}
            </div>
          )}

          {/* Property Images */}
          {property?.image?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={property?.image[0]?.imageUrl || placeholder}
                  alt="Property exterior view"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={property?.image[1]?.imageUrl || placeholder}
                  alt="Property exterior view"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={property?.image[2]?.imageUrl || placeholder}
                  alt="Property exterior view"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-start items-start h-full py-10">
              <p className="text-[#858C95]">No images available</p>
            </div>
          )}

          {/* Property Details */}
          <div className="grid grid-cols-1 md:flex md:justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-12">
                <label className="text-xs font-medium text-[#181818] block min-w-[100px]">
                  Property name
                </label>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="flex-1"
                    placeholder="Enter property name"
                  />
                ) : (
                  <p className="text-[#116114] font-medium text-sm">
                    {property?.name}
                  </p>
                )}
              </div>

              <div className="flex gap-4 items-start">
                <label className="text-xs font-medium text-[#181818] min-w-[100px] pt-2">
                  Property units
                </label>
                {isEditing ? (
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={formData.unitAmount}
                      onChange={(e) =>
                        handleInputChange(
                          "unitAmount",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="mb-2"
                      placeholder="Number of units"
                    />
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                        <span className="text-[#116114] font-medium text-sm">
                          {formData.unitAmount} Units
                        </span>
                        <ChevronUp className="text-[#4C5560]" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-600">
                        <div className="text-sm text-[#4C5560] space-y-1">
                          {formData.unitTypes.map((type, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Input
                                value={type}
                                onChange={(e) => {
                                  const newTypes = [...formData.unitTypes];
                                  newTypes[index] = e.target.value;
                                  handleInputChange("unitTypes", newTypes);
                                }}
                                placeholder="Unit type"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newTypes = formData.unitTypes.filter(
                                    (_, i) => i !== index
                                  );
                                  handleInputChange("unitTypes", newTypes);
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              handleInputChange("unitTypes", [
                                ...formData.unitTypes,
                                "",
                              ]);
                            }}
                          >
                            Add Unit Type
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ) : (
                  <Collapsible className="flex-1 mt-1 ">
                    <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                      <span className="text-[#116114] font-medium text-sm">
                        {property?.unitTypes?.length} Units
                      </span>
                      <ChevronUp className="text-[#4C5560]" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-600">
                      <div className="text-sm text-[#4C5560] space-y-1">
                        {property?.unitTypes?.map((type, index) => (
                          <p key={index}>{type}</p>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Property address"
                      className="flex items-center gap-2"
                    />
                    <Select
                      value={formData.constructionStatus}
                      onValueChange={(value) =>
                        handleInputChange("constructionStatus", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Construction Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ONGOING">Ongoing</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="PLANNED">Planned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#116114] flex gap-2 items-center">
                      <GrLocation />
                      {property?.address}
                    </p>
                    <p className="text-sm text-[#4C5560]">
                      {property?.constructionStatus}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[var(--primary-green)] mb-4">
          Property description
        </h2>
        {isEditing ? (
          <div className="space-y-4">
            <Input
              value={formData.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              placeholder="Property description"
              className="font-medium text-[#116114]"
            />
            <Textarea
              value={formData.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              placeholder="Property description"
              className="text-sm leading-relaxed text-[#181818]"
              rows={4}
            />
          </div>
        ) : (
          <p className=" text-sm font-medium">{property?.about}</p>
        )}
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[var(--primary-green)] mb-4">
          Why invest
        </h2>
        {isEditing ? (
          <div className="space-y-4">
            <Input
              value={formData.whyInvest.title}
              onChange={(e) => handleWhyInvestChange("title", e.target.value)}
              placeholder="Investment title"
              className="font-medium text-[#116114]"
            />
            <Textarea
              value={formData.whyInvest.description}
              onChange={(e) =>
                handleWhyInvestChange("description", e.target.value)
              }
              placeholder="Investment description"
              className="text-sm leading-relaxed text-[#181818]"
              rows={4}
            />
          </div>
        ) : (
          <>
            <p className="text-[#116114] text-sm font-medium">
              {property?.whyInvest[0]?.title || "N/A"}
            </p>
            <p className="text-sm font-medium">
              {property?.whyInvest[0]?.description || "N/A"}
            </p>
          </>
        )}
      </div>
      <div className="bg-white mt-4 p-8">
        <h2 className="text-sm font-medium text-[#181818] mb-4">
          Advantage of investment{" "}
        </h2>
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.whyInvest.advantages.map((adv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 border rounded"
                >
                  <Image
                    src={
                      defaultAdvantages[idx % defaultAdvantages.length]?.icon ||
                      c
                    }
                    alt="Investment advantage icon"
                    width={40}
                    height={40}
                  />
                  <div className="flex-1 space-y-2">
                    <Input
                      value={adv.title}
                      onChange={(e) =>
                        handleAdvantageChange(idx, "title", e.target.value)
                      }
                      placeholder="Advantage title"
                      className="text-[#116114] font-semibold"
                    />
                    <Textarea
                      value={adv.description}
                      onChange={(e) =>
                        handleAdvantageChange(
                          idx,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Advantage description"
                      className="text-sm text-[#202020]"
                      rows={2}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAdvantage(idx)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addAdvantage} className="mt-4">
              Add Advantage
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property?.whyInvest?.advantages?.length > 0 ? (
              property?.whyInvest?.advantages?.map((adv, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <Image
                    src={
                      defaultAdvantages[idx % defaultAdvantages.length]?.icon ||
                      c
                    }
                    alt="Investment advantage icon"
                    width={40}
                    height={40}
                  />
                  <div>
                    <h4 className="text-[#116114] font-semibold">
                      {adv.title || "N/A"}
                    </h4>
                    <p className="text-sm text-[#202020]">
                      {adv.description || "N/A"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#181818]">No advantages available</p>
            )}
          </div>
        )}
      </div>
      <div className="bg-white mt-4 p-8 space-y-6">
        <h2 className="text-sm font-medium text-[#181818] mb-6">Features</h2>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
                >
                  <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="text-[#323539] text-sm border-none p-0"
                    placeholder="Enter feature"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addFeature} className="mt-4">
              Add Feature
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {property?.features?.length > 0 ? (
              property?.features?.map((feature, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
                >
                  <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden w-full">
                    {feature || "N/A"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#181818]">No features available</p>
            )}
          </div>
        )}

        <h2 className="text-sm font-medium text-[#181818] mb-6">Amenities </h2>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {formData.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
                >
                  <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                  <Input
                    value={amenity}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                    className="text-[#323539] text-sm border-none p-0"
                    placeholder="Enter amenity"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAmenity(index)}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addAmenity} className="mt-4">
              Add Amenity
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {property?.amenities?.length > 0 ? (
              property?.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg px-2 py-2 w-full flex items-center h-auto"
                >
                  <div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden w-full">
                    {amenity || "N/A"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#181818]">No amenities available</p>
            )}
          </div>
        )}
      </div>
      {/* add and edit contact options */}
      {!isEditing && (
        <div className="bg-white mt-4 p-8">
          <h2 className="text-sm font-medium text-[var(--primary-green)] mb-4">
            Contact options enabled
          </h2>
          {/* add address and also account office */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-[#181818]">Address</h3>
              <p className="text-sm text-[#181818]">{property?.address}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-[#181818]">
                Account officer
              </h3>
              <p className="text-sm text-[#181818]">
                {property?.accountOfficer || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between px-3 items-center py-12">
        {!isEditing ? (
          <Button
            className="bg-[#116114] text-white"
            onClick={() => setIsEditing(true)}
          >
            Edit Property
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              className="bg-green-600 text-white"
              onClick={handleSave}
              disabled={isUpdating}
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
        <Link href="/main-admin/properties">
          <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
            <MdArrowBackIosNew /> Back
          </button>
        </Link>
      </div>
    </div>
  );
}
