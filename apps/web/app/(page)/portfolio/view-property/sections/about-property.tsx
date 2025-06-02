"use client";
import React from "react";
import Image from "next/image";
import two from "@/assets/portfolio/two.webp"
import {
  FaCheck,
  FaWifi,
  FaShieldAlt,
  FaTint,
  FaSquare,
  FaDesktop,
  FaWater,
  FaBuilding,
  FaGlassMartini,
  FaUsers,
  FaBriefcase,
  FaBolt,
  FaClock,
  FaDumbbell,
  FaEye,
} from "react-icons/fa";

export default function PropertyListing() {
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-[#0b0a0a]">
            About the property
          </h1>
          <p className="text-[#0c0c0c] mb-6">
            TM HighGardens is an ultra-luxurious residential masterpiece
            designed for the 1% who appreciate the pinnacle of elegance,
            affluence, and opulence. Nestled in the heart of Eko Atlantic City,
            Africa's premier real estate destination, TM HighGardens offers an
            exclusive lifestyle and a prime investment opportunity.
          </p>

          <p className="text-[#0c0c0c] mb-4">
            This 30-floor architectural marvel boasts an exquisite selection of
            luxury apartments, including:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <FaCheck className="h-5 w-5 text-[#116114] mr-2 flex-shrink-0" />
              <span>1-Bedroom Apartments</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="h-5 w-5 text-[#116114] mr-2 flex-shrink-0" />
              <span>2-Bedroom Apartments</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="h-5 w-5 text-[#116114] mr-2 flex-shrink-0" />
              <span>3-Bedroom Apartments</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="h-5 w-5 text-[#116114] mr-2 flex-shrink-0" />
              <span>3-Bedroom Maisonettes</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="h-5 w-5 text-[#116114] mr-2 flex-shrink-0" />
              <span>4-Bedroom Maisonettes</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="h-5 w-5 text-[#116114] mr-2 flex-shrink-0" />
              <span>Penthouse</span>
            </li>
          </ul>
        </div>

        <div className="relative h-[400px] lg:h-auto rounded-lg overflow-hidden">
          <Image
            src={two}
            alt="TM HighGardens luxury residential building"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4 text-[#0b0a0a]">Key Features</h2>
        <p className="text-[#0c0c0c] mb-6">
          TM HighGardens blends sophisticated aesthetics with superior
          craftsmanship, featuring:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <FaShieldAlt className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>External Security Door & Smart Door Locks</span>
          </div>
          <div className="flex items-start">
            <FaSquare className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>High-Quality Kitchen Cabinets & Bedroom Wardrobes</span>
          </div>
          <div className="flex items-start">
            <FaTint className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>State-of-the-Art Sanitary Fittings</span>
          </div>
          <div className="flex items-start">
            <FaDesktop className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Premium Interior Decor</span>
          </div>
          <div className="flex items-start">
            <FaSquare className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Aluminum EBM Profile Windows</span>
          </div>
          <div className="flex items-start">
            <FaSquare className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>High-Quality Ceramic & Vitrified Tiles</span>
          </div>
          <div className="flex items-start">
            <FaWifi className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>High-Speed Internet & Entertainment Wiring</span>
          </div>
          <div className="flex items-start">
            <FaSquare className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>P.O.P Ceilings & Satin Wall Finishing</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0b0a0a]">
          World-Class Amenities
        </h2>
        <p className="text-[#0c0c0c] mb-6">
          Residents of TM High Gardens enjoy exclusive access to
          state-of-the-art facilities, including
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <FaWater className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Elevated Pool</span>
          </div>
          <div className="flex items-start">
            <FaGlassMartini className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Lounge/Bar</span>
          </div>
          <div className="flex items-start">
            <FaBuilding className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Stunning Sea View</span>
          </div>
          <div className="flex items-start">
            <FaUsers className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Children's Play Area</span>
          </div>
          <div className="flex items-start">
            <FaEye className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>24/7 Surveillance</span>
          </div>
          <div className="flex items-start">
            <FaBriefcase className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Office Space</span>
          </div>
          <div className="flex items-start">
            <FaWifi className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Fiber Optic Connectivity</span>
          </div>
          <div className="flex items-start">
            <FaBolt className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Uninterrupted Power Supply</span>
          </div>
          <div className="flex items-start">
            <FaDumbbell className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>Fully Equipped Gym</span>
          </div>
          <div className="flex items-start">
            <FaClock className="h-5 w-5 text-[#116114] mr-3 mt-1 flex-shrink-0" />
            <span>24/7 Concierge Services</span>
          </div>
        </div>
      </div>
    </div>
  );
}
