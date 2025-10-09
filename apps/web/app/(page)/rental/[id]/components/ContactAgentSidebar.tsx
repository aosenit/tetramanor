"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhone, FaEnvelope, FaWhatsapp, FaSpinner } from "react-icons/fa";
import { usePostData } from "@/hooks/useApi";
import { useToast } from "@/components/ui/toast-notification";
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

interface ContactAgentSidebarProps {
  propertyName: string;
}

export default function ContactAgentSidebar({
  propertyName,
}: ContactAgentSidebarProps) {
  const { mutateAsync: sendMessage, isPending } =
    usePostData("contact/enquiry");
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: `I am interested in ${propertyName}. Please contact me with more details.`,
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
      reset({
        name: "",
        email: "",
        phone: "",
        message: `I am interested in ${propertyName}. Please contact me with more details.`,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      showToast(
        "Failed to Send",
        "Failed to send message. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="sticky top-4 space-y-4">
      {/* Contact Agent Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Agent</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className={`w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className={`w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
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
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Your Message"
              {...register("message")}
              className={`w-full min-h-[100px] ${errors.message ? "border-red-500" : ""}`}
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#116114] hover:bg-[#0d4d10] text-white"
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
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Or contact us directly:</p>
          <div className="space-y-3">
            <a
              href="tel:+2348012345678"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#116114] transition-colors"
            >
              <FaPhone className="w-4 h-4 text-[#CD6115]" />
              <span>+234 801 234 5678</span>
            </a>
            <a
              href="mailto:rentals@tetramanor.com"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#116114] transition-colors"
            >
              <FaEnvelope className="w-4 h-4 text-[#CD6115]" />
              <span>rentals@tetramanor.com</span>
            </a>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#25D366] transition-colors"
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Property Alert Card */}
      {/* <div className="bg-gradient-to-br from-[#116114] to-[#0d4d10] rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Get Property Alerts</h3>
        <p className="text-sm text-white/90 mb-4">
          Be the first to know about new properties matching your criteria.
        </p>
        <Button
          variant="outline"
          className="w-full bg-white text-[#116114] border-white hover:bg-white/90"
        >
          Subscribe to Alerts
        </Button>
      </div> */}
    </div>
  );
}

