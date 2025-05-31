import Image from "next/image";
import React from "react";

const campaigns = [
  { img: "./campaign-one.png", alt: "Campaign 1" },
  { img: "./campaign-two.png", alt: "Campaign 2" },
  { img: "./campaign-three.png", alt: "Campaign 3" },
  { img: "./campaign-four.png", alt: "Campaign 4" },
  { img: "./campaign-five.png", alt: "Campaign 5" },
];

export default function OngoingCampaigns() {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
          Ongoing Campaigns
        </h2>
        <div className="text-gray-700 text-base mb-10 text-center">
          Lorem ipsum dolor sit amet consectetur. Et sit egestas sagittis
          facilisi.
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-center gap-2">
          {campaigns.map((c, i) => (
            <Image
              fill
              key={i}
              src={c.img}
              alt={c.alt}
              className="rounded-lg w-[220px] h-[320px] object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
