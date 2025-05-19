import React from "react";
import PropertyCard from "../components/property-card";
import burrows from "../../../../public/portfolio/burrows.jpg";	
import gardens from "../../../../public/portfolio/gardens.jpg";	
import meadows from "../../../../public/portfolio/meadows.jpg";	

function Completed() {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 ">
        Completed Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full h-full md:col-span-2">
          <PropertyCard
            slug="burrows"
            image={burrows}
            title="Comfy Burrows"
            location="Yaba, Lagos, Nigeria."
            status="Sold Out"
            className="h-full min-h-[400px]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-1 md:col-span-2">
          <PropertyCard
            slug= "TM-Gardens"
            image={gardens}
            title="TM Gardens"
            location="Surulere, Lagos, Nigeria."
            status="Sold Out"
            className="flex-1 min-h-[400px]"
          />
          <PropertyCard
            slug="TM-Meadows"
            image={meadows}
            title="TM Meadows"
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
