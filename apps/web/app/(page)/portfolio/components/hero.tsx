"use client";
// import Header from "./header";
import Image from "next/image";
import { motion } from "framer-motion";
import one from "@/assets/portfolio/one.webp"
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
const HomeHero = () => {
  // If you want to add loading/error logic, you can pass a prop or use context. For now, just add a skeleton fallback example:
  // Example: if (isLoading) return <Skeleton className="h-[60vh] w-full" />;
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
    </section>
  );
};

export default HomeHero;