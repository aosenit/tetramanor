"use client";
import Image from "next/image";
import logo from "@/assets/home/logo.webp";
import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { Button } from "@chakra-ui/react";
import { FaRegFileLines } from "react-icons/fa6";
import { RiFileEditLine } from "react-icons/ri";
import { MdArrowBackIos } from "react-icons/md";

export default function InvestmentModal({
  post,
  open,
  onClose,
}: {
    open: boolean;
  post?: any;
  onClose: () => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageName, setImageName] = useState("Featured Image");
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

        <div className=" space-y-4 text-[#181818] font-medium border-b border-gray-300 p-6 ">
          <h1>Investment Details</h1>
          <div className="flex items-center justify-between">
            <p>Project Name </p>
            <p>Tm Highgardens </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Investment type </p>
            <p>Equity </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Status </p>
            <p>Published</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Currency </p>
            <p>$</p>
          </div>
        </div>
        <div className=" space-y-4 border-b text-[#181818] font-medium border-gray-300 p-6">
          <div className="flex items-center justify-between">
            <p>Estimated ROI </p>
            <p>60%</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Duration </p>
            <p>Flexible Exit </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Min Investment </p>
            <p>$50,000</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Date created </p>
            <p>March 10, 2025</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Offer End date </p>
            <p>N/A (Flexible Exit model) </p>
          </div>
        </div>
        <div className=" space-y-4  p-6">
          <FileUpload
            label={imageName}
            icon={<FaRegFileLines />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageName(file.name);
            }}
            onDelete={() => setImageName("TMHG Contract  [PDF]")}
          />
          <FileUpload
            label={imageName}
            icon={<FaRegFileLines />}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageName(file.name);
            }}
            onDelete={() => setImageName("Investors Brochure [PDF]")}
          />
          <div className="flex justify-center gap-6 items-center">
            <Button variant={"outline"}>Edit</Button>
            <Button variant="outline">Unpublish</Button>
            <Button variant="outline" colorScheme="red">
              Delete
            </Button>
          </div>
        </div>

        <div className="flex  items-center gap-2 p-6 bg-white">
          <MdArrowBackIos className="text-[#323539] hover:text-[#323539] text-sm" />
          <button
            onClick={onClose}
            className="text-[#323539] hover:text-[#323539] text-sm"
          >
            Back to Investments
          </button>
        </div>
      </div>
    </div>
  );
};
function FileUpload({
  label,
  icon,
  onChange,
  onDelete,
}: {
  label: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="w-72 flex rounded-md overflow-hidden">
      <label className="flex items-center w-full bg-[#E5E5E7] px-3 py-2 cursor-pointer">
        <span className="text-gray-700 flex items-center gap-2 text-sm truncate">
          {label} {icon}
        </span>
        <input type="file" className="hidden" onChange={onChange} />
      </label>
      <div className="bg-[#116114] px-3 flex items-center justify-center border-l border-gray-300 gap-2">
        <label className="cursor-pointer">
          <RiFileEditLine className="text-white" />
          <input type="file" className="hidden" onChange={onChange} />
        </label>
        <GoTrash
          className="text-white cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        />
      </div>
    </div>
  );
}
