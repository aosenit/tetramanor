import { Button } from "@chakra-ui/react";

export default function HomeKeyFeatures() {
  return (
    <section className=" w-full container mx-auto px-4 lg:px-16 py-12 fade-in-up">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2 leading-tight md:max-w-[60%]">
              Our Track Record: Building Wealth,
              <br className="hidden md:block" />
              One Home at a Time
            </h2>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col justify-center min-h-[120px]">
              <div className="text-3xl font-extrabold text-black mb-2">
                <span className="font-bold">₦22M</span>
              </div>
              <div className="text-gray-700 text-base font-medium">
                Rental Income Disbursed in the past 18 months
              </div>
            </div>
            <div className="bg-[#202020] rounded-xl p-6 flex flex-col justify-center min-h-[120px]">
              <div className="text-3xl font-extrabold text-white mb-2">
                100+
              </div>
              <div className="text-white text-base font-medium">
                Years of Combined Experience
              </div>
            </div>
          </div>
          {/* Bottom Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col justify-center min-h-[90px]">
              <div className="text-2xl font-extrabold text-black mb-1">
                100+
              </div>
              <div className="text-gray-700 text-sm font-medium">
                Families Housed
              </div>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col justify-center min-h-[90px]">
              <div className="text-2xl font-extrabold text-black mb-1">
                300+
              </div>
              <div className="text-gray-700 text-sm font-medium">
                Customers Served
              </div>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col justify-center min-h-[90px]">
              <div className="text-2xl font-extrabold text-black mb-1">
                100+
              </div>
              <div className="text-gray-700 text-sm font-medium">
                Job Opportunities Created
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col gap-6 h-full ">
          <div className=" text-gray-700 text-base mb-2 lg:pl-10">
            At Tetramanor, we don't just build homes — we build long-term value.
            Through quality construction and strategic development, our clients
            enjoy both comfort and exceptional returns.
          </div>
          <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col lg:flex-row gap-4 h-full">
            <div className="lg:w-2/3 flex flex-col justify-between">
              <div className="">
                <div className="font-bold text-xl text-black mb-2">
                  Proven Capital Appreciation
                </div>
                <div className="text-gray-700 text-base mb-4">
                  We've seen impressive capital growth across our projects. TM
                  HighGardens, initially sold at ₦55M, is now valued at ₦120M in
                  just two years.
                </div>
              </div>
              <Button
                colorScheme="green"
                rounded="0"
                className="bg-primary text-white font-semibold rounded px-6 py-2 shadow-none text-base w-fit btn-animate"
              >
                See more
              </Button>
            </div>
            {/* Image Card */}
            <div className="relative mt-6 rounded-xl overflow-hidden shadow-lg lg:w-1/3 img-hover-zoom">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                alt="TM HighGardens"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#202020] bg-opacity-80 text-white text-xs px-3 py-1 rounded-full">
                Studio apartment
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-[#202020] bg-opacity-90 p-4">
                <div className="font-bold text-lg text-white mb-1">
                  TM HighGardens
                </div>
                <ul className="text-white text-sm space-y-1">
                  <li>
                    <span className="font-semibold">Launch Value:</span>{" "}
                    $250,000
                  </li>
                  <li>
                    <span className="font-semibold">Current Value:</span>{" "}
                    $450,000
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
