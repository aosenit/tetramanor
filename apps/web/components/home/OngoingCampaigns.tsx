import Image from "next/image";
import React from "react";
import five from "@/assets/home/five.webp";
import six from "@/assets/home/six.webp";
import seven from "@/assets/home/seven.webp";
import eight from "@/assets/home/eight.webp";
import nine from "@/assets/home/nine.webp";

const campaigns = [
  { img: five, alt: "Campaign 1" },
  { img: six, alt: "Campaign 2" },
  { img: seven, alt: "Campaign 3" },
  { img: eight, alt: "Campaign 4" },
  { img: nine, alt: "Campaign 5" },
];

export default function OngoingCampaigns() {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
          Ongoing Campaigns
        </h2>
        <div className="text-gray-700 text-base mb-10 text-center">
          Stay informed with our latest updates, announcements, and
          opportunities.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {campaigns.map((c, i) => (
            <div key={i} className="relative w-full aspect-[3/4]">
              <Image
                src={c.img}
                alt={c.alt}
                className="rounded-lg object-cover"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
