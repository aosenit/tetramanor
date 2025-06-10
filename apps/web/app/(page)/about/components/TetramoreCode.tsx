import React from "react";
import Image from "next/image";
import six from "@/assets/about/icons/six.webp"
import seven from "@/assets/about/icons/seven.webp"
import eight from "@/assets/about/icons/eight.webp"
import nine from "@/assets/about/icons/nine.webp"
import ten from "@/assets/about/icons/ten.webp"
import eleven from "@/assets/about/icons/eleven.webp"

const features = [
  {
    icon: eight,
    label: "Reasonable prices",
  },
  {
    icon: nine,
    label: "Flexible payment",
  },
  {
    icon: ten,
    label: "Verified listings",
  },
  {
    icon: eleven,
    label: "24/7 support",
  },
  {
    icon: ten,
    label: "Seamless onboarding",
  },
];

function TetramoreCode() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <div className="text-center">
        <h1 className="text-3xl text-[#CD6115] font-semibold">
          The Tetramanor Code
        </h1>
        <p className="mt-4 text-gray-700 text-sm">
          This is the promise we make to our clients:
        </p>
      </div>
      <div className="mt-6 space-y-2 text-center">
        <Image
          src={six}
          alt="icon"
          className="text-black md:ml-[100px] lg:ml-[200px] xl:ml-[460px]"
          width={20}
          height={20}
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
          src={seven}
          alt="icon"
          className="ml-[340px] md:ml-[600px] lg:ml-[700px] xl:ml-[950px]"
          width={20}
          height={20}
        />
      </div>

      <div className="grid  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
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
