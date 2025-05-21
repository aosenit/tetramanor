"use client"
import Image from "next/image"
import {
  FaDog,
  FaParking,
  FaWindowMaximize,
  FaShieldAlt,
  FaWater,
  FaWind,
  FaUtensils,
  FaToilet,
  FaDoorOpen,
  FaLeaf,
  FaTrash,
} from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"
import Header from "./Header"
import one from "../../../../../public/rental/one.jpg"
import two from "../../../../../public/rental/two.jpg"
import three from "../../../../../public/rental/three.png"
import four from "../../../../../public/rental/four.png"
import { FiShare2 } from "react-icons/fi"

export default function PropertyDetails() {
  return (
    <div className="font-sans">
      <Header />
      <div className="container mx-auto px-4 md:px-6 lg:px-16 py-8 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-2 p-4">
          <div className="flex items-center text-xs text-[#646464] font-medium space-x-2">
            <a href="#" className="hover:text-gray-700">Rentals</a>
            <span>/</span>
            <span className="text-[#0C0C0C] font-semibold">TM Meadows</span>
          </div>
          <button className="flex items-center text-[#151515] font-medium text-sm hover:text-gray-900">
            <FiShare2 className="mr-1" />
            <span>Share</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full md:w-2/3 relative">
            <div className="absolute top-4 left-4 bg-gray-700 bg-opacity-70 text-white px-3 py-1 rounded-lg text-xs">
              UNFURNISHED
            </div>
            <Image
              src={one}
              alt="TM Meadows main view"
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded"
            />
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-4">
            <Image
              src={two}
              alt="TM Meadows view 1"
              className="w-full h-[100px] sm:h-[120px] object-cover rounded"
            />
            <Image
              src={three}
              alt="TM Meadows view 2"
              className="w-full h-[100px] sm:h-[120px] object-cover rounded"
            />
            <div className="relative w-full h-[100px] sm:h-[120px]">
              <Image
                src={four}
                alt="TM Meadows view 3"
                fill
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                <p className="text-white font-semibold text-sm">5+ Photos</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 p-4">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center text-sm font-medium text-[#4D4E53] mb-2">
              <MdLocationOn className="mr-1" />
              <span>Elecho Metta, Lagos, Nigeria</span>
            </div>
            <h1 className="text-2xl font-semibold mb-4">TM Meadows</h1>
            <p className="text-[#0C0C0C] leading-relaxed text-sm mb-6">
              TM Meadows is a newly built 3-bedroom apartment located in a serene part of Surulere, Lagos...
            </p>
            <div className="mb-8 mt-10">
              <h2 className="text-xl font-semibold text-[#000000] mb-4">Property Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-[#0B0A0A]">
                {[
                  [<FaDog />, "Pet-friendly"],
                  [<FaParking />, "Visitor & ample free parking"],
                  [<FaWindowMaximize />, "Wooden PVC French Windows"],
                  [<FaShieldAlt />, "24/7 Security"],
                  [<FaWater />, "Borehole Water Supply"],
                  [<FaWind />, "Treated Water System"],
                  [<FaUtensils />, "High-Quality Kitchen Cabinets & Wardrobes"],
                  [<FaToilet />, "Premium Sanitary Fittings"],
                  [<FaDoorOpen />, "Walk-in Closets"],
                  [<FaLeaf />, "Landscaping & Green Spaces"],
                  [<FaTrash />, "Efficient Waste Disposal & Central Sewage Management"],
                ].map(([Icon, label], i) => (
                  <div className="flex items-center" key={i}>
                    <span className="text-green-600 mr-2">{Icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-fit lg:w-1/3 bg-gray-50 border border-[#ECECEC] rounded">
            <h2 className="text-lg border-b border-[#ECECEC] text-[#151515] py-4 px-6 font-semibold">
              Pricing Details
            </h2>
            <div className="space-y-4 p-6">
              {[
                ["Rental Price", "₦5.5m/year"],
                ["Agency Fee", "10% (₦550,000)"],
                ["Caution Fee", "₦500,000"],
                ["Service Charge", "₦1 million"],
                ["Total Package", "₦6,550,000"],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-[#5C5C5C] font-medium">{label}</span>
                  <span className="text-[#000000] font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
