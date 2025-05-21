"use client";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import blog from "../../../../../public/blog.jpg";
import { IoIosBriefcase } from "react-icons/io";
import { FaTag } from "react-icons/fa";
import Header from "@/app/(page)/portfolio/components/header";

const HomeHero = () => {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <Header />
      <Image
        src={blog}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="absolute inset-0 z-20  flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-3xl container mx-auto px-4 lg:px-14  md:text-4xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          Blog Title
        </motion.h1>
        <div className="flex container mx-auto px-4 lg:px-14  flex-wrap gap-6 mt-6 items-center text-white text-sm">
          <p className="flex items-center gap-2">
            <IoIosBriefcase className="text-white" />
            <strong>Published:</strong> Feb 10, 2025
          </p>
          <p className="flex items-center gap-2">
            <FaTag className="text-white" />
            <strong>Category:</strong> Main story
          </p>
          <p className="flex items-center gap-2">
            <FiClock className="text-white" />
            <strong>Read Time:</strong> 5 min
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
