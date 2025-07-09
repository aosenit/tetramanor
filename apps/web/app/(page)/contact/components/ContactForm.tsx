"use client";

import { usePostData } from "@/hooks/useApi";
import React from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useFetchData } from "@/hooks/useApi";
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
          <div className="rounded-lg  flex flex-col gap-8">
            <div className="bg-white">
              <div>
                <h3 className="text-2xl font-semibold text-[#151515] rounded-sm p-6 border ">
                  Contact Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border  gap-6 p-6">
                {isContactLoading ? (
                  <p>Loading contact info...</p>
                ) : contactError ? (
                  <p className="text-red-500">Failed to load contact info</p>
                ) : contact ? (
                  <>
                    {/* Phone */}
                    <a href={`tel:${contact.phoneNumber}`} target="_blank" rel="noopener noreferrer">
                      <p className="flex items-center gap-4">
                        <FaPhone className="text-green-700" />
                        {contact.phoneNumber}
                      </p>
                    </a>
                    {/* Email */}
                    <a href={`mailto:${contact.companyEmail}`} target="_blank" rel="noopener noreferrer">
                      <p className="flex items-center gap-4">
                        <IoMdMail className="text-green-700" />
                        {contact.companyEmail}
                      </p>
                    </a>
                    {/* Address */}
                    <a
                      href={contact.mapEmbedCode || `https://maps.google.com/?q=${encodeURIComponent(contact.officeAddress)}`}
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
              {/* Optionally render social media links */}
              {/* {contact?.socialMedia?.length ? (
                <div className="flex flex-wrap gap-4 p-6 pt-0">
                  {contact.socialMedia.map((sm) => (
                    <a key={sm.platform} href={sm.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {sm.platform}
                    </a>
                  ))}
                </div>
              ) : null} */}
            </div>
          </div>
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
                {isSending ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactForm;
