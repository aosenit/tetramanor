import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

type PropertyInfoSectionProps = {
  formData: any;
  errors: any;
  accountOfficersData: any;
  isLoadingAccountOfficers: boolean;
  handleInputChange: (field: string, value: any) => void;
  handleInquiryOptionChange: (option: string, checked: boolean) => void;
  inquiryOptions: { value: string; label: string }[];
};

export default function PropertyInfoSection({
  formData,
  errors,
  accountOfficersData,
  isLoadingAccountOfficers,
  handleInputChange,
  handleInquiryOptionChange,
  inquiryOptions,
}: PropertyInfoSectionProps) {
  return (
    <div className="p-6 bg-white">
      <div className="space-y-6">
        <h2 className="text-base font-medium text-[#116114]">Property Info</h2>
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
            className={`w-full border bg-[#E5E5E7] py-4 ${errors.name ? "border-red-500" : "border-[#116114]"}`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#323539]">
            Inquiry Options *
          </Label>
          <div className="space-y-3">
            {inquiryOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={formData.inquiryOptions.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleInquiryOptionChange(option.value, checked as boolean)
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
            <p className="text-red-500 text-sm">{errors.inquiryOptions}</p>
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
            className={`w-full border bg-[#E5E5E7] py-4 ${errors.address ? "border-red-500" : "border-[#116114]"}`}
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
            className={`min-h-[80px] bg-[#E5E5E7] border w-full ${errors.about ? "border-red-500" : "border-[#116114]"}`}
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
              {/* <SelectItem value="PLANNED">Planned</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="account-officer"
            className="text-sm font-medium text-[#323539]"
          >
            Account Officer (Optional)
          </Label>
          <Select
            value={formData.accountOfficerId || undefined}
            onValueChange={(value) =>
              handleInputChange(
                "accountOfficerId",
                value === "none" ? "" : value
              )
            }
          >
            <SelectTrigger className="w-full bg-[#E5E5E7] border border-[#116114]">
              <SelectValue placeholder="Select an account officer" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingAccountOfficers ? (
                <SelectItem value="loading" disabled>
                  Loading account officers...
                </SelectItem>
              ) : accountOfficersData?.data?.length > 0 ? (
                <>
                  <SelectItem value="none">No account officer</SelectItem>
                  {accountOfficersData.data.map((officer: any) => (
                    <SelectItem key={officer.id} value={officer.id}>
                      {officer.name} - {officer.email}
                    </SelectItem>
                  ))}
                </>
              ) : (
                <SelectItem value="none">
                  No account officers available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
