"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaUser, FaEnvelope, FaDollarSign, FaSpinner } from "react-icons/fa";
import { usePostData } from "@/hooks/useApi";
import { useToast } from "@/components/ui/toast-notification";
import PhoneInputV2 from "@/components/ui/PhoneInputV2";

// Validation schema
const investmentRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  message: z.string().optional(),
});

type InvestmentRequestData = z.infer<typeof investmentRequestSchema>;

interface InvestmentDetailsModalProps {
  investment: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestmentDetailsModal({
  investment,
  isOpen,
  onClose,
}: InvestmentDetailsModalProps) {
  const { mutateAsync: submitInvestmentRequest, isPending } = usePostData(
    "investments/request"
  );
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<InvestmentRequestData>({
    resolver: zodResolver(investmentRequestSchema),
    defaultValues: {
      currency: investment?.currency || "NGN",
    },
  });

  if (!investment) return null;

  const onSubmit = async (data: InvestmentRequestData) => {
    try {
      // Combine form data with investmentId
      const investmentData = {
        ...data,
        investmentId: investment.id,
      };

      await submitInvestmentRequest(investmentData);

      showToast(
        "Investment Request Submitted!",
        "Your investment request has been submitted successfully. Our team will contact you within 24-48 hours.",
        "success"
      );

      reset();
      onClose();
    } catch (error) {
      console.error("Failed to submit investment request:", error);
      showToast(
        "Submission Failed",
        "Failed to submit investment request. Please try again.",
        "error"
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const formatCurrency = (amount: number, currency: string = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        key={investment?.id}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Invest in{" "}
            {investment.projectName || "Investment Opportunity"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Investment Summary */}
          {/* <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Investment Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span>{" "}
                {investment.investmentType === "FIXED_ROI"
                  ? "Fixed ROI"
                  : "Equity-Based"}
              </div>
              <div>
                <span className="font-medium">Min Amount:</span>{" "}
                {formatCurrency(
                  investment.minAmount || 50000000,
                  investment.currency
                )}
              </div>
              <div>
                <span className="font-medium">Estimated ROI:</span>{" "}
                {investment.estimatedROI || "Up to"}%
              </div>
              <div>
                <span className="font-medium">Duration:</span>{" "}
                {investment.duration || "12"} months
              </div>
            </div>
          </div> */}

          {/* Investor Details Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <PhoneInputV2
                  value={watch("phone")}
                  onChange={(value) => setValue("phone", value)}
                  placeholder="Enter your phone number"
                  required
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Investment Amount <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    min={investment.minAmount}
                    placeholder={`Minimum: ${formatCurrency(investment.minAmount)}`}
                    {...register("amount", { valueAsNumber: true })}
                    className={`pl-10 ${errors.amount ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="currency"
                className="text-sm font-medium text-gray-700"
              >
                Currency <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watch("currency")}
                onValueChange={(value) => setValue("currency", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">NGN (Nigerian Naira)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                </SelectContent>
              </Select>
              {errors.currency && (
                <p className="text-sm text-red-500">
                  {errors.currency.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Additional Message
              </Label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tell us more about your investment goals or any questions you have..."
              />
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                What happens next?
              </h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Our investment team will review your request</li>
                <li>• You'll receive a call within 24-48 hours</li>
                <li>
                  • We'll discuss your investment goals and risk tolerance
                </li>
                <li>
                  • Detailed project information and documentation will be
                  shared
                </li>
                <li>• Investment terms and next steps will be finalized</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white flex-1"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Investment Request"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
