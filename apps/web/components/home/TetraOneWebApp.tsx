import Image from "next/image";
import React from "react";
import tetrawebone from "@/assets/home/ten.webp";
import lofive from "@/assets/home/lofive.webp";
import eleven from "@/assets/home/eleven.webp";
import twelve from "@/assets/home/twelve.webp";

export default function TetraOneWebApp() {
  return (
    <section className="w-full container mx-auto px-4 lg:px-16 py-12">
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-10">
          TetraOne Web App – Seamless Home Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Exclusive Image */}
          <div className="bg-[#FEFEFE] p-2 rounded-lg flex flex-col">
            <div className="font-semibold text-lg mb-4">
              Exclusive for Tetramanor Homeowners.
            </div>
            <div className="relative w-full h-full">
              <Image
                src={tetrawebone}
                alt="TetraManor Exclusive"
                className="rounded-xl object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Right Column: Dashboard Features */}
          <div className="md:col-span-2 bg-[#F5F5F5] p-2 rounded-lg">
            <div className="font-bold text-lg mb-4">
              Luxury-styled dashboard showcasing:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Property Overview */}
              <div className="bg-white p-4 rounded-md ">
                <div className="font-bold mb-1">Property Overview</div>
                <p className="text-gray-700 text-sm mb-2">
                  See payment plans, rental income, and property value.
                </p>
                <div className="relative w-full h-32">
                  <Image
                    src={lofive}
                    alt="Property Overview"
                    className="object-cover rounded"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Bookings */}
              <div className="bg-white p-4 rounded-md ">
                <div className="font-bold mb-1">Bookings & Inquiries</div>
                <p className="text-gray-700 text-sm mb-2">
                  Manage short-let or long-term tenants.
                </p>
                <div className="relative w-full h-32">
                  <Image
                    src={eleven}
                    alt="Bookings"
                    className="object-cover rounded"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Secure Login Section */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 bg-white rounded-md overflow-hidden  mt-4">
                <div className="p-4">
                  <div className="font-bold mb-1">
                    Secure Login & User Profiles
                  </div>
                  <p className="text-gray-700 text-sm">
                    Access your account securely and manage your information
                    with ease.
                  </p>
                </div>
                <div className="p-4">
                  <div className="relative w-full h-32">
                    <Image
                      src={twelve}
                      alt="Secure Login"
                      className="object-cover rounded"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
