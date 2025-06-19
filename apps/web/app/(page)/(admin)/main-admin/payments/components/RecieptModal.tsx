"use client";
import Image from "next/image";
import logo from "@/assets/home/logo.webp";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaRegFileLines } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";

export default function PaymentModal({
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
      <div className="w-full max-w-3xl  overflow-hidden bg-white">
        <header className="bg-[#323539]  text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className=" space-y-4 text-[#181818] font-medium border-b border-gray-300 p-6 ">
          <div className="flex items-center justify-between">
            <p>Receipt</p>
            <p>Rec 00043</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Ajao Thomas </p>
            <p>10/04/2025</p>
          </div>
        </div>
        <div className=" space-y-4 text-[#181818] font-medium border-b border-gray-300 p-6 ">
          <h1>Customer information</h1>
          <div className="flex items-center justify-between">
            <p>Name</p>
            <p>Ajao Thomas</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Email & phone number </p>
            <p>Ajaothomas2@gmail.com</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Phone number </p>
            <p>+23458960000</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Property</p>
            <p>Tm Meadows 3BR+BQ</p>
          </div>
        </div>
        <div className=" space-y-4 border-b text-[#181818] font-medium border-gray-300 p-6">
          <h1>Payment details</h1>
          <div className="flex items-center justify-between">
            <p>Rental price</p>
            <p>#3,500,000 / year </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Agency fee</p>
            <p>#350,000</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Service charge</p>
            <p>#1,000,000</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total package </p>
            <p>#5, 150,000</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Date & time of payment </p>
            <p>April 10 2024 . 10:45 am</p>
          </div> 
        </div>
        <div className=" space-y-4  p-6">
          <div className="flex justify-center gap-6 items-center">
            <Button className="flex items-center gap-2" variant={"ghost"}>Download <FaRegFileLines/></Button>
          </div>
        </div>

        <div className="flex  items-center gap-2 p-6 bg-white">
          <MdArrowBackIos className="text-[#323539] hover:text-[#323539] text-sm" />
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
