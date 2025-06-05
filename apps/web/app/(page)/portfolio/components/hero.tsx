"use client";
import { useState } from "react";
import Header from "./header";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";
import one from "@/assets/portfolio/one.webp"
import Modal from "../view-property/sections/modal";

const HomeHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <div className="absolute inset-0 flex items-center z-20">
        <div className="absolute inset-0 flex items-center justify-center z-20 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-center text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight"
        >
          Our Portfolio
        </motion.h1>
      </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default HomeHero;