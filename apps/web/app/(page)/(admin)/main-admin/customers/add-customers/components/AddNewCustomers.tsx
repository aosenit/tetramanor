"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md';

export default function AddNewCustomers() {
     const [editMode, setEditMode] = useState(false);
  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Add new customer
            </span>
          </div>
          <Link href="">
            <Button variant={"ghost"} className="text-sm">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <h5>
          Manually create a user account for a buyer, tenant, or investor.
        </h5>
        <div className="bg-white p-4">
          <div className="space-y-2">
            <Label
              htmlFor="property-name"
              className="text-sm font-medium text-[#323539]"
            >
Full name
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
                      <p>Customer refered by marketing team</p>
                  </div>
                    <div className="flex justify-between pt-6 items-center pb-4">
                            <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
                              Add customer
            </button>
            <Link href="/main-admin/customers">
                            <button
                              onClick={() => setEditMode(false)}
                              className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
                            >
                              <MdArrowBackIosNew />
                              Back to Customers
              </button>
              </Link>
                          </div>
        </div>
      </div>
    </div>
  );
}
