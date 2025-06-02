import React from "react";
import Image from "next/image";
import one from "@/assets/home/loone.webp";
import two from "@/assets/home/lotwo.webp";
import three from "@/assets/home/lothree.webp";
import four from "@/assets/home/lofour.webp";
import five from "@/assets/home/losix.webp";

export default function ConstructionPartners() {
  return (
    <section className="w-full container mx-auto px-4 lg:px-16 py-12">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-12 text-center">
          Our Construction Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 w-full place-items-center">
          <div className="relative w-[200px] h-[60px]">
            <Image
              src={one}
              alt="MOA"
              className="object-contain"
              fill
              sizes="200px"
            />
          </div>
          <div className="relative w-[200px] h-[60px]">
            <Image
              src={two}
              alt="EMTRIPPLE"
              className="object-contain"
              fill
              sizes="200px"
            />
          </div>
          <div className="relative w-[200px] h-[60px]">
            <Image
              src={three}
              alt="BEL"
              className="object-contain"
              fill
              sizes="200px"
            />
          </div>
          <div className="relative w-[200px] h-[60px]">
            <Image
              src={four}
              alt="Prime"
              className="object-contain"
              fill
              sizes="200px"
            />
          </div>
          <div className="relative w-[200px] h-[60px]">
            <Image
              src={five}
              alt="Build Africa"
              className="object-contain"
              fill
              sizes="200px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
