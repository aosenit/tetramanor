import Footer from "@/components/home/Footer";
import HomeKeyFeatures from "@/components/home/HomeKeyFeatures";
import ConstructionPartners from "@/components/home/ConstructionPartners";
import React from "react";

export default function About() {
  return (
    <main className="min-h-screen font-sans text-gray ">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-about-bg bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-full">
          <h1 className="text-white text-center text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Meet Tetramanor
          </h1>
          <p className="text-white text-center text-lg md:text-2xl max-w-2xl">
            Visionaries, Inventors, Builders. Creating long-term value and
            building wealth, one home at a time.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
            Our Achievements to Date
          </h2>
          <HomeKeyFeatures />
        </div>
      </section>

      {/* The Tetramanor Code (Promise/Values) */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#CD6115] mb-4">
            The Tetramanor Code
          </h2>
          <p className="text-gray-700 mb-8">
            This is the promise we make to our clients
          </p>
          <blockquote className="border-l-4 border-[#CD6115] pl-4 italic text-gray-800 mb-6">
            We will not compromise our standards for any reason whatsoever.
            <br />
            We will not want our clients to make a profit.
            <br />
            We will not sell to our clients spaces we are not willing to live in
            ourselves.
          </blockquote>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="bg-white px-4 py-2 rounded shadow text-sm">
              Reasonable Prices
            </span>
            <span className="bg-white px-4 py-2 rounded shadow text-sm">
              Strategic Locations
            </span>
            <span className="bg-white px-4 py-2 rounded shadow text-sm">
              Keeping it Real
            </span>
            <span className="bg-white px-4 py-2 rounded shadow text-sm">
              Flexible
            </span>
            <span className="bg-white px-4 py-2 rounded shadow text-sm">
              Reliable
            </span>
          </div>
        </div>
      </section>

      {/* Why Choose Tetramanor */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
            Why Choose Tetramanor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="font-bold mb-2">Strategic Locations</h3>
              <p className="text-gray-700 text-sm">
                Our properties are situated in fully developed, high-demand
                areas, ensuring seamless access to essential infrastructure like
                roads, power, and water.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="font-bold mb-2">Quality & Affordability</h3>
              <p className="text-gray-700 text-sm">
                We strike the perfect balance between premium craftsmanship and
                cost efficiency, making luxury living accessible without
                compromise.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="font-bold mb-2">Client-Centric Approach</h3>
              <p className="text-gray-700 text-sm">
                Your needs come first. From development to handover, we
                prioritize customer satisfaction, ensuring a seamless and
                rewarding experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Placeholder) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
            What People are Saying About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F5F5] p-6 rounded shadow">
              <p className="text-gray-700 mb-2">
                Great work in progress. Dedicated and trusted team, effective
                and efficient communication with prospective clients.
                Tetramanor, well done.
              </p>
              <span className="font-bold text-sm">Babatunde Andu</span>
            </div>
            <div className="bg-[#F5F5F5] p-6 rounded shadow">
              <p className="text-gray-700 mb-2">
                As always, TM never fails to astonish you with exquisite
                finishing yet again...love the sample 3BR Apartment.
              </p>
              <span className="font-bold text-sm">Altinuke Haroun</span>
            </div>
            <div className="bg-[#F5F5F5] p-6 rounded shadow">
              <p className="text-gray-700 mb-2">
                Great ambiance...coming home to comfort and style.
              </p>
              <span className="font-bold text-sm">Muyiwa Adedapo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section (Placeholder) */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
            Tetramanor's Visionaries, Inventors, Builders.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 justify-center">
            {/* Example team members, replace with dynamic data if available */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <span className="font-bold">John Beecroft</span>
              <span className="text-xs text-gray-500">MD</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <span className="font-bold">Chuka Atuchukwu</span>
              <span className="text-xs text-gray-500">
                Executive Accountant
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <span className="font-bold">Olumide Obasemo</span>
              <span className="text-xs text-gray-500">Project Manager</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <span className="font-bold">Jerry Onomejite</span>
              <span className="text-xs text-gray-500">
                Construction Engineer
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <span className="font-bold">Stephen Nnenji</span>
              <span className="text-xs text-gray-500">
                Construction Engineer
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <span className="font-bold">Jamiu Yusuf</span>
              <span className="text-xs text-gray-500">
                Asst. Construction Engineer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Construction Partners Section */}
      <ConstructionPartners />

      <Footer />
    </main>
  );
}
