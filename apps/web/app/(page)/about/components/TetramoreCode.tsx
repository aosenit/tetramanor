import React from "react";
import Image from "next/image";

const features = [
  {
    icon: "/about/one.png",
    label: "Reasonable prices",
  },
  {
    icon: "/about/two.png",
    label: "Flexible payment",
  },
  {
    icon: "/about/three.png",
    label: "Verified listings",
  },
  {
    icon: "/about/four.png",
    label: "24/7 support",
  },
  {
    icon: "/about/five.png",
    label: "Seamless onboarding",
  },
];

function TetramoreCode() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <div>
        <h1 className="text-3xl text-[#CD6115] font-semibold">
          The Tetramanor Code
        </h1>
        <p className="mt-4 text-gray-700 text-sm">
          This is the promise we make to our clients:
        </p>
      </div>
      <div className="mt-10 space-y-6">
        <Image
          src="/about/eight.png"
          alt="icon"
          className="text-black"
          width={700}
          height={700}
        />
        <p className="text-sm text-[#202020]">
          We will not compromise our standards for any reason whatsoever.
        </p>
        <p className="text-sm text-[#202020]">
          We will not extort our clients to make a profit.
        </p>
        <p className="text-sm text-[#202020]">
          We will not sell to our clients spaces we are not willing to live in
          ourselves.
        </p>
        <Image
          src="/about/seven.png"
          alt="icon"
          className="mr-10"
          width={700}
          height={700}
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        {features.map((item, index) => (
          <button
            key={index}
            className="flex text-sm font-medium items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-sm"
          >
            <Image src={item.icon} alt="icon" width={30} height={30} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TetramoreCode;
