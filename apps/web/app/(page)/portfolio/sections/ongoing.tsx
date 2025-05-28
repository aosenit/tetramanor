import React from 'react'
import PropertyCard from '../components/property-card';
import tmgardens from "../../../../public/portfolio/tmgardens.png";
import mary from "../../../../public/portfolio/mary.jpg";
import kings from "../../../../public/portfolio/kings.jpg";

function Ongoing() {
  return (
    <section className="py-16 container mx-auto px-4 lg:px-16 bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Ongoing Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full h-full">
        <PropertyCard
  slug="tm-highgardens"
  image={tmgardens}
  title="TM HighGardens"
  location="Eko Atlantic, Lagos, Nigeria."
  status="Ongoing"
  className="h-full min-h-[700px]"
/>
        </div>
        <div className="flex flex-col gap-6">
        <PropertyCard
  slug="queen-mary"
  image={mary}
  title="Queen Mary"
  location="Mende, Maryland, Lagos, Nigeria."
  status="Ongoing"
  className="flex-1"
/>
<PropertyCard
  slug="kings-landing"
  image={kings}
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