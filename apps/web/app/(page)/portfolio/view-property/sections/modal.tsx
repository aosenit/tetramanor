"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import placeholder from "@/assets/placeholder.jpg";
import { usePostExportData } from "@/hooks/useApi";
import { useToast } from "@chakra-ui/react";

const Modal = ({
  onClose,
  brochureId,
  brochureName,
  imageUrl,
}: {
  onClose: () => void;
  brochureId: string | null;
  brochureName: string;
  imageUrl?: string | null;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const {
    mutate: downloadBrochure,
    isPending,
    isError,
  } = usePostExportData(
    brochureId ? `/upload/download-document/${brochureId}` : ""
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!brochureId) {
      toast({
        title: "No brochure available",
        description: "This brochure cannot be downloaded right now.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    downloadBrochure(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      {
        onSuccess: (data: Blob) => {
          const blob = new Blob([data]);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = brochureName || "brochure.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          setFormData({ name: "", phone: "", email: "", date: "" });
          toast({
            title: "Download started",
            description: "Your brochure is being downloaded.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          onClose();
        },
        onError: () => {
          toast({
            title: "Download failed",
            description: "Something went wrong while downloading the brochure.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-lg relative overflow-hidden shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black z-10"
        >
          <IoClose />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image */}
          <div className="relative h-[300px] lg:h-[600px]">
            <Image
              src={imageUrl || placeholder}
              alt="Property Image"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Form */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-md mx-auto w-full"
            >
              <div>
                <h2 className="text-2xl font-semibold">Download Brochure</h2>
                <p className="text-sm text-[#737687] mt-2">
                  Please fill in your information before you proceed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 mb-2 text-sm"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116114]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 mb-2 text-sm"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116114]"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 mb-2 text-sm"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116114]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#116114] text-white py-3 rounded-md hover:bg-[#0d4e10] transition duration-300"
                disabled={isSubmitting || isPending || !brochureId}
              >
                {isSubmitting || isPending ? (
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
                    Processing...
                  </span>
                ) : (
                  "Download"
                )}
              </button>

              {isError && (
                <p className="text-sm text-red-600 text-center">
                  Failed to process your request. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
