// apps/web/components/home/HomeFeaturedProperty.tsx
import { Button } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

export default function HomeFeaturedProperty() {
  return (
    <section className="w-full container mx-auto px-4 lg:px-16 py-12">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left: Image with Overlay */}
        <div className="relative w-full lg:w-[55%]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="TM HighGardens"
            className="rounded-xl w-full h-[400px] sm:h-[500px] lg:h-[610px] object-cover"
          />
          {/* Overlay Card */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[95%] sm:w-[90%] bg-black/50 rounded-xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
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
                className="bg-white text-[#202020] font-semibold rounded px-6 py-2 shadow-none text-base w-full md:w-auto"
              >
                Download brochure
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-white text-center">
              {[
                { label: "Square metres", value: "10 million" },
                { label: "Floors", value: "30" },
                { label: "Amenities", value: "10+" },
                { label: "Parking levels", value: "6" },
                { label: "Floors", value: "30" },
              ].map((item, index) => (
                <div key={index}>
                  <div className="font-bold">{item.value}</div>
                  <div className="text-xs font-normal">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#CD6115] leading-tight">
            Own the View Others Can Only Dream Of
          </h2>
          <div className="text-gray-700 text-base space-y-6">
            <p>
              Welcome to <b>TM HighGardens</b>, a statement of prestige and
              architectural brilliance in Eko Atlantic City's Harbour Lights
              district.
            </p>
            <p>
              A marvel, seamlessly blending commercial spaces, residential
              units, and office suites into one harmonious entity. Designed for
              the elite, this high-rise masterpiece isn’t just a home, it’s a
              landmark. Rising as one of the <b>30 tallest buildings in Nigeria</b>, TM
              HighGardens redefines luxury with its <b>striking parametric
              facade</b>, making it an architectural icon in{" "}
              <b>Eko Atlantic City</b>.
            </p>
            <p>
              Offering <b>spacious maisonettes and apartments</b> with{" "}
              <b>double–volume living rooms, expansive unit sizes, and premium
              finishes</b>, every home is designed for sophistication. Residents
              enjoy <b>unmatched amenities</b> on the <b>6th–floor recreation hub</b>,
              featuring a <b>pool, lounge/bar, gym, spa,</b> and <b>salon</b> for ultimate
              relaxation. With <b>exclusive private offices</b>, a seamless
              work–life balance is guaranteed, while <b>6 levels of parking</b> ensure
              unmatched convenience for homeowners and their guests.
            </p>
          </div>
          <Button
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
