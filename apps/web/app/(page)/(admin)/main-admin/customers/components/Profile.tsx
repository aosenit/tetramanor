"use client";
import { useState } from "react";
import { Button } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import four from '@/assets/admin/home/four.webp';
import React from 'react'
import { RiEditLine } from 'react-icons/ri';
import { MdArrowBackIosNew } from 'react-icons/md';
import AddUnitModal from "./UnitModal";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen space-y-6">
      <div className=" border-b border-[#E5E5E7] pb-4 ">
        <div className="flex items-center space-x-1  text-[#858C95]">
          <span>Home</span>
          <span className="text-xl text-[#858C95]">/</span>
          <span className="font-medium text-xl text-[#116114]">
            Customer management
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium text-[#858C95] mt-4">
            View user profile
            <span className="text-[#116114] font-medium"> - Grace Olabayo</span>
          </h1>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="flex items-center text-[#323539] gap-2 text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="" />
            Add new property
          </Button>
        </div>
      </div>
      <h5 className="text-[#116114] font-medium py-2">Profile</h5>
      <div className="bg-white rounded-sm p-6 space-y-4">
        <h3 className="text-[#4C5560] font-medium text-sm">
          Customer's information
        </h3>
        <div className="max-w-xl rounded-t-xl space-y-4 p-6 bg-[#F4F4F4] flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-full">
            <div className="absolute right-0">
              <RiEditLine className="text-[#858C95] font-medium text-2xl " />
            </div>
            <div className="bg-white p-4 rounded-full">
              <p className="text-2xl font-medium text-[#4C5560]">GO</p>
            </div>
          </div>

          <p className="text-[#4C5560] font-medium">Grace Olabayo</p>
        </div>
        <div className="max-w-xl rounded-b-xl space-y-4 p-10 bg-[#F4F4F4]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4C5560]">Email address</p>
            <p className="font-medium text-[#181818] text-sm">
              Olabayograce@gmail.com
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4C5560]">Phone number</p>
            <p className="font-medium text-[#181818] text-sm">+23467800032</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4C5560]">KYC status</p>
            <p className="font-medium text-[#116114] text-sm">Verified</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4C5560]">Customer since</p>
            <p className="font-medium text-[#181818] text-sm">Jan 12, 2025</p>
          </div>
        </div>
        <h3 className="text-[#4C5560] font-medium text-sm">
          Property management
        </h3>
        <div>
          <div className="flex items-center font-medium justify-between text-sm">
            <p className="text-[#116114]">Owned properties</p>
            <Link href="/main-admin/customers/owned-properties?tab=owned">
              <Button variant="ghost">View all</Button>
            </Link>
          </div>
          <div className="bg-[#F4F4F4] mt-2 rounded-md p-5 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-stretch gap-4 ">
                  <div className="h-full flex items-center">
                    <Image
                      src={four}
                      alt="Property"
                      width={100}
                      height={100}
                      className="object-cover rounded-lg h-full"
                    />
                  </div>
                  <div className="space-y-3 flex flex-col justify-center">
                    <p className="text-sm font-medium ml-3">
                      {
                        [
                          "Comfy burrows",
                          "Tm meadows",
                          "Tm high gardens",
                          "Kings landing",
                        ][i]
                      }
                    </p>
                    <p className="text-sm font-medium ml-3">
                      {[2, 4, 6, 4][i]} units
                    </p>
                    <Link href="/main-admin/customers/property-dashboard?tab=owned">
                      <Button variant={"ghost"}>View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center font-medium justify-between text-sm">
            <p className="text-[#116114]">Rented properties</p>
            <Link href="/main-admin/customers/owned-properties?tab=rented">
              <Button variant="ghost">View all</Button>
            </Link>
          </div>
          <div className="bg-[#F4F4F4] mt-2 rounded-md p-5 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-stretch gap-4 ">
                  <div className="h-full flex items-center">
                    <Image
                      src={four}
                      alt="Property"
                      width={100}
                      height={100}
                      className="object-cover rounded-lg h-full"
                    />
                  </div>
                  <div className="space-y-3 flex flex-col justify-center">
                    <p className="text-sm font-medium ml-3">
                      {
                        [
                          "Comfy burrows",
                          "Tm meadows",
                          "Tm high gardens",
                          "Kings landing",
                        ][i]
                      }
                    </p>
                    <p className="text-sm font-medium ml-3">
                      {[2, 4, 6, 4][i]} units
                    </p>
                    <Link href="/main-admin/customers/property-dashboard?tab=rented">
                      <Button variant={"ghost"}>View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" py-8">
          <Link href="/main-admin/customers">
            <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
              <MdArrowBackIosNew /> Back to homepage
            </button>
          </Link>
        </div>
      </div>
      <AddUnitModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
