"use client";

import { usePostData, useFetchData } from "@/hooks/useApi";
import React from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import type { ContactResponse, ContactData } from "@/types/contact";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactForm() {
  const { mutateAsync: sendMessage, isPending: isSending } =
    usePostData("contact/enquiry");

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
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendMessage(data);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-16 py-12">
      <section className="">
        <div className=" space-y-10">
          <div className="rounded-lg flex flex-col gap-8">
            <div className="bg-white">
              <div>
                <h3 className="text-2xl font-semibold text-[#151515] rounded-sm p-6 border ">
                  Contact Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border gap-6 p-6">
                {isContactLoading ? (
                  <div className="flex gap-4">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className="inline-block w-32 h-6 bg-gray-200 rounded animate-pulse"
                      />
                    ))}
                  </div>
                ) : contactError ? (
                  <div className="col-span-full flex flex-col items-center text-center text-red-500 space-y-4">
                    <p>Failed to load contact information.</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Try Again
                    </button>
                  </div>
                ) : contact ? (
                  <>
                    {/* Phone */}
                    <a
                      href={`tel:${contact.phoneNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="flex items-center gap-4">
                        <FaPhone className="text-green-700" />
                        {contact.phoneNumber}
                      </p>
                    </a>
                    {/* Email */}
                    <a
                      href={`mailto:${contact.companyEmail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="flex items-center gap-4">
                        <IoMdMail className="text-green-700" />
                        {contact.companyEmail}
                      </p>
                    </a>
                    {/* Address */}
                    <a
                      href={
                        contact.mapEmbedCode ||
                        `https://maps.google.com/?q=${encodeURIComponent(
                          contact.officeAddress
                        )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="flex items-center gap-4">
                        <FaLocationDot className="text-green-700" />
                        {contact.officeAddress}
                      </p>
                    </a>
                  </>
                ) : (
                  <p>No contact info available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className=" bg-white rounded-lg ">
            <h2 className="text-2xl font-semibold text-[#151515] rounded-sm p-6 border ">
              Send us a message
            </h2>

            <form className="p-6 border" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label
                    className="text-xs font-semibold text-[#313131]"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className={`border bg-[#fbfbfb] p-3 rounded-sm col-span-1 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    className="text-xs font-semibold text-[#313131]"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="text"
                    className={`border bg-[#fbfbfb] p-3 rounded-sm col-span-1 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-4 mt-3">
                <div className="flex flex-col space-y-2">
                  <label
                    className="text-xs font-semibold text-[#313131]"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`border bg-[#fbfbfb] p-3 rounded-sm md:col-span-2 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    className="text-xs font-semibold text-[#313131]"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    className={`border bg-[#fbfbfb] p-3 rounded-sm md:col-span-2 min-h-[100px] ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  {errors.message && (
                    <span className="text-red-500 text-xs">
                      {errors.message.message}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="bg-green-700 text-white font-semibold py-3 rounded mt-10 w-full md:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactForm;
