"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, FileUp } from "lucide-react";

export default function AccountSettings() {
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [ninNumber, setNinNumber] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "Damian",
    lastName: "Price",
    email: "damianprice@gmail.com",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const handleFileUpload = (file: File) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PNG, JPG, DOCX, or PDF file.");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 10MB.");
      return;
    }

    setUploadedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleProfileSave = () => {
    console.log("Profile saved:", profileData);
    alert("Profile updated successfully!");
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.retypePassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Password updated");
    alert("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      retypePassword: "",
    });
  };

  const handleKycVerify = () => {
    if (!ninNumber || ninNumber.length !== 11) {
      alert("Please enter a valid 11-digit NIN number.");
      return;
    }
    if (!uploadedFile) {
      alert("Please upload a document.");
      return;
    }
    console.log("KYC verification submitted:", {
      ninNumber,
      file: uploadedFile.name,
    });
    alert("KYC verification submitted successfully!");
    setIsKycModalOpen(false);
    setNinNumber("");
    setUploadedFile(null);
  };

  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your account and personal preferences.
          </p>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 divide-y  ">
            {/* Display Picture */}
            <div className="flex items-center gap-4 lg:justify-between">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Display picture
                </h3>
                <p className="text-sm text-gray-500">
                  Personalize your profile with a photo
                </p>
              </div>
              <div className="flex items-center gap-4 lg:w-[60%] ">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="text-lg font-semibold bg-gray-200">
                    DP
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex flex-col gap-4 lg:flex-row py-8 lg:justify-between ">
              <div className="">
                <h3 className="font-medium text-gray-900 mb-1 ">
                  Profile Information
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Edit your details to keep your profile up to date
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6   lg:w-[60%]">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-start">
                  <Button
                    onClick={handleProfileSave}
                    className="bg-[var(--primary-green)] hover:bg-green-700"
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 ">
            {/* KYC Verification */}
            <div className="flex items-center gap-4 lg:gap-10 justify-between">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  KYC Verification
                </h3>
                <p className="text-sm text-gray-500">
                  Verify your identity to unlock full account access.
                </p>
              </div>
              <Dialog open={isKycModalOpen} onOpenChange={setIsKycModalOpen}>
                <DialogTrigger asChild>
                  <div className="lg:w-[60%] ">
                    <Button className="bg-[var(--primary-green)] hover:bg-green-700">
                      Verify Identity
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Verify your identity
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* NIN Number */}
                    <div>
                      <Label
                        htmlFor="nin"
                        className="text-sm font-medium text-gray-900 mb-2 block"
                      >
                        NIN number
                      </Label>
                      <Input
                        id="nin"
                        placeholder="Enter your 11-digit identification number"
                        value={ninNumber}
                        onChange={(e) => setNinNumber(e.target.value)}
                        maxLength={11}
                        className="w-full"
                      />
                    </div>

                    {/* Upload Document */}
                    <div>
                      <Label className="text-sm font-medium text-gray-900 mb-4 block">
                        Upload document
                      </Label>

                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          isDragOver
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag and drop file here or
                        </p>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-black hover:text-black/80 underline font-medium">
                            Choose file
                          </span>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg,.pdf,.docx"
                            onChange={handleFileInputChange}
                          />
                        </label>

                        {uploadedFile && (
                          <div className="mt-4 p-2 bg-green-50 rounded border border-green-200">
                            <p className="text-sm text-green-700 font-medium">
                              File uploaded: {uploadedFile.name}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Supported file types: PNG, JPG, DOCX, PDF</span>
                        <span>Maximum size: 10MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsKycModalOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleKycVerify}
                      className="flex-1 bg-[var(--primary-green)] hover:bg-green-700"
                    >
                      Verify
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Update Password */}
            <div className="flex flex-col gap-4 lg:flex-row py-8 lg:justify-between">
              <div className="">
                <h3 className="font-medium text-gray-900 mb-1">
                  Update password
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Keep your account safe with a new password
                </p>
              </div>

              <div className="space-y-4 mb-6 lg:w-[60%]">
                <div className="lg:w-[50%]">
                  <Label
                    htmlFor="currentPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      New password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="retypePassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Retype password
                    </Label>
                    <Input
                      id="retypePassword"
                      type="password"
                      value={passwordData.retypePassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          retypePassword: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button
                    onClick={handlePasswordUpdate}
                    className="bg-[var(--primary-green)] hover:bg-green-700"
                  >
                    Update password
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
