import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import hill from "../../../../../public/portfolio/hill.png";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your inspection has been scheduled. We'll contact you shortly to confirm.");
    setFormData({ name: "", phone: "", email: "", date: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center px-4 py-6 overflow-y-auto">
      <div className="bg-white p-2 w-full max-w-5xl rounded-lg relative overflow-hidden shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black z-10"
        >
          <IoClose />
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src={hill}
              alt="Modern bookshelf and cabinet design"
              className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
            />
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Download Brochure</h2>
                <p className="text-sm text-[#737687]">Please fill in your information before you proceed.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">First name</label>
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
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone number</label>
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
                <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
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
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
