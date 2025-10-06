"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../../portfolio/components/header";
import one from "@/assets/investment/one.webp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const HomeHero = () => {
  const router = useRouter();
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <Header />
      <Image
        src={one}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill
        priority
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight"
        >
          Invest in Real Estate
          <p className=" mt-2">with Confidence.</p>
        </motion.h1>

        <p className="text-white text-base md:text-xl mt-4 max-w-2xl">
          High-ROI opportunities in Nigeria's thriving property market, powered
          by Tetramanor's proven expertise.
        </p>
        <Button
          onClick={() => router.push("/investment")}
          className="
        relative 
        bg-gradient-to-r from-[#116114] to-[#1A7F1F] 
        hover:from-[#0e5010] hover:to-[#176d1c]
        text-white 
        px-10 py-5 
        rounded-md
        mt-8
        font-semibold 
        text-lg 
        uppercase 
        tracking-wide 
        shadow-lg
        transition-all 
        duration-300 
        hover:scale-[1.03]
        focus:ring-4 focus:ring-green-300
      "
        >
          <span>Invest Now</span>
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
};

export default HomeHero;
