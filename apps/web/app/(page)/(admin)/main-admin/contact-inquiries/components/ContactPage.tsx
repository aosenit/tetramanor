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
import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import Socials from "./SocialLinkForm";

export default function ContactPage() {
    const [socialOpen, setSocialOpen] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState<"embed" | "address">("address");
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("account-officers");

  const handleClick = (tab) => {
    setActiveTab(tab);
    if (tab === "account-officers") {
      router.push("/main-admin/contact-inquiries/account-officer");
    }
  };

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
                activeTab === "contact" ? "bg-white" : ""
              }`}
            >
              Contact
            </p>
            <p
              onClick={() => handleClick("account-officers")}
              className={`px-6 py-2 rounded text-center text-[#4C5560] cursor-pointer font-medium ${
                activeTab === "account-officers" ? "bg-white" : ""
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
            defaultValue="Contact@tetramanor.com"
            className={editMode ? "bg-[#D9D9D9]" : ""}
          />
        </div>

        <div className="space-y-2 text-sm text-[#323539]">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            defaultValue="+ 234 7890666654"
            className={editMode ? "bg-[#D9D9D9]" : ""}
          />
        </div>

        <div className="space-y-2 text-sm text-[#323539]">
          <Label htmlFor="whatsapp">Whatsapp number</Label>
          <Input
            id="whatsapp"
            defaultValue="+ 234 7890666654"
            className={editMode ? "bg-[#D9D9D9]" : ""}
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
              <DialogContent
                className="max-w-md w-full p-0 bg-white rounded-md z-50 shadow-lg border-none"
              >
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
            defaultValue="123 Street Name"
            className={editMode ? "bg-[#D9D9D9]" : ""}
          />
        </div>

        {/* Map Preview */}
        <div
          className={`border h-64 rounded-lg flex items-center justify-center ${
            editMode ? "bg-[#D9D9D9]" : "border-gray-200"
          }`}
        >
          <span className="text-gray-500">Map preview</span>
        </div>

        {/* Agent Inquiry */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            Become an agent inquiry
          </h2>

          <div className="space-y-4">
            {["name", "email", "phone"].map((field) => (
              <div className="space-y-2" key={field}>
                <Label htmlFor={field}>
                  {field === "name"
                    ? "Full name"
                    : field === "email"
                      ? "Email address"
                      : "Phone number"}
                </Label>
                <Input id={field} className={editMode ? "bg-[#D9D9D9]" : ""} />
              </div>
            ))}
          </div>
        </div>

        {/* Save/Back Buttons */}
        <div className="flex justify-between items-center py-4">
          <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
            Save changes
          </button>
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
