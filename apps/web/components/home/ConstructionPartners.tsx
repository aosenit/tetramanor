import React from "react";
import Image from "next/image";

export default function ConstructionPartners() {
  return (
    <section className="w-full container mx-auto px-4 lg:px-16 py-12">
      <div className=" flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-12 text-center">
          Our Construction Partners
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12 w-full">
          <Image
            fill
            src="/clientLogo-one.png"
            alt="MOA"
            className="h-14 object-contain"
          />
          <Image
            fill
            src="/clientLogo-two.png"
            alt="EMTRIPPLE"
            className="h-10 object-contain"
          />
          <Image
            fill
            src="/clientLogo-three.png"
            alt="BEL"
            className="h-10 object-contain"
          />
          <Image
            fill
            src="/clientLogo-four.png"
            alt="Prime"
            className="h-10 object-contain"
          />
          <Image
            fill
            src="/clientLogo-five.png"
            alt="Build Africa"
            className="h-10 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
