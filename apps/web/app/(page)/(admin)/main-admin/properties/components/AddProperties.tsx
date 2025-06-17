import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { Textarea } from "@chakra-ui/react";
import InvestmentForm from "./WhyInvest";
import PropertyFeaturesForm from "./PropertyFeaturesForm";
import TagInputGroup from "./PropertyFeaturesForm";
import FileUpload from "./UploadFile";
import AccountOfficerInfo from "./AccountOfficerInfo";

export default function AddProperties() {
  return (
    <div className="min-h-screen">
      <div className="">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-1">
            <span className="text-[#323539]">Properties</span>
            <span className="flex items-center text-[#858C95] space-x-[2px]">
              <ChevronRight className="" />
              <ChevronRight className="" />
              <ChevronRight className="" />
            </span>
            <span className="text-[#858C95]">Edit</span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className=" font-semibold text-[#116114]">
              Add / Edit Property
            </h1>
            <Tabs defaultValue="personal" className="w-auto">
              <TabsList className="inline-flex w-full bg-[#E5E5E7] rounded-md overflow-hidden p-1">
                <TabsTrigger
                  value="company"
                  className="rounded-sm px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#323539]"
                >
                  Company
                </TabsTrigger>
                <TabsTrigger
                  value="personal"
                  className=" px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#323539]"
                >
                  Personal
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="p-6 bg-white">
          <form className="space-y-8">
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
                  className="w-full border border-[#116114] bg-[#E5E5E7] py-4"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="inquiry-form" />
                  <Label
                    htmlFor="inquiry-form"
                    className="text-sm text-[#181818]"
                  >
                    Inquiry form
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="whats-app" />
                  <Label htmlFor="whats-app" className="text-sm text-[#181818]">
                    What's app
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="book-inspection" />
                  <Label
                    htmlFor="book-inspection"
                    className="text-sm text-[#181818]"
                  >
                    Book inspection
                  </Label>
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
                  className="w-full border-none bg-[#E5E5E7] py-4"
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
                  className="min-h-[80px] !bg-[#E5E5E7] !border-none"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white mt-4 p-6">
          <div className="space-y-6">
            <h2 className="text-base font-medium text-[#116114]">
              Unit description
            </h2>

            <div className="space-y-2">
              <Label
                htmlFor="no-of-units"
                className="text-sm font-medium text-[#323539]"
              >
                No of units
              </Label>
              <Input
                id="no-of-units"
                type="number"
                className="w-full bg-[#e5e5e7] border-none"
                min="0"
              />
            </div>
          </div>
          <InvestmentForm />
          <h3 className="text-base  py-4 font-medium text-[#116114]">
            Property features and amenities
          </h3>
          <TagInputGroup label="Features" />
          <TagInputGroup label="Amenities" />
          <div className="flex gap-6 ">
            <FileUpload
              label="Upload property images"
              accept="image/*"
              multiple={true}
              id="property-images"
            />

            <FileUpload
              label="Upload property brochure"
              accept="application/pdf"
              multiple={false}
              id="brochure"
            />
          </div>
        </div>
        <AccountOfficerInfo/>
      </div>
    </div>
  );
}
