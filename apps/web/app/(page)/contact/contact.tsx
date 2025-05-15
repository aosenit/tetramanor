import Footer from "@/components/home/Footer";
import React from "react";

export default function Contact() {
  return (
    <main className="min-h-screen font-sans text-gray">
      {/* Hero Section */}
      <section
        className="relative h-[45vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/contactBg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-full">
          <h1 className="text-white text-center text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Want to talk?
          </h1>
          <p className="text-white text-center text-lg md:text-2xl max-w-2xl">
            We're here to answer your questions, guide your investment journey,
            or simply have a chat about your next home.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold mb-6">Send us a message</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded col-span-1"
              />
              <input
                type="text"
                placeholder="Phone number"
                className="border p-3 rounded col-span-1"
              />
              <input
                type="email"
                placeholder="Email address"
                className="border p-3 rounded md:col-span-2"
              />
              <textarea
                placeholder="Message"
                className="border p-3 rounded md:col-span-2 min-h-[100px]"
              />
              <button
                type="submit"
                className="bg-green-700 text-white font-semibold py-3 rounded mt-2 md:col-span-2"
              >
                Send message
              </button>
            </form>
          </div>
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow p-8 flex flex-col gap-8">
            <div>
              <h3 className="font-bold mb-4">Contact Information</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-700">📞</span> +234 812 345 67
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-700">✉️</span> tetramanor@mail.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-700">📍</span> tetramanor address
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Business Hours</h3>
              <ul className="text-sm">
                <li>
                  MONDAY – FRIDAY
                  <br />
                  09:00am - 08:00pm
                </li>
                <li className="mt-2">
                  SATURDAY – SUNDAY
                  <br />
                  09:00am - 08:00pm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="font-bold mb-4">Location of our offices</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            {/* Replace with actual map embed if available */}
            <span className="text-gray-500">[Map Placeholder]</span>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-12 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <h3 className="font-bold mb-6">Contact Our Agents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Agent Card 1 */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <div
                className="h-32 w-full bg-gray-200 rounded mb-2"
                style={{
                  backgroundImage: "url('/clientLogo-one.png')",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="font-bold">Comfy Burrows</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-700">📞</span> +234 812 345 67
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-700">✉️</span> tetramanor@mail.com
              </div>
            </div>
            {/* Agent Card 2 */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <div
                className="h-32 w-full bg-gray-200 rounded mb-2"
                style={{
                  backgroundImage: "url('/clientLogo-two.png')",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="font-bold">TM Meadows</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-700">📞</span> +234 812 345 67
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-700">✉️</span> tetramanor@mail.com
              </div>
            </div>
            {/* Agent Card 3 */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <div
                className="h-32 w-full bg-gray-200 rounded mb-2"
                style={{
                  backgroundImage: "url('/clientLogo-three.png')",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="font-bold">Queen Mary</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-700">📞</span> +234 812 345 67
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-700">✉️</span> tetramanor@mail.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become an Agent Section */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h3 className="font-bold text-xl mb-2">Become an Agent</h3>
            <p className="mb-6">
              Launch your real estate career with Tetramanor
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="font-bold mb-1 flex items-center gap-2">
                  <span className="text-green-700">👥</span> Unmatched Support
                </div>
                <div className="text-sm text-gray-700">
                  Ongoing guidance and mentorship from seasoned professionals.
                </div>
              </div>
              <div>
                <div className="font-bold mb-1 flex items-center gap-2">
                  <span className="text-green-700">💰</span> Commission
                  Advantage
                </div>
                <div className="text-sm text-gray-700">
                  Earn more with a performance-driven commission structure.
                </div>
              </div>
              <div>
                <div className="font-bold mb-1 flex items-center gap-2">
                  <span className="text-green-700">🏠</span> Exclusive Listings
                </div>
                <div className="text-sm text-gray-700">
                  Access premium properties, from luxury homes to top
                  investments.
                </div>
              </div>
              <div>
                <div className="font-bold mb-1 flex items-center gap-2">
                  <span className="text-green-700">🏢</span> Strong Brand
                  Reputation
                </div>
                <div className="text-sm text-gray-700">
                  Represent a reputable and respected real estate name in
                  Nigeria.
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-center w-full md:w-auto">
            <button className="bg-green-700 text-white font-semibold px-8 py-3 rounded">
              Register here
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
