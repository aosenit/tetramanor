"use client";
import Image from "next/image";
import tmlogo from "@/assets/tmlogo.png";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaRegFileLines } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "sonner";

interface Payment {
  paymentDate: string;
  amountPaid: number;
  paymentType: string;
  paymentMode: string | null;
  customer: {
    name: string;
    email: string;
  };
  property: {
    name: string;
  };
  purchase: {
    name: string;
    price: number;
  };
}

export default function PaymentModal({
  payment,
  open,
  onClose,
}: {
  open: boolean;
  payment?: Payment | null;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Status");
  const [isDownloading, setIsDownloading] = useState(false);

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

  if (!open || !payment) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  // Generate receipt number based on payment date
  const receiptNumber = `REC-${new Date(payment.paymentDate).getFullYear()}${String(new Date(payment.paymentDate).getMonth() + 1).padStart(2, "0")}${String(new Date(payment.paymentDate).getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Dynamic import of jsPDF to avoid SSR issues
      const jsPDF = (await import("jspdf")).default;

      const doc = new jsPDF();

      // Set font
      doc.setFont("helvetica");

      // Header
      doc.setFontSize(20);
      doc.setTextColor(50, 53, 57); // #323539
      doc.text("TETRAMANOR", 105, 20, { align: "center" });

      // Receipt title
      doc.setFontSize(16);
      doc.text("PAYMENT RECEIPT", 105, 35, { align: "center" });

      // Receipt number and date
      doc.setFontSize(12);
      doc.text(`Receipt No: ${receiptNumber}`, 20, 50);
      doc.text(`Date: ${formatDate(payment.paymentDate)}`, 20, 60);

      // Customer Information
      doc.setFontSize(14);
      doc.setTextColor(24, 24, 24); // #181818
      doc.text("Customer Information", 20, 80);

      doc.setFontSize(10);
      doc.text(`Name: ${payment.customer.name}`, 20, 90);
      doc.text(`Email: ${payment.customer.email}`, 20, 100);
      doc.text(`Property: ${payment.property.name}`, 20, 110);
      doc.text(`Payment Type: ${payment.paymentType.toUpperCase()}`, 20, 120);

      // Payment Details
      doc.setFontSize(14);
      doc.text("Payment Details", 20, 140);

      doc.setFontSize(10);
      doc.text(
        `Property Price: ${formatCurrency(payment.purchase.price)}`,
        20,
        150
      );
      doc.text(`Amount Paid: ${formatCurrency(payment.amountPaid)}`, 20, 160);
      doc.text(
        `Outstanding Balance: ${formatCurrency(payment.purchase.price - payment.amountPaid)}`,
        20,
        170
      );
      doc.text(
        `Payment Mode: ${payment.paymentMode || "Not specified"}`,
        20,
        180
      );
      doc.text(`Payment Date: ${formatDateTime(payment.paymentDate)}`, 20, 190);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 140, 149); // #858C95
      doc.text("Thank you for your payment", 105, 250, { align: "center" });
      doc.text("Tetramanor - Building Tomorrow's Homes Today", 105, 255, {
        align: "center",
      });

      // Save the PDF
      const fileName = `receipt-${receiptNumber}-${payment.customer.name.replace(/\s+/g, "-")}.pdf`;
      doc.save(fileName);

      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);

      // Fallback: Create a simple text receipt
      try {
        const receiptContent = `
TETRAMANOR - PAYMENT RECEIPT

Receipt No: ${receiptNumber}
Date: ${formatDate(payment.paymentDate)}

CUSTOMER INFORMATION:
Name: ${payment.customer.name}
Email: ${payment.customer.email}
Property: ${payment.property.name}
Payment Type: ${payment.paymentType.toUpperCase()}

PAYMENT DETAILS:
Property Price: ${formatCurrency(payment.purchase.price)}
Amount Paid: ${formatCurrency(payment.amountPaid)}
Outstanding Balance: ${formatCurrency(payment.purchase.price - payment.amountPaid)}
Payment Mode: ${payment.paymentMode || "Not specified"}
Payment Date: ${formatDateTime(payment.paymentDate)}

Thank you for your payment!
Tetramanor - Building Tomorrow's Homes Today
        `.trim();

        const blob = new Blob([receiptContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `receipt-${receiptNumber}-${payment.customer.name.replace(/\s+/g, "-")}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success("Text receipt downloaded successfully!");
      } catch (fallbackError) {
        console.error("Fallback download failed:", fallbackError);
        toast.error("Failed to download receipt. Please try again.");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-3xl overflow-hidden bg-white">
        <header className="bg-[#323539] text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={tmlogo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="space-y-4 text-[#181818] font-medium border-b border-gray-300 p-6">
          <div className="flex items-center justify-between">
            <p>Receipt</p>
            <p>{receiptNumber}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>{payment.customer.name}</p>
            <p>{formatDate(payment.paymentDate)}</p>
          </div>
        </div>

        <div className="space-y-4 text-[#181818] font-medium border-b border-gray-300 p-6">
          <h1>Customer information</h1>
          <div className="flex items-center justify-between">
            <p>Name</p>
            <p>{payment.customer.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Email</p>
            <p>{payment.customer.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Property</p>
            <p>{payment.property.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Payment Type</p>
            <p className="capitalize">{payment.paymentType.toLowerCase()}</p>
          </div>
        </div>

        <div className="space-y-4 border-b text-[#181818] font-medium border-gray-300 p-6">
          <h1>Payment details</h1>
          <div className="flex items-center justify-between">
            <p>Property Price</p>
            <p>{formatCurrency(payment.purchase.price)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Amount Paid</p>
            <p className="text-green-600 font-bold">
              {formatCurrency(payment.amountPaid)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Outstanding Balance</p>
            <p className="text-red-600">
              {formatCurrency(payment.purchase.price - payment.amountPaid)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Payment Mode</p>
            <p>{payment.paymentMode || "Not specified"}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Date & time of payment</p>
            <p>{formatDateTime(payment.paymentDate)}</p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex justify-center gap-6 items-center">
            <Button
              className="flex items-center gap-2"
              variant={"ghost"}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  Downloading...
                </>
              ) : (
                <>
                  Download <FaRegFileLines />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 p-6 bg-white">
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
}
