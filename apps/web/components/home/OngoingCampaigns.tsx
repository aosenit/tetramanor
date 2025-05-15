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
    <section className="bg-white w-full py-16 px-4">
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
          Ongoing Campaigns
        </h2>
        <div className="text-gray-700 text-base mb-10 text-center">
          Lorem ipsum dolor sit amet consectetur. Et sit egestas sagittis
          facilisi.
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {campaigns.map((c, i) => (
            <img
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
