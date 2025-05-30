"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UploadCloud, X } from "lucide-react";

export default function SettingsPage() {
  const [kycOpen, setKycOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
      <p className="text-gray-500 mb-6">
        Manage your account and personal preferences.
      </p>
      <div className="bg-white rounded-xl shadow p-6 md:p-10 space-y-10">
        {/* Personal Information */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
                DP
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <UploadCloud className="w-4 h-4" /> Upload
              </Button>
            </div>
            {/* Profile Form */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First name
                </label>
                <Input defaultValue="Damian" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <Input defaultValue="Price" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email address
                </label>
                <Input defaultValue="damianprice@gmail.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone number
                </label>
                <Input type="tel" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button className="bg-green-700 hover:bg-green-800 w-full md:w-auto">
              Save changes
            </Button>
          </div>
        </div>
        <hr />
        {/* Security Section */}
        <div className="space-y-8">
          <h2 className="text-lg font-semibold mb-2">Security</h2>
          {/* KYC Verification */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-medium">KYC Verification</div>
              <div className="text-gray-500 text-sm">
                Verify your identity to unlock full account access.
              </div>
            </div>
            <Dialog open={kycOpen} onOpenChange={setKycOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-700 hover:bg-green-800 w-full md:w-auto">
                  Verify Identity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg w-full p-6 rounded-xl">
                <DialogHeader className="flex flex-row justify-between items-center mb-4">
                  <DialogTitle className="text-xl font-bold">
                    Verify your identity
                  </DialogTitle>
                  <DialogClose asChild>
                    <button className="text-gray-400 hover:text-gray-700">
                      <X className="w-6 h-6" />
                    </button>
                  </DialogClose>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      NIN number
                    </label>
                    <Input
                      placeholder="Enter your 11-digit identification number"
                      maxLength={11}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Upload document
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50">
                      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                      <div className="mb-2">
                        Drag and drop file here or{" "}
                        <span className="text-green-700 underline cursor-pointer">
                          Choose file
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Supported file types: PNG, JPG, DOCX, PDF
                      </div>
                      <div className="text-xs text-gray-400">
                        Maximum size: 10MB
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button className="bg-green-700 hover:bg-green-800 w-full md:w-auto">
                      Verify
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {/* Update Password */}
          <div className="mt-8">
            <div className="font-medium mb-2">Update password</div>
            <div className="text-gray-500 text-sm mb-4">
              Keep your account safe with a new password
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <Input type="password" defaultValue="********" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New password
                </label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Retype password
                </label>
                <Input type="password" />
              </div>
            </div>
            <div className="mt-4">
              <Button className="bg-green-700 hover:bg-green-800 w-full md:w-auto">
                Update password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
