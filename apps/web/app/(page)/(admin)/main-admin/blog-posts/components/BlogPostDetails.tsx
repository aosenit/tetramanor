"use client";
import { Button } from "@/components/ui/button";
import four from "@/assets/admin/home/four.webp";
import Image from "next/image";
import logo from "@/assets/home/logo.webp";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { RiEdit2Line } from "react-icons/ri";

export default function CampaignModal({
  post,
  open,
  onClose,
}: {
    open: boolean;
  post?: any;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Status");
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

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-5xl  overflow-hidden bg-white">
        <header className="bg-[#323539]  text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="flex items-center border-b border-gray-300 p-6 justify-between">
          <div className="flex items-center space-x-1  text-[#858C95]">
            <span>Admin</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              View blog post detail
            </span>
          </div>
          <Link href="/main-admin/blog-posts/edit-blog">
            <Button className="bg-white border border-[#E5E5E7] text-[#323539] flex items-center gap-2 text-sm hover:bg-white">
              <Plus className="" />
              Add New post
            </Button>
          </Link>
        </div>

        <div className="p-6 space-y-6 ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex items-center">
                <p className="text-[#979AA0]">Status</p>
                <p className="text-[#000000]">;</p>
                <p className="text-[#116114]">Published</p>
              </div>
              <div className="flex items-center">
                <p className="text-[#979AA0]">Date posted</p>
                <p className="text-[#000000]">;</p>
                <p className="text-[#116114]">April 24 2025</p>
              </div>
              <div className="flex items-center">
                <p className="text-[#979AA0]">Author</p>
                <p className="text-[#000000]">;</p>
                <p className="text-[#116114]">Gloria Bliss</p>
                <p className="text-[#858C95]"> (Admin)</p>
              </div>
            </div>
            <div className="relative inline-block w-32 text-sm font-medium text-[#323539]">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selected}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </div>
              {isOpen && (
                <div className="absolute mt-1 z-10 w-full rounded shadow text-[#323539] bg-white">
                  {["Unpublished", "Delete"].map((item) => (
                    <div
                      key={item}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6  p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-[#858C95] font-medium">
            <div>
              <p>Blog Images</p>
            </div>
            <div className="flex items-center gap-4">
              <p>Published</p>
              <Link href={"/main-admin/blog-posts/edit-blog"}>
                <p className="flex items-center gap-1 cursor-pointer">
                  Edit <RiEdit2Line />
                </p>
              </Link>
            </div>
          </div>
          <div className=" pb-8 border-b border-gray-300 flex flex-col md:flex-row gap-10">
            <Image src={four} alt="Image" className="md:w-[200px] w-full " />
            <Image src={four} alt="Image" className="md:w-[200px] w-full " />
            <Image src={four} alt="Image" className="md:w-[200px] w-full " />
            <Image src={four} alt="Image" className="md:w-[200px] w-full " />
          </div>
        </div>
        <div className="text-[#323539]  leading-relaxed p-6 ">
          <h3 className="text-[#858C95] text-sm font-medium">Blog title</h3>
          <p className="py-2 text-[#116114]">
            The Future of Ebute Metta: A New Era of Real Estate Growth
          </p>
          <p className="text-sm text-[#323539] leading-[20px]">
            Ebute Metta is poised for a transformative journey into one of
            Lagos's most desirable residential and commercial hubs. With
            infrastructure projects like the Red Line Railway nearing completion
            and multiple road expansions underway, property values in Ebute
            Metta are projected to rise by over 25% in the next 3 years.
            Tetramanor is proud to lead this growth with premium projects such
            as TM HighGardens and Queen Mary Residences, offering investors and
            homeowners luxury, security, and sustainability. In this article, we
            explore:
          </p>
          <ul className="list-disc text-sm text-[#323539] pl-6 space-y-2">
            <li className="">
              Upcoming transport infrastructure boosting accessibility
            </li>
            <li className="">
              Urban redevelopment plans and eco-friendly estates
            </li>
            <li className="">How to invest early and maximize returns</li>
          </ul>
          <p className="text-sm border-b border-gray-300 pb-6  text-[#323539] leading-[20px] pt-4">
            Stay tuned for exclusive offers on Tetramanor's latest investment
            opportunities in Ebute Metta!
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 p-6 bg-white">
          <button
            onClick={onClose}
            className="text-[#323539] hover:text-[#323539] text-sm"
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};
