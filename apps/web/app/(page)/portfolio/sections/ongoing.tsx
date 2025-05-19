import React from 'react'
import PropertyCard from '../components/property-card';

function Ongoing() {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Ongoing Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Card: Spans full height of right column */}
        <div className="w-full h-full">
          <PropertyCard
            image="/images/tm-highgardens.jpg"
            title="TM HighGardens"
            location="Eko Atlantic, Lagos, Nigeria."
            status="Ongoing"
            className="h-full min-h-[700px]"
          />
        </div>

        {/* Right Column: Stack of two cards */}
        <div className="flex flex-col gap-6">
          <PropertyCard
            image="/images/queen-mary.jpg"
            title="Queen Mary"
            location="Mende, Maryland, Lagos, Nigeria."
            status="Ongoing"
            className="flex-1"
          />
          <PropertyCard
            image="/images/kings-landing.jpg"
            title="King’s Landing"
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