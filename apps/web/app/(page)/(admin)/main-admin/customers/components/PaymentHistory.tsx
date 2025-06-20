"use client";

import { Button } from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import six from "@/assets/admin/six.svg";
import { Input } from "@/components/ui/input";
import seven from "@/assets/admin/seven.svg";
import Image from "next/image";
import { useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiFunnel } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import AddPaymentModal from "./AddPaymentModal";
import Link from "next/link";

const payments = [
  {
    id: "PAY-01823",
    date: "Feb 20, 2025",
    amount: "₦600,000",
    status: "Completed",
    balance: "8,000,000",
  },
  {
    id: "PAY-01823",
    date: "Feb 20, 2025",
    amount: "₦600,000",
    status: "Completed",
    balance: "8,000,000",
  },
  {
    id: "PAY-01823",
    date: "Feb 20, 2025",
    amount: "₦600,000",
    status: "Completed",
    balance: "8,000,000",
  },
  {
    id: "PAY-01823",
    date: "Feb 20, 2025",
    amount: "₦600,000",
    status: "Completed",
    balance: "8,000,000",
  },
];

export default function PaymentHistory() {
  const [search, setSearch] = useState("");
   const searchParams = useSearchParams();
  const propertyName = searchParams.get("property");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);


  return (
    <div className="min-h-screen space-y-8 p-6">
      {/* Breadcrumb */}
      <div className="text-xs text-[#4C5560] font-medium">
        Admin /{" "}
        <span className="text-[#116114] text-sm font-medium">
          {propertyName}
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start flex-wrap">
        <h2 className="text-lg font-medium text-gray-800">
          Payments history of unit 3a
        </h2>
        <Button
          onClick={openPaymentModal}
          leftIcon={<FiPlus />}
          variant={"outline"}
          size="sm"
          className=" text-white text-sm"
        >
          Add payments
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 w-80 rounded-md space-y-4">
          <div className="flex items-center gap-12">
            <p className="text-sm text-[#181818]">Total amount paid</p>
            <Image src={seven} alt="logo" />
          </div>
          <div className="flex text-[#B3B3B3] items-center gap-1">
            <IoMdArrowDropdown />
            <TbCurrencyNaira className="text-2xl mt-1" />
            <p className="text-[#116114] font-semibold text-2xl">20,000,000</p>
          </div>
        </div>

        <div className="bg-white p-4 w-80 rounded-md space-y-4">
          <div className="flex text-[#181818] items-center gap-12">
            <p className="text-sm text-[#181818]">Total amount outstanding</p>
            <Image src={six} alt="logo" />
          </div>
          <div className="flex text-[#B3B3B3] items-center gap-1">
            <IoMdArrowDropdown />
            <TbCurrencyNaira className="text-2xl mt-1" />
            <p className="text-[#116114] font-semibold text-2xl">10,000,000</p>
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white space-y-4 p-6 overflow-hidden">
        {/* Table Header */}
        <div className="flex justify-between items-center ">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-800">
              View payment history
            </div>
            <p className="text-[#4D4E53] text-xs">
              Payment history of customer's properties .
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm flex items-center gap-1 text-[#252525]">
              <PiFunnel />
              Filter
            </span>
            <Input
              type="text"
              placeholder="Search..."
              className="w-48 h-9 rounded-md text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="grid grid-cols-5 px-4 py-4 font-medium  mt-6 text-xs text-[#847A8D] border rounded-md bg-[#F5F5F5]">
          <div>Payment ID</div>
          <div>Payment Date</div>
          <div>Amount Paid</div>
          <div>Status</div>
          <div>Remaining balance</div>
        </div>

        {payments.map((p, index) => (
          <div
            key={index}
            className={`grid grid-cols-5 px-4 py-4 text-xs text-[#2E2E2E] border-b ${
              index % 2 === 1 ? "bg-[#FAFAFA]" : ""
            }`}
          >
            <div>{p.id}</div>
            <div>{p.date}</div>
            <div>{p.amount}</div>
            <div className="text-[#116114]">{p.status}</div>
            <div>{p.balance}</div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <Link href="/main-admin/customers/properties-details">
      <button className="text-[#323539] flex items-center gap-2 hover:text-black text-sm mt-6">
        <MdArrowBackIosNew />
        Back
        </button>
      </Link>
      {isPaymentModalOpen && (
        <AddPaymentModal
          open={isPaymentModalOpen}
          onClose={closePaymentModal}
        />
      )}
    </div>
  );
}
