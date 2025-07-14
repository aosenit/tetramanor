"use client";
import { useState } from "react";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";
import Header from "../../components/header";
import Modal from "./modal";
import placeholder from "@/assets/placeholder.jpg";
import { Property } from "../../types";


interface HeroProps {
  property: Property;
}

const HomeHero = ({ property }: HeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const image = property.images?.find(img => img.isPrimary)?.imageUrl || property.images?.[0]?.imageUrl || placeholder;
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <Header />
      <Image
        src={image}
        alt={property.name}
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill
        priority
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white leading-loose mt-44"
          >
            <p className="flex gap-2 font-medium items-center">
              <CiLocationOn /> {property.address}
            </p>
            <p className="text-3xl md:text-4xl lg:text-6xl font-bold">
              {property.name}
            </p>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#FFFFFF4D] backdrop-blur-lg text-white w-full lg:w-auto font-medium whitespace-nowrap"
              >
                Download Brochure
              </button>
            </div>
          </motion.h1>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          brochureId={
            property.document && property.document.length > 0
              ? property.document[0].id
              : null
          }
          brochureName={
            property.document && property.document.length > 0
              ? property.document[0].name
              : "brochure.pdf"
          }
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default HomeHero;
