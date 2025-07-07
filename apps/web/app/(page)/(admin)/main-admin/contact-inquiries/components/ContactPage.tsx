"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiEdit2Line } from "react-icons/ri";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import Socials from "./SocialLinkForm";
import { useFetchData, usePutData } from "@/hooks/useApi";
import Loader from "@/components/Loader";

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
    if (data && data.success) {
      setFormData(data.data);
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

  const handleSave = async () => {
    setError(null);

    try {
      const response = await updateContact(formData);

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
            <span>Admin</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Contact Page
            </span>
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
            value={formData.companyEmail}
            onChange={(e) => handleInputChange("companyEmail", e.target.value)}
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
          />
        </div>

        <div className="space-y-2 text-sm text-[#323539]">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
          />
        </div>

        <div className="space-y-2 text-sm text-[#323539]">
          <Label htmlFor="whatsapp">Whatsapp number</Label>
          <Input
            id="whatsapp"
            value={formData.whatsappNumber}
            onChange={(e) =>
              handleInputChange("whatsappNumber", e.target.value)
            }
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
          />
        </div>

        <>
          <div
            onClick={() => setSocialOpen(true)}
            className="flex items-center text-sm text-[#323539] gap-2 text-left font-medium cursor-pointer"
          >
            <span>Social media</span>
            <ChevronDown />
          </div>

          {/* Modal */}
          <Dialog open={socialOpen} onOpenChange={setSocialOpen}>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
              <DialogContent className="max-w-md w-full p-0 bg-white rounded-md z-50 shadow-lg border-none">
                <Socials />
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </>

        {/* Map Location */}
        <div className="space-y-4">
          <Label>Map location</Label>
          <div className="flex gap-6">
            {["embed", "address"].map((type) => (
              <div className="flex items-center gap-2" key={type}>
                <div
                  onClick={() => setSelected(type as "embed" | "address")}
                  className={`cursor-pointer py-2 px-2 rounded-full text-sm ${
                    selected === type
                      ? "bg-gray-300 text-black"
                      : "bg-gray-100 text-gray-500"
                  }`}
                ></div>
                <p>Use {type} code</p>
              </div>
            ))}
          </div>
        </div>

        {/* Office Address */}
        <div className="space-y-2">
          <Label htmlFor="office-address">Office address</Label>
          <Input
            id="office-address"
            value={formData.officeAddress}
            onChange={(e) => handleInputChange("officeAddress", e.target.value)}
            disabled={!editMode}
            className={editMode ? "bg-white" : "bg-[#D9D9D9]"}
          />
        </div>

        {/* Map Preview */}
        <div
          className={`border h-64 rounded-lg flex items-center justify-center ${
            editMode ? "bg-white" : "bg-[#D9D9D9]"
          }`}
        >
          {selected === "embed" && formData.mapEmbedCode ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: formData.mapEmbedCode }}
            />
          ) : (
            <span className="text-gray-500">Map preview</span>
          )}
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
                      ? formData[key.split(".")[0] as keyof ContactData]?.[
                          key.split(".")[1] as keyof any
                        ] || ""
                      : formData[key as keyof ContactData] || ""
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
