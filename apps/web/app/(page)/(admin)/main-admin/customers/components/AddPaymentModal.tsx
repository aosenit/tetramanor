"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import tmlogo from "@/assets/tmlogo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useFetchData, usePostData } from "@/hooks/useApi";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

type paymentType = "OWNERSHIPT" | "RENT" | "INSTALLMENT";

type paymentMode = "BANK_TRANSFER" | "CASH" | "POS";

interface PaymentFormData {
  purchaseId: string;
  customerId: string;
  propertyId: string;
  paymentType: paymentType;
  amountPaid: string | number;
  balanceRemaining: string | number;
  paymentMode: paymentMode;
  paymentDate: string;
}

export default function AddPaymentModal({
  open,
  onClose,
  property,
  onSuccess,
  paymentRemaining,
}: {
  open: boolean;
  onClose: () => void;
  property?: any;
  onSuccess?: () => void;
  paymentRemaining?: number;
}) {
  const searchParams = useSearchParams();
  const unitId = searchParams.get("unitId");
  const userId = searchParams.get("userId");

  const { mutateAsync: submitPayment, isPending } = usePostData(
    "admin/purchases/payments"
  );

  const { data: userData, isPending: userDataPending } = useFetchData(
    userId ? `users/${userId}` : ""
  );

  const [formData, setFormData] = useState<PaymentFormData>({
    purchaseId: unitId || "",
    customerId: userId || "",
    propertyId: property?.property?.id || "",
    paymentType: "OWNERSHIPT",
    amountPaid: "",
    balanceRemaining: "",
    paymentMode: "POS",
    paymentDate: new Date().toISOString(),
  });

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

  const handleInputChange = (
    field: keyof PaymentFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    formData.balanceRemaining = Number(formData.balanceRemaining);

    try {
      await submitPayment(formData);
      toast.success("Payment added successfully");
      onClose();

      // Call onSuccess callback to refresh payment history
      onSuccess?.();

      // Reset form
      setFormData({
        purchaseId: unitId || "",
        customerId: userId || "",
        propertyId: property?.property?.id || "",
        paymentType: "OWNERSHIPT",
        amountPaid: "",
        balanceRemaining: "",
        paymentMode: "BANK_TRANSFER",
        paymentDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error("Failed to add payment");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full bg-white max-w-3xl overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={tmlogo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="px-6 space-y-4 py-4">
          <div className="">
            <p className="text-[#116114] font-medium">Add payment</p>
          </div>
          <p className="text-[#323539] text-xs">
            Customer{" "}
            <span className="font-medium ml-3 text-sm text-black">
              {userDataPending ? "Loading..." : userData?.data?.name}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Property name
              </Label>
              <Select
                value={formData.propertyId}
                disabled
                onValueChange={(value) =>
                  handleInputChange("propertyId", value)
                }
              >
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={property?.property?.id || ""}>
                    {property?.property?.name || "Select property"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Payment type
              </Label>
              <Select
                value={formData.paymentType}
                onValueChange={(value) =>
                  handleInputChange("paymentType", value)
                }
              >
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWNERSHIPT">Ownership</SelectItem>
                  <SelectItem value="RENT">Rental</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Payment mode
              </Label>
              <Select
                value={formData.paymentMode}
                onValueChange={(value) =>
                  handleInputChange("paymentMode", value)
                }
              >
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="POS">POS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Amount paid
              </Label>
              <Input
                type="number"
                placeholder="0"
                className="bg-[#E5E5E7] text-xs"
                value={formData.amountPaid}
                onChange={(e) =>
                  handleInputChange(
                    "amountPaid",
                    parseFloat(e.target.value) || ""
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Balance remaining
              </Label>
              <Input
                type="number"
                placeholder="0"
                className="bg-[#E5E5E7] text-xs"
                disabled
                // property?.price - formData.amountPaid
                value={
                  paymentRemaining && formData.amountPaid
                    ? (
                        Number(paymentRemaining) - Number(formData.amountPaid)
                      ).toString()
                    : ""
                }
                onChange={(e) =>
                  handleInputChange(
                    "balanceRemaining",
                    parseFloat(e.target.value) || ""
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Payment date
              </Label>
              <Input
                type="datetime-local"
                className="bg-[#E5E5E7] text-xs"
                value={formData.paymentDate.slice(0, 16)}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  handleInputChange("paymentDate", date.toISOString());
                }}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#116114] font-medium text-sm hover:bg-[#116114] text-white"
              >
                {isPending ? "Saving..." : "Save payment"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
