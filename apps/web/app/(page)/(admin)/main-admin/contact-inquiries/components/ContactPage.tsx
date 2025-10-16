"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiEdit2Line } from "react-icons/ri";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import Socials from "./SocialLinkForm";
import { useFetchData, usePutData } from "@/hooks/useApi";
import Loader from "@/components/Loader";
import { LuInstagram } from "react-icons/lu";
import { BsTwitterX, BsWhatsapp, BsFacebook, BsTiktok } from "react-icons/bs";
import { SlSocialLinkedin } from "react-icons/sl";
import { Breadcrumb } from "../../customers/components/Breadcrumb";

interface ContactData {
  id: string;
  companyEmail: string;
  phoneNumber: string;
  whatsappNumber: string;
  socialMedia: Array<{ url: string; platform: string }>;
  mapEmbedCode: string;
  officeAddress: string;
  createdAt: string;
  updatedAt: string;
  agentInquiry: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function ContactPage() {
  const [socialOpen, setSocialOpen] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState<"embed" | "address">("address");
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<ContactData>({
    id: "",
    companyEmail: "",
    phoneNumber: "",
    whatsappNumber: "",
    socialMedia: [],
    mapEmbedCode: "",
    officeAddress: "",
    createdAt: "",
    updatedAt: "",
    agentInquiry: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const { data, isLoading: isDataLoading, refetch } = useFetchData("contact");
  const { mutateAsync: updateContact, isPending: isUpdating } =
    usePutData("contact");

  // Update form data when API data is loaded
  useEffect(() => {
    if (data && data.success && data.data) {
      setFormData({
        ...data.data,
        mapEmbedCode: data.data.mapEmbedCode || "",
        officeAddress: data.data.officeAddress || "",
        companyEmail: data.data.companyEmail || "",
        phoneNumber: data.data.phoneNumber || "",
        whatsappNumber: data.data.whatsappNumber || "",
        socialMedia: data.data.socialMedia || [],
      });
    }
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ContactData] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSocialLinksChange = (
    socialLinks: Array<{ platform: string; url: string }>
  ) => {
    // Keep all links in state (including empty ones for better UX)
    // Filter will happen when saving to backend
    setFormData((prev) => ({
      ...prev,
      socialMedia: socialLinks,
    }));
  };

  const handleSave = async () => {
    setError(null);

    try {
      // Filter out social links with empty URLs before saving
      const validSocialLinks = formData.socialMedia.filter(
        (link) => link.url.trim() !== ""
      );

      const dataToSave = {
        ...formData,
        socialMedia: validSocialLinks,
      };

      const response = await updateContact(dataToSave);

      if (response) {
        setEditMode(false);
        refetch();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "account-officers") {
      router.push("/main-admin/contact-inquiries/account-officer");
    }
  };

  // Loading state
  if (isDataLoading) {
    return <Loader />;
  }

  // Error state
  if (error && !isDataLoading) {
    return (
      <div className="space-y-6">
        <div className="border-b-2 border-gray-200 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-[#858C95]">
              <span>Admin</span>
              <span className="text-xl text-[#858C95]">/</span>
              <span className="font-medium text-xl text-[#116114]">
                Contact Page
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#116114] hover:bg-green-800"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="border-b-2 border-gray-200 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <Breadcrumb
              items={[
                { label: "Home", href: "/main-admin" },
                { label: "Contact Page", href: "#" },
              ]}
            />
            {editMode && (
              <>
                <span className="text-xl text-[#858C95]">/</span>
                <span className="font-medium text-xl text-[#116114]">Edit</span>
              </>
            )}
          </div>

          {!editMode && (
            <Button
              onClick={() => setEditMode(true)}
              className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800"
            >
              Edit
              <RiEdit2Line />
            </Button>
          )}
        </div>
      </div>

      {/* Header Tabs (Only show when NOT in edit mode) */}
      {!editMode && (
        <div className="w-full">
          <div className="grid w-fit text-sm grid-cols-2 gap-2">
            <p
              onClick={() => handleClick("contact")}
              className={`px-6 py-2 rounded text-center text-[#4C5560] cursor-pointer font-medium ${
                activeTab === "contact" ? "bg-white" : "text-primary"
              }`}
            >
              Contact
            </p>
            <p
              onClick={() => handleClick("account-officers")}
              className={`px-6 py-2 rounded text-center text-[#4C5560] cursor-pointer font-medium ${
                activeTab === "account-officers" ? "bg-white" : "text-primary"
              }`}
            >
              Account officers
            </p>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="p-6 bg-white space-y-8">
        <h1 className="font-medium text-[#116114]">Contact information</h1>

        <div className="space-y-2 text-sm text-[#323539]">
          <Label htmlFor="email">Company Email</Label>
          <Input
            id="email"
            value={formData?.companyEmail}
            onChange={(e) => handleInputChange("companyEmail", e.target.value)}
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
          />
        </div>

        <div className="space-y-2 text-sm text-[#323539]">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            value={formData?.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
          />
        </div>

        <div className="space-y-2 text-sm text-[#323539]">
          <Label htmlFor="whatsapp">Whatsapp number</Label>
          <Input
            id="whatsapp"
            value={formData?.whatsappNumber}
            onChange={(e) =>
              handleInputChange("whatsappNumber", e.target.value)
            }
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
          />
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-[#323539]">Social media</Label>
            {editMode && (
              <Button
                onClick={() => setSocialOpen(true)}
                variant="outline"
                size="sm"
                className="text-[#116114] hover:text-[#116114]"
              >
                Edit Social Links
              </Button>
            )}
          </div>

          {/* Display social media links when not in edit mode */}
          {!editMode && formData?.socialMedia?.length > 0 && (
            <div className="space-y-3">
              {formData?.socialMedia?.map((link, index) => {
                const getIcon = (platform: string) => {
                  switch (platform.toLowerCase()) {
                    case "whatsapp":
                      return <BsWhatsapp className="w-5 h-5 text-green-600" />;
                    case "facebook":
                      return <BsFacebook className="w-5 h-5 text-blue-600" />;
                    case "linkedin":
                      return (
                        <SlSocialLinkedin className="w-5 h-5 text-blue-600" />
                      );
                    case "x":
                      return <BsTwitterX className="w-5 h-5 text-black" />;
                    case "instagram":
                      return <LuInstagram className="w-5 h-5 text-pink-600" />;
                    case "tiktok":
                      return <BsTiktok className="w-5 h-5 text-black" />;
                    default:
                      return (
                        <div className="w-5 h-5 bg-gray-400 rounded-full" />
                      );
                  }
                };

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {getIcon(link.platform)}
                    <div className="flex-1">
                      <div className="font-medium capitalize text-sm text-[#323539]">
                        {link.platform}
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#116114] hover:underline break-all"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Show placeholder when no social links */}
          {!editMode && formData?.socialMedia?.length === 0 && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 text-center">
                No social media links added
              </div>
              <div className="text-xs text-gray-400 text-center mt-1">
                Click "Edit Social Links" to add your social media profiles
              </div>
            </div>
          )}

          {/* Modal */}
          <Dialog open={socialOpen} onOpenChange={setSocialOpen}>
            <DialogContent className="max-w-md w-full p-0 bg-white rounded-md shadow-lg border-none">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium text-[#323539]">
                  Edit Social Media Links
                </h3>
              </div>
              <Socials
                socialLinks={formData?.socialMedia}
                onSocialLinksChange={handleSocialLinksChange}
                disabled={isUpdating}
              />
              <div className="p-4 border-t flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSocialOpen(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setSocialOpen(false)}
                  disabled={isUpdating}
                  className="bg-[#116114] text-white"
                >
                  Done
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Map Location */}
        <div className="space-y-4">
          <Label>Map location</Label>
          <div className="flex gap-4">
            {["embed", "address"].map((type) => (
              <div className="flex items-center gap-2" key={type}>
                <button
                  onClick={() => setSelected(type as "embed" | "address")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selected === type
                      ? "bg-[#116114] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Use {type} code
                </button>
              </div>
            ))}
          </div>

          {/* Map Embed Code Input */}
          {selected === "embed" && editMode && (
            <div className="space-y-2">
              <Label htmlFor="map-embed">Map Embed Code</Label>
              <textarea
                id="map-embed"
                value={formData?.mapEmbedCode}
                onChange={(e) =>
                  handleInputChange("mapEmbedCode", e.target.value)
                }
                placeholder="Paste your Google Maps embed code here..."
                className="w-full p-3 border border-gray-300 rounded-md resize-none h-32 focus:ring-2 focus:ring-[#116114] focus:border-[#116114]"
                disabled={!editMode}
              />
            </div>
          )}
        </div>

        {/* Office Address */}
        <div className="space-y-2">
          <Label htmlFor="office-address">Office address</Label>
          <Input
            id="office-address"
            value={formData?.officeAddress}
            onChange={(e) => handleInputChange("officeAddress", e.target.value)}
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
            placeholder="Enter your office address"
          />
        </div>

        {/* Map Preview */}
        <div className="space-y-2">
          <Label>Map Preview</Label>
          <div
            className={`border border-gray-300 rounded-lg overflow-hidden ${
              editMode ? "bg-white" : "bg-[#D9D9D9]"
            }`}
            style={{ height: "300px" }}
          >
            {selected === "embed" && formData?.mapEmbedCode ? (
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: formData?.mapEmbedCode }}
              />
            ) : selected === "address" && formData?.officeAddress ? (
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-lg font-medium text-[#323539] mb-2">
                    Office Address
                  </div>
                  <div className="text-sm text-gray-600">
                    {formData?.officeAddress}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Address will be displayed on the contact page
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-500 mb-2">
                    {selected === "embed"
                      ? "No embed code added"
                      : "No address added"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {selected === "embed"
                      ? "Add a Google Maps embed code to show the map"
                      : "Add an office address to display location"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Agent Inquiry */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            Become an agent inquiry
          </h2>

          <div className="space-y-4">
            {[
              { key: "agentInquiry.name", label: "Full name" },
              { key: "agentInquiry.email", label: "Email address" },
              { key: "agentInquiry.phone", label: "Phone number" },
            ].map(({ key, label }) => (
              <div className="space-y-2" key={key}>
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  value={
                    key.includes(".")
                      ? formData?.[key.split(".")[0] as keyof ContactData]?.[
                          key.split(".")[1] as keyof any
                        ] || ""
                      : formData?.[key as keyof ContactData] || ""
                  }
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  disabled={!editMode}
                  className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save/Back Buttons */}
        <div className="flex justify-between items-center py-4">
          {editMode && (
            <Button
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          )}
          <button
            onClick={() => setEditMode(false)}
            className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
          >
            <MdArrowBackIosNew />
            Back to page
          </button>
        </div>
      </div>
    </div>
  );
}
