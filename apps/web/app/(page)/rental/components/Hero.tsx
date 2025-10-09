"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../../portfolio/components/header";
import one from "@/assets/rental/one.webp";

const HomeHero = () => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <Header />
      <Image
        src={one}
        alt="Rental Properties in Lagos"
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
        >
          Find Your Next Home
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl"
        >
          Discover premium rental properties and short-lets in Lagos. Experience
          elevated living with effortless management.
        </motion.p>
      </div>
    </section>
  );
};

export default HomeHero;
