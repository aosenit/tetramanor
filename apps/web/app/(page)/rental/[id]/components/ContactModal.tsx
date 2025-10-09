"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePostData, useFetchData } from "@/hooks/useApi";
import { useToast } from "@/components/ui/toast-notification";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaLocationDot, FaPhone, FaSpinner } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import type { ContactData } from "@/types/contact";
import PhoneInput from "@/components/ui/PhoneInput";

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+\d{7,15}$/,
      "Please enter a valid phone number with country code"
    ),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  propertyName,
}: ContactModalProps) {
  const { mutateAsync: sendMessage, isPending } = usePostData("contact/enquiry");
  const { showToast } = useToast();

  // Fetch contact info
  const {
    data: contactResponse,
    isLoading: isContactLoading,
    error: contactError,
  } = useFetchData("contact");

  const contact: ContactData | undefined = contactResponse?.data;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: propertyName
        ? `I am interested in ${propertyName}. Please contact me with more details.`
        : "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendMessage(data);
      showToast(
        "Message Sent!",
        "Your message has been sent successfully. We'll get back to you soon.",
        "success"
      );
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to send message:", error);
      showToast(
        "Failed to Send",
        "Failed to send message. Please try again.",
        "error"
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Contact Us
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Get in touch with our team for any inquiries or support.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="Enter phone number"
                        error={!!errors.phone}
                        required
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </Label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116114] focus:border-transparent ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message.message}</p>
                )}
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
                  className="flex-1 bg-[#116114] hover:bg-[#0d4d10] text-white"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
