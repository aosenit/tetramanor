import { Button } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export default function BuildWealth() {
  return (
    <section className="relative w-full min-h-[340px]">
      <img
        src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80"
        alt="Build Wealth"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 lg:py-20">
        {/* Left column */}
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
            Build Wealth with Tetramanor
          </h2>
          <p className="text-white text-base sm:text-lg mb-6 leading-relaxed">
            The Nigerian real estate market is booming, with a{" "}
            <b>7.2% annual growth rate</b>—and you can be part of it! Tetramanor
            offers exclusive investment opportunities with{" "}
            <b>high returns, minimal risk,</b> and a{" "}
            <b>proven strategy for success</b>.
          </p>
        </div>

        {/* Right column */}
        <div className="space-y-4 w-full text-white text-base sm:text-lg">
          <div className="flex items-start sm:items-center gap-2">
            <span className="text-white text-xl"><FaCheck/></span>
            <span>Earn up to 50% ROI in just 18 months</span>
          </div>
          <div className="flex items-start sm:items-center gap-2">
            <span className="text-white text-xl"><FaCheck/></span>
            <span>Hassle-free investment—Tetramanor handles everything</span>
          </div>
          <div className="flex items-start sm:items-center gap-2">
            <span className="text-white text-xl"><FaCheck/></span>
            <span>Choose between fixed returns or profit-sharing models</span>
          </div>

          <div className="mt-6 sm:mt-8">
            <Button
              colorScheme="green"
              className="bg-primary text-white font-semibold  px-6 py-3 text-sm sm:text-base"
            >
              Call for investors
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
