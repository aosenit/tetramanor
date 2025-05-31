import Image from "next/image";
import React from "react";

export default function TetraOneWebApp() {
  return (
    <section className=" w-full container mx-auto px-4 lg:px-16 py-12">
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-10">
          TetraOne Web App – Seamless Home Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Exclusive Image */}
          <div className="bg-[#FEFEFE] p-6 rounded-lg shadow-sm flex flex-col">
            <div className="font-semibold text-lg mb-4">
              Exclusive for Tetramanor Homeowners.
            </div>
            <div className="relative">
              <Image
                fill
                src="/tetraweb-one.png"
                alt="TetraManor Exclusive"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Column: Dashboard Features */}
          <div className="md:col-span-2 bg-[#F5F5F5] p-6 rounded-lg shadow-sm">
            <div className="font-bold text-lg mb-4">
              Luxury-styled dashboard showcasing:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Property Overview */}
              <div className="bg-white p-4 rounded-md shadow">
                <div className="font-bold mb-1">Property Overview</div>
                <p className="text-gray-700 text-sm mb-2">
                  See payment plans, rental income, and property value.
                </p>
                <Image
                  fill
                  src="/tetraweb-two.png"
                  alt="Property Overview"
                  className="w-full h-32 object-cover rounded"
                />
              </div>

              {/* Bookings */}
              <div className="bg-white p-4 rounded-md shadow">
                <div className="font-bold mb-1">Bookings & Inquiries</div>
                <p className="text-gray-700 text-sm mb-2">
                  Manage short-let or long-term tenants.
                </p>
                <Image
                  fill
                  src="/tetraweb-two.png"
                  alt="Bookings"
                  className="w-full h-32 object-cover rounded"
                />
              </div>

              {/* Secure Login Section */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 bg-white rounded-md overflow-hidden shadow mt-4">
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
                  <Image
                    fill
                    src="/tetraweb-two.png"
                    alt="Secure Login"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
