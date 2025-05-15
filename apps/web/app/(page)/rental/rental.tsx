import Footer from "@/components/home/Footer";
import React from "react";

const properties = [
  {
    title: "TM Meadows",
    image: "",
    location: "Ebute Metta, Lagos, Nigeria.",
    features: ["3 beds", "Balcony", "Walk-in Closets", "CCTV"],
    price: "₦3.5m/year",
    type: "UNFINISHED",
  },
  {
    title: "TM Meadows",
    image: "",
    location: "Ebute Metta, Lagos, Nigeria.",
    features: ["3 beds", "Balcony", "Walk-in Closets", "CCTV"],
    price: "₦3.5m/year",
    type: "UNFINISHED",
  },
  {
    title: "Comfy Burrows",
    image: "",
    location: "Ebute Metta, Lagos, Nigeria.",
    features: ["3 beds", "Balcony", "Walk-in Closets", "CCTV"],
    price: "₦176,500/month",
    type: "UNFINISHED",
  },
  {
    title: "Comfy Burrows",
    image: "",
    location: "Ebute Metta, Lagos, Nigeria.",
    features: ["3 beds", "Balcony", "Walk-in Closets", "CCTV"],
    price: "₦136,500/month",
    type: "STANDARD FURNISHING",
  },
  {
    title: "Comfy Burrows",
    image: "",
    location: "Ebute Metta, Lagos, Nigeria.",
    features: ["3 beds", "Balcony", "Walk-in Closets", "CCTV"],
    price: "₦116,500/month",
    type: "LUXURY FURNISHING",
  },
  {
    title: "Comfy Burrows",
    image: "",
    location: "Ebute Metta, Lagos, Nigeria.",
    features: ["3 beds", "Balcony", "Walk-in Closets", "CCTV"],
    price: "₦106,500/month",
    type: "FURNISHED",
  },
];

export default function Rental() {
  return (
    <main className="min-h-screen font-sans text-gray">
      {/* Hero Section */}
      <section
        className="relative h-[45vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/herobg.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-full">
          <h1 className="text-white text-center text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Find Your Next Home
          </h1>
          <p className="text-white text-center text-lg md:text-2xl max-w-2xl">
            Luxury Rentals & Short-Lets — Elevated Living, Effortless
            Management.
          </p>
        </div>
      </section>

      {/* Search & Property List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                Looking for a Premium Rental or Short-let Property in Lagos?
              </h2>
              <input
                type="text"
                placeholder="Search..."
                className="border p-3 rounded w-full mb-4"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-gray-700 mb-2">
                Tetramanor offers a curated selection of luxury apartments and
                homes, perfect for short-term stays or long-term Rentals.
                Whether you need a fully serviced apartment for a getaway or a
                stylish home for an extended fort, security, and convenience in
                prime locations.
              </div>
              <div className="flex justify-end">
                <button className="border px-4 py-2 rounded">Filter by</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
              >
                <div className="relative h-48 w-full rounded mb-2 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                  <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {property.type}
                  </span>
                </div>
                <div className="font-bold text-lg">{property.title}</div>
                <div className="text-xs text-gray-500 mb-2">
                  {property.location}
                </div>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  {property.features.map((f, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="font-bold text-green-900 text-lg">
                  {property.price}
                </div>
                <button className="bg-green-700 text-white font-semibold py-2 rounded mt-2">
                  View property
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
