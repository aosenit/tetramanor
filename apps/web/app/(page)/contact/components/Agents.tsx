"use client";

import Image from "next/image";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import burrows from "./portfolio/burrows.jpg";
import meadow from "./portfolio/meadows.jpg";
import queenmary from "./portfolio/queenmary.png";

export const agents = [
  {
    name: "Comfy Burrows",
    image: burrows,
    phone: "+234 812 345 67",
    email: "tetramanor@mail.com",
  },
  {
    name: "TM Meadows",
    image: meadow,
    phone: "+234 812 345 67",
    email: "tetramanor@mail.com",
  },
  {
    name: "Queen Mary",
    image: queenmary,
    phone: "+234 812 345 67",
    email: "tetramanor@mail.com",
  },
];

export default function Agents() {
  return (
    <section className="container mx-auto px-4 lg:px-16 py-12">
      <h2 className="text-3xl font-bold mb-8">Contact Our Agents</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {agents.map((agent, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={agent.image}
                alt={agent.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-[#f1f4f1]">
                <h3 className="text-xl font-semibold mb-4">{agent.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <FaPhoneAlt className="text-green-700" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-green-700" />
                  <span>{agent.email}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
