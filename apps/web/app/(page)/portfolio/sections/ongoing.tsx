import React from 'react'
import PropertyCard from '../components/property-card';
import two from "@/assets/portfolio/two.webp";
import three from "@/assets/portfolio/three.webp";
import four from "@/assets/portfolio/four.webp";

function Ongoing() {
  return (
    <section className="py-16 px-4 container mx-auto md:px-10 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Ongoing Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Card: Spans full height of right column */}
        <div className="w-full h-full">
          <PropertyCard
            image={two  }
            title="TM HighGardens"
            location="Eko Atlantic, Lagos, Nigeria."
            status="Ongoing"
            className="h-full min-h-[700px]"
          />
        </div>

        {/* Right Column: Stack of two cards */}
        <div className="flex flex-col gap-6">
          <PropertyCard
            image={three}
            title="Queen Mary"
            location="Mende, Maryland, Lagos, Nigeria."
            status="Ongoing"
            className="flex-1"
          />
          <PropertyCard
            image={four}
            title="King's Landing"
            location="Mende, Maryland, Lagos, Nigeria."
            status="Ongoing"
            className="flex-1"
          />
        </div>
      </div>
    </section>
  );
}

export default Ongoing