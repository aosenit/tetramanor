"use client";
import { useState } from "react";
import { Phone, Mail, CheckSquare, Square } from "lucide-react"; // React icons
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdArrowBackIosNew, MdEmail, MdPhone } from "react-icons/md";
import Link from "next/link";

export default function Contact() {
  const [options, setOptions] = useState({
    inquiry: true,
    whatsapp: true,
    inspection: false,
  });

  const toggle = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white mt-4 p-6">
      <h1 className="text-[#116114] text-sm px-3 font-medium mb-4">
        Contact options enabled
      </h1>

      <div className="flex justify-between items-center px-3">
        {/* Left side */}
        <div>
          <div className="space-y-4">
            {[
              { id: "inquiry", label: "Inquiry form" },
              { id: "whatsapp", label: "Whats app" },
              { id: "inspection", label: "Book inspection" },
            ].map(({ id, label }) => (
              <div
                key={id}
                onClick={() => toggle(id as keyof typeof options)}
                className="flex items-center space-x-3 cursor-pointer select-none"
              >
                {options[id as keyof typeof options] ? (
                  <IoIosCheckboxOutline className="text-2xl text-[#116114]" />
                ) : (
                  <Square className=" text-[#858C95]" />
                )}
                <p className="text-sm font-medium text-[#181818] leading-none">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div>
          <div className="flex border-b pb-4 items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
              JP
            </div>
            <div>
              <p className="font-semibold text-[#252525] text-sm">
                John D. Patkins
              </p>
              <p className="text-xs font-medium text-[#737687]">
                Account Officer
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MdPhone className="text-[#116114]" />
              <span className="text-[#0B0A0A] text-xs">+234 892 345 67</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MdEmail className="text-[#116114]" />
              <span className="text=[#0B0A0A]">johndpatkins@email.com</span>
            </div>
          </div>
        </div>
      </div>
        <div className="flex justify-between px-3 items-center py-12">
          <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
            Edit Property
          </button>
          <Link href="/main-admin/properties">
            <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
              <MdArrowBackIosNew /> Back
            </button>
          </Link>
        </div>
    </div>
  );
}
