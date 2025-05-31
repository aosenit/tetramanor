"use client";
import { motion } from "framer-motion";
import Header from "../../portfolio/components/header";
import Image from "next/image";
const Hero = () => {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <Header />

      {/* change the Background image */}
      <Image
        src="/herobg.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="absolute inset-0 flex items-center justify-center z-20 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-center text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight"
        >
          Expert Real Estate Solutions in Lagos
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;
