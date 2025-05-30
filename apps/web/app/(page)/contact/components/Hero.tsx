"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../../portfolio/components/header";

const HomeHero = () => {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <Header />
      <Image
        src={"/contact/contacther.jpg"}
        alt="Hero Background"
        width={1000}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover z-0"
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
          Want to talk?
        </motion.h1>

        <p className="text-white text-base md:text-xl mt-4 max-w-2xl">
          We’re here to answer your questions, guide your investment journey, or
          simply have a chat about your next home.
        </p>
      </div>
    </section>
  );
};

export default HomeHero;
