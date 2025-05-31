import Header from "@/app/(page)/portfolio/components/header";
// import Image from "next/image";
import React from "react";

const HomeHero = () => {
  return (
    <section className="relative h-[80vh] ">
      <Header />
      {/* <Image
        src="/herobg.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
        fill
        priority
      /> */}
      {/* should be a video
       */}
      <video
        src="/home.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-[calc(80vh)] container mx-auto">
          <h1 className="text-white text-center text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6 mt-24 md:mt-0">
            Your Trusted Real Estate
            <br className="hidden md:block" /> Partner in Lagos
          </h1>
          <p className="text-white text-center text-base md:text-lg lg:text-2xl font-normal mb-6 md:mb-10 max-w-2xl">
            Modern, sustainable homes designed for better living and stronger
            communities
          </p>
          <form className="flex flex-col md:flex-row items-stretch w-full max-w-3xl bg-black/70 overflow-hidden border border-white/10">
            <div className="flex items-center px-4 md:px-6 py-3 md:py-4 border-b md:border-b-0 md:border-r border-white/30">
              <span className="text-white text-sm md:text-base mr-2">
                Property type
              </span>
            </div>
            <div className="flex items-center px-4 md:px-6 py-3 md:py-4 border-b md:border-b-0 md:border-r border-white/10 flex-1">
              <input
                type="text"
                placeholder="Enter location"
                className="bg-transparent outline-none text-white placeholder-white w-full text-sm md:text-base"
              />
            </div>
            <div className="flex items-center px-4 md:px-6 py-3 md:py-4 border-b md:border-b-0 md:border-r border-white/30">
              <span className="text-white text-sm md:text-base">
                Price range
              </span>
            </div>
            <div className="bg-white text-black font-semibold rounded-none px-6 md:px-8 py-3 md:py-4 text-sm md:text-base h-auto min-w-[120px] hover:bg-gray-200">
              Browse
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
