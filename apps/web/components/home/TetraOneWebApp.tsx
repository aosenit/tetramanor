import React from "react";

export default function TetraOneWebApp() {
  return (
    <section className="bg-[#FAFAFA] w-full py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-10">
          TetraOne Web App – Seamless Home Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Exclusive for Homeowners */}
          <div className="bg-[#FEFEFE]  p-6 flex flex-col items-center ">
            <div className="font-semibold text-lg mb-4 w-full">
              Exclusive for Tetramanor Homeowners.
            </div>
            <div className="relative w-full">
              <img
                src="./tetraweb-one.png"
                alt="TetraManor Exclusive"
                className="rounded-xl w-full h-full object-cover"
              />
              {/* <div className="absolute top-4 left-4 bg-[#484848] bg-opacity-80 text-white text-xs px-4 py-2 rounded-full">
                Tetramanor Exclusive
              </div> */}
            </div>
          </div>
          {/* Right: Dashboard Features */}
          <div className="flex flex-col gap-6 md:col-span-2 bg-[#F5F5F5]  p-2">
            <div className="bg-[#F5F5F5]  p-6 ">
              <div className="font-bold text-lg mb-2">
                Luxury-styled dashboard showcasing:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 ">
                  <div className="font-bold mb-1">Property Overview</div>
                  <div className="text-gray-700 text-sm mb-2">
                    See payment plans, rental income, and property value.
                  </div>
                  <img
                    src="./tetraweb-two.png"
                    alt="Property Overview"
                    className=" w-full h-28 object-cover"
                  />
                </div>
                <div className="bg-white p-4 ">
                  <div className="font-bold mb-1">Bookings & Inquiries</div>
                  <div className="text-gray-700 text-sm mb-2">
                    Manage short-let or long-term tenants.
                  </div>
                  <img
                    src="./tetraweb-two.png"
                    alt="Bookings"
                    className=" w-full h-28 object-cover"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2  bg-white">
                    <div className="text-gray-700 text-sm mb-2 p-4 ">
                      <div className="font-bold mb-1  ">
                        Secure Login & User Profiles
                      </div>
                      <h3>
                        {" "}
                        Access your account securely and manage your information
                        with ease.
                      </h3>
                    </div>
                    <div className="bg-white p-4 ">
                      <img
                        src="./tetraweb-two.png"
                        alt="Secure Login"
                        className=" w-full h-28 object-cover"
                      />
                    </div>
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
