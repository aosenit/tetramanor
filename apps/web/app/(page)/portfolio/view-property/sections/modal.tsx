"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import two from "@/assets/portfolio/two.webp"
import { usePostExportData } from "@/hooks/useApi";

const Modal = ({
  onClose,
  brochureId,
  brochureName,
}: {
  onClose: () => void;
  brochureId: string | null;
  brochureName: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!brochureId) {
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
          onClose();
        },
        onError: () => {
          // Optionally show error toast here
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
              src={two}
              alt="Hill View"
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
                {isSubmitting || isPending ? "Downloading..." : "Download"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
