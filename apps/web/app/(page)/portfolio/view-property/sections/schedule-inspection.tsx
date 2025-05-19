"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import hilltop from "../../../../../public/hilltop.jpg";
import { FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function ScheduleInspection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Thank you! Your inspection has been scheduled. We'll contact you shortly to confirm."
    );
    setFormData({ name: "", phone: "", email: "", date: "" });
  };

  return (
    <div className="relative w-full bg-[#2c3e50] text-white">
      <Image
        src={hilltop}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="relative z-10 container mx-auto px-4 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-6">Schedule an inspection</h2>
            <p className="text-lg text-gray-300">
              Experience the luxury for yourself. Book a personalized tour of TM
              HighGardens and explore our model apartments, premium finishes,
              and world-class amenities.
            </p>
          </div>

          <div className="border-t border-gray-600 pt-8 mt-8"></div>

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Want to talk about this property?
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

        {/* Right side - Form */}
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
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116114]"
                  required
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#116114] text-white py-3 rounded-md hover:bg-[#0d4e10] transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
