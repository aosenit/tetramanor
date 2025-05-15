import { Button } from "@chakra-ui/react";

export default function FindNextHome() {
  return (
    <section className="bg-[#FAFAFA] w-full py-12 px-4">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2 leading-tight">
              Find Your Next Home & Move In
            </h2>
            <div className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet consectetur. Et sit egestas sagittis
              facilisi.
            </div>
          </div>
          <Button
            colorScheme="green"
            rounded="0"
            className="bg-primary text-white font-semibold rounded px-8 py-3 shadow-none text-base  md:w-auto mt-2 md:mt-0"
          >
            View more properties
          </Button>
        </div>
        {/* Image with Overlay Card */}
        <div className="relative w-full max-w-full rounded-[5px] overflow-hidden ">
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80"
            alt="TM Meadows"
            className="w-full h-[650px] md:h-[400px] object-cover rounded-xl"
          />
          {/* Badge */}
          <div className="absolute top-6 left-2 lg:left-6 bg-[#8B8B8B] bg-opacity-80 text-white text-sm px-5 py-2 rounded-full">
            Apartment for Rent
          </div>
          {/* Overlay Card */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-6  lg:-translate-x-0  bottom-6 w-[95%]  bg-white p-4  lg:p-8 flex flex-col gap-4 shadow-lg">
            <div className="text-2xl md:text-3xl font-bold text-black mb-2">
              TM Meadows, Ebute Metta, Lagos
            </div>
            <div className="text-gray-700 text-base mb-4">
              TM Meadows is a mixed-purpose development (residential and
              commercial) to be developed on the Lagos Mainland, consisting of
              2BR condominiums, 3BR condominiums, and 4BR maisonettes.
            </div>
            <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-4">
              <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-8 text-black text-base font-medium w-full justify-between">
                <div>
                  <div className="font-bold">Rental Price</div>
                  <div className="text-lg font-extrabold">3.5m/year</div>
                </div>
                <div>
                  <div className="font-bold">Agency Fee</div>
                  <div className="text-lg font-extrabold">10% (350,000)</div>
                </div>
                <div>
                  <div className="font-bold">Caution Fee</div>
                  <div className="text-lg font-extrabold">300,000</div>
                </div>
                <div>
                  <div className="font-bold">Service Charge</div>
                  <div className="text-lg font-extrabold">1 million</div>
                </div>
                <div>
                  <div className="font-bold">Total Package</div>
                  <div className="text-lg font-extrabold">5,150,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
