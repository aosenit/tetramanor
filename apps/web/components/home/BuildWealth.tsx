import { Button } from "@chakra-ui/react";

export default function BuildWealth() {
  return (
    <section className="relative w-full min-h-[340px]">
      <img
        src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80"
        alt="Build Wealth"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-16 px-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Build Wealth with Tetramanor
          </h2>
          <div className="text-white text-base mb-6 max-w-xl">
            The Nigerian real estate market is booming, with a{" "}
            <b>7.2% annual growth rate</b>—and you can be part of it! Tetramanor
            offers exclusive investment opportunities with{" "}
            <b>high returns, minimal risk,</b> and a{" "}
            <b>proven strategy for success</b>.
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 text-white text-base">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✔</span> Earn up to 50%
            ROI in just 18 months
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✔</span> Hassle-free
            investment—Tetramanor handles everything
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✔</span> Choose between
            fixed returns or profit-sharing models
          </div>
          <Button
            colorScheme="green"
            className="bg-primary text-white font-semibold rounded px-8 py-3 shadow-none text-base w-fit mt-4"
          >
            Call for investors
          </Button>
        </div>
      </div>
    </section>
  );
}
