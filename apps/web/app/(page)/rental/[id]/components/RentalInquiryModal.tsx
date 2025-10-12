"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RentalUnit } from "@/types/property";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { usePostData } from "@/hooks/useApi";
import { useToast } from "@/components/ui/toast-notification";
import PhoneInputV2 from "@/components/ui/PhoneInputV2";

// Validation schema
const rentalRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type RentalRequestData = z.infer<typeof rentalRequestSchema>;

interface RentalInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartment: RentalUnit;
  propertyName?: string;
}

export default function RentalInquiryModal({
  isOpen,
  onClose,
  apartment,
  propertyName,
}: RentalInquiryModalProps) {
  const { mutateAsync: submitRentalRequest, isPending } =
    usePostData("rentals/request");
  const { showToast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RentalRequestData>({
    resolver: zodResolver(rentalRequestSchema),
    defaultValues: {
      message: `I am interested in renting the ${apartment.apartmentType} unit at ${propertyName || "this property"}. Please contact me with more details.`,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: RentalRequestData) => {
    try {
      await submitRentalRequest({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        rentalId: apartment.id,
      });

      setIsSuccess(true);
      showToast(
        "Rental Request Sent!",
        "Thank you for your interest. Our team will contact you within 24 hours.",
        "success"
      );

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit rental request:", error);
      showToast(
        "Failed to Send",
        "Failed to submit rental request. Please try again.",
        "error"
      );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#116114] to-[#0d4d10] text-white p-6 rounded-t-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Rental Inquiry</h2>
          <p className="text-white/90 text-sm">
            {propertyName && `${propertyName} - `}
            {apartment.apartmentType}
          </p>
        </div>

        {isSuccess ? (
          // Success State
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-20 h-20 bg-[#E8F5E8] rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
              <FaCheckCircle className="w-10 h-10 text-[#116114]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Inquiry Sent Successfully!
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              Thank you for your interest. Our team will review your inquiry and
              contact you within 24 hours.
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Property Summary */}
            <div className="bg-[#E8F5E8] rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Property Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Unit Type:</span>
                  <p className="font-semibold text-gray-900">
                    {apartment.apartmentType}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-semibold text-gray-900">
                    {apartment.location}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Rent Fee:</span>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(apartment.rentFee)} /{" "}
                    {apartment.frequency.toLowerCase()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Available Units:</span>
                  <p className="font-semibold text-gray-900">
                    {apartment.numberOfUnits}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInputV2
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="Enter phone number"
                        error={!!errors.phone}
                        required
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="text-sm font-semibold text-gray-700 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your requirements..."
                  {...register("message")}
                  className={`mt-1 min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                  rows={5}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#116114] hover:bg-[#0d4d10] text-white font-semibold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Need immediate assistance?{" "}
                <a
                  href="tel:+2348012345678"
                  className="text-[#116114] font-semibold hover:underline"
                >
                  Call +234 801 234 5678
                </a>{" "}
                or{" "}
                <a
                  href="mailto:rentals@tetramanor.com"
                  className="text-[#116114] font-semibold hover:underline"
                >
                  Email Us
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

