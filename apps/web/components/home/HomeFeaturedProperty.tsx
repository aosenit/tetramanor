// apps/web/components/home/HomeFeaturedProperty.tsx
import { Button } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

export default function HomeFeaturedProperty() {
  return (
    <section className="bg-[#FAFAFA] w-full py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:flex gap-12 items-center">
        {/* Image + Overlay Card */}
        <div className="relative flex justify-center lg:w-[55%] ">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="TM HighGardens"
            className="rounded-xl w-full h-[550px] lg:max-h-[610px]  object-cover"
            style={{ aspectRatio: "1 / 1.1" }}
          />
          {/* Overlay Card */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[90%]  bg-[#000000]/50 rounded-xl p-8 flex flex-col gap-8 shadow-lg">
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <div className="">
                <div className="text-white text-sm flex items-center gap-2">
                  <IoLocationOutline className="w-4 h-4" />
                  Eko Atlantic, Lagos, Nigeria.
                </div>
                <div className="text-white text-2xl font-bold">
                  TM HighGardens
                </div>
              </div>

              <Button
                size="sm"
                rounded="0"
                className="bg-white text-[#202020] font-semibold rounded px-6 py-2 shadow-none text-base w-full md:w-auto mt-4 md:mt-0"
              >
                Download brochure
              </Button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white">
              <div>
                <div className="font-bold">10 million</div>
                <div className="text-xs font-normal">Square metres</div>
              </div>
              <div>
                <div className="font-bold">30</div>
                <div className="text-xs font-normal">Floors</div>
              </div>
              <div>
                <div className="font-bold">10+</div>
                <div className="text-xs font-normal">Amenities</div>
              </div>
              <div>
                <div className="font-bold">6</div>
                <div className="text-xs font-normal">Parking levels</div>
              </div>
              <div>
                <div className="font-bold">30</div>
                <div className="text-xs font-normal">Floors</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side Content */}
        <div className="flex flex-col gap-6  h-full justify-between lg:w-[45%]">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#CD6115] mb-2 leading-tight">
            Own the View Others Can Only Dream Of
          </h2>
          <div className="text-gray-700 text-base space-y-6">
            <p className="mb-4">
              Welcome to <b>TM HighGardens</b>, a statement of prestige and
              architectural brilliance in Eko Atlantic City's Harbour Lights
              district.
            </p>
            <p className="mb-4">
              A marvel, seamlessly blending commercial spaces, residential
              units, and office suites into one harmonious entity. Designed for
              the elite, this high-rise masterpiece isn’t just a home, it’s a
              landmark. Rising as one of the{" "}
              <b>30 tallest buildings in Nigeria, TM HighGardens</b> redefines
              luxury with its <b>striking parametric facade</b>, making it an
              architectural icon in <b>Eko Atlantic City</b>.
            </p>
            <p className="mb-4">
              Offering <b>spacious maisonettes and apartments</b> with{" "}
              <b>
                double–volume living rooms, expansive unit sizes, and premium
                finishes
              </b>
              , every home is designed for sophistication. Residents enjoy{" "}
              <b>unmatched amenities</b> on the <b>6th–floor recreation hub</b>,
              featuring a <b>pool, lounge/bar, gym, spa,</b> and <b>salon</b>{" "}
              for ultimate relaxation. With <b>exclusive private offices</b>, a
              seamless work–life balance is guaranteed, while{" "}
              <b>6 levels of parking</b> ensure unmatched convenience for
              homeowners and their guests.
            </p>
          </div>
          <Button
            rounded="0"
            colorScheme="green"
            className="bg-primary text-white font-semibold rounded px-8 py-3 shadow-none text-base w-fit"
          >
            View more
          </Button>
        </div>
      </div>
    </section>
  );
}
