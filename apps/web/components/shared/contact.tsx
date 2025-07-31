import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import twelve from "@/assets/services/twelve.webp";

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleContactClick = () => {
    setIsLoading(true);
    // Simulate loading for navigation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="relative w-full h-[337px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={twelve}
        alt="Aerial view of residential development"
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 bg-black/40">
        <h2 className="text-4xl  font-bold text-white mb-6">
          Got Questions? Let's Talk.
        </h2>
        <p className="text-white text-base md:text-lg max-w-3xl mb-8">
          We're always happy to hear from you. Whether you're ready to own a
          home, need more info about a project, or just want to explore your
          options — reach out and let's make it happen.
        </p>
        <Link
          href="/contact"
          onClick={handleContactClick}
          className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 inline-flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Contact us"
          )}
        </Link>
      </div>
    </section>
  );
}
