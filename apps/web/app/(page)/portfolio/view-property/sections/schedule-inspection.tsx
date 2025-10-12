"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import ten from "@/assets/portfolio/ten.webp"

import { usePostData } from "@/hooks/useApi";
import { useToast } from "@chakra-ui/react";
import PhoneInputV2 from "@/components/ui/PhoneInputV2";

interface ScheduleInspectionProps {
  propertyTitle?: string;
  propertyId: string;
}

export default function ScheduleInspection({
  propertyTitle = "TM HighGardens",
  propertyId,
}: ScheduleInspectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    property: propertyTitle,
  });

  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  const toast = useToast();
  const { mutate, isPending } = usePostData("property/book-inspection");
  const isWeekday = (dateString: string): boolean => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day >= 1 && day <= 6;
  };
  const isDateBlocked = (dateString: string): boolean => {
    return blockedDates.includes(dateString);
  };
  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "date") {
      if (value && !isWeekday(value)) {
        toast({
          title: "Invalid Date",
          description:
            "Inspections are only available Monday through Saturday.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (value && isDateBlocked(value)) {
        toast({
          title: "Date Not Available",
          description: "This date has already been selected for inspection.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isWeekday(formData.date)) {
      toast({
        title: "Invalid Date",
        description: "Inspections are only available Monday through Saturday.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isDateBlocked(formData.date)) {
      toast({
        title: "Date Not Available",
        description: "This date has already been selected for inspection.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    mutate(
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        propertyId,
      },
      {
        onSuccess: () => {
          setBlockedDates((prev) => [...prev, formData.date]);

          toast({
            title: "Inspection scheduled!",
            description: `Thank you! Your inspection for ${propertyTitle} has been scheduled for ${new Date(formData.date).toLocaleDateString()}. We'll contact you shortly to confirm.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setFormData({
            name: "",
            phone: "",
            email: "",
            date: "",
            property: propertyTitle,
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to schedule inspection. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <div className="relative w-full bg-[#2c3e50] text-white">
      <Image
        src={ten}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="relative z-10 container mx-auto px-4 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-6">Schedule an inspection</h2>
            <p className="text-lg text-gray-300">
              Experience the luxury for yourself. Book a personalized tour of{" "}
              {propertyTitle} {""}
              and explore our model apartments, premium finishes, and
              world-class amenities.
            </p>
          </div>

          <div className="border-t border-gray-600 pt-8 mt-8"></div>

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Want to talk about {propertyTitle}?
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-[#116114]" />
                <span>+234 812 345 67</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-[#116114]" />
                <span>tetramanor@mail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg text-black">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
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
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone number *
                </label>
                <PhoneInputV2
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
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

            <div>
              <label htmlFor="date" className="block text-gray-700 mb-2">
                Preferred Inspection Date *
              </label>
              <div className="">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116114]"
                  required
                />
                {/* <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Inspections available Monday through Saturday only
              </p>
              {blockedDates.length > 0 && (
                <p className="text-sm text-orange-600 mt-1">
                  {blockedDates.length} date{blockedDates.length > 1 ? "s" : ""}{" "}
                  already booked
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#116114] text-white py-3 rounded-md hover:bg-[#0d4e10] transition duration-300"
              disabled={isPending}
            >
              {isPending ? (
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
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
