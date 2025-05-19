import React from "react";
import PropertyCard from "../components/property-card";

function Completed() {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Completed Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Card: Spans full height of right column */}
        <div className="w-full h-full md:col-span-2">
          <PropertyCard
            image="/images/tm-highgardens.jpg"
            title="TM HighGardens"
            location="Eko Atlantic, Lagos, Nigeria."
            status="Sold Out"
            className="h-full min-h-[400px]"
          />
        </div>

        {/* Right Column: Stack of two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-1 md:col-span-2">
          <PropertyCard
            image="/images/queen-mary.jpg"
            title="Queen Mary"
            location="Mende, Maryland, Lagos, Nigeria."
            status="Sold Out"
            className="flex-1 min-h-[400px]"
          />
          <PropertyCard
            image="/images/kings-landing.jpg"
            title="King’s Landing"
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
