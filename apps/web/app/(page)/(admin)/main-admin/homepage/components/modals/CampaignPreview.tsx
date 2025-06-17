"use client";
import Image from "next/image";
import six from "@/assets/admin/home/six.png";
import logo from "@/assets/home/logo.webp";
import { useEffect } from "react";

export default function CampaignPreview({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-3xl overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>
        <div className="px-6 py-4 border-b bg-white">
          <div className="text-sm font-medium text-[#323539]">
            Preview Campaign
          </div>
        </div>
        <div className="px-6 pb-6 pt-2 space-y-6 bg-white">
          <p className="text-[#4C5560] text-xs">
            This is how your campaign will appear on the homepage.
          </p>

          <div className=" bg-white rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-[#000000]">
                TM HighGardens Promo
              </p>
              <button className="text-[#4C5560] hover:text-[#4C5560] text-xs">
                Change Image
              </button>
            </div>

            <div className="mb-6">
              <Image
                src={six}
                alt="TM HighGardens Property"
                width={800}
                height={300}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm">
                <p className="font-medium text-[#383D43]">Date :</p>
                <p className="ml-2 font-medium text-[#116114]">
                  April 20 - May 30 2025
                </p>
              </div>

              <div className="flex items-center text-sm">
                <p className="font-medium text-[#383D43]">Campaign type :</p>
                <p className="ml-2 font-medium text-[#116114]">Investment</p>
              </div>

              <div className="flex items-start text-sm">
                <p className="font-medium text-[#383D43]">Description :</p>
                <p className="ml-2 font-medium text-[#116114]">
                  Invest now and earn 10% ROI annually with TM HighGardens.
                  Limited slots available
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
                Edit
              </button>
              <button
                onClick={onClose}
                className="text-[#323539] hover:text-[#323539] text-sm"
              >
                Back to homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
