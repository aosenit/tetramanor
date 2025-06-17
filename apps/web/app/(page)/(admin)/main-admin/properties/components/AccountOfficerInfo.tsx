import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import FileUpload from './UploadFile'
import Link from 'next/link';
import { MdArrowBackIosNew } from 'react-icons/md';

export default function AccountOfficerInfo() {
  return (
    <div className=" mt-4 p-6 bg-white">
      <form className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-base font-medium text-[#116114]">
            Account officer's information
          </h2>
          <div className="space-y-2">
            <Label
              htmlFor="property-name"
              className="text-sm font-medium text-[#323539]"
            >
              Account officer full name
            </Label>
            <Input
              id="officer-name"
              type="text"
              className="w-full border-none bg-[#E5E5E7] py-4"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-[#323539]"
            >
              Email
            </Label>
            <Input
              id="email"
              type="text"
              className="w-full border-none bg-[#E5E5E7] py-4"
            />
          </div>
          <div className="space-y-2 pb-4">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-[#323539]"
            >
              Phone number
            </Label>
            <Input
              id="phone"
              type="text"
              className="w-full border-none bg-[#E5E5E7] py-4"
            />
          </div>
          <div className="pb-4 w-fit mx-auto flex justify-center items-center">
            <FileUpload
              label="Upload profile picture"
              accept="image/*"
              multiple={false}
              id="property-images"
            />
          </div>
          <div className="flex justify-between items-center py-4">
            <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
              Publish
            </button>
            <Link href="/main-admin/properties">
              <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
                <MdArrowBackIosNew/> Back to homepage
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
