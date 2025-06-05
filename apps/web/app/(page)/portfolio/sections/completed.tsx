"use client";
import React from "react";
import PropertyCard from "../components/property-card";
import five from "@/assets/portfolio/five.webp"
import six from "@/assets/portfolio/six.webp"
import seven from "@/assets/portfolio/seven.webp"


function Completed() {
  const projects = [
    {
      id: 1,
      title: "Burrows",
      description: "A luxury residential development in the heart of Lagos.",
      image: five,
    },
    {
      id: 2,
      title: "Gardens",
      description: "An exclusive gated community with modern amenities.",
      image: six,
    },
    {
      id: 3,
      title: "Meadows",
      description: "A serene residential estate with beautiful landscapes.",
      image: seven,
    },
  ];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-16 bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Completed Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full h-full md:col-span-2">
          <PropertyCard
            slug="burrows"
            image={projects[0].image.src}
            title={projects[0].title}
            location="Yaba, Lagos, Nigeria."
            status="Sold Out"
            className="h-full min-h-[400px]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-1 md:col-span-2">
          <PropertyCard
            slug="TM-Gardens"
            image={projects[1].image.src}
            title={projects[1].title}
            location="Surulere, Lagos, Nigeria."
            status="Sold Out"
            className="flex-1 min-h-[400px]"
          />
          <PropertyCard
            slug="TM-Meadows"
            image={projects[2].image.src}
            title={projects[2].title}
            location="Mende, Maryland, Lagos, Nigeria."
            status="Sold Out"
            className="flex-1 min-h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Completed;
