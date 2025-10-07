"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RentalUnit } from "@/types/property";
import { FaCheckCircle } from "react-icons/fa";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    message: `I am interested in renting the ${apartment.apartmentType} unit at ${propertyName || "this property"}. Please contact me with more details.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          moveInDate: "",
          message: `I am interested in renting the ${apartment.apartmentType} unit at ${propertyName || "this property"}. Please contact me with more details.`,
        });
      }, 3000);
    }, 1500);
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
                    {formatCurrency(apartment.rentFee)} / {apartment.frequency.toLowerCase()}
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 801 234 5678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="moveInDate" className="text-sm font-semibold text-gray-700 mb-2">
                    Preferred Move-in Date
                  </Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) =>
                      setFormData({ ...formData, moveInDate: e.target.value })
                    }
                    className="mt-1"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2">
                  Additional Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="mt-1 min-h-[120px]"
                  rows={5}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#116114] hover:bg-[#0d4d10] text-white font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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

