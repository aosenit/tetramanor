"use client";

import { useState, useEffect } from "react";
import { useFetchData, usePutData, useUploadData } from "@/hooks/useApi";
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
import {
  Upload,
  FileUp,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

// Password validation schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export default function AccountSettings() {
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [ninNumber, setNinNumber] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [docType, setDocType] = useState("NIN");
  const [kycStatus, setKycStatus] = useState<string>("PENDING");

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Display picture state
  const [displayPicture, setDisplayPicture] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Password validation errors
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // API hooks
  const { data: accountData, isLoading: isLoadingAccount } =
    useFetchData("customer/account/");
  const { data: kycData, isLoading: isLoadingKyc } = useFetchData("kyc");
  const updateAccountMutation = usePutData("customer/account/update");
  const changePasswordMutation = usePutData("auth/change-password");
  const uploadProfileImageMutation = useUploadData("upload/profile-image");
  const uploadKycDocumentMutation = useUploadData("kyc/upload");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Update profile data when API data is loaded
  useEffect(() => {
    if (accountData?.data) {
      const { name, email, phone } = accountData.data;
      setProfileData({
        name: name || "",
        email: email || "",
        phone: phone || "",
      });
    }
  }, [accountData]);

  // Update KYC status when API data is loaded
  useEffect(() => {
    if (kycData?.data) {
      setKycStatus(kycData.data.status || "PENDING");
    }
  }, [kycData]);

  // Get KYC status display
  const getKycStatusDisplay = (status: string) => {
    switch (status?.toUpperCase()) {
      case "VERIFIED":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          text: "Verified",
          color: "text-green-500",
        };
      case "REJECTED":
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: "Rejected",
          color: "text-red-500",
        };
      case "PENDING":
      default:
        return {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          text: "Pending",
          color: "text-yellow-500",
        };
    }
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Clear errors when password data changes
  useEffect(() => {
    setPasswordErrors({});
  }, [
    passwordData.currentPassword,
    passwordData.newPassword,
    passwordData.confirmPassword,
  ]);

  // Load profile image from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.profileImage?.imageUrl) {
      setProfileImage(user.profileImage.imageUrl);
    }
  }, []);

  const handleDisplayPictureUpload = async (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PNG, JPG, or WebP image.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append("image", file);

      // Upload to API
      const response = await uploadProfileImageMutation.mutateAsync(formData);

      if (response.success && response.data) {
        // Update localStorage with profile image data
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = {
          ...currentUser,
          profileImage: response.data.profileImage,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update the display picture state with the new image URL
        setDisplayPicture(response.data.profileImage.imageUrl);

        toast.success(
          response.message || "Profile image updated successfully!"
        );

        // Refresh the page to update the UI
        window.location.reload();
      } else {
        toast.error("Failed to upload profile image. Please try again.");
      }
    } catch (error: any) {
      console.error("Error uploading profile image:", error);
      toast.error(
        error?.message || "Failed to upload profile image. Please try again."
      );
    }
  };

  const handleDisplayPictureInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleDisplayPictureUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PNG, JPG, DOCX, or PDF file.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB.");
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

  const handleProfileSave = async () => {
    try {
      await updateAccountMutation.mutateAsync({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      // Validate password data with Zod
      const validatedData = passwordSchema.parse(passwordData);

      await changePasswordMutation.mutateAsync({
        currentPassword: validatedData.currentPassword,
        newPassword: validatedData.newPassword,
        confirmPassword: validatedData.confirmPassword,
      });

      toast.success("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Reset password visibility states
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      // Clear errors
      setPasswordErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setPasswordErrors(errors);

        // Show first error as toast
        const firstError = error.errors[0];
        if (firstError) {
          toast.error(firstError.message);
        }
      } else {
        console.error("Error updating password:", error);
        toast.error(
          "Failed to update password. Please check your current password and try again."
        );
      }
    }
  };

  const handleKycVerify = async () => {
    if (!ninNumber || ninNumber.length === 0) {
      toast.error("Please enter a valid document ID.");
      return;
    }
    if (!uploadedFile) {
      toast.error("Please upload a document.");
      return;
    }

    try {
      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      formData.append("document", uploadedFile);
      formData.append("docId", ninNumber);
      formData.append("docType", docType);

      // Upload KYC document
      const response = await uploadKycDocumentMutation.mutateAsync(formData);

      if (response.success) {
        toast.success("KYC verification submitted successfully!");
        setIsKycModalOpen(false);
        setNinNumber("");
        setUploadedFile(null);
        setDocType("NIN");

        // Refresh KYC data
        // You might need to add a refetch function here if available
      } else {
        toast.error("Failed to submit KYC verification. Please try again.");
      }
    } catch (error: any) {
      console.error("Error submitting KYC verification:", error);
      toast.error(
        error?.message || "Failed to submit KYC verification. Please try again."
      );
    }
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
                  <AvatarImage
                    src={
                      profileImage ||
                      displayPicture ||
                      "/placeholder.svg?height=64&width=64"
                    }
                  />
                  <AvatarFallback className="text-lg font-semibold bg-gray-200">
                    {profileData?.name?.split(" ")[0]?.charAt(0)}
                    {profileData?.name?.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="display-picture-upload"
                  className="cursor-pointer"
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <span>
                      <Upload className="h-4 w-4" />
                      Upload
                    </span>
                  </Button>
                  <input
                    id="display-picture-upload"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleDisplayPictureInputChange}
                  />
                </label>
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

              {isLoadingAccount ? (
                <div className="lg:w-[60%]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-28 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex justify-start">
                      <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6  items-end  lg:w-[60%]">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full name
                    </Label>
                    <Input
                      id="name"
                      value={profileData?.name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          name: e.target.value,
                        })
                      }
                      disabled={isLoadingAccount}
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
                      value={profileData?.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      disabled={isLoadingAccount}
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
                      value={profileData?.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      disabled={isLoadingAccount}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-start">
                    <Button
                      onClick={handleProfileSave}
                      disabled={
                        updateAccountMutation.isPending || isLoadingAccount
                      }
                      className="bg-[var(--primary-green)] hover:bg-green-700"
                    >
                      {updateAccountMutation.isPending
                        ? "Saving..."
                        : "Save changes"}
                    </Button>
                  </div>
                </div>
              )}
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
                {!isLoadingKyc && (
                  <div className="flex items-center gap-2 mt-2">
                    {getKycStatusDisplay(kycStatus).icon}
                    <span
                      className={`text-sm font-medium ${getKycStatusDisplay(kycStatus).color}`}
                    >
                      {getKycStatusDisplay(kycStatus).text}
                    </span>
                  </div>
                )}
              </div>
              <Dialog open={isKycModalOpen} onOpenChange={setIsKycModalOpen}>
                <DialogTrigger asChild>
                  <div className="lg:w-[60%] ">
                    <Button
                      className="bg-[var(--primary-green)] hover:bg-green-700"
                      disabled={isLoadingKyc}
                    >
                      {isLoadingKyc ? "Loading..." : "Verify Identity"}
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
                    {/* Document Type */}
                    <div>
                      <Label
                        htmlFor="docType"
                        className="text-sm font-medium text-gray-900 mb-2 block"
                      >
                        Document Type
                      </Label>
                      <select
                        id="docType"
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      >
                        <option value="NIN">NIN (National ID)</option>
                        <option value="DRIVERS_LICENSE">
                          Driver's License
                        </option>
                        <option value="PASSPORT">Passport</option>
                        <option value="VOTERS_CARD">Voter's Card</option>
                      </select>
                    </div>

                    {/* Document ID */}
                    <div>
                      <Label
                        htmlFor="nin"
                        className="text-sm font-medium text-gray-900 mb-2 block"
                      >
                        {docType === "NIN" ? "NIN number" : "Document ID"}
                      </Label>
                      <Input
                        id="nin"
                        placeholder={
                          docType === "NIN"
                            ? "Enter your 11-digit identification number"
                            : "Enter your document ID"
                        }
                        value={ninNumber}
                        onChange={(e) => setNinNumber(e.target.value)}
                        maxLength={docType === "NIN" ? 11 : 20}
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
                            <p className="text-sm text-green-700 font-medium max-w-[200px] truncate">
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
                  <div className="relative mt-1">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className={`pr-10 ${passwordErrors.currentPassword ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {passwordErrors.currentPassword}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      New password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className={`pr-10 ${passwordErrors.newPassword ? "border-red-500 focus:border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {passwordErrors.newPassword}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`pr-10 ${passwordErrors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {passwordErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button
                    onClick={handlePasswordUpdate}
                    disabled={changePasswordMutation.isPending}
                    className="bg-[var(--primary-green)] hover:bg-green-700"
                  >
                    {changePasswordMutation.isPending
                      ? "Updating..."
                      : "Update password"}
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
