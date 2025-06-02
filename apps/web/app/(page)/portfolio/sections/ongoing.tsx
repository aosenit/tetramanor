"use client";
import React from "react";
import  { StaticImageData } from "next/image";
import PropertyCard from "../components/property-card";
import twoo from "@/assets/portfolio/twoo.webp"
import three from "@/assets/portfolio/three.webp"
import four from "@/assets/portfolio/four.webp"

 
interface Project {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  location: string;
  status: string;
}
function Ongoing() {
  const projects: Project[] = [
    {
      id: 1,
      title: "TM Gardens",
      description: "A modern residential development with premium amenities.",
      image: twoo,
      location: "Surulere, Lagos, Nigeria.",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Mary's Court",
      description: "An exclusive residential estate in a prime location.",
      image: three,
      location: "Maryland, Lagos, Nigeria.",
      status: "In Progress",
    },
    {
      id: 3,
      title: "King's Palace",
      description:
        "A luxury residential project with state-of-the-art facilities.",
      image: four,
      location: "Ikoyi, Lagos, Nigeria.",
      status: "In Progress",
    },
  ];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-16 bg-white">
      <h2 className="text-3xl font-bold mb-8">Ongoing Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <PropertyCard
            key={project.id}
            slug={project.title.toLowerCase().replace(/\s+/g, "-")}
            image={project.image.src}
            title={project.title}
            location={project.location}
            status={project.status}
          />
        ))}
      </div>
    </section>
  );
}

export default Ongoing;
